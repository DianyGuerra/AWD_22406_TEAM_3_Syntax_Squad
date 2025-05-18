<?php
class connectionDB {
    public $servername;
    public $username;
    public $password;
    public $database;
    public $conn;

    public function __construct() {
        $this->servername = "localhost";
        $this->username = "admin";
        $this->password = "admin";
        $this->database = "blak_blox";

        $this->conn = new mysqli($this->servername, $this->username, $this->password, $this->database);

        if ($this->conn->connect_error) {
            die("Connection error: " . $this->conn->connect_error);
        }
    }

    public function connection() {
        return $this->conn;
    }
}
?>