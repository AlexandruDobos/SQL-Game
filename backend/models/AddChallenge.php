<?php
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');

include_once '../config/User.php';
$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->id_query) &&
    !empty($data->who_is_provoked) &&
    !empty($data->who_provoked) &&
    !empty($data->stake) &&
    !empty($data->time)
) {
    $u = new User();
    $resultUserExist = $u->CheckUsername($data->who_is_provoked);
    if ($resultUserExist == 1) {
        $resultInsert = $u->AddChallenge($data->id_query, $data->who_is_provoked, $data->who_provoked, $data->stake, $data->time);
        if ($resultInsert == 1) {
            http_response_code(200);
            echo json_encode(array("message" => "Challenge trimis!"));
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Actiune esuata!"));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Username inexistent!"));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Actiune esuata! Nu sunt date suficiente!"));
}
