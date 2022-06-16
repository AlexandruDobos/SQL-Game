<?php

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
include_once '../config/Database.php';
include_once '../config/Question.php';

$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->username)
) {
  // Instantiate DB & connect
    $database = new Database();
    $conn = $database->connect();
    $q = new Question();

    $challenges = array();

    $stmt = $conn->prepare("SELECT * FROM `challenges` WHERE who_is_provoked = :username ORDER BY time DESC");
    $stmt->bindParam(':username', $data->username);
    $stmt->execute();

    while ($row = $stmt->fetch()) {
        $id = $row['id'];
        $who_provoked = $row['who_provoked'];
        $stake = $row['stake'];
        $time = $row['time'];
        $difficulty = $q->GetQuestionDifficulty($row['id_query']);
        $id_query = $row['id_query'];
        array_push($challenges, array(
            "id" => $id,
            "id_query" => $id_query,
            "who_provoked" => $who_provoked,
            "difficulty" => $difficulty,
            "stake" => $stake,
            "time" => $time
        ));
    }    

    http_response_code(200);
    echo json_encode(array("message" => $challenges));
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Nu exista suficiente date."));
}
