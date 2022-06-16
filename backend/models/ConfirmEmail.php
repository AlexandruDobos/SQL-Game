<?php
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');

include_once '../config/Database.php';

$current_link = parse_url('https://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'])['query'];
parse_str($current_link, $params);

function check_email_existence($email)
{
    // Instantiate DB & connect
    $database = new Database();
    $conn = $database->connect();
    $stmt = $conn->prepare('SELECT email from registration WHERE email = :email');
    $stmt->bindParam(":email", $email);
    $stmt->execute();
    if ($row = $stmt->fetch()) {
        return TRUE;
    } else {
        return FALSE;
    }
}

function check_token_existence($token)
{
    // Instantiate DB & connect
    $database = new Database();
    $conn = $database->connect();
    $stmt = $conn->prepare('SELECT token from `confirm_email_tokens` where token = :token');
    $stmt->bindParam(":token", $token);
    $stmt->execute();
    if ($row = $stmt->fetch()) {
        return TRUE;
    } else {
        return FALSE;
    }
}

function update_token($token, $command, $email)
{
    // Instantiate DB & connect
    $database = new Database();
    $conn = $database->connect();
    $stmt = $conn->prepare('DELETE FROM `confirm_email_tokens` WHERE token = :token');
    $stmt->bindParam(":token", $token);
    $stmt->execute();
    if (str_contains($command, 'Confirmare email')) {
        $stmt = $conn->prepare('UPDATE `registration` SET `is_confirmed` = 1 WHERE email = :email');
        $stmt->bindParam(":email", $email);
        $stmt->execute();
    }
}

if (
    !empty($params['command']) &&
    !empty($params['activation_code']) &&
    !empty($params['email'])
) {
    try {
        // Instantiate DB & connect
        $database = new Database();
        $conn = $database->connect();
        if (check_email_existence($params['email'])) {
            if (check_token_existence($params['activation_code'])) {
                $stmt = $conn->prepare('SELECT `email` FROM `confirm_email_tokens` WHERE `email` = :email AND `token` = :token AND expires_at > sysdate() ORDER BY created_at DESC');
                $stmt->bindParam(":email", $params['email']);
                $stmt->bindParam(":token", $params['activation_code']);
                $stmt->execute();
                if ($row = $stmt->fetch()) {
                    update_token($params['activation_code'], $params['command'], $params['email']);
                    http_response_code(200);

                    if (str_contains($params['command'], 'parola')) {
                        header('Location: http://localhost:3000/forgotpassconfirmed?email=' . $params['email']);
                    } else {
                        header('Location: http://localhost:3000/login');
                    }
                } else {
                    http_response_code(500);
                    echo 'Tokenul a expirat!';
                }
            } else {
                http_response_code(404);
                echo 'Token inexistent!';
            }
        } else {
            http_response_code(404);
            echo 'Email inexistent!';
        }
    } catch (mysqli_sql_exception $e) {
        http_response_code(500);
        echo 'Problemă la baza de date!';
    }
} else {
    http_response_code(400);
    echo 'Date insuficiente!';
}
