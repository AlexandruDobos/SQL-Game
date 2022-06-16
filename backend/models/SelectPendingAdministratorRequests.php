<?php

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
include_once '../config/Database.php';

// Instantiate DB & connect
$database = new Database();
$conn = $database->connect();

$pending_request_array = array();
$stmt = $conn->prepare("SELECT * FROM `pending_grades`");
$stmt->execute();

while ($row = $stmt->fetch()) {
    $id = $row['id'];
    $username = $row['username'];
    $email = $row['email'];
    $who_proposed_username = $row['who_proposed_username'];
    $who_proposed_email = $row['who_proposed_email'];
    $specifications = $row['specifications'];

    array_push(
        $pending_request_array,
        array(
            "id" => $id,
            "username" => $username,
            "email" => $email,
            "who_proposed_username" => $who_proposed_username,
            "who_proposed_email" => $who_proposed_email,
            "specifications" => $specifications
        )
    );
}


echo json_encode(array("message" => $pending_request_array));
