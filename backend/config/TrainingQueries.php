<?php

include_once '../config/Database.php';

class Queries {
    public function selectQuestion(){
         // Instantiate DB & connect
         $database = new Database();
         $conn = $database->connect();
 
 
         // verificam daca exista mail-ul in baza de date
         $stmt = $conn->prepare("SELECT COUNT(*) FROM `training_queries`");
         $stmt->execute();
         // nu exista mailul
         if ($stmt->fetchColumn() != 1) {

            
 
            //  // prepare query
            //  $stmt = $conn->prepare('INSERT INTO registration (first_name, last_name, email, password) VALUES (:first_name,:last_name,:email,:password)');
            //  $stmt->bindParam(':first_name', $first_name);
            //  $stmt->bindParam(':last_name', $last_name);
            //  $stmt->bindParam(':email', $email);
            //  $stmt->bindParam(':password', $hashPassword);
            //  // execute
            //  $stmt->execute();
 
            //  // return 1: totul este ok
             return 1;
         }
         //exista mailul
         else {
             return 2;
         }
    }
}