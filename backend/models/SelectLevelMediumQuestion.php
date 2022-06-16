<?php

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
include_once '../config/Database.php';

// Instantiate DB & connect
$database = new Database();
$conn = $database->connect();

//aflam id-ul maxim al unei intrebari din baza de date
$stmt = $conn->prepare("SELECT max(id) AS max_id, count(*) AS nr_questions FROM `medium_queries`");
$stmt->execute();

while ($row = $stmt->fetch()) {
    $max_id = $row['max_id'];
    $nr_questions = $row['nr_questions'];
}


//daca avem macar 10 intrebari
if ($nr_questions > 10) {
    //echo $nr_questions;

    //initializam un vector care sa contina id-urile intrebarilor deja selectate
    $used_id = array();
    //initializam un vector care sa contina datele intrebarilor
    $easy_questions_array = array();
    //cat timp used_id nu are 10 elemente continuam

    while (count($used_id) < 10) {


        $question_id = 0;
        $semaphore = false;
        while (!$semaphore) {
            $question_id = rand(1, $max_id);

            $stmt = $conn->prepare("SELECT id FROM `medium_queries` WHERE id = '$question_id'");
            $stmt->execute();

            while ($row = $stmt->fetch()) {
                if ($row['id'] == $question_id) {
                    if (!in_array($question_id, $used_id)) {
                        $semaphore = true;
                        array_push($used_id, $question_id);
                    }
                }
            }
        }

        $stmt = $conn->prepare("SELECT * FROM `medium_queries` WHERE id = '$question_id'");
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

        array_push($easy_questions_array, array(
            "id" => $id,
            "question" => $question,
            "var_1" => $var_1,
            "var_2" => $var_2,
            "var_3" => $var_3,
            "var_4" => $var_4,
            "correct_answer" => $correct_answer
        ));
    }

    echo json_encode(array("message" => $easy_questions_array));
} else {
    echo json_encode(array("message" => "Nu exista intrebari."));
}
