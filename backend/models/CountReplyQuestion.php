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

if (
    !empty($data->question_id)
) {
    $a = new Admin();
    if($a->addCountReplyForQuestion($data->question_id) == 1){
        http_response_code(200);
        echo json_encode(array("message" => "Actiune reusita!"));
    }else{
        http_response_code(400);
        echo json_encode(array("message" => "Actiune esuata!"));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Actiune esuata!"));
}

//aici in loc de return era echo
