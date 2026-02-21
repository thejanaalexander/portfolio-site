<?php
// Messages (Contact Form) Handler

function createMessage()
{
    $db = getDB();
    $body = getJsonBody();

    $name = $body['name'] ?? '';
    $email = $body['email'] ?? '';
    $mobile = $body['mobile'] ?? '';
    $message = $body['message'] ?? '';

    if (empty($name) || empty($email) || empty($message)) {
        jsonResponse(['error' => 'Name, email, and message are required'], 400);
    }

    $stmt = $db->prepare('INSERT INTO messages (name, email, mobile, message) VALUES (?, ?, ?, ?)');
    $stmt->execute([$name, $email, $mobile, $message]);

    $id = $db->lastInsertId();
    $stmt = $db->prepare('SELECT * FROM messages WHERE id = ?');
    $stmt->execute([$id]);

    jsonResponse($stmt->fetch(), 201);
}

function getAllMessages()
{
    $db = getDB();
    $stmt = $db->query('SELECT * FROM messages ORDER BY createdAt DESC');
    jsonResponse($stmt->fetchAll());
}

function deleteMessage($id)
{
    $db = getDB();

    $stmt = $db->prepare('SELECT * FROM messages WHERE id = ?');
    $stmt->execute([$id]);

    if (!$stmt->fetch()) {
        jsonResponse(['error' => 'Message not found'], 404);
    }

    $stmt = $db->prepare('DELETE FROM messages WHERE id = ?');
    $stmt->execute([$id]);

    jsonResponse(['message' => 'Message deleted']);
}
