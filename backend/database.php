<?php
require_once 'config.php';

try {
    // DSN (Data Source Name)
    $dsn = "mysql:host=$servername;port=$port;dbname=$dbname;charset=utf8mb4";

    // Create PDO instance
    $pdo = new PDO($dsn, $username, $password);

    // Set PDO error mode to exception
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    // echo "Connected successfully"; 
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}
?>