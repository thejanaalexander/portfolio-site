<?php
// Database Configuration for InfinityFree
// Update these values with your InfinityFree MySQL credentials

define('DB_HOST', 'sql306.infinityfree.com'); // Will be provided by InfinityFree
define('DB_NAME', 'if0_your_db_name');        // Will be provided by InfinityFree
define('DB_USER', 'if0_your_username');        // Will be provided by InfinityFree
define('DB_PASS', 'your_password');            // Your InfinityFree password

// Auth config
define('JWT_SECRET', 'xK9p2mN7qR4wT8vB3yZ');
define('ADMIN_PASSWORD', 'adminthejAlex');

// Upload directory (relative to api/)
define('UPLOAD_DIR', __DIR__ . '/uploads/');
define('UPLOAD_URL', '/api/uploads/');

// Connect to MySQL via PDO
function getDB() {
    static $pdo = null;
    if ($pdo === null) {
        try {
            $pdo = new PDO(
                "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
                DB_USER,
                DB_PASS,
                [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false
                ]
            );
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
            exit;
        }
    }
    return $pdo;
}
