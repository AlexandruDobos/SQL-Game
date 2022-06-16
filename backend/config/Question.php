<?php

include_once '../config/Database.php';

class Question
{
    public function GetQuestionDifficulty($question_id)
    {

        // Instantiate DB & connect
        $database = new Database();
        $conn = $database->connect();

        $stmt = $conn->prepare("SELECT difficulty FROM training_queries WHERE id = :question_id");
        $stmt->bindParam(":question_id", $question_id);
        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        $difficulty = $result["difficulty"];
        return $difficulty;
    }

    public function DeleteChallenge($id){
        // Instantiate DB & connect
        $database = new Database();
        $conn = $database->connect();

        $stmt = $conn->prepare("DELETE FROM `challenges` WHERE id = :id");
        $stmt->bindParam(":id", $id);
        $stmt->execute();
    }

    public function CheckIfResponseIsForAMediumQuestion($response, $user_response, $id_training_queries){
        // Instantiate DB & connect
        $database = new Database();
        $conn = $database->connect();

        $stmt = $conn->prepare("SELECT response, id_training_queries FROM `training_queries_responses` WHERE response = :response");
        $stmt->bindParam(":response", $response);
        $stmt->execute();

        while ($row = $stmt->fetch()) {
            //iau id-ul raspunsului
            $id_training_queries = $row["id_training_queries"];
            //verific daca apartine unei intrebari de tip medium
            $stmt2 = $conn->prepare("SELECT difficulty FROM `training_queries` WHERE id = :id_training_queries");
            $stmt2->bindParam(":id_training_queries", $id_training_queries);
            $stmt2->execute();

            $result = $stmt2->fetch(PDO::FETCH_ASSOC);

            $difficulty = $result["difficulty"];
            //inseamna ca raspunsul nostru corect de la hard este si un raspuns corect pentru o intrebare de tip medium
            //si o sa adaugam raspunsul gresit pentru intrebarea de tip medium in tabela pending_responses
            if($difficulty == "medium"){
                $stmt3 = $conn->prepare("INSERT INTO `pending_responses` (`question_id`, `response`) VALUES ('$id_training_queries','$user_response')");
                $stmt3->execute();
            }

        } 
    }
}
