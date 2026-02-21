<?php
// API Router — dispatches requests to appropriate handlers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/auth.php';

// Ensure upload directories exist
if (!is_dir(UPLOAD_DIR))
    mkdir(UPLOAD_DIR, 0755, true);
if (!is_dir(UPLOAD_DIR . 'cv/'))
    mkdir(UPLOAD_DIR . 'cv/', 0755, true);

// Parse the request URI
$requestUri = $_SERVER['REQUEST_URI'];
$basePath = '/api';

// Remove query string
$path = parse_url($requestUri, PHP_URL_PATH);

// Remove base path prefix
if (strpos($path, $basePath) === 0) {
    $path = substr($path, strlen($basePath));
}

// Remove trailing slash
$path = rtrim($path, '/');
if (empty($path))
    $path = '/';

$method = $_SERVER['REQUEST_METHOD'];

// Helper: send JSON response
function jsonResponse($data, $code = 200)
{
    http_response_code($code);
    echo json_encode($data);
    exit;
}

// Helper: get JSON body
function getJsonBody()
{
    $input = file_get_contents('php://input');
    return json_decode($input, true) ?? [];
}

// Helper: handle file upload and return path
function handleUpload($fileKey, $subdir = '')
{
    if (!isset($_FILES[$fileKey]) || $_FILES[$fileKey]['error'] !== UPLOAD_ERR_OK) {
        return null;
    }

    $file = $_FILES[$fileKey];
    $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
    $filename = time() . '-' . mt_rand(100000000, 999999999) . '.' . $ext;
    $dest = UPLOAD_DIR . $subdir . $filename;

    if (move_uploaded_file($file['tmp_name'], $dest)) {
        return UPLOAD_URL . $subdir . $filename;
    }
    return null;
}

// Helper: handle multiple file uploads
function handleMultipleUploads($fileKey)
{
    $paths = [];
    if (!isset($_FILES[$fileKey]))
        return $paths;

    $files = $_FILES[$fileKey];
    $count = is_array($files['name']) ? count($files['name']) : 0;

    for ($i = 0; $i < $count; $i++) {
        if ($files['error'][$i] === UPLOAD_ERR_OK) {
            $ext = pathinfo($files['name'][$i], PATHINFO_EXTENSION);
            $filename = time() . '-' . mt_rand(100000000, 999999999) . '-' . $i . '.' . $ext;
            $dest = UPLOAD_DIR . $filename;

            if (move_uploaded_file($files['tmp_name'][$i], $dest)) {
                $paths[] = UPLOAD_URL . $filename;
            }
        }
    }
    return $paths;
}

// --- ROUTING ---

// Login
if ($path === '/login' && $method === 'POST') {
    $body = getJsonBody();
    $password = isset($body['password']) ? trim($body['password']) : '';

    if ($password === ADMIN_PASSWORD) {
        $token = generateToken(['id' => 'admin']);
        jsonResponse(['auth' => true, 'token' => $token]);
    } else {
        jsonResponse(['auth' => false, 'message' => 'Invalid password'], 401);
    }
}

// Projects
elseif ($path === '/projects/favourites' && $method === 'GET') {
    require __DIR__ . '/handlers/projects.php';
    getFavouriteProjects();
} elseif ($path === '/projects' && $method === 'GET') {
    require __DIR__ . '/handlers/projects.php';
    getAllProjects();
} elseif ($path === '/projects' && $method === 'POST') {
    requireAuth();
    require __DIR__ . '/handlers/projects.php';
    createProject();
} elseif (preg_match('#^/projects/(\d+)/favourite$#', $path, $matches) && $method === 'PATCH') {
    requireAuth();
    require __DIR__ . '/handlers/projects.php';
    toggleFavourite($matches[1]);
} elseif (preg_match('#^/projects/(\d+)$#', $path, $matches) && $method === 'GET') {
    require __DIR__ . '/handlers/projects.php';
    getProject($matches[1]);
} elseif (preg_match('#^/projects/(\d+)$#', $path, $matches) && $method === 'PUT') {
    requireAuth();
    require __DIR__ . '/handlers/projects.php';
    updateProject($matches[1]);
} elseif (preg_match('#^/projects/(\d+)$#', $path, $matches) && $method === 'DELETE') {
    requireAuth();
    require __DIR__ . '/handlers/projects.php';
    deleteProject($matches[1]);
}

// Testimonials
elseif ($path === '/testimonials' && $method === 'GET') {
    require __DIR__ . '/handlers/testimonials.php';
    getAllTestimonials();
} elseif ($path === '/testimonials' && $method === 'POST') {
    requireAuth();
    require __DIR__ . '/handlers/testimonials.php';
    createTestimonial();
} elseif (preg_match('#^/testimonials/(\d+)$#', $path, $matches) && $method === 'PUT') {
    requireAuth();
    require __DIR__ . '/handlers/testimonials.php';
    updateTestimonial($matches[1]);
} elseif (preg_match('#^/testimonials/(\d+)$#', $path, $matches) && $method === 'DELETE') {
    requireAuth();
    require __DIR__ . '/handlers/testimonials.php';
    deleteTestimonial($matches[1]);
}

// Contact / Messages
elseif ($path === '/contact' && $method === 'POST') {
    require __DIR__ . '/handlers/messages.php';
    createMessage();
} elseif ($path === '/messages' && $method === 'GET') {
    requireAuth();
    require __DIR__ . '/handlers/messages.php';
    getAllMessages();
} elseif (preg_match('#^/messages/(\d+)$#', $path, $matches) && $method === 'DELETE') {
    requireAuth();
    require __DIR__ . '/handlers/messages.php';
    deleteMessage($matches[1]);
}

// CV
elseif ($path === '/cv' && $method === 'GET') {
    require __DIR__ . '/handlers/cv.php';
    getCv();
} elseif ($path === '/cv' && $method === 'POST') {
    requireAuth();
    require __DIR__ . '/handlers/cv.php';
    uploadCv();
} elseif ($path === '/cv' && $method === 'DELETE') {
    requireAuth();
    require __DIR__ . '/handlers/cv.php';
    deleteCv();
}

// Analytics
elseif ($path === '/analytics' && $method === 'GET') {
    requireAuth();
    require __DIR__ . '/handlers/analytics.php';
    getAnalytics();
}

// 404
else {
    jsonResponse(['error' => 'Route not found: ' . $method . ' ' . $path], 404);
}
