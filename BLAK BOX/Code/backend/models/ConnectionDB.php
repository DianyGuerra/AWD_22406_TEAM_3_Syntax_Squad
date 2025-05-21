<?php
class connectionDB {
    public $servername;
    public $username;
    public $password;
    public $database;
    public $port;
    public $conn;

    public function __construct() {
        $this->servername = getenv('MYSQL_ADDON_HOST');
        $this->username   = getenv('MYSQL_ADDON_USER');
        $this->password   = getenv('MYSQL_ADDON_PASSWORD');
        $this->database   = getenv('MYSQL_ADDON_DB');
        $this->port       = getenv('MYSQL_ADDON_PORT') ?: 3306;

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
