<?php

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
include_once '../config/Database.php';

// Instantiate DB & connect
$database = new Database();
$conn = $database->connect();


$stmt = $conn->prepare("SELECT count(*) AS nr_questions FROM `pending_queries` WHERE is_checked = '0'");
$stmt->execute();

while ($row = $stmt->fetch()) {
    $nr_questions = $row['nr_questions'];
}

if ($nr_questions > 0) {
    //echo $nr_questions;

    $queries_array = array();
    $stmt = $conn->prepare("SELECT * FROM `pending_queries`");
    $stmt->execute();

    while ($row = $stmt->fetch()) {
        $id = $row['id'];
        $question = $row['question'];
        $difficulty = $row['difficulty'];
        $var_1 = $row['var_1'];
        $var_2 = $row['var_2'];
        $var_3 = $row['var_3'];
        $var_4 = $row['var_4'];
        $correct_answer = $row['correct_answer'];
        $user = $row['user'];
        $email = $row['email'];

        array_push($queries_array,
        array(
            "id" => $id,
            "question" => $question,
            "difficulty" => $difficulty,
            "var1" => $var_1,
            "var2" => $var_2,
            "var3" => $var_3,
            "var4" => $var_4,
            "varcorrect" => $correct_answer,
            "user" => $user,
            "email" => $email
        ) );
    }

    echo json_encode(array("message" => $queries_array));
} else {
    echo json_encode(array("message" => array()));
}

