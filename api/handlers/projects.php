<?php
// Projects CRUD Handler

function getAllProjects()
{
    $db = getDB();
    $stmt = $db->query('SELECT * FROM projects ORDER BY createdAt DESC');
    $projects = $stmt->fetchAll();

    // Parse JSON fields
    foreach ($projects as &$p) {
        $p['technologies'] = json_decode($p['technologies'], true) ?? [];
        $p['gallery'] = json_decode($p['gallery'], true) ?? [];
        $p['isFavourite'] = (bool) $p['isFavourite'];
    }

    jsonResponse($projects);
}

function getFavouriteProjects()
{
    $db = getDB();
    $stmt = $db->query('SELECT * FROM projects WHERE isFavourite = 1 ORDER BY createdAt DESC');
    $projects = $stmt->fetchAll();

    foreach ($projects as &$p) {
        $p['technologies'] = json_decode($p['technologies'], true) ?? [];
        $p['gallery'] = json_decode($p['gallery'], true) ?? [];
        $p['isFavourite'] = true;
    }

    jsonResponse($projects);
}

function getProject($id)
{
    $db = getDB();
    $stmt = $db->prepare('SELECT * FROM projects WHERE id = ?');
    $stmt->execute([$id]);
    $project = $stmt->fetch();

    if (!$project) {
        jsonResponse(['error' => 'Project not found'], 404);
    }

    $project['technologies'] = json_decode($project['technologies'], true) ?? [];
    $project['gallery'] = json_decode($project['gallery'], true) ?? [];
    $project['isFavourite'] = (bool) $project['isFavourite'];

    jsonResponse($project);
}

function createProject()
{
    $db = getDB();

    $title = $_POST['title'] ?? '';
    $category = $_POST['category'] ?? '';
    $description = $_POST['description'] ?? '';
    $technologies = $_POST['technologies'] ?? '[]';
    $liveLink = $_POST['liveLink'] ?? '';
    $githubLink = $_POST['githubLink'] ?? '';

    // Handle main image upload
    $imagePath = handleUpload('image');

    // Handle gallery uploads
    $galleryPaths = handleMultipleUploads('gallery');

    $stmt = $db->prepare('INSERT INTO projects (title, category, description, technologies, image, gallery, liveLink, githubLink) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
    $stmt->execute([
        $title,
        $category,
        $description,
        $technologies,
        $imagePath,
        json_encode($galleryPaths),
        $liveLink,
        $githubLink
    ]);

    $id = $db->lastInsertId();

    // Return the created project
    $stmt = $db->prepare('SELECT * FROM projects WHERE id = ?');
    $stmt->execute([$id]);
    $project = $stmt->fetch();
    $project['technologies'] = json_decode($project['technologies'], true) ?? [];
    $project['gallery'] = json_decode($project['gallery'], true) ?? [];
    $project['isFavourite'] = (bool) $project['isFavourite'];

    jsonResponse($project, 201);
}

function updateProject($id)
{
    $db = getDB();

    $stmt = $db->prepare('SELECT * FROM projects WHERE id = ?');
    $stmt->execute([$id]);
    $project = $stmt->fetch();

    if (!$project) {
        jsonResponse(['error' => 'Project not found'], 404);
    }

    $title = $_POST['title'] ?? $project['title'];
    $category = $_POST['category'] ?? $project['category'];
    $description = $_POST['description'] ?? $project['description'];
    $technologies = $_POST['technologies'] ?? $project['technologies'];
    $liveLink = $_POST['liveLink'] ?? $project['liveLink'];
    $githubLink = $_POST['githubLink'] ?? $project['githubLink'];

    // Handle image upload
    $imagePath = handleUpload('image');
    if (!$imagePath)
        $imagePath = $project['image'];

    // Handle gallery uploads
    $newGalleryPaths = handleMultipleUploads('gallery');
    $existingGallery = json_decode($project['gallery'], true) ?? [];
    $gallery = array_merge($existingGallery, $newGalleryPaths);

    $stmt = $db->prepare('UPDATE projects SET title=?, category=?, description=?, technologies=?, image=?, gallery=?, liveLink=?, githubLink=? WHERE id=?');
    $stmt->execute([
        $title,
        $category,
        $description,
        is_string($technologies) ? $technologies : json_encode($technologies),
        $imagePath,
        json_encode($gallery),
        $liveLink,
        $githubLink,
        $id
    ]);

    // Return updated project
    $stmt = $db->prepare('SELECT * FROM projects WHERE id = ?');
    $stmt->execute([$id]);
    $project = $stmt->fetch();
    $project['technologies'] = json_decode($project['technologies'], true) ?? [];
    $project['gallery'] = json_decode($project['gallery'], true) ?? [];
    $project['isFavourite'] = (bool) $project['isFavourite'];

    jsonResponse($project);
}

function deleteProject($id)
{
    $db = getDB();

    $stmt = $db->prepare('SELECT * FROM projects WHERE id = ?');
    $stmt->execute([$id]);
    $project = $stmt->fetch();

    if (!$project) {
        jsonResponse(['error' => 'Project not found'], 404);
    }

    $stmt = $db->prepare('DELETE FROM projects WHERE id = ?');
    $stmt->execute([$id]);

    jsonResponse(['message' => 'Project deleted']);
}

function toggleFavourite($id)
{
    $db = getDB();

    $stmt = $db->prepare('SELECT * FROM projects WHERE id = ?');
    $stmt->execute([$id]);
    $project = $stmt->fetch();

    if (!$project) {
        jsonResponse(['error' => 'Project not found'], 404);
    }

    $newValue = $project['isFavourite'] ? 0 : 1;
    $stmt = $db->prepare('UPDATE projects SET isFavourite = ? WHERE id = ?');
    $stmt->execute([$newValue, $id]);

    // Return updated project
    $stmt = $db->prepare('SELECT * FROM projects WHERE id = ?');
    $stmt->execute([$id]);
    $project = $stmt->fetch();
    $project['technologies'] = json_decode($project['technologies'], true) ?? [];
    $project['gallery'] = json_decode($project['gallery'], true) ?? [];
    $project['isFavourite'] = (bool) $project['isFavourite'];

    jsonResponse($project);
}
