<?php
// Analytics Handler

function getAnalytics()
{
    $db = getDB();

    $projectCount = $db->query('SELECT COUNT(*) FROM projects')->fetchColumn();
    $testimonialCount = $db->query('SELECT COUNT(*) FROM testimonials')->fetchColumn();
    $messageCount = $db->query('SELECT COUNT(*) FROM messages')->fetchColumn();
    $favouriteCount = $db->query('SELECT COUNT(*) FROM projects WHERE isFavourite = 1')->fetchColumn();

    // Recent messages (last 5)
    $recentMessages = $db->query('SELECT id, name, email, message, createdAt FROM messages ORDER BY createdAt DESC LIMIT 5')->fetchAll();

    // Projects by category
    $categories = $db->query('SELECT category, COUNT(*) as count FROM projects GROUP BY category ORDER BY count DESC')->fetchAll();

    jsonResponse([
        'totalProjects' => (int) $projectCount,
        'totalTestimonials' => (int) $testimonialCount,
        'totalMessages' => (int) $messageCount,
        'totalFavourites' => (int) $favouriteCount,
        'recentMessages' => $recentMessages,
        'projectsByCategory' => $categories
    ]);
}
