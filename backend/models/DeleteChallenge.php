<?php
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');

include_once '../config/Question.php';
$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->id)
) {
    $q = new Question();
    $result = $q->DeleteChallenge($data->id);
    echo json_encode(array("message" => "Challenge sters!"));
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Actiune esuata! Nu sunt date suficiente!"));
}
