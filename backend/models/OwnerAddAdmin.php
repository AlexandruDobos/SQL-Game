<?php
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');

include_once '../config/User.php';
include_once '../config/Admin.php';
$data = json_decode(file_get_contents("php://input"));

if (!empty($data->username)) {
    $u = new User();
    $a = new Admin();
    if ($a->CheckUsername($data->username) == 1) {
       // $userEmail = $u->extractEmail($data->username);

        $a = new Admin();
        $result = $a->ChangeUserToAdministrator($data->username);
        if ($result == 1) {
            echo json_encode(array("message" => "Acțiune realizată!"));
        } else {
            echo json_encode(array("message" => "A intervenit o eroare!"));
        }
    } else {
        echo json_encode(array("message" => "Username inexistent!"));
    }
}
