<?php
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');

include_once '../config/Admin.php';

$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->question_id)
) {
    $u = new Admin();
    if ($u->deletePendingTrainingQuestion($data->question_id) == 1) {
        http_response_code(200);
        echo json_encode(array("message" => "Training question deleted."));
    }
    else {
        http_response_code(500);
        echo json_encode(array("message" => "Internal Server Error"));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to delete training question, need more data."));
}
