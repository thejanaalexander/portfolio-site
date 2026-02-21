<?php
// CV Upload Handler

function getCv()
{
    $cvDir = UPLOAD_DIR . 'cv/';
    $files = glob($cvDir . 'cv.*');

    if (empty($files)) {
        jsonResponse(['exists' => false]);
    }

    $file = basename($files[0]);
    $ext = pathinfo($file, PATHINFO_EXTENSION);

    jsonResponse([
        'exists' => true,
        'filename' => $file,
        'url' => UPLOAD_URL . 'cv/' . $file,
        'extension' => $ext
    ]);
}

function uploadCv()
{
    if (!isset($_FILES['cv']) || $_FILES['cv']['error'] !== UPLOAD_ERR_OK) {
        jsonResponse(['error' => 'No file uploaded'], 400);
    }

    $cvDir = UPLOAD_DIR . 'cv/';

    // Remove existing CV files
    $existing = glob($cvDir . 'cv.*');
    foreach ($existing as $f) {
        unlink($f);
    }

    // Save new CV
    $ext = pathinfo($_FILES['cv']['name'], PATHINFO_EXTENSION);
    $filename = 'cv.' . $ext;
    $dest = $cvDir . $filename;

    if (move_uploaded_file($_FILES['cv']['tmp_name'], $dest)) {
        jsonResponse([
            'message' => 'CV uploaded successfully',
            'url' => UPLOAD_URL . 'cv/' . $filename,
            'filename' => $filename
        ], 201);
    } else {
        jsonResponse(['error' => 'Failed to upload CV'], 500);
    }
}

function deleteCv()
{
    $cvDir = UPLOAD_DIR . 'cv/';
    $files = glob($cvDir . 'cv.*');

    foreach ($files as $f) {
        unlink($f);
    }

    jsonResponse(['message' => 'CV deleted']);
}
