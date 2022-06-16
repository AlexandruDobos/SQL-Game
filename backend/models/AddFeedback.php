<?php
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');

include_once '../config/User.php';
$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->question_id) &&
    !empty($data->user_who_send) &&
    !empty($data->feedback) &&
    !empty($data->time)
) {
    $u = new User();
    $result = $u->addFeedback($data->question_id, $data->user_who_send, $data->feedback, $data->time);

    if ($result == 1) {
        http_response_code(200);
        echo json_encode(array("message" => "Actiune reusita!"));
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Actiune esuata! Probleme cu executarea interogarii!"));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Actiune esuata! Nu sunt date suficiente!"));
}
