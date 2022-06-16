<?php

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
include_once '../config/Database.php';

$data = json_decode(file_get_contents("php://input"));

// Instantiate DB & connect
$database = new Database();
$conn = $database->connect();

if (
    !empty($data->correct_answer) &&
    !empty($data->user_query_answer)
) {

    // Instantiate DB & connect
    $database = new Database();
    $conn = $database->connect();

    $userReponse = $data->user_query_answer;
    $query1 = $data->correct_answer;

    //echo "query1 = " . $query1 . "\n" ;

    $stmt = $conn->prepare($query1);
    $stmt->execute();

    $results1 = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $json1results = json_encode(array('results1' => $results1));

    //echo "json1results: " . $json1results . "\n";

    $query2 = $userReponse;
    $sem = 1;
    try {
        $stmt2 = $conn->prepare($query2);
        $stmt2->execute();

        $results2 = $stmt2->fetchAll(PDO::FETCH_ASSOC);
        $json2results = json_encode(array('results2' => $results2));
    } catch (Exception $e) {
        echo json_encode(array("message" => "Raspuns gresit!"));
        $sem = 0;
    }

    //echo "json2results: " . $json2results . "\n";
    if ($sem == 1) {
        $jsonData = json_encode(
            array_merge(
                json_decode($json1results, true),
                json_decode($json2results, true)
            )
        );

        $json = $jsonData;

        $auxJson = json_decode($json, true);
        $json1 = json_encode(array('response1' => $auxJson["results1"]));
        $json2 = json_encode(array('response2' => $auxJson["results2"]));
        // echo $json;
        // echo "\n\n\n";
        // echo $json1;
        // echo "\n\n\n";
        // echo $json2;
        // echo "\n\n\n";

        $it_1 = json_decode($json1, TRUE);
        $it_2 = json_decode($json2, TRUE);
        
        // var_dump($it_1) . "\n";
        // var_dump($it_2) . "\n";

        $nr_lines1 = count($it_1["response1"]);
        $nr_lines2 = count($it_2["response2"]);

        // var_dump($it_1);
        // echo "\n\n\n";
        // var_dump($it_2);

        // echo "nr_lines1: " . $nr_lines1 . "\n";
        // echo "nr_lines2: " . $nr_lines2 . "\n";

        $used_index = array();
        //daca nr de lines difera - nu e bine
        if ($nr_lines1 > $nr_lines2) {
            // echo "Prea putine linii returnate de interogarea utilizatorului \n";
            // echo "Cele doua interogari nu sunt la fel! \n";
            echo json_encode(array("message" => "Raspuns gresit!"));
        } else {
            if ($nr_lines1 < $nr_lines2) {
                // echo "Prea multe linii returnate de interogarea utilizatorului \n";
                // echo "Cele doua interogari nu sunt la fel! \n";
                echo json_encode(array("message" => "Raspuns gresit!"));
            } else {
                if ($nr_lines1 == $nr_lines2) {
                    //echo "Numar de linii egale, continua \n\n\n";
                    $semaphore = 1;
                    for ($index1 = 0; $index1 < $nr_lines2; $index1++) {
                        $semaphore2 = 0;
                        if ($semaphore == 1) {
                            for ($index2 = 0; $index2 < $nr_lines1; $index2++) {
                                //if (!in_array($index2, $used_index)) {
                                    $result = array_diff($it_1["response1"][$index1], $it_2["response2"][$index2]);
                                    //echo "[" . $index1 . "] cu " . "[" . $index2 . "] \n\n";
                                    //var_dump($result);
                                    if (!$result) {
                                        //echo "nu este diferenta \n";
                                        array_push($used_index, $index2);
                                        $semaphore2 = 1;
                                    } else {
                                        //echo "este diferenta \n";
                                    }
                                    //echo "\n";
                                //}
                            }
                            //echo $index1 . " cu " . $index2 . "\n";
                            //echo "semaphore2: " . $semaphore2 . "\n";
                            if ($semaphore2 == 0) {
                                $semaphore = 0;
                            } else {
                                $semaphore2 = 0;
                            }
                        }
                    }
                    if ($semaphore == 1) {
                        //echo "Cele doua interogari sunt la fel! \n";
                        echo json_encode(array("message" => "Raspuns corect!"));
                        // $res = array_diff($it_1["response1"], $it_2["response2"]);
                        // var_dump($it_1["response1"]);
                    } else {
                        echo json_encode(array("message" => "Raspuns gresit!"));
                        //echo "Cele doua interogari nu sunt la fel! \n";
                        //echo "Diferenta dintre cele doua interogari: \n";
                        //$res = array_diff($it_1["response1"], $it_2["response2"]);
                        //print_r($res);
                    }
                }
            }
        }
    }
}


/*

if ($nr_lines1 == $nr_lines2) {
                echo "Numar de linii egale, continua \n\n\n";
                $semaphore = 1;
                for ($index1 = 0; $index1 < $nr_lines1; $index1++) {
                    $semaphore2 = 0;
                    if ($semaphore == 1) {
                        for ($index2 = 0; $index2 < $nr_lines2; $index2++) {
                            if (!in_array($index2, $used_index)) {
                                $result = array_diff($it_1["response1"][$index1], $it_2["response2"][$index2]);
                                //echo "[" . $index1 . "] cu " . "[" . $index2 . "] \n\n";
                                if (!$result) {
                                    //echo "nu este diferenta \n";
                                    array_push($used_index, $index2);
                                    $semaphore2 = 1;
                                } else {
                                    //echo "este diferenta \n";
                                }
                                //echo "\n";
                            }
                        }
                        if ($semaphore2 == 0) {
                            $semaphore = 0;
                        } else {
                            $semaphore2 = 0;
                        }
                    }
                }
                if ($semaphore == 1) {
                    echo "Cele doua interogari sunt la fel! \n";
                    // $res = array_diff($it_1["response1"], $it_2["response2"]);
                    // var_dump($it_1["response1"]);
                } else {
                    echo "Cele doua interogari nu sunt la fel! \n";
                    // echo "Diferenta dintre cele doua interogari: \n";
                    // $res = array_diff($it_1["response1"], $it_2["response2"]);
                    // print_r($res);
                }
            }








            if ($nr_lines1 == $nr_lines2) {
                    //echo "Numar de linii egale, continua \n\n\n";
                    $semaphore = 1;
                    for ($index1 = 0; $index1 < $nr_lines2; $index1++) {
                        $semaphore2 = 0;
                        if ($semaphore == 1) {
                            for ($index2 = 0; $index2 < $nr_lines1; $index2++) {
                                //if (!in_array($index2, $used_index)) {
                                    $result = array_diff($it_2["response2"][$index2], $it_1["response1"][$index1]);
                                    //echo "[" . $index1 . "] cu " . "[" . $index2 . "] \n\n";
                                    //var_dump($result);
                                    if (!$result) {
                                        //echo "nu este diferenta \n";
                                        array_push($used_index, $index2);
                                        $semaphore2 = 1;
                                    } else {
                                        //echo "este diferenta \n";
                                    }
                                    //echo "\n";
                                //}
                            }
                            //echo $index1 . " cu " . $index2 . "\n";
                            //echo "semaphore2: " . $semaphore2 . "\n";
                            if ($semaphore2 == 0) {
                                $semaphore = 0;
                            } else {
                                $semaphore2 = 0;
                            }
                        }
                    }

 */