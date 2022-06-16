<?php
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');

include_once '../config/User.php';
include_once '../config/Admin.php';
include_once '../jwt/php-jwt-master/src/jwt_params.php';
include_once '../jwt/php-jwt-master/src/JWT.php';
include_once '../jwt/php-jwt-master/src/ExpiredException.php';
include_once '../jwt/php-jwt-master/src/BeforeValidException.php';
include_once '../jwt/php-jwt-master/src/SignatureInvalidException.php';

use \FireBase\JWT\JWT;

$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->email) &&
    !empty($data->password)
) {
    $u = new User();
    $a = new Admin();
    $result = $u->logareUtilizator($data->email, $data->password);
    if ($result == 1) {

        $points = $u->extractPoints($data->email);
        $username = $u->extractUsername($data->email);
        $is_admin = $u->checkIfItIsAdmin($data->email);
        $userGrade = $a->selectGrade($data->email);
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
                "username" => $username,
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
        echo json_encode(array("JWT" => $jwt));
    } else if ($result == 2) {
        echo json_encode(array("message" => "Trebuie sa iti confirmi mail-ul!"));
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Email sau parola gresita."));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to log user, need more data."));
}

//aici in loc de return era echo
