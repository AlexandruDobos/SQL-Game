<?php

include_once '../config/Database.php';

class Admin
{
    public function ConfirmPendingEasyMediumTrainingQuestion($question, $difficulty, $var_1, $var_2, $var_3, $var_4, $correct_answer)
    {
        try {
            // Instantiate DB & connect
            $database = new Database();
            $conn = $database->connect();

            // prepare query
            $stmt = $conn->prepare('INSERT INTO training_queries (question, difficulty, number_of_solve) VALUES (:question,:difficulty, 0)');
            $stmt->bindParam(':question', $question);
            $stmt->bindParam(':difficulty', $difficulty);
            // execute
            $stmt->execute();

            // prepare query
            $stmt = $conn->prepare('SELECT MAX(id) AS id_max FROM training_queries');
            // execute
            $stmt->execute();

            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            $id = $result["id_max"];

            // prepare query
            if ($correct_answer == "var_1") {
                $stmt = $conn->prepare('INSERT INTO training_queries_responses (id_training_queries, response, is_correct) VALUES (:id_training_queries,:response, 1)');
            } else {
                $stmt = $conn->prepare('INSERT INTO training_queries_responses (id_training_queries, response, is_correct) VALUES (:id_training_queries,:response, 0)');
            }
            $stmt->bindParam(':id_training_queries', $id);
            $stmt->bindParam(':response', $var_1);
            // execute
            $stmt->execute();

            // prepare query
            if ($correct_answer == "var_2") {
                $stmt = $conn->prepare('INSERT INTO training_queries_responses (id_training_queries, response, is_correct) VALUES (:id_training_queries,:response, 1)');
            } else {
                $stmt = $conn->prepare('INSERT INTO training_queries_responses (id_training_queries, response, is_correct) VALUES (:id_training_queries,:response, 0)');
            }
            $stmt->bindParam(':id_training_queries', $id);
            $stmt->bindParam(':response', $var_2);
            // execute
            $stmt->execute();

            // prepare query
            if ($correct_answer == "var_3") {
                $stmt = $conn->prepare('INSERT INTO training_queries_responses (id_training_queries, response, is_correct) VALUES (:id_training_queries,:response, 1)');
            } else {
                $stmt = $conn->prepare('INSERT INTO training_queries_responses (id_training_queries, response, is_correct) VALUES (:id_training_queries,:response, 0)');
            }
            $stmt->bindParam(':id_training_queries', $id);
            $stmt->bindParam(':response', $var_3);
            // execute
            $stmt->execute();

            // prepare query
            if ($correct_answer == "var_4") {
                $stmt = $conn->prepare('INSERT INTO training_queries_responses (id_training_queries, response, is_correct) VALUES (:id_training_queries,:response, 1)');
            } else {
                $stmt = $conn->prepare('INSERT INTO training_queries_responses (id_training_queries, response, is_correct) VALUES (:id_training_queries,:response, 0)');
            }
            $stmt->bindParam(':id_training_queries', $id);
            $stmt->bindParam(':response', $var_4);
            // execute
            $stmt->execute();
        } catch (Exception $e) {
            return 0;
        }

        return 1;
    }

    public function ConfirmPendingHardTrainingQuestion($question, $difficulty, $correct_answer)
    {
        try {
            // Instantiate DB & connect
            $database = new Database();
            $conn = $database->connect();

            // prepare query
            $stmt = $conn->prepare('INSERT INTO training_queries (question, difficulty, number_of_solve) VALUES (:question,:difficulty, 0)');
            $stmt->bindParam(':question', $question);
            $stmt->bindParam(':difficulty', $difficulty);
            // execute
            $stmt->execute();

            // prepare query
            $stmt = $conn->prepare('SELECT MAX(id) AS id_max FROM training_queries');
            // execute
            $stmt->execute();

            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            $id = $result["id_max"];

            $stmt = $conn->prepare('INSERT INTO training_queries_responses (id_training_queries, response, is_correct) VALUES (:id_training_queries,:response, 0)');
            $stmt->bindParam(':id_training_queries', $id);
            $stmt->bindParam(':response', $correct_answer);
            // execute
            $stmt->execute();
        } catch (Exception $e) {
            return 0;
        }

        return 1;
    }

    public function deletePendingTrainingQuestion($question_id)
    {
        try {
            // Instantiate DB & connect
            $database = new Database();
            $conn = $database->connect();

            // prepare query
            $stmt = $conn->prepare('DELETE FROM `pending_queries` WHERE id = :question_id');
            $stmt->bindParam(':question_id', $question_id);
            // execute
            $stmt->execute();
        } catch (Exception $e) {
            return 0;
        }

        return 1;
    }

    public function selectNumberOfUsers()
    {
        // Instantiate DB & connect
        $database = new Database();
        $conn = $database->connect();

        // verificam daca exista mail-ul in baza de date
        $stmt = $conn->prepare("SELECT count(*) as numberOfUsers FROM registration");
        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        $numberOfUsers = $result["numberOfUsers"];
        return $numberOfUsers;
    }

    public function selectFirstUsers()
    {
        // Instantiate DB & connect
        $database = new Database();
        $conn = $database->connect();

        $queries_array = array();

        // verificam daca exista mail-ul in baza de date
        $stmt = $conn->prepare("SELECT id, username, points FROM `registration` ORDER BY points DESC LIMIT 10");
        $stmt->execute();

        while ($row = $stmt->fetch()) {
            $id = $row['id'];
            $username = $row['username'];
            $points = $row['points'];


            array_push(
                $queries_array,
                array(
                    "id" => $id,
                    "username" => $username,
                    "points" => $points
                )
            );
        }

        return $queries_array;
    }

    public function addUserPoints($email, $numberOfPoints)
    {
        // Instantiate DB & connect
        $database = new Database();
        $conn = $database->connect();

        // verificam daca exista mail-ul in baza de date
        $stmt = $conn->prepare("SELECT count(*) FROM registration WHERE email = '$email'");
        $stmt->execute();
        if ($stmt->fetchColumn() != 1) {
            //nu exista mail-ul
            return -1;
        } else {
            // prepare query
            $stmt = $conn->prepare("UPDATE `registration` SET `points`=`points`+:numberOfPoints WHERE email = :email");
            $stmt->bindParam('numberOfPoints', $numberOfPoints);
            $stmt->bindParam(':email', $email);
            //execute
            $stmt->execute();

            // prepare query
            $stmt = $conn->prepare("SELECT points from registration WHERE email = :email");
            $stmt->bindParam(':email', $email);
            //execute
            $stmt->execute();

            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            $points = $result["points"];
            return $points;
        }
    }

    public function selectGrade($email)
    {
        // Instantiate DB & connect
        $database = new Database();
        $conn = $database->connect();

        // verificam daca exista mail-ul in baza de date
        $stmt = $conn->prepare("SELECT grade as userGrade FROM registration WHERE email = :email");
        $stmt->bindParam(':email', $email);
        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        $userGrade = $result["userGrade"];
        return $userGrade;
    }

    public function CheckIfUserRequestAlreadyExists($email, $who_proposed_email)
    {
        // Instantiate DB & connect
        $database = new Database();
        $conn = $database->connect();

        $stmt = $conn->prepare("SELECT COUNT(*) as exist FROM pending_grades WHERE email = :email AND who_proposed_email = :who_proposed_email");
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':who_proposed_email', $who_proposed_email);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        $exist = $result["exist"];

        if ($exist == 1) {
            return 1;
        } else {
            return 0;
        }
    }

    public function addAdministratorRequest($username, $email, $who_proposed_username, $who_proposed_email, $specifications)
    {

        // Instantiate DB & connect
        $database = new Database();
        $conn = $database->connect();
        $sem = 1;
        try {
            // prepare query
            $stmt = $conn->prepare('INSERT INTO pending_grades (username, email, who_proposed_username, who_proposed_email, specifications) VALUES (:username,:email,:who_proposed_username,:who_proposed_email,:specifications)');
            $stmt->bindParam(':username', $username);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':who_proposed_username', $who_proposed_username);
            $stmt->bindParam(':who_proposed_email', $who_proposed_email);
            $stmt->bindParam(':specifications', $specifications);
            // execute
            $stmt->execute();
        } catch (Exception $e) {
            $sem = 0;
        }
        if ($sem == 1) {
            return 1;
        } else {
            return 0;
        }
    }

    public function CheckUsername($username)
    {
        // Instantiate DB & connect
        $database = new Database();
        $conn = $database->connect();
        $sem = 1;
        try {
            $stmt = $conn->prepare("SELECT count(*) as exist FROM registration WHERE username = :username ");
            $stmt->bindParam(':username', $username);
            $stmt->execute();

            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            $exist = $result["exist"];

            if ($exist == 1) {
                return 1;
            } else {
                return 0;
            }
        } catch (Exception $e) {
            $sem = 0;
        }
        return $sem;
    }

    public function ChangeUserToAdministrator($username)
    {
        // Instantiate DB & connect
        $database = new Database();
        $conn = $database->connect();
        $sem = 1;
        try {
            // prepare query
            $stmt = $conn->prepare("UPDATE `registration` SET `is_admin`='1', `grade`='administrator' WHERE username = '$username'");
            //$stmt->bindParam(':username', $username);
            //execute
            $stmt->execute();
        } catch (Exception $e) {
            $sem = 0;
        }
        return $sem;
    }

    public function AcceptAdministratorRequest($id)
    {

        // Instantiate DB & connect
        $database = new Database();
        $conn = $database->connect();
        $sem = 1;
        try {
            // prepare query
            $stmt = $conn->prepare('SELECT email FROM `pending_grades` WHERE id = :id');
            $stmt->bindParam(':id', $id);
            // execute
            $stmt->execute();

            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            $userEmail = $result["email"];

            // prepare query
            $stmt = $conn->prepare("UPDATE `registration` SET `is_admin`='1', `grade`='administrator' WHERE email = :email");
            $stmt->bindParam(':email', $userEmail);
            // execute
            $stmt->execute();

            // prepare query
            $stmt = $conn->prepare('DELETE FROM `pending_grades` WHERE id = :id');
            $stmt->bindParam(':id', $id);
            // execute
            $stmt->execute();
        } catch (Exception $e) {
            $sem = 0;
        }
        if ($sem == 1) {
            return 1;
        } else {
            return 0;
        }
    }

    public function DeleteAdministratorRequest($id)
    {

        // Instantiate DB & connect
        $database = new Database();
        $conn = $database->connect();
        $sem = 1;
        try {
            // prepare query
            $stmt = $conn->prepare('DELETE FROM `pending_grades` WHERE id = :id');
            $stmt->bindParam(':id', $id);
            // execute
            $stmt->execute();
        } catch (Exception $e) {
            $sem = 0;
        }
        if ($sem == 1) {
            return 1;
        } else {
            return 0;
        }
    }

    public function addCountReplyForQuestion($question_id)
    {
        // Instantiate DB & connect
        $database = new Database();
        $conn = $database->connect();
        $sem = 1;
        try {
            // prepare query
            $stmt = $conn->prepare('UPDATE `training_queries` SET `number_of_solve`=`number_of_solve`+1 WHERE id = :question_id');
            $stmt->bindParam(':question_id', $question_id);
            // execute
            $stmt->execute();
        } catch (Exception $e) {
            $sem = 0;
        }
        if ($sem == 1) {
            return 1;
        } else {
            return 0;
        }
    }

    public function AcceptPendingResponse($id)
    {
        // Instantiate DB & connect
        $database = new Database();
        $conn = $database->connect();
        $sem = 1;
        try {
            // prepare query
            $stmt = $conn->prepare('SELECT * FROM `pending_responses` WHERE id = :id');
            $stmt->bindParam(':id', $id);
            // execute
            $stmt->execute();

            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            $question_id = $result["question_id"];
            $response = $result["response"];

            $stmt = $conn->prepare("INSERT INTO `training_queries_responses` (id_training_queries, response, is_correct) VALUES ('$question_id','$response','0')");
            $stmt->execute();
        } catch (Exception $e) {
            $sem = 0;
        }
        if ($sem == 1) {
            return 1;
        } else {
            return 0;
        }
    }

    public function DeletePendingResponse($id)
    {
        // Instantiate DB & connect
        $database = new Database();
        $conn = $database->connect();
        $sem = 1;
        try {
            // prepare query
            $stmt = $conn->prepare('DELETE FROM `pending_responses` WHERE id = :id');
            $stmt->bindParam(':id', $id);
            // execute
            $stmt->execute();
        } catch (Exception $e) {
            $sem = 0;
        }
        if ($sem == 1) {
            return 1;
        } else {
            return 0;
        }
    }
}
