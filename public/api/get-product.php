<?php
// Allow cross-origin requests and return JSON
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Get product ID from query parameter
$productId = $_GET['id'] ?? null;

if (!$productId) {
    echo json_encode(["error" => "Missing product ID"]);
    exit;
}

// Database connection credentials
$host = 'localhost';         // your database host
$db = 'your_database_name';  // your database name
$user = 'your_db_user';      // your database username
$pass = 'your_db_password';  // your database password

try {
    // Create DB connection
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Prepare and execute the SQL query
    $stmt = $pdo->prepare("SELECT * FROM products WHERE id = :id OR sku = :id");
    $stmt->execute(['id' => $productId]);

    // Fetch the result
    $product = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($product) {
        echo json_encode($product);
    } else {
        echo json_encode(["error" => "Product not found"]);
    }

} catch (PDOException $e) {
    echo json_encode(["error" => "Database connection failed: " . $e->getMessage()]);
}
?>
