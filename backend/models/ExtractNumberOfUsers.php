<?php
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');

include_once '../config/Admin.php';
$data = json_decode(file_get_contents("php://input"));

$u = new Admin();
$numberOfUsers = $u->selectNumberOfUsers();
http_response_code(200);
echo json_encode(array("message" => $numberOfUsers));
