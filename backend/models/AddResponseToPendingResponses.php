<?php
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');

include_once '../config/Question.php';

$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->correct_answer) &&
    !empty($data->user_response) &&
    !empty($data->question_id_from_training_queries)
) {

    //verific daca raspunsul existent in responses_training_queries apartine unei intrebari de tip medium
    //daca da, fac ce trebuie
    //daca nu, nimic
    $q = new Question();
    $q->CheckIfResponseIsForAMediumQuestion($data->correct_answer, $data->user_response, $data->question_id_from_training_queries);
    http_response_code(200);
    echo json_encode(array("message" => "Checked successful!"));
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to add response to pending responses, need more data."));
}
