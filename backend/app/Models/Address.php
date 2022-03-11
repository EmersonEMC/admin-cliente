<?php

namespace App\Models;

class Address
{
    private $id;
    private $description;
    private $number;
    private $city;
    private $state;
    private $clients_id;

    public function __construct()
    { }

    public function getId()
    {
        return $this->id;
    }

    public function setId($id)
    {
        $this->id = $id;
    }

    public function getDescription()
    {
        return $this->description;
    }

    public function setDescription($description)
    {
        $this->description = $description;
    }

    public function getNumber()
    {
        return $this->number;
    }

    public function setNumber($number)
    {
        $this->number = $number;
    }

    public function getCity()
    {
        return $this->city;
    }

    public function setCity($city)
    {
        $this->city = $city;
    }

    public function getState()
    {
        return $this->state;
    }

    public function setState($state)
    {
        $this->state = $state;
    }

    public function getClients_id()
    {
        return $this->clients_id;
    }

    public function setClients_id($clients_id)
    {
        $this->clients_id = $clients_id;
    }

    public function saveListAddress($Adresses, $clients_id)
    {
        try {
            $database = new \App\DB\Connection();
            $db = $database->openConnection();

            $stm = $db->prepare("INSERT INTO `address`(`description`, `number`, `city`, `state`, `clients_id`) VALUES (:description,:number,:city,:state,:clients_id)");
            foreach ($Adresses as $address) {
                $stm->bindParam(':description', $address->getDescription(), \PDO::PARAM_STR);
                $stm->bindParam(':number', $address->getNumber(), \PDO::PARAM_STR);
                $stm->bindParam(':city', $address->getCity(), \PDO::PARAM_STR);
                $stm->bindParam(':state', $address->getState(), \PDO::PARAM_STR);
                $stm->bindParam(':clients_id', $clients_id, \PDO::PARAM_INT);
                $stm->execute();
            }

            $count = $stm->rowCount();

            if ($count  > 0) {
                return true;
            }

            return false;
        } catch (\PDOException $x) {
            var_dump($x);
            die("Internal Server Error");
        } finally {
            $stm = null;
            $database->closeConnection();
        }
    }

    public function updateListAddress($Adresses)
    {
        try {
            $database = new \App\DB\Connection();
            $db = $database->openConnection();

            $stm = $db->prepare("UPDATE `address` SET `description`=:description,`number`=:number,`city`=:city,`state`=:state WHERE `id`=:id");
            foreach ($Adresses as $address) {
                $stm->bindParam(':description', $address->getDescription(), \PDO::PARAM_STR);
                $stm->bindParam(':number', $address->getNumber(), \PDO::PARAM_STR);
                $stm->bindParam(':city', $address->getCity(), \PDO::PARAM_STR);
                $stm->bindParam(':state', $address->getState(), \PDO::PARAM_STR);
                $stm->bindParam(':id', $address->getId(), \PDO::PARAM_INT);
                $stm->execute();
            }

            $count = $stm->rowCount();

            if ($count  > 0) {
                return true;
            }

            return false;
        } catch (\PDOException $x) {
            var_dump($x);
            die("Internal Server Error");
        } finally {
            $stm = null;
            $database->closeConnection();
        }
    }

    public function getAllAddress($client_id)
    {
        try {
            $database = new \App\DB\Connection();
            $db = $database->openConnection();

            $now = new \DateTime('NOW');
            $now = $now->format("Y-m-d H:i:s");

            $stm = $db->prepare("SELECT * FROM `address` WHERE `clients_id` = ?");
            $stm->bindParam(1, $client_id, \PDO::PARAM_INT);
            $stm->execute();
            $count = $stm->rowCount();

            if ($count  > 0) {
                $obj = $stm->fetchAll();
                return $obj;
            }

            return null;
        } catch (\PDOException $x) {
            var_dump($x);
            die("Internal Server Error");
        } finally {
            $stm = null;
            $database->closeConnection();
        }
    }

    public function deleteAddress($client_id)
    {
        try {
            $database = new \App\DB\Connection();
            $db = $database->openConnection();

            $stm = $db->prepare("DELETE FROM `address` WHERE `clients_id`=?");
            $stm->bindParam(1, $client_id, \PDO::PARAM_INT);
            $stm->execute();
            $count = $stm->rowCount();

            if ($count  > 0) {
                return true;
            }

            return false;
        } catch (\PDOException $x) {
            var_dump($x);
            die("Internal Server Error");
        } finally {
            $stm = null;
            $database->closeConnection();
        }
    }
}
