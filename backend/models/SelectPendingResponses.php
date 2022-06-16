<?php

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
include_once '../config/Database.php';

// Instantiate DB & connect
$database = new Database();
$conn = $database->connect();

$pending_responses_array = array();
$stmt = $conn->prepare("SELECT * FROM `pending_responses`");
$stmt->execute();
$question = "";
$difficulty = "";
while ($row = $stmt->fetch()) {
    $id = $row['id'];
    $question_id = $row['question_id'];
    $response = $row['response'];
    
    $stmtForExtractQuestion = $conn->prepare("SELECT question, difficulty FROM `training_queries` WHERE id = :question_id");
    $stmtForExtractQuestion->bindParam(":question_id", $question_id);
    $stmtForExtractQuestion->execute();

    while($row2 = $stmtForExtractQuestion->fetch()){
    $question = $row2["question"];
    $difficulty = $row2["difficulty"];
    }


    array_push(
        $pending_responses_array,
        array(
            "id" => $id,
            "question_id" => $question_id,
            "question" => $question,
            "response" => $response,
            "difficulty" => $difficulty
        )
    );
}

echo json_encode(array("message" => $pending_responses_array));
