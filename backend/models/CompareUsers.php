<?php
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');

include_once '../config/User.php';

$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->username1) &&
    !empty($data->username2)
) {
    $u = new User();
    $u1Email = $u->ExtractEmail($data->username1);
    if ($u1Email == 0) {
        http_response_code(500);
        echo json_encode(array("message" => "Username inexistent!"));
    } else {
        $u2Email = $u->ExtractEmail($data->username2);
        if ($u2Email == 0) {
            http_response_code(500);
            echo json_encode(array("message" => "Username inexistent!"));
        } else {
            $u1Details = $u->SelectAllDetails($u1Email);
            $u2Details = $u->SelectAllDetails($u2Email);

            http_response_code(200);
            echo json_encode(array("message" => array("user1" => $u1Details, "user2" => $u2Details)));
        }
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Unable, need more data."));
}
