<?php
class connectionDB {
    public $servername;
    public $username;
    public $password;
    public $database;
    public $port;
    public $conn;

    public function __construct() {
        $this->servername = getenv('DB_HOST');
        $this->username   = getenv('DB_USER');
        $this->password   = getenv('DB_PASS');
        $this->database   = getenv('DB_NAME');
        $this->port       = getenv('DB_PORT') ?: 3306;

        $this->conn = new mysqli($this->servername, $this->username, $this->password, $this->database, $this->port);

        if ($this->conn->connect_error) {
            die("Connection error: " . $this->conn->connect_error);
        }
    }

    public function connection() {
        return $this->conn;
    }
}
?>
