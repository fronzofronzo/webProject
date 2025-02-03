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
        $query = "SELECT  idproduct, name, price, description, brand, image, type FROM funside.product ORDER BY RAND()";
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

    public function addNotificationAboutAnOrder($text, $user, $order, $title)
    {
        $query = "INSERT INTO funside.notification (title, text, user, order) VALUES (?, ?, ?)";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('sssi',$title, $text, $user, $order);
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

    public function registerOrder($totalPrice, $user) {
        $query = "INSERT INTO funside.order (totalPrice, user) VALUES (?,?)";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ds', $totalPrice, $user);
        $stmt->execute();  // Esegui la query
        $result = $this->db->insert_id;
        $stmt->close();  // Chiudi lo statement
        return $result;
    }

    public function registerOrderDetail($product, $orderID, $quantity) {
        $query = "INSERT INTO `funside`.`orderdetail` (`product`, `order`, `quantity`) VALUES (?,?,?)";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('iii', $product,$orderID,$quantity);
        $stmt->execute();  // Esegui la query
        
        $stmt->close();  // Chiudi lo statement
        return ;
    }

    public function getOrdersDetailsByOrderId($orderid)
    {
        // Correzione della sintassi della query SQL: aggiunta la virgola tra le colonne selezionate
        $query = "SELECT p.idproduct AS id, p.name AS name, od.quantity AS quantity, p.price AS price, p.image AS image, (p.price * od.quantity) AS total
                  FROM `funside`.`orderdetail` od
                  JOIN `funside`.`product` p ON od.product = p.idproduct
                  WHERE od.order = ?";
        
        // Prepara la query
        $stmt = $this->db->prepare($query);
        
        // Associa il parametro $orderid al segnaposto (?)
        $stmt->bind_param('i', $orderid);
        
        // Esegui la query
        $stmt->execute();
        
        // Ottieni il risultato
        $result = $stmt->get_result();
        
        // Estrai tutti i risultati come array associativo
        $data = $result->fetch_all(MYSQLI_ASSOC);
        
        // Libera la memoria
        $result->free();
        
        // Chiudi lo statement
        $stmt->close();
        
        // Ritorna i dati
        return $data;
    }
    

    public function getStatsOrders($anno) {
        $query = "SELECT MONTH(o.dateorder) AS mese, SUM(od.quantity) AS quantita_totale FROM `funside`.`order` o JOIN `funside`.`orderdetail` od ON o.idorder = od.order WHERE YEAR(o.dateorder) = ? GROUP BY MONTH(o.dateorder) ORDER BY mese;";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i', $anno);  
        $stmt->execute(); 
        $result = $stmt->get_result();
        $data = $result->fetch_all(MYSQLI_ASSOC);
        $result->free();  // Libera la memoria
        $stmt->close();  // Chiudi lo statement
        return $data;
    }

    //CART
    public function getProductsInCart($user) {
        $query = "SELECT product.name, cartdetail.quantity, product.image, product.price, product.idproduct
        FROM funside.cartdetail
        JOIN funside.product ON cartdetail.product = product.idproduct
        WHERE cartdetail.user = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s', $user);  
        $stmt->execute(); 
        $result = $stmt->get_result();
        $data = $result->fetch_all(MYSQLI_ASSOC);
        $result->free();  // Libera la memoria
        $stmt->close();  // Chiudi lo statement
        return $data;
    }

    public function addProductToCart($product, $user, $quantity) { 
        try {
            $query = "INSERT INTO `funside`.`cartdetail` (product, user, quantity) VALUES
            (?, ?, ?)";
            $stmt = $this->db->prepare($query);
            $stmt-> bind_param('isi', $product, $user, $quantity);
            $stmt->execute(); 
            $insertedId = $stmt->insert_id;
            $stmt->close(); // Chiudi lo statement
            return ["success" => true, "inserted_id" => $insertedId];
        } catch (Exception $e ) {
            return ["success" => false, "error" => $e->getMessage()];
        }
    }

    public function removeProductFromCart($product, $user) {
        $query = "DELETE FROM funside.cartdetail WHERE product=? AND user = ? ";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('is', $product, $user);
        $stmt->execute(); 
        $stmt->close();
    }
}
?>