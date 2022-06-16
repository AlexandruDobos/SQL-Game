<?php
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');

include_once '../config/Database.php';

$data = json_decode(file_get_contents('php://input'));

function generate_token(): string
{
    return bin2hex(random_bytes(16));
}

function send_token_email($command, $token, $email, $name)
{

    $link = 'http://localhost/Licenta/models/' . "ConfirmEmail.php?email=$email&command=$command&activation_code=$token";
    include_once 'SendMail.php';
    $message = "<h3> Confirmati emailul </h3> <br/> <p> A fost facuta o cerere pentru $command. 
                $command apasand pe link-ul <a href='$link'> $link </a> <br/> Linkul va expira in 7 zile. <br/>Daca nu ati facut dumneavoastra cererea, ignorati emailul. <br/> Salutari!";
    if (send_email($email, $name, $command . ': trebuie sa va confirmati identitatea', $message)  === 1) {
        // Instantiate DB & connect
        $database = new Database();
        $conn = $database->connect();
        $stmt = $conn->prepare("INSERT INTO `confirm_email_tokens` (`email`, `token`, `created_at`, `expires_at`) VALUES (:email,:token,sysdate(), DATE_ADD(sysdate(), INTERVAL 7 DAY))");
        $stmt->bindParam(":email",$email);
        $stmt->bindParam(":token",$token);
        $stmt->execute();
        return 1;
    }
    return 0;
}

if (
    !empty($data->comanda) &&
    !empty($data->email)
) {
    try {
        $database = new Database();
        $conn = $database->connect();
        if ($data->comanda == 'Schimbare parola') {
            $stmt = $conn->prepare("SELECT first_name, last_name, id FROM registration WHERE email = :email");
            $stmt->bindParam(":email", $data->email);
            $stmt->execute();
            //$result = $stmt->get_result();
            if($row = $stmt->fetch()){
                $stmt = $conn->prepare("UPDATE users_stats SET date_last_action=sysdate(), last_action='Cerere schimbare parola' WHERE id = :id");
                $stmt->bindParam(":id", $data->$row['id']);
                $stmt->execute();
                $token = generate_token();
                if (send_token_email($data->comanda, $token, $data->email, $row['first_name'] . ' ' . $row['last_name']) == 1) {
                    http_response_code(200);
                    echo json_encode(array('message' => 'Verifică-ți adresa de email!'));
                } else {
                    http_response_code(500);
                    echo json_encode(array('message' => 'Nu s-a putut trimite emailul!'));
                }
            } else {
                http_response_code(404);
                echo json_encode(array('message' => 'Adresă de email inexistentă!'));
            }
        } else {
            $token = generate_token();
            if (send_token_email($data->comanda, $token, $data->email, $data->name, $mysqli) == 1) {
                http_response_code(200);
                echo json_encode(array('message' => 'Verifică-ți adresa de email!'));
            } else {
                http_response_code(500);
                echo json_encode(array('message' => 'Nu s-a putut trimite emailul!'));
            }
        }
    } catch (mysqli_sql_exception $e) {
        http_response_code(500);
        echo json_encode(array('message' => 'Problemă la baza de date!'));
    }
} else {
    http_response_code(400);
    echo json_encode(array('message' => 'Date insuficiente!'));
}
