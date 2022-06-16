<?php

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
include_once '../config/Database.php';

$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->question_id)
) {
  // Instantiate DB & connect
    $database = new Database();
    $conn = $database->connect();


    $question_feedbacks = array();

    $stmt = $conn->prepare("SELECT * FROM `feedback_queries` WHERE question_id = :question_id ORDER BY time DESC");
    $stmt->bindParam(':question_id', $data->question_id);
    $stmt->execute();

    while ($row = $stmt->fetch()) {
        $id = $row['feedback_id'];
        $feedback_id = $row['feedback_id'];
        $question_id = $row['question_id'];
        $user_who_send = $row['user_who_send'];
        $feedback = $row['feedback'];
        $time = $row['time'];

        array_push($question_feedbacks, array(
            "id" => $id,
            "feedback_id" => $feedback_id,
            "question_id" => $question_id,
            "user_who_send" => $user_who_send,
            "feedback" => $feedback,
            "time" => $time
        ));
    }    

    http_response_code(200);
    echo json_encode(array("message" => $question_feedbacks));
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Nu exista suficiente date."));
}
