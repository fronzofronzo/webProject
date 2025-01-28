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
        $query = "SELECT username, name, surname, type FROM funside.user WHERE username = ? AND password = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ss',$username, $password);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function registerUser($username, $password, $name, $surname, $type){
        $query = "INSERT INTO funside.user (username, password, name, surname, type VALUES (?, ?, ?, ?, ?)";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('sssss',$username, $password, $name, $surname, $type);
        return $stmt->execute();
    }

    public function getUserInfoByUsername($username){
        $query = "SELECT username, name, surname, type FROM funside.user WHERE username = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ss',$username);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    //ADDRESS
    public function addAddressToUser($username, $address) {
        $query = "INSERT INTO funside.address (user, add) VALUES (?, ?)";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ss',$username, $address);
        return $stmt->execute();
    }

    public function getAddressesFromUser($username) {
        $query = "SELECT add FROM funside.address WHERE user = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s',$username);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function deleteAddressToUser($username, $address) {
        $query = "DELETE FROM funside.address WHERE user = ? AND address = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ss',$username, $address);
        return $stmt->execute();
    }

    //PRODUCT TYPE
    public function addProductType($type, $description, $image) {
        $query = "INSERT INTO funside.producttype (type, description, image) VALUES (?, ?, ?)";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('sss',$type, $description, $image);
        return $stmt->execute();
    }

    public function getProductTypeByType($type) {
        $query = "SELECT description, image FROM funside.producttype WHERE type = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ss',$type);
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getRandomProductTypes($n=3) {
        $query = "SELECT type, description, image FROM funside.producttype ORDER BY RAND() LIMIT ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i',$n);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getAllProductTypes() {
        $query = "SELECT type, description, image FROM funside.producttype ";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function deleteProductType($type) {
        $query = "DELETE FROM funside.producttype WHERE type = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ss',$type);
        return $stmt->execute();
    }

    //PRODUCT

    public function getRandomProducts() {
        $query = "SELECT name, price, description, brand FROM funside.product ORDER BY RAND()";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getBestSellers($n) {
        $query = "SELECT name, price, image, avgrating, sum(d.quantity) as tot FROM funside.product p, funside.orderdetail d WHERE p.idproduct = d.product GROUP BY p.idproduct LIMIT ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i',$n);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getBestRatings($n) {
        $query = "SELECT name, price, image, avgrating FROM funside.product ORDER BY avgrating LIMIT ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i',$n);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }
        
    //ORDER

    //ORDER DETAILS

    //NOTIFICATION

    public function addNotification($text, $user) {
        $query = "INSERT INTO funside.notification (text, user) VALUES (?, ?)";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ss',$text, $user);
        return $stmt->execute();
    }

    public function addNotificationAboutAnOrder($text, $user, $order) {
        $query = "INSERT INTO funside.notification (text, user, order) VALUES (?, ?, ?)";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ssi',$text, $user, $order);
        return $stmt->execute();
    }

    public function readNotification($idnotification) {
        $query = "UPDATE funside.notification SET isRead = TRUE WHERE idnotification = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i',$idnotification);
        return $stmt->execute();
    }

    public function getAllNotificationOfUser($username) {
        $query = "SELECT idnotification, title, text, isRead, `order`, date, time FROM funside.notification WHERE user = ? ORDER BY date DESC, time DESC";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s',$username);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);        
    }

    public function getAllNotificationOfUserNotRead($username) {
        $query = "SELECT idnotification, text, isRead, `order` date, time FROM funside.notification WHERE user = ? AND isRead = FALSE ORDER BY date DESC, time DESC";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ss',$username);
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);        
    }

    public function getAllNotificationOfUserRead($username) {
        $query = "SELECT idnotification, text, isRead, `order` date, time FROM funside.notification WHERE user = ? AND isRead = TRUE ORDER BY date DESC, time DESC";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ss',$username);
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);        
    }

    public function deleteNotification($idnotification) {
        $query = "DELETE FROM funside.notification WHERE idnotification = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i',$idnotification);
        return $stmt->execute();
    }

    //REVIEW

}
?>