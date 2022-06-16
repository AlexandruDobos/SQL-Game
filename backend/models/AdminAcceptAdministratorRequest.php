<?php
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');

include_once '../config/Admin.php';
$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->request_id)
) {
    $a = new Admin();
    if($a->AcceptAdministratorRequest($data->request_id) == 1){
        http_response_code(200);
    echo json_encode(array("message" => "Actiune realizata!"));
    }else{
        http_response_code(400);
    echo json_encode(array("message" => "Actiune nerealizata!"));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Insuficiente date pentru a executa interogarea!"));
}
