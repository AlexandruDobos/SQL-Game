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
$stmt = $conn->prepare("SELECT max(id) AS max_id, count(*) AS nr_questions FROM `hard_queries`");
$stmt->execute();

while ($row = $stmt->fetch()) {
    $max_id = $row['max_id'];
    $nr_questions = $row['nr_questions'];
}


//daca avem macar 10 intrebari
if ($nr_questions > 3) {
    //echo $nr_questions;

    //initializam un vector care sa contina id-urile intrebarilor deja selectate
    $used_id = array();
    //initializam un vector care sa contina datele intrebarilor
    $hard_questions_array = array();
    //cat timp used_id nu are 10 elemente continuam

    while (count($used_id) < 3) {


        $question_id = 0;
        $semaphore = false;
        while (!$semaphore) {
            $question_id = rand(1, $max_id);

            $stmt = $conn->prepare("SELECT id FROM `hard_queries` WHERE id = '$question_id'");
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

        $stmt = $conn->prepare("SELECT * FROM `hard_queries` WHERE id = '$question_id'");
        $stmt->execute();

        while ($row = $stmt->fetch()) {
            $id = $row['id'];
            $question = $row['question'];
            $response = $row['response'];
        }

        array_push($hard_questions_array, array(
            "id" => $id,
            "question" => $question,
            "response" => $response
        ));
    }

    echo json_encode(array("message" => $hard_questions_array));
} else {
    echo json_encode(array("message" => "Nu exista intrebari."));
}
