<?php

include_once '../config/Database.php';

class User
{

    public function adaugaUtilizator($first_name, $last_name, $username, $email, $password)
    {

        // Instantiate DB & connect
        $database = new Database();
        $conn = $database->connect();

        // hash la parola
        $hashPassword = password_hash($password, PASSWORD_BCRYPT);

        // verificam daca exista username-ul in baza de date
        $stmt = $conn->prepare("SELECT count(*) FROM registration WHERE username = '$username'");
        $stmt->execute();

        if ($stmt->fetchColumn() != 1) {
            // verificam daca exista mail-ul in baza de date
            $stmt = $conn->prepare("SELECT count(*) FROM registration WHERE email = '$email'");
            $stmt->execute();
            // nu exista mailul
            if ($stmt->fetchColumn() != 1) {

                // prepare query
                $stmt = $conn->prepare('INSERT INTO registration (first_name, last_name, username, email, password) VALUES (:first_name,:last_name, :username, :email,:password)');
                $stmt->bindParam(':first_name', $first_name);
                $stmt->bindParam(':last_name', $last_name);
                $stmt->bindParam(':username', $username);
                $stmt->bindParam(':email', $email);
                $stmt->bindParam(':password', $hashPassword);
                // execute
                $stmt->execute();

                $stmt = $conn->prepare('SELECT MAX(id) AS maximum FROM registration');
                $stmt->execute();

                $result = $stmt->fetch(PDO::FETCH_ASSOC);

                $max = $result["maximum"];

                $stmt = $conn->prepare("INSERT INTO users_stats (id_user, account_created_at, date_last_action, last_action) VALUES ('$max', sysdate(), sysdate(), 'Creare cont')");
                $stmt->execute();
                // return 1: totul este ok
                return 1;
            }
            //exista mailul
            else {
                return 2;
            }
        } else {
            return 3;
        }
    }

    public function logareUtilizator($email, $password)
    {

        // Instantiate DB & connect
        $database = new Database();
        $conn = $database->connect();

        // prepare query
        $stmt = $conn->prepare("SELECT password, is_confirmed from registration WHERE email = :email");
        $stmt->bindParam(':email', $email);
        //execute
        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        $hashPassword = $result["password"];

        if (password_verify($password, $hashPassword)) {
            if ($result["is_confirmed"] == 1) {

                $stmt = $conn->prepare('SELECT id AS userId FROM registration WHERE email = :email');
                $stmt->bindParam(":email", $email);
                $stmt->execute();

                $result = $stmt->fetch(PDO::FETCH_ASSOC);

                $userId = $result["userId"];

                $stmt = $conn->prepare("UPDATE users_stats SET date_last_action = sysdate(), last_action = 'Login' WHERE id_user = '$userId'");
                $stmt->execute();

                return 1;
            } else {
                return 2;
            }
        }



        return 0;
    }

    public function checkIfItIsAdmin($email)
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
            $stmt = $conn->prepare("SELECT is_admin from registration WHERE email = :email");
            $stmt->bindParam(':email', $email);
            //execute
            $stmt->execute();

            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            $is_admin = $result["is_admin"];
            return $is_admin;
        }
    }

    public function extractUsername($email)
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
            $stmt = $conn->prepare("SELECT username from registration WHERE email = :email");
            $stmt->bindParam(':email', $email);
            //execute
            $stmt->execute();

            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            $username = $result["username"];
            return $username;
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

    public function ExtractEmail($username)
    {

        // Instantiate DB & connect
        $database = new Database();
        $conn = $database->connect();
        try{
        $stmt = $conn->prepare("SELECT email FROM registration WHERE username = :username");
        $stmt->bindParam(':username', $username);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        $email = $result["email"];
        }catch(Exception $e){
            return 0;
        }
        return $email;
    }

    public function changeUsername($email, $newUsername)
    {
        // Instantiate DB & connect
        $database = new Database();
        $conn = $database->connect();

        // verificam daca exista mail-ul in baza de date
        $stmt = $conn->prepare("SELECT count(*) FROM registration WHERE email = '$email'");
        $stmt->execute();

        // nu exista mailul
        if ($stmt->fetchColumn() != 1) {
            return -1;
        }
        //exista mailul
        else {
            //iau username actual ca sa-l mai folosesc
            $stmt = $conn->prepare("SELECT username FROM registration WHERE email = '$email'");
            $stmt->execute();

            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            $actualUsername = $result["username"];

            $stmt = $conn->prepare("SELECT count(*) FROM registration WHERE username = '$newUsername'");
            $stmt->execute();

            //nu exista username
            if ($stmt->fetchColumn() != 1) {
                $stmt = $conn->prepare("UPDATE `registration` SET `username`= :newUsername WHERE email = :email");
                $stmt->bindParam(':newUsername', $newUsername);
                $stmt->bindParam(':email', $email);
                //execute
                $stmt->execute();

                $stmt = $conn->prepare("UPDATE `challenges` SET `who_provoked`= :newUsername WHERE `who_provoked` = '$actualUsername'");
                $stmt->bindParam(':newUsername', $newUsername);
                $stmt->execute();

                $stmt = $conn->prepare("UPDATE `challenges` SET `who_is_provoked`= :newUsername WHERE `who_is_provoked` = '$actualUsername'");
                $stmt->bindParam(':newUsername', $newUsername);
                $stmt->execute();

                $stmt = $conn->prepare("UPDATE `feedback_queries` SET `user_who_send`= :newUsername WHERE `user_who_send` = '$actualUsername'");
                $stmt->bindParam(':newUsername', $newUsername);
                $stmt->execute();

                $stmt = $conn->prepare("UPDATE `pending_grades` SET `username`= :newUsername WHERE `username` = '$actualUsername'");
                $stmt->bindParam(':newUsername', $newUsername);
                $stmt->execute();

                $stmt = $conn->prepare("UPDATE `pending_grades` SET `who_proposed_username`= :newUsername WHERE `who_proposed_username` = '$actualUsername'");
                $stmt->bindParam(':newUsername', $newUsername);
                $stmt->execute();

                $stmt = $conn->prepare("UPDATE `pending_queries` SET `user`= :newUsername WHERE `user` = '$actualUsername'");
                $stmt->bindParam(':newUsername', $newUsername);
                $stmt->execute();

                $stmt = $conn->prepare("SELECT id AS userId from registration WHERE email = :email");
                $stmt->bindParam(':email', $email);
                $stmt->execute();

                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                $userId = $result["userId"];

                $stmt = $conn->prepare("UPDATE users_stats SET date_last_action = sysdate(), last_action = 'Schimbare username' WHERE id_user = '$userId'");
                $stmt->execute();
                return 1;
            } else {
                //exista username
                return -2;
            }
        }
    }

    public function changePassowrd($email, $password, $newPassword)
    {
        // Instantiate DB & connect
        $database = new Database();
        $conn = $database->connect();

        // verificam daca exista mail-ul in baza de date
        $stmt = $conn->prepare("SELECT count(*) FROM registration WHERE email = '$email'");
        $stmt->execute();

        // nu exista mailul
        if ($stmt->fetchColumn() != 1) {
            return -1;
        }
        //exista mailul
        else {
            // prepare query
            $stmt = $conn->prepare("SELECT password from registration WHERE email = :email");
            $stmt->bindParam(':email', $email);

            //execute
            $stmt->execute();

            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            $hashPassword = $result["password"];

            //parolele coincid, modific parola
            if (password_verify($password, $hashPassword)) {

                // hash la noua parola
                $hashNewPassword = password_hash($newPassword, PASSWORD_BCRYPT);

                // prepare query
                $stmt = $conn->prepare("UPDATE `registration` SET `password`=:newPassword WHERE email = :email");
                $stmt->bindParam(':newPassword', $hashNewPassword);
                $stmt->bindParam(':email', $email);

                //execute
                $stmt->execute();


                $stmt = $conn->prepare("SELECT id AS userId from registration WHERE email = :email");
                $stmt->bindParam(':email', $email);
                $stmt->execute();

                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                $userId = $result["userId"];

                $stmt = $conn->prepare("UPDATE users_stats SET date_last_action = sysdate(), last_action = 'Schimbare parola' WHERE id_user = '$userId'");
                $stmt->execute();

                return 1;
            } else {
                //parolele nu coincid, mesaj de eroare
                return -2;
            }
        }
    }

    public function ForgotPassowrd($email, $newPassword)
    {
        // Instantiate DB & connect
        $database = new Database();
        $conn = $database->connect();

        // verificam daca exista mail-ul in baza de date
        $stmt = $conn->prepare("SELECT count(*) FROM registration WHERE email = :email");
        $stmt->bindParam(":email", $email);
        $stmt->execute();

        // nu exista mailul
        if ($stmt->fetchColumn() != 1) {
            return -1;
        }
        //exista mailul
        else {
            // prepare query
            // hash la parola
            $hashNewPassword = password_hash($newPassword, PASSWORD_BCRYPT);
            $stmt = $conn->prepare("UPDATE registration SET `password` = :hashNewPassword WHERE email = :email");
            $stmt->bindParam(":hashNewPassword", $hashNewPassword);
            $stmt->bindParam(":email", $email);

            //execute
            $stmt->execute();
            $stmt = $conn->prepare("SELECT id AS idUser FROM registration WHERE email = :email");
            $stmt->bindParam(":email", $email);
            $stmt->execute();

            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            $idUser = $result["idUser"];

            $stmt = $conn->prepare("UPDATE users_stats SET date_last_action=sysdate(), last_action='Schimbare parola via email' WHERE id = :id");
            $stmt->bindParam(":id", $idUser);
            $stmt->execute();
            return 1;
        }
    }


    public function extractPoints($email)
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
            $stmt = $conn->prepare("SELECT points from registration WHERE email = :email");
            $stmt->bindParam(':email', $email);
            //execute
            $stmt->execute();

            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            $points = $result["points"];
            return $points;
        }
    }

    public function addPoints($email, $numberOfPoints)
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
            $stmt = $conn->prepare("UPDATE `registration` SET `points`=`points`+$numberOfPoints WHERE email = :email");
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

    public function addSpecificNumberOfPoints($email, $nrOfPoints)
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
            $stmt = $conn->prepare("UPDATE `registration` SET `points`=`points`+:nrOfPoints WHERE email = :email");
            $stmt->bindParam(':nrOfPoints', $nrOfPoints);
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

    public function decrementPoints($email, $numberOfPoints)
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
            $stmt = $conn->prepare("UPDATE `registration` SET `points`=`points`-$numberOfPoints WHERE email = :email");
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

            if ($points < 0) {
                $stmt = $conn->prepare("UPDATE `registration` SET `points`= 0 WHERE email = :email");
                $stmt->bindParam(':email', $email);
                //execute
                $stmt->execute();
                return 0;
            }
            return $points;
        }
    }

    public function decrementSpecificNumberOfPoints($email, $nrOfPoints)
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
            $stmt = $conn->prepare("UPDATE `registration` SET `points`=`points`-:nrOfPoints WHERE email = :email");
            $stmt->bindParam(':nrOfPoints', $nrOfPoints);
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

    public function addTrainingQuestion($email, $username, $question, $difficulty,  $var_1, $var_2, $var_3, $var_4, $var_correct)
    {
        // Instantiate DB & connect
        $database = new Database();
        $conn = $database->connect();

        // prepare query
        $stmt = $conn->prepare('INSERT INTO pending_queries (question, difficulty, var_1, var_2, var_3, var_4, correct_answer, user, email) VALUES (:question,:difficulty,:var_1,:var_2,:var_3,:var_4,:correct_answer,:user,:email)');
        $stmt->bindParam(':question', $question);
        $stmt->bindParam(':difficulty', $difficulty);
        $stmt->bindParam(':var_1', $var_1);
        $stmt->bindParam(':var_2', $var_2);
        $stmt->bindParam(':var_3', $var_3);
        $stmt->bindParam(':var_4', $var_4);
        $stmt->bindParam(':correct_answer', $var_correct);
        $stmt->bindParam(':user', $username);
        $stmt->bindParam(':email', $email);
        // execute
        $stmt->execute();

        $stmt = $conn->prepare('SELECT id AS idUser FROM registration WHERE email = :email');
        $stmt->bindParam(':email', $email);
        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        $idUser = $result["idUser"];

        $stmt = $conn->prepare("UPDATE users_stats SET nr_added_questions=nr_added_questions+1, date_last_action = sysdate(), last_action = 'Adaugare intrebare' WHERE id_user = '$idUser'");
        $stmt->execute();
        return 1;
    }

    public function addHardTrainingQuestion($email, $username, $difficulty, $question, $var_correct)
    {
        // Instantiate DB & connect
        $database = new Database();
        $conn = $database->connect();

        // prepare query
        $stmt = $conn->prepare('INSERT INTO pending_queries (question, difficulty, correct_answer, user, email) VALUES (:question,:difficulty,:correct_answer,:user,:email)');
        $stmt->bindParam(':question', $question);
        $stmt->bindParam(':difficulty', $difficulty);
        $stmt->bindParam(':correct_answer', $var_correct);
        $stmt->bindParam(':user', $username);
        $stmt->bindParam(':email', $email);
        // execute
        $stmt->execute();

        $stmt = $conn->prepare('SELECT id AS idUser FROM registration WHERE email = :email');
        $stmt->bindParam(':email', $email);
        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        $idUser = $result["idUser"];

        $stmt = $conn->prepare("UPDATE users_stats SET nr_added_questions=nr_added_questions+1, date_last_action = sysdate(), last_action = 'Adaugare intrebare' WHERE id_user = '$idUser'");
        $stmt->execute();

        return 1;
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

    public function addFeedback($question_id, $user_who_send, $feedback, $time)
    {

        // Instantiate DB & connect
        $database = new Database();
        $conn = $database->connect();
        $sem = 1;
        try {
            // prepare query
            $stmt = $conn->prepare('INSERT INTO feedback_queries (question_id, user_who_send, feedback, time) VALUES (:question_id, :user_who_send, :feedback, :time)');
            $stmt->bindParam(':question_id', $question_id);
            $stmt->bindParam(':user_who_send', $user_who_send);
            $stmt->bindParam(':feedback', $feedback);
            $stmt->bindParam(':time', $time);
            // execute
            $stmt->execute();

            $stmt = $conn->prepare("SELECT id AS userId FROM registration WHERE username = :user_who_send");
            $stmt->bindParam(":user_who_send", $user_who_send);
            $stmt->execute();

            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            $userId = $result["userId"];

            $stmt = $conn->prepare("UPDATE `users_stats` SET nr_added_feedbacks=nr_added_feedbacks+1 WHERE id_user = $userId");
            $stmt->execute();
        } catch (Exception $e) {
            $sem = 0;
        }
        return $sem;
    }

    public function GetWinChallenges($email)
    {
        // Instantiate DB & connect
        $database = new Database();
        $conn = $database->connect();
        $sem = 1;
        try {

            $stmt = $conn->prepare('SELECT id AS userId FROM registration WHERE email = :email');
            $stmt->bindParam(":email", $email);
            $stmt->execute();

            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            $userId = $result["userId"];

            $stmt = $conn->prepare("SELECT win_challenges as winners FROM users_stats WHERE id_user = '$userId'");
            $stmt->execute();

            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            $number = $result["winners"];

            return $number;
        } catch (Exception $e) {
            $sem = -1;
        }
        return $sem;
    }

    public function GetLostChallenges($email)
    {
        // Instantiate DB & connect
        $database = new Database();
        $conn = $database->connect();
        $sem = 1;
        try {

            $stmt = $conn->prepare('SELECT id AS userId FROM registration WHERE email = :email');
            $stmt->bindParam(":email", $email);
            $stmt->execute();

            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            $userId = $result["userId"];

            $stmt = $conn->prepare("SELECT lost_challenges as mistakes FROM users_stats WHERE id_user = '$userId'");
            $stmt->execute();

            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            $number = $result["mistakes"];

            return $number;
        } catch (Exception $e) {
            $sem = -1;
        }
        return $sem;
    }

    public function AddChallenge($id_query, $who_is_provoked, $who_provoked, $stake, $time)
    {
        // Instantiate DB & connect
        $database = new Database();
        $conn = $database->connect();
        $sem = 1;
        try {
            // prepare query
            $stmt = $conn->prepare('INSERT INTO challenges (id_query, who_is_provoked, who_provoked, stake, time) VALUES (:id_query, :who_is_provoked, :who_provoked, :stake, :time)');
            $stmt->bindParam(':id_query', $id_query);
            $stmt->bindParam(':who_is_provoked', $who_is_provoked);
            $stmt->bindParam(':who_provoked', $who_provoked);
            $stmt->bindParam(':stake', $stake);
            $stmt->bindParam(':time', $time);
            // execute
            $stmt->execute();
        } catch (Exception $e) {
            $sem = 0;
        }
        return $sem;
    }

    public function GetNumberOfChallenges($username)
    {
        // Instantiate DB & connect
        $database = new Database();
        $conn = $database->connect();
        $sem = 1;
        try {
            $stmt = $conn->prepare("SELECT COUNT(*) as numberOfChallenges FROM challenges WHERE username = :username ");
            $stmt->bindParam(':username', $username);
            $stmt->execute();

            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            $numberOfChallenges = $result["numberOfChallenges"];

            return $numberOfChallenges;
        } catch (Exception $e) {
            $sem = -1;
        }
        return $sem;
    }

    public function IncrementWinChallenges($email)
    {
        // Instantiate DB & connect
        $database = new Database();
        $conn = $database->connect();

        $stmt = $conn->prepare("SELECT id AS idUser FROM registration WHERE email = :email");
        $stmt->bindParam(':email', $email);
        //execute
        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        $idUser = $result["idUser"];



        $stmt = $conn->prepare("UPDATE `users_stats` SET `win_challenges`=`win_challenges`+1, date_last_action = sysdate(), last_action = 'Win challenge' WHERE id_user = :idUser");
        $stmt->bindParam(':idUser', $idUser);
        //execute
        $stmt->execute();

        // prepare query
        $stmt = $conn->prepare("SELECT win_challenges from users_stats WHERE id_user = :idUser");
        $stmt->bindParam(':idUser', $idUser);
        //execute
        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        $win_challenges = $result["win_challenges"];
        return $win_challenges;
    }

    public function IncrementLostChallenges($email)
    {
        // Instantiate DB & connect
        $database = new Database();
        $conn = $database->connect();

        $stmt = $conn->prepare("SELECT id AS idUser FROM registration WHERE email = :email");
        $stmt->bindParam(':email', $email);
        //execute
        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        $idUser = $result["idUser"];

        $stmt = $conn->prepare("UPDATE `users_stats` SET `lost_challenges`=`lost_challenges`+1, date_last_action = sysdate(), last_action = 'Lost challenge'  WHERE id_user = :idUser");
        $stmt->bindParam(':idUser', $idUser);
        //execute
        $stmt->execute();

        // prepare query
        $stmt = $conn->prepare("SELECT lost_challenges from users_stats WHERE id_user = :idUser");
        $stmt->bindParam(':idUser', $idUser);
        //execute
        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        $lost_challenges = $result["lost_challenges"];
        return $lost_challenges;
    }

    public function AddPointsToRival($username, $stake)
    {
        // Instantiate DB & connect
        $database = new Database();
        $conn = $database->connect();

        $stmt = $conn->prepare("UPDATE `registration` SET `points`=`points`+$stake WHERE username = :username");
        $stmt->bindParam(':username', $username);

        //execute
        $stmt->execute();
    }

    public function CountTests($email, $typeOfTest)
    {
        // Instantiate DB & connect
        $database = new Database();
        $conn = $database->connect();

        $stmt = $conn->prepare("SELECT id AS userId FROM registration WHERE email = :email");
        $stmt->bindParam(":email", $email);
        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        $userId = $result["userId"];

        if ($typeOfTest == "EASY") {

            $stmt = $conn->prepare("UPDATE `users_stats` SET nr_easy_test=nr_easy_test+1, date_last_action=sysdate(), last_action = 'Rezolvare test easy' WHERE id_user = $userId");
            $stmt->execute();
        } else
        if ($typeOfTest == "MEDIUM") {
            $stmt = $conn->prepare("UPDATE `users_stats` SET nr_medium_test=nr_medium_test+1, date_last_action=sysdate(), last_action = 'Rezolvare test medium' WHERE id_user = $userId");
            $stmt->execute();
        } else if ($typeOfTest == "HARD") {
            $stmt = $conn->prepare("UPDATE `users_stats` SET nr_hard_test=nr_hard_test+1, date_last_action=sysdate(), last_action = 'Rezolvare test hard' WHERE id_user = $userId");
            $stmt->execute();
        }
        return 1;
    }

    public function CountUserTrainingResponses($email, $typeOfQuestion, $response)
    {
        // Instantiate DB & connect
        $database = new Database();
        $conn = $database->connect();

        $stmt = $conn->prepare("SELECT id AS userId FROM registration WHERE email = :email");
        $stmt->bindParam(":email", $email);
        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        $userId = $result["userId"];

        if ($typeOfQuestion == "easy") {
            if ($response == "add") {
                $stmt = $conn->prepare("UPDATE `users_stats` SET nr_correct_easy_questions=nr_correct_easy_questions+1, date_last_action=sysdate(), last_action = 'Rezolvare intrebare easy' WHERE id_user = $userId");
                $stmt->execute();
            } else if ($response == "decrement") {
                $stmt = $conn->prepare("UPDATE `users_stats` SET nr_wrong_easy_questions=nr_wrong_easy_questions+1, date_last_action=sysdate(), last_action = 'Rezolvare intrebare easy' WHERE id_user = $userId");
                $stmt->execute();
            }
        } else if ($typeOfQuestion == "medium") {
            if ($response == "add") {
                $stmt = $conn->prepare("UPDATE `users_stats` SET nr_correct_medium_questions=nr_correct_medium_questions+1, date_last_action=sysdate(), last_action = 'Rezolvare intrebare medium' WHERE id_user = $userId");
                $stmt->execute();
            } else if ($response == "decrement") {
                $stmt = $conn->prepare("UPDATE `users_stats` SET nr_wrong_medium_questions=nr_wrong_medium_questions+1, date_last_action=sysdate(), last_action = 'Rezolvare intrebare medium' WHERE id_user = $userId");
                $stmt->execute();
            }
        } else if ($typeOfQuestion == "hard") {
            if ($response == "add") {
                $stmt = $conn->prepare("UPDATE `users_stats` SET nr_correct_hard_questions=nr_correct_hard_questions+1, date_last_action=sysdate(), last_action = 'Rezolvare intrebare hard' WHERE id_user = $userId");
                $stmt->execute();
            } else if ($response == "decrement") {
                $stmt = $conn->prepare("UPDATE `users_stats` SET nr_wrong_hard_questions=nr_wrong_hard_questions+1, date_last_action=sysdate(), last_action = 'Rezolvare intrebare hard' WHERE id_user = $userId");
                $stmt->execute();
            }
        }
        return 1;
    }

    public function SelectAllDetails($email)
    {
        // Instantiate DB & connect
        $database = new Database();
        $conn = $database->connect();

        $users_details = array();

        $stmt = $conn->prepare("SELECT id, username, points, grade FROM registration WHERE email = :email");
        $stmt->bindParam(":email", $email);
        $stmt->execute();

        while ($row = $stmt->fetch()) {
            $id = $row['id'];
            $username = $row['username'];
            $points = $row['points'];
            $grade = $row['grade'];

            $stmt2 = $conn->prepare("SELECT * FROM users_stats WHERE id_user = '$id'");
            $stmt2->execute();

            while ($row2 = $stmt2->fetch()) {
                $account_created_at = $row2["account_created_at"];
                $win_challenges = $row2["win_challenges"];
                $lost_challenges = $row2["lost_challenges"];
                $total_challenges = $win_challenges + $lost_challenges;
                $nr_correct_easy_questions = $row2["nr_correct_easy_questions"];
                $nr_wrong_easy_questions = $row2["nr_wrong_easy_questions"];
                $nr_total_easy_questions = $nr_correct_easy_questions + $nr_wrong_easy_questions;
                $nr_correct_medium_questions = $row2["nr_correct_medium_questions"];
                $nr_wrong_medium_questions = $row2["nr_wrong_medium_questions"];
                $nr_total_medium_questions = $nr_correct_medium_questions + $nr_wrong_medium_questions;
                $nr_correct_hard_questions = $row2["nr_correct_hard_questions"];
                $nr_wrong_hard_questions = $row2["nr_wrong_hard_questions"];
                $nr_total_hard_questions = $nr_correct_hard_questions + $nr_wrong_hard_questions;
                $nr_easy_test = $row2["nr_easy_test"];
                $nr_medium_test = $row2["nr_medium_test"];
                $nr_hard_test = $row2["nr_hard_test"];
                $nr_added_questions = $row2["nr_added_questions"];
                $nr_added_feedbacks = $row2["nr_added_feedbacks"];
                $date_last_action = $row2["date_last_action"];
                $last_action = $row2["last_action"];

                array_push(
                    $users_details,
                    array(
                        "id" => $id,
                        "username" => $username,
                        "points" => $points,
                        "grade" => $grade,
                        "account_created_at" => $account_created_at,
                        "win_challenges" => $win_challenges,
                        "lost_challenges" => $lost_challenges,
                        "total_challenges" => $total_challenges,
                        "nr_correct_easy_questions" => $nr_correct_easy_questions,
                        "nr_wrong_easy_questions" => $nr_wrong_easy_questions,
                        "nr_total_easy_questions" => $nr_total_easy_questions,
                        "nr_correct_medium_questions" => $nr_correct_medium_questions,
                        "nr_wrong_medium_questions" => $nr_wrong_medium_questions,
                        "nr_total_medium_questions" => $nr_total_medium_questions,
                        "nr_correct_hard_questions" => $nr_correct_hard_questions,
                        "nr_wrong_hard_questions" => $nr_wrong_hard_questions,
                        "nr_total_hard_questions" => $nr_total_hard_questions,
                        "nr_easy_test" => $nr_easy_test,
                        "nr_medium_test" => $nr_medium_test,
                        "nr_hard_test" => $nr_hard_test,
                        "nr_added_questions" => $nr_added_questions,
                        "nr_added_feedbacks" => $nr_added_feedbacks,
                        "date_last_action" => $date_last_action,
                        "last_action" => $last_action
                    )
                );
            }
        }

        return $users_details;
    }


}
