<?php
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');

include_once '../config/User.php';


$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->email) &&
    !empty($data->newPassword)
) {
    $u = new User();
    
    $result = $u->ForgotPassowrd($data->email,$data->newPassword);

    if ($result == 1) {
        http_response_code(200);
        echo json_encode(array("message" => "Parola actualizata."));

    } else {
        if ($result == -1) {
            http_response_code(400);
            echo json_encode(array("message" => "Email incorect"));
        }
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Nu sunt date suficiente."));
}
