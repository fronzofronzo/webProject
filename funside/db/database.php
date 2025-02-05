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

    public function getAllAdmins() {
        $query = "SELECT `username` FROM `funside`.`user` WHERE `type` = 'admin' ";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        $result = $stmt->get_result();
        $data = $result->fetch_all(MYSQLI_ASSOC);
        $result->free(); // Libera la memoria
        $stmt->close();  // Chiudi lo statement
        return $data;
    }
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
    public function getProductAvailability($id) {
        $query = "SELECT `availability` FROM `funside`.`product` WHERE `idproduct` = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $data = $result->fetch_all(MYSQLI_ASSOC);
        $result->free(); // Libera la memoria
        $stmt->close();  // Chiudi lo statement
        return $data;
    } 

    public function insertProduct($name, $price, $description, $category, $brand, $image)
    {
        $query = "INSERT INTO product (name, price, description, brand, type, image) 
                  VALUES (?, ?, ?, ?, ?, ?)";

        $stmt = $this->db->prepare($query);

        if (!$stmt) {
            return [false, null]; // Fallimento nella preparazione della query
        }

        // Associa i parametri ai segnaposto (s = stringa, d = decimale)
        $stmt->bind_param("sdssss", $name, $price, $description, $brand, $category, $image);

        $success = $stmt->execute();
        $productId = $stmt->insert_id; // Ottieni l'ID del prodotto appena inserito
        $stmt->close(); // Chiudi lo statement

        return [$success, $success ? $productId : null];
    }

    public function getRandomProducts()
    {
        $query = "SELECT  idproduct, name, price, description, brand, image, type FROM funside.product WHERE active=1 ORDER BY RAND() ";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        $result = $stmt->get_result();
        $data = $result->fetch_all(MYSQLI_ASSOC);
        $result->free(); // Libera la memoria
        $stmt->close();  // Chiudi lo statement
        return $data;
    }

    public function getProductByID($id)
    {
        $query = "SELECT `name`, price, description, brand,avgrating, minnumplayers, maxnumplayers, numpages, `type`, `active`, image FROM funside.product WHERE idproduct = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $data = $result->fetch_assoc();
        $result->free(); // Libera la memoria
        $stmt->close();  // Chiudi lo statement
        return $data;
    }

    public function getBestSellers($n = 3)
    {
        $query = "
            SELECT p.name, p.price, p.image, p.avgrating, p.idproduct, SUM(d.quantity) as tot 
            FROM funside.product p
            INNER JOIN funside.orderdetail d ON p.idproduct = d.product
            WHERE p.active=1
            GROUP BY p.idproduct
            ORDER BY tot DESC
            LIMIT ?
        ";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i', $n);
        $stmt->execute();
        $result = $stmt->get_result();
        $data = $result->fetch_all(MYSQLI_ASSOC);
        $result->free();
        $stmt->close();
        return $data;
    }


    public function getBestRatings($n)
    {
        $query = "SELECT name, price, image, avgrating, idproduct FROM funside.product WHERE avgrating is not NULL AND active=1 ORDER BY avgrating DESC LIMIT ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i', $n);
        $stmt->execute();
        $result = $stmt->get_result();
        $data = $result->fetch_all(MYSQLI_ASSOC);
        $result->free(); // Libera la memoria
        $stmt->close();  // Chiudi lo statement
        return $data;
    }

    public function getAllProducts()
    {
        $query = "SELECT idproduct, name, price, image, avgrating FROM funside.product WHERE active=1";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        $result = $stmt->get_result();
        $data = $result->fetch_all(MYSQLI_ASSOC);
        $result->free(); // Libera la memoria
        $stmt->close();  // Chiudi lo statement
        return $data;
    }

    public function getAllProductsWithStats()
    {
        $query = "SELECT p.idproduct, p.type, p.name, p.description, p.price, p.image, p.avgrating, COALESCE(SUM(od.quantity), 0) AS num_pieces_sold FROM funside.product p LEFT JOIN funside.orderdetail od ON p.idproduct = od.product GROUP BY p.idproduct, p.type, p.name, p.description, p.price, p.image, p.avgrating ORDER BY num_pieces_sold DESC;";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        $result = $stmt->get_result();
        $data = $result->fetch_all(MYSQLI_ASSOC);
        $result->free(); // Libera la memoria
        $stmt->close();  // Chiudi lo statement
        return $data;
    }

    public function updateProductById($id, $field, $value)
    {
        switch ($field) {
            case "imageproduct":
                $query = "UPDATE funside.product SET image = ? WHERE idproduct = ?";
                $stmt = $this->db->prepare($query);
                $stmt->bind_param('si', $value, $id);
                $data = $stmt->execute();
                break;
                ;
            case "typeproduct":
                $query = "UPDATE funside.product SET type = ? WHERE idproduct = ?";
                $stmt = $this->db->prepare($query);
                $stmt->bind_param('si', $value, $id);
                $data = $stmt->execute();
                break;
                ;
            case "brandproduct":
                $query = "UPDATE funside.product SET brand = ? WHERE idproduct = ?";
                $stmt = $this->db->prepare($query);
                $stmt->bind_param('si', $value, $id);
                $data = $stmt->execute();
                break;
                ;
            case "descriptionproduct":
                $query = "UPDATE funside.product SET description = ? WHERE idproduct = ?";
                $stmt = $this->db->prepare($query);
                $stmt->bind_param('si', $value, $id);
                $data = $stmt->execute();
                break;
                ;
            case "nameproduct":
                $query = "UPDATE funside.product SET name = ? WHERE idproduct = ?";
                $stmt = $this->db->prepare($query);
                $stmt->bind_param('si', $value, $id);
                $data = $stmt->execute();
                break;
                ;
            case "priceproduct":
                $query = "UPDATE funside.product SET price = ? WHERE idproduct = ?";
                $stmt = $this->db->prepare($query);
                $stmt->bind_param('ii', $value, $id);
                $data = $stmt->execute();
                break;
                ;
            default:
                return false;
        }
        $stmt->close();  // Chiudi lo statement
        return $data;
    }

    public function getReviewsByID($id)
    {
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

    public function addReview($user, $product, $text, $value)
    {
        try {
            $query = "INSERT INTO `funside`.`review` (`product`, `user`, `rating`, `text`)
        VALUES (?, ?, ?, ?)";
            $stmt = $this->db->prepare($query);
            $stmt->bind_param('isis', $product, $user, $value, $text);
            $stmt->execute();
            $result = $stmt->get_result();
            $stmt->close();

            $query = "
        UPDATE funside.product 
        SET avgrating = (
            SELECT AVG(rating) 
            FROM funside.review 
            WHERE funside.review.product = funside.product.idproduct
        ) 
        WHERE funside.product.idproduct = ?";
            $stmt = $this->db->prepare($query);
            $stmt->bind_param('i', $product);
            $stmt->execute();
            $stmt->close();
        } catch (Exception $e) {
            return ["result" => false, "error" => $e->getMessage()];
        }
        return ["result" => true];
    }

    public function removeProduct($id) {
        try {
            $query = "UPDATE `funside`.`product` SET `active` = 0 WHERE `idproduct` = ?";
            $stmt = $this->db->prepare($query);
            $stmt->bind_param("i", $id);
            $stmt->execute();
            $stmt->close();
        } catch (Exception $e) {
            return ["result" => false, "error" => $e->getMessage()];
        } 
        return ["result" => true];
    }

    //NOTIFICATION
    public function addNotification($text, $user, $title)
    {
        $query = "INSERT INTO `funside`.`notification` (`title`, `text`, `user`) VALUES (?, ?, ?)";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('sss',$title, $text, $user);
        $data = $stmt->execute();
        $stmt->close();  // Chiudi lo statement
        return $data;
    }

    public function addNotificationAboutAnOrder($text, $user, $order, $title)
    {
        $query = "INSERT INTO `funside`.`notification` (`title`, `text`, `user`, `order`) VALUES (?, ?, ?, ?)";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('sssi', $title, $text, $user, $order);
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

    public function registerOrder($totalPrice, $user)
    {
        $query = "INSERT INTO funside.order (totalPrice, user) VALUES (?,?)";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ds', $totalPrice, $user);
        $stmt->execute();  // Esegui la query
        $result = $this->db->insert_id;
        $stmt->close();  // Chiudi lo statement
        return $result;
    }

    public function registerOrderDetail($product, $orderID, $quantity)
    {
        $query = "INSERT INTO `funside`.`orderdetail` (`product`, `order`, `quantity`) VALUES (?,?,?)";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('iii', $product, $orderID, $quantity);
        $stmt->execute();  // Esegui la query

        $stmt->close();  // Chiudi lo statement
        return;
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


    public function getStatsOrders($anno)
    {
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

    public function getPendingOrders()
    {
        $query = "SELECT idorder, dateorder, status, totalprice, user, suspended FROM `funside`.`order` WHERE status != 'consegnato' ";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        $result = $stmt->get_result();
        $data = $result->fetch_all(MYSQLI_ASSOC);
        $result->free();  // Libera la memoria
        $stmt->close();  // Chiudi lo statement
        return $data;
    }

    public function getDeliveredOrders()
    {
        $query = "SELECT idorder, dateorder, status, totalprice, user, datedelivery FROM `funside`.`order` WHERE status = 'consegnato' ORDER BY datedelivery DESC";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        $result = $stmt->get_result();
        $data = $result->fetch_all(MYSQLI_ASSOC);
        $result->free();  // Libera la memoria
        $stmt->close();  // Chiudi lo statement
        return $data;
    }

    public function modifyStatus($id, $status)
    {
        try {
            $query = "UPDATE funside.order SET `status`= ? WHERE `idorder` = ? ";
            $stmt = $this->db->prepare($query);
            $stmt->bind_param('si', $status, $id);
            $stmt->execute();
            if ($status == "consegnato") {
                $query = "UPDATE `funside`.`order` SET `datedelivery` = CURRENT_DATE() WHERE `idorder` = ?";
                $stmt = $this->db->prepare($query);
                $stmt->bind_param('i', $id);
                $stmt->execute();
            }
        } catch (Exception $e) {
            return ["result" => false, "error" => $e->getMessage()];
        }
        return ["result" => true];
    }

    public function toggleSuspension($id)
    {
        try {
            $query = "UPDATE funside.order SET `suspended`= NOT `suspended` WHERE `idorder` = ? ";
            $stmt = $this->db->prepare($query);
            $stmt->bind_param('i', $id);
            $stmt->execute();
        } catch (Exception $e) {
            return ["result" => false, "error" => $e->getMessage()];
        }
        return ["result" => true];
    }


    //CART
    public function getProductsInCart($user)
    {
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

    public function addProductToCart($product, $user, $quantity)
    {
        try {
            $query = "UPDATE `funside`.`product` SET `availability` = `availability` - ? WHERE `idproduct` = ?"; 
            $stmt = $this->db->prepare($query);
            $stmt->bind_param('ii', $quantity, $product);
            $stmt->execute();
            $query = "INSERT INTO `funside`.`cartdetail` (product, user, quantity) VALUES
            (?, ?, ?)";
            $stmt = $this->db->prepare($query);
            $stmt->bind_param('isi', $product, $user, $quantity);
            $stmt->execute();
            $insertedId = $stmt->insert_id;
            $stmt->close(); // Chiudi lo statement
            return ["success" => true, "inserted_id" => $insertedId];
        } catch (Exception $e) {
            return ["success" => false, "error" => $e->getMessage()];
        }
    }

    public function removeProductFromCart($product, $user)
    {
        $query = "SELECT quantity FROM funside.cartdetail WHERE product=? AND user = ? ";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('is', $product, $user);
        $stmt->execute();
        $result = $stmt->get_result();
        $quantity = $result->fetch_all(MYSQLI_ASSOC);
        $result->free();  // Libera la memoria
        $stmt->close();  // Chiudi lo statement
        
        $query = "UPDATE `funside`.`product` SET `availability` = `availability` + ? WHERE idproduct = ? ";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ii',$quantity[0]["quantity"], $product);
        $stmt->execute();
        $stmt->close();

        $query = "DELETE FROM funside.cartdetail WHERE product=? AND user = ? ";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('is', $product, $user);
        $stmt->execute();
        $stmt->close();
    }

    public function emptyCart($user)
    {
        $query = "DELETE FROM `funside`.`cartdetail` WHERE `user` = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s', $user);
        $stmt->execute();
        $stmt->close();
    }
}
?>