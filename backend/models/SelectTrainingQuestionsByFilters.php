<?php

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
include_once '../config/Database.php';

$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->easy) &&
    !empty($data->medium) &&
    !empty($data->hard)
) {

    // Instantiate DB & connect
    $database = new Database();
    $conn = $database->connect();

    $numberOfQueries = -1;
    if ($data->easy == "true" && $data->medium == "true" && $data->hard == "true") {
        $stmt = $conn->prepare("SELECT * FROM `training_queries` WHERE difficulty = 'easy' OR difficulty = 'medium' OR difficulty = 'hard'");
        $stmtnumberOfQueries = $conn->prepare("SELECT COUNT(*) FROM `training_queries` WHERE difficulty = 'easy' OR difficulty = 'medium' OR difficulty = 'hard'");
    } else {
        if ($data->easy == "true" && $data->medium == "true" && $data->hard == "false") {
            $stmt = $conn->prepare("SELECT * FROM `training_queries` WHERE difficulty = 'easy' OR difficulty = 'medium'");
            $stmtnumberOfQueries = $conn->prepare("SELECT COUNT(*) FROM `training_queries` WHERE difficulty = 'easy' OR difficulty = 'medium'");
        } else {
            if ($data->easy == "true" && $data->medium == "false" && $data->hard == "true") {
                $stmt = $conn->prepare("SELECT * FROM `training_queries` WHERE difficulty = 'easy' OR difficulty = 'hard'");
                $stmtnumberOfQueries = $conn->prepare("SELECT COUNT(*) FROM `training_queries` WHERE difficulty = 'easy' OR difficulty = 'hard'");
            } else {
                if ($data->easy == "true" && $data->medium == "false" && $data->hard == "false") {
                    $stmt = $conn->prepare("SELECT * FROM `training_queries` WHERE difficulty = 'easy'");
                    $stmtnumberOfQueries = $conn->prepare("SELECT COUNT(*) FROM `training_queries` WHERE difficulty = 'easy'");
                } else {
                    if ($data->easy == "false" && $data->medium == "true" && $data->hard == "true") {
                        $stmt = $conn->prepare("SELECT * FROM `training_queries` WHERE difficulty = 'medium' OR difficulty = 'hard'");
                        $stmtnumberOfQueries = $conn->prepare("SELECT COUNT(*) FROM `training_queries` WHERE difficulty = 'medium' OR difficulty = 'hard'");
                    } else {
                        if ($data->easy == "false" && $data->medium == "true" && $data->hard == "false") {
                            $stmt = $conn->prepare("SELECT * FROM `training_queries` WHERE difficulty = 'medium'");
                            $stmtnumberOfQueries = $conn->prepare("SELECT COUNT(*) FROM `training_queries` WHERE difficulty = 'medium'");
                        } else {
                            if ($data->easy == "false" && $data->medium == "false" && $data->hard == "true") {
                                $stmt = $conn->prepare("SELECT * FROM `training_queries` WHERE difficulty = 'hard'");
                                $stmtnumberOfQueries = $conn->prepare("SELECT COUNT(*) FROM `training_queries` WHERE difficulty = 'hard'");
                            }
                        }
                    }
                }
            }
        }
    }

    $stmtnumberOfQueries->execute();
    $result = $stmtnumberOfQueries->fetch(PDO::FETCH_ASSOC);

    $numberOfQueries = $result["COUNT(*)"];

    $randomQuestion = rand(1, $numberOfQueries);
    $index = 1;
    $stmt->execute();

    $question_id = -1;
    $question = "";
    $difficulty = "";
    $number_of_solve = -1;
    while ($row = $stmt->fetch()) {
        if ($index == $randomQuestion) {
            $question_id = $row['id'];
            $question = $row['question'];
            $difficulty = $row['difficulty'];
            $number_of_solve = $row['number_of_solve'];
            break;
        }
        $index++;
    }

    if ($question != "") {
        $stmt = $conn->prepare("SELECT COUNT(*) as nr FROM `training_queries_responses` WHERE id_training_queries = '$question_id' AND is_correct = '1'");
        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        $nr_correct_answer = $result['nr'];

        $random_correct_answer = rand(1, $nr_correct_answer);

        $stmt = $conn->prepare("SELECT * FROM `training_queries_responses` WHERE id_training_queries = '$question_id' AND is_correct = '1'");
        $stmt->execute();
        $index = 1;
        //echo "Numar variante corecte: " . $nr_correct_answer . "Numarul random generat: " . $random_correct_answer;
        while ($row = $stmt->fetch()) {
            if ($index == $random_correct_answer) {
                $correct_answer = $row['response'];
            }
            $index++;
        }
        if ($difficulty != "hard") {
            //trebuie sa aleg trei variante de raspuns gresite.
            //vad cate variante de raspuns gresite are intrebarea(minim 3 trebuie sa aiba)
            $stmt = $conn->prepare("SELECT COUNT(*) as nr FROM `training_queries_responses` WHERE id_training_queries = '$question_id' AND is_correct = '0'");
            $stmt->execute();

            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            $nr_wrong_answer = $result['nr'];
            //echo "Numar variante gresite: " . $nr_wrong_answer;
            //acum formez un vector de trei elemente random de la 1 la nr de variante de raspuns gresite.
            $random_numbers = array();
            while (count($random_numbers) < 3) {
                $random_nr = rand(1, $nr_wrong_answer);
                if (!in_array($random_nr, $random_numbers)) {
                    array_push($random_numbers, $random_nr);
                }
            }

            $stmt = $conn->prepare("SELECT * FROM `training_queries_responses` WHERE id_training_queries = '$question_id' AND is_correct = '0'");
            $stmt->execute();
            $index = 1;
            $wrong_answers = array();
            while ($row = $stmt->fetch()) {
                if (in_array($index, $random_numbers)) {
                    array_push($wrong_answers, $row['response']);
                }
                $index++;
            }

            echo json_encode(array(
                "questionId" => $question_id,
                "question" => $question,
                "difficulty" => $difficulty,
                "wrong_answer1" => $wrong_answers[0],
                "wrong_answer2" => $wrong_answers[1],
                "wrong_answer3" => $wrong_answers[2],
                "correct_answer" => $correct_answer,
                "number_of_solve" => $number_of_solve
            ));
        } else {

            echo json_encode(array(
                "questionId" => $question_id,
                "question" => $question,
                "difficulty" => $difficulty,
                "correct_answer" => $correct_answer,
                "number_of_solve" => $number_of_solve
            ));
        }
    }

    

} else {
    echo json_encode(array("message" => "Nu exista date suficiente!"));
}
// $stmt->execute();
//         while ($row = $stmt->fetch()) {
//                 echo $row['difficulty'] . "\n";
//         }