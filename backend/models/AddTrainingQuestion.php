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
    !empty($data->question) &&
    !empty($data->difficulty) &&
    !empty($data->var_1) &&
    !empty($data->var_2) &&
    !empty($data->var_3) &&
    !empty($data->var_4) &&
    !empty($data->var_correct)
) {
    $u = new User();
    if ($u->addTrainingQuestion($data->email, $data->username, $data->question, $data->difficulty, $data->var_1, $data->var_2,$data->var_3,$data->var_4,$data->var_correct) == 1) {
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
