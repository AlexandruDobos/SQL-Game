<?php

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
include_once '../config/Database.php';

// Instantiate DB & connect
$database = new Database();
$conn = $database->connect();


$stmt = $conn->prepare("SELECT max(id) AS nr_questions FROM `training_queries`");
$stmt->execute();

while ($row = $stmt->fetch()) {
    $nr_questions = $row['nr_questions'];
}

if ($nr_questions > 0) {
    //echo $nr_questions;

    $question_id = 0;
    $semaphore = false;
    while (!$semaphore) {
        $question_id = rand(1, $nr_questions);

        $stmt = $conn->prepare("SELECT id FROM `training_queries` WHERE id = '$question_id'");
        $stmt->execute();

        while ($row = $stmt->fetch()) {
            if ($row['id'] == $question_id) {
                $semaphore = true;
            }
        }
    }

    $stmt = $conn->prepare("SELECT * FROM `training_queries` WHERE id = '$question_id'");
    $stmt->execute();

    while ($row = $stmt->fetch()) {
        $id = $row['id'];
        $question = $row['question'];
        $var_1 = $row['var_1'];
        $var_2 = $row['var_2'];
        $var_3 = $row['var_3'];
        $var_4 = $row['var_4'];
        $correct_answer = $row['correct_answer'];
    }

    echo json_encode(array(
        "id" => $id,
        "question" => $question,
        "var_1" => $var_1,
        "var_2" => $var_2,
        "var_3" => $var_3,
        "var_4" => $var_4,
        "correct_answer" => $correct_answer
    ));
} else {
    echo json_encode(array("message" => "Nu exista intrebari."));
}