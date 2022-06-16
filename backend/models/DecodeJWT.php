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
    !empty($data->jwt)
) {
    $decoded_jwt = JWT::decode($data->jwt, JWT_KEY, array('HS256'));
    //echo var_dump($decoded_jwt);
    http_response_code(200);
    echo json_encode(array("JWT" => $decoded_jwt));
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Nu s-a trimis JWT"));
}
