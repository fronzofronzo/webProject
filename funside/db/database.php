<?php

class DatabaseHelper
{
    private $db;

    public function __construct($servername, $username, $password, $dbname, $port)
    {
        $this->db = new mysqli($servername, $username, $password, $dbname, $port);
        if ($this->db->connect_error) {
            die("" . $this->db->connect_error);
        }
    }

    //USER
    public function checkLogin($username, $password)
    {
        $query = "SELECT username, name, surname, type FROM funside.user WHERE username = ? AND password = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ss', $username, $password);
        $stmt->execute();
        $result = $stmt->get_result();
        $data = $result->fetch_all(MYSQLI_ASSOC);
        $result->free(); // Libera la memoria
        $stmt->close();  // Chiudi lo statement
        return $data;
    }
    public function registerUser($username, $password, $name, $surname, $type)
    {
        $query = "INSERT INTO funside.user (username, password, name, surname, type) VALUES (?, ?, ?, ?, ?)";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('sssss', $username, $password, $name, $surname, $type);
        try {
            $data = $stmt->execute();
            $stmt->close();  // Chiudi lo statement
            return $data;
        } catch (mysqli_sql_exception $e) {
            return false;
        }
    }

    public function getUserInfoByUsername($username)
    {
        $query = "SELECT username, name, surname, type FROM funside.user WHERE username = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s', $username);
        $stmt->execute();
        $result = $stmt->get_result();
        $data = $result->fetch_all(MYSQLI_ASSOC);
        $result->free();
        $stmt->close();
        return $data;
    }

    public function updatePasswordByUser($username, $newpassword)
    {
        $query = "UPDATE funside.user SET `password` = ? WHERE username = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ss', $newpassword, $username);
        $data = $stmt->execute();
        $stmt->close();
        return $data;
    }

    //ADDRESS
    public function addAddressToUser($username, $address)
    {
        $query = "INSERT INTO funside.address (user, `add`) VALUES (?, ?)";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ss', $username, $address);
        $data = $stmt->execute();
        $stmt->close();  // Chiudi lo statement
        return $data;
    }

    public function getAddressesFromUser($username)
    {
        $query = "SELECT `id`, `add` FROM funside.address WHERE `user` = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s', $username);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $data = [];
        while ($row = $result->fetch_assoc()) {
            $data[] = [
                "id" => $row["id"],
                "add" => $row["add"]
            ];
        }
    
        $result->free();
        $stmt->close();
    
        return $data;
    }
    

    public function deleteAddressByIdAddress($idaddress)
    {
        $query = "DELETE FROM funside.address WHERE id = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i', $idaddress);
        $data = $stmt->execute();
        $stmt->close();  // Chiudi lo statement
        return $data;
    }

    //PRODUCT TYPE
    public function addProductType($type, $description, $image)
    {
        $query = "INSERT INTO funside.producttype (type, description, image) VALUES (?, ?, ?)";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('sss', $type, $description, $image);
        $data = $stmt->execute();
        $stmt->close();  // Chiudi lo statement
        return $data;
    }

    public function getProductTypeByType($type)
    {
        $query = "SELECT description, image FROM funside.producttype WHERE type = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s', $type);
        $stmt->execute();
        $result = $stmt->get_result();
        $data = $result->fetch_all(MYSQLI_ASSOC);
        $result->free(); // Libera la memoria
        $stmt->close();  // Chiudi lo statement
        return $data;
    }

    public function getRandomProductTypes($n = 3)
    {
        $query = "SELECT type, description, image FROM funside.producttype ORDER BY RAND() LIMIT ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i', $n);
        $stmt->execute();
        $result = $stmt->get_result();
        $data = $result->fetch_all(MYSQLI_ASSOC);
        $result->free(); // Libera la memoria
        $stmt->close();  // Chiudi lo statement
        return $data;
    }

    public function getAllProductTypes()
    {
        $query = "SELECT type, description, image FROM funside.producttype";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        $result = $stmt->get_result();
        $data = $result->fetch_all(MYSQLI_ASSOC);
        $result->free(); // Libera la memoria
        $stmt->close();  // Chiudi lo statement
        return $data;
    }

    public function deleteProductType($type)
    {
        $query = "DELETE FROM funside.producttype WHERE type = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s', $type);
        $data = $stmt->execute();
        $stmt->close();  // Chiudi lo statement
        return $data;
    }

    //PRODUCT
    public function getRandomProducts()
    {
        $query = "SELECT  idproduct, name, price, description, brand, type FROM funside.product ORDER BY RAND()";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        $result = $stmt->get_result();
        $data = $result->fetch_all(MYSQLI_ASSOC);
        $result->free(); // Libera la memoria
        $stmt->close();  // Chiudi lo statement
        return $data;
    }

    public function getProductByID($id){
        $query = "SELECT `name`, price, description, brand,avgrating, minnumplayers, maxnumplayers, numpages, type, image FROM funside.product WHERE idproduct = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $data = $result->fetch_assoc();
        $result->free(); // Libera la memoria
        $stmt->close();  // Chiudi lo statement
        return $data;
    }

    public function getBestSellers($n)
    {
        $query = "SELECT name, price, image, avgrating, sum(d.quantity) as tot FROM funside.product p, funside.orderdetail d WHERE p.idproduct = d.product GROUP BY p.idproduct LIMIT ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i', $n);
        $stmt->execute();
        $result = $stmt->get_result();
        $data = $result->fetch_all(MYSQLI_ASSOC);
        $result->free(); // Libera la memoria
        $stmt->close();  // Chiudi lo statement
        return $data;
    }

    public function getBestRatings($n)
    {
        $query = "SELECT name, price, image, avgrating FROM funside.product ORDER BY avgrating LIMIT ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i', $n);
        $stmt->execute();
        $result = $stmt->get_result();
        $data = $result->fetch_all(MYSQLI_ASSOC);
        $result->free(); // Libera la memoria
        $stmt->close();  // Chiudi lo statement
        return $data;
    }

    public function getReviewsByID($id) { 
        $query = "SELECT user, rating, text FROM `review` WHERE product=?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $data = $result->fetch_all(MYSQLI_ASSOC);
        $result->free(); // Libera la memoria
        $stmt->close();  // Chiudi lo statement
        return $data;
    }

    //NOTIFICATION
    public function addNotification($text, $user)
    {
        $query = "INSERT INTO funside.notification (text, user) VALUES (?, ?)";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ss', $text, $user);
        $data = $stmt->execute();
        $stmt->close();  // Chiudi lo statement
        return $data;
    }

    public function addNotificationAboutAnOrder($text, $user, $order)
    {
        $query = "INSERT INTO funside.notification (text, user, order) VALUES (?, ?, ?)";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ssi', $text, $user, $order);
        $data = $stmt->execute();
        $stmt->close();  // Chiudi lo statement
        return $data;
    }

    public function readNotification($idnotification)
    {
        $query = "UPDATE funside.notification SET isRead = TRUE WHERE idnotification = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i', $idnotification);
        $data = $stmt->execute();
        $stmt->close();  // Chiudi lo statement
        return $data;
    }

    public function getAllNotificationOfUser($username)
    {
        $query = "SELECT idnotification, title, text, isRead, `order`, date, time FROM funside.notification WHERE user = ? ORDER BY date DESC, time DESC";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s', $username);
        $stmt->execute();
        $result = $stmt->get_result();
        $data = $result->fetch_all(MYSQLI_ASSOC);
        $result->free(); // Libera la memoria
        $stmt->close();  // Chiudi lo statement
        return $data;
    }

    public function getAllNotificationOfUserNotRead($username)
    {
        $query = "SELECT idnotification, text, isRead, `order`, date, time FROM funside.notification WHERE user = ? AND isRead = FALSE ORDER BY date DESC, time DESC";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s', $username);
        $stmt->execute();
        $result = $stmt->get_result();
        $data = $result->fetch_all(MYSQLI_ASSOC);
        $result->free(); // Libera la memoria
        $stmt->close();  // Chiudi lo statement
        return $data;
    }

    public function getAllNotificationOfUserRead($username)
    {
        $query = "SELECT idnotification, text, isRead, `order`, date, time FROM funside.notification WHERE user = ? AND isRead = TRUE ORDER BY date DESC, time DESC";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s', $username);
        $stmt->execute();
        $result = $stmt->get_result();
        $data = $result->fetch_all(MYSQLI_ASSOC);
        $result->free(); // Libera la memoria
        $stmt->close();  // Chiudi lo statement
        return $data;
    }

    public function getUnreadNotificationsCount($username)
    {
        $query = "SELECT count(idnotification) FROM funside.notification WHERE user = ? AND isRead = FALSE";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s', $username);
        $result = $stmt->get_result();
        $data = $result->fetch_all(MYSQLI_ASSOC);
        $result->free(); // Libera la memoria
        $stmt->close();  // Chiudi lo statement
        return $data;
    }

    public function deleteNotification($idnotification)
    {
        $query = "DELETE FROM funside.notification WHERE idnotification = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i', $idnotification);
        $data = $stmt->execute();
        $stmt->close();  // Chiudi lo statement
        return $data;
    }

    //REVIEW

    //ORDERS
    public function getOrdersByUser($username)
    {
        $query = "SELECT idorder, dateorder, datedelivery, status, totalprice, `user` FROM `funside`.`order` WHERE `user` = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s', $username);
        $stmt->execute();  // Esegui la query
        $result = $stmt->get_result();
        $data = $result->fetch_all(MYSQLI_ASSOC);
        $result->free();  // Libera la memoria
        $stmt->close();  // Chiudi lo statement
        return $data;
    }

    public function getOrdersDetailsByOrderId($orderid)
    {
        $query = "SELECT p.name AS name, od.quantity AS quantity, p.price AS price, p.image As image, (p.price * od.quantity) as total FROM `funside`.`orderdetail` od JOIN `funside`.`product` p ON od.product = p.idproduct WHERE od.order = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i', $orderid);  // Usa $orderid qui, non $username
        $stmt->execute();  // Esegui la query
        $result = $stmt->get_result();
        $data = $result->fetch_all(MYSQLI_ASSOC);
        $result->free();  // Libera la memoria
        $stmt->close();  // Chiudi lo statement
        return $data;
    }


}
?>