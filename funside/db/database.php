<?php

class DatabaseHelper{
    private $db;

    public function __construct($servername, $username, $password, $dbname, $port){
        $this->db = new mysqli($servername, $username, $password, $dbname, $port);
            if($this->db->connect_error){
                die("". $this->db->connect_error);
        }
    }

    //USER
    public function checkLogin($username, $password){
        $query = "SELECT username, name, surname, type FROM user WHERE username = ? AND password = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ss',$username, $password);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function registerUser($username, $password, $name, $surname, $type){
        $query = "INSERT INTO user (username, password, name, surname, type VALUES (?, ?, ?, ?, ?)";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('sssss',$username, $password, $name, $surname, $type);
        return $stmt->execute();
    }

    //ADDRESS
    public function addAddressToUser($username, $address) {
        $query = "INSERT INTO address (user, add) VALUES (?, ?)";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ss',$username, $address);
        return $stmt->execute();
    }

    public function getAddressesFromUser($username) {
        $query = "SELECT add, FROM address WHERE user = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s',$username);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function deleteAddressToUser($username, $address) {
        $query = "DELETE FROM address WHERE user = ? AND address = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ss',$username, $address);
        return $stmt->execute();
    }

    //PRODUCT TYPE
    public function addProductType($type, $description, $image) {
        $query = "INSERT INTO producttype (type, description, image) VALUES (?, ?, ?)";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('sss',$type, $description, $image);
        return $stmt->execute();
    }

    public function getProductType($type) {
        $query = "SELECT description, image FROM producttype WHERE type = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ss',$type);
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function deleteProductType($type) {
        $query = "DELETE FROM producttype WHERE type = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ss',$type);
        return $stmt->execute();
    }
}
?>