<?php
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');

include_once '../config/User.php';
include_once '../config/Admin.php';
$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->username) &&
    !empty($data->who_proposed_username) &&
    !empty($data->who_proposed_email) &&
    !empty($data->specifications)
) {
    $u = new User();
    $result = $u->CheckUsername($data->username);
    if ($result != 0) {
        $a = new Admin();
        $userEmail = $u->ExtractEmail($data->username);
        if ($a->CheckIfUserRequestAlreadyExists($userEmail, $data->who_proposed_email) == 0) {

            $result = $a->addAdministratorRequest($data->username, $userEmail, $data->who_proposed_username, $data->who_proposed_email, $data->specifications);

            if ($result == 1) {
                http_response_code(200);
                echo json_encode(array("message" => "Actiune realizata!"));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Ai propus deja acest administrator!"));
        }
    } else {

        http_response_code(400);
        echo json_encode(array("message" => "Username inexistent!"));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Actiune nerealizata! Probleme cu executarea interogarii!"));
}
