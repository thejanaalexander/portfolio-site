<?php
// Testimonials CRUD Handler

function getAllTestimonials()
{
    $db = getDB();
    $stmt = $db->query('SELECT * FROM testimonials ORDER BY createdAt DESC');
    jsonResponse($stmt->fetchAll());
}

function createTestimonial()
{
    $db = getDB();

    $name = $_POST['name'] ?? '';
    $role = $_POST['role'] ?? '';
    $text = $_POST['text'] ?? '';
    $rating = $_POST['rating'] ?? 5;

    $imagePath = handleUpload('image');

    $stmt = $db->prepare('INSERT INTO testimonials (name, role, text, rating, image) VALUES (?, ?, ?, ?, ?)');
    $stmt->execute([$name, $role, $text, (int) $rating, $imagePath]);

    $id = $db->lastInsertId();
    $stmt = $db->prepare('SELECT * FROM testimonials WHERE id = ?');
    $stmt->execute([$id]);

    jsonResponse($stmt->fetch(), 201);
}

function updateTestimonial($id)
{
    $db = getDB();

    $stmt = $db->prepare('SELECT * FROM testimonials WHERE id = ?');
    $stmt->execute([$id]);
    $testimonial = $stmt->fetch();

    if (!$testimonial) {
        jsonResponse(['error' => 'Testimonial not found'], 404);
    }

    $name = $_POST['name'] ?? $testimonial['name'];
    $role = $_POST['role'] ?? $testimonial['role'];
    $text = $_POST['text'] ?? $testimonial['text'];
    $rating = $_POST['rating'] ?? $testimonial['rating'];

    $imagePath = handleUpload('image');
    if (!$imagePath)
        $imagePath = $testimonial['image'];

    $stmt = $db->prepare('UPDATE testimonials SET name=?, role=?, text=?, rating=?, image=? WHERE id=?');
    $stmt->execute([$name, $role, $text, (int) $rating, $imagePath, $id]);

    $stmt = $db->prepare('SELECT * FROM testimonials WHERE id = ?');
    $stmt->execute([$id]);

    jsonResponse($stmt->fetch());
}

function deleteTestimonial($id)
{
    $db = getDB();

    $stmt = $db->prepare('SELECT * FROM testimonials WHERE id = ?');
    $stmt->execute([$id]);

    if (!$stmt->fetch()) {
        jsonResponse(['error' => 'Testimonial not found'], 404);
    }

    $stmt = $db->prepare('DELETE FROM testimonials WHERE id = ?');
    $stmt->execute([$id]);

    jsonResponse(['message' => 'Testimonial deleted']);
}
