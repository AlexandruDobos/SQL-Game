<?php
class ExtractQuery
{
    // DB stuff
    private $conn;
    private $table = 'queries';

    // ExtractQuery Properties
    public $id;
    public $query;
    public $response;

    // Constructor with DB
    public function __construct($db)
    {
        $this->conn = $db;
    }

    // Get Queries
    public function read()
    {
        // Create query
        $query = 'SELECT
            id,
            query,
            response
            FROM ' . $this->table;

        // Prepare statement
        $stmt = $this->conn->prepare($query);
        // Execute query
        $stmt->execute();

        //return $stmt;
        return json_encode(array('response' => $query));
    }
}
