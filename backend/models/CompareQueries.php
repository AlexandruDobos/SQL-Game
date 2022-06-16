<?php

class CompareQueries
{

    // DB stuff
    private $conn;
    private $table = 'queries';
    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function compare(ExtractQuery $extractQuery)
    {
        if (!isset($_POST['userResponse'])) {
            $jsonResponse = json_encode(array('response' => "No data in userResponse"));
            return $jsonResponse;
        } else {

            $userResponse = $_POST['userResponse'];
            $data1 = $extractQuery->read();
            $json1 = json_decode($data1);
            $query1 = $json1->response;

            $stmt = $this->conn->prepare($query1);
            $stmt->execute();

            $results1 = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $json1results = json_encode(array('results1' => $results1));

            $data2 = $userResponse;
            $query2 = $data2;

            $stmt2 = $this->conn->prepare($query2);
            $stmt2->execute();

            $results2 = $stmt2->fetchAll(PDO::FETCH_ASSOC);
            $json2results = json_encode(array('results2' => $results2));

            $jsonData = json_encode(
                array_merge(
                    json_decode($json1results, true),
                    json_decode($json2results, true)
                )
            );

            return $jsonData;
        }
    }
}
