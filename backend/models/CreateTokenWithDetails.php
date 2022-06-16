<?php
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
include_once '../config/Admin.php';
include_once '../jwt/php-jwt-master/src/jwt_params.php';
include_once '../jwt/php-jwt-master/src/JWT.php';
include_once '../jwt/php-jwt-master/src/ExpiredException.php';
include_once '../jwt/php-jwt-master/src/BeforeValidException.php';
include_once '../jwt/php-jwt-master/src/SignatureInvalidException.php';

use \FireBase\JWT\JWT;

$data = json_decode(file_get_contents("php://input"));

$a = new Admin();
$numberOfUsers = $a->selectNumberOfUsers();
$firstUsers = $a->selectFirstUsers();
$token = array(
    "iss" => JWT_ISS,
    "aud" => JWT_AUD,
    "iat" => JWT_IAT,
    "exp" => JWT_EXP,
    "data" => array(
        "numberOfUsers" => $numberOfUsers,
        "firstUsers" => $firstUsers
    )
);

$jwt = JWT::encode($token, JWT_KEY);

http_response_code(200);
echo json_encode(array("message" => $jwt));
