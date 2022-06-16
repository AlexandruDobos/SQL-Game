<?php
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
include_once '../config/User.php';
include_once '../jwt/php-jwt-master/src/jwt_params.php';
include_once '../jwt/php-jwt-master/src/JWT.php';
include_once '../jwt/php-jwt-master/src/ExpiredException.php';
include_once '../jwt/php-jwt-master/src/BeforeValidException.php';
include_once '../jwt/php-jwt-master/src/SignatureInvalidException.php';

use \FireBase\JWT\JWT;
$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->email) &&
    !empty($data->newUsername)
) {
    $u = new User();
    $result = $u->changeUsername($data->email, $data->newUsername);

    if ($result == 1) {
        $points = $u->extractPoints($data->email);
        $is_admin = $u->checkIfItIsAdmin($data->email);
        $userGrade = $u->selectGrade($data->email);
        $userWinChallenges = $u->GetWinChallenges($data->email);
        $userLostChallenges = $u->GetLostChallenges($data->email);
        $userTotalChallenges = $userWinChallenges + $userLostChallenges;
        $allDetails = $u->SelectAllDetails($data->email);
        $token = array(
            "iss" => JWT_ISS,
            "aud" => JWT_AUD,
            "iat" => JWT_IAT,
            "exp" => JWT_EXP,
            "data" => array(
                "email" => $data->email,
                "username" => $data->newUsername,
                "points" => $points,
                "is_admin" => $is_admin,
                "grade" => $userGrade,
                "userWinChallenges" => $userWinChallenges,
                "userLostChallenges" => $userLostChallenges,
                "userTotalChallenges" => $userTotalChallenges,
                "allDetails" => $allDetails
            )
        );

        $jwt = JWT::encode($token, JWT_KEY);

        http_response_code(200);
        echo json_encode(array("message" => $jwt));

    } else {
        if ($result == -1) {
            http_response_code(400);
            echo json_encode(array("message" => "Email incorect"));
        } else {
            if ($result == -2) {
                http_response_code(400);
                echo json_encode(array("message" => "Username deja existent"));
            }
        }
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Nu sunt date suficiente"));
}

//aici in loc de return era echo
