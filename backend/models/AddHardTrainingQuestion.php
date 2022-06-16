<?php
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');

include_once '../config/User.php';

$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->email) &&
    !empty($data->username) &&
    !empty($data->difficulty) &&
    !empty($data->question) &&
    !empty($data->var_correct)
) {
    $u = new User();
    if ($u->addHardTrainingQuestion($data->email, $data->username, $data->difficulty, $data->question, $data->var_correct) == 1) {
        http_response_code(200);
        echo json_encode(array("message" => "Training question added."));
    }
    else {
        http_response_code(400);
        echo json_encode(array("message" => "Error!"));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to add training question, need more data."));
}
