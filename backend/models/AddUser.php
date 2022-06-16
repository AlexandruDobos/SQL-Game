<?php
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');

include_once '../config/User.php';

$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->first_name) &&
    !empty($data->last_name) &&
    !empty($data->username) &&
    !empty($data->email) &&
    !empty($data->password)
) {
    $u = new User();
    $result = $u->adaugaUtilizator($data->first_name, $data->last_name, $data->username, $data->email, $data->password);
    if ($result == 1) {
        http_response_code(200);
        echo json_encode(array("message" => "User added."));
    } elseif ($result == 2) {
        http_response_code(400);
        echo json_encode(array("message" => "Email taken. Choose another one"));
    } elseif ($result == 3){
        http_response_code(400);
        echo json_encode(array("message" => "Username taken. Choose another one"));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to create user, need more data."));
}
