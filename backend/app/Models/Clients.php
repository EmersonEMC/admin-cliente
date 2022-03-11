<?php

namespace App\Models;

use App\Models\Address;

class Clients extends Address
{

    private $id;
    private $name;
    private $birthday;
    private $cpf;
    private $rg;
    private $phone;
    private $users_id;
    private $created_at;
    private $updated_at;

    private $address;

    public function __construct()
    {
        $this->address = array();
    }

    public function getId()
    {
        return $this->id;
    }

    public function setId($id)
    {
        $this->id = $id;
    }

    public function getName()
    {
        return $this->name;
    }

    public function setName($name)
    {
        $this->name = $name;
    }

    public function getBirthday()
    {
        return $this->birthday;
    }

    public function setBirthday($birthday)
    {
        $this->birthday = $birthday;
    }

    public function getCpf()
    {
        return $this->cpf;
    }

    public function setCpf($cpf)
    {
        $this->cpf = $cpf;
    }

    public function getRg()
    {
        return $this->rg;
    }

    public function setRg($rg)
    {
        $this->rg = $rg;
    }

    public function getPhone()
    {
        return $this->phone;
    }

    public function setPhone($phone)
    {
        $this->phone = $phone;
    }

    public function getUsers_id()
    {
        return $this->users_id;
    }

    public function setUsers_id($users_id)
    {
        $this->users_id = $users_id;
    }

    public function getCreated_at()
    {
        return $this->created_at;
    }

    public function setCreated_at($created_at)
    {
        $this->created_at = $created_at;
    }

    public function getUpdated_at()
    {
        return $this->updated_at;
    }

    public function setUpdated_at($updated_at)
    {
        $this->updated_at = $updated_at;
    }

    public function getAddress()
    {
        return $this->address;
    }

    public function setAddress($address)
    {
        array_push($this->address, $address);
    }

    public function getOneClient($id)
    {
        try {
            $database = new \App\DB\Connection();
            $db = $database->openConnection();

            $stm = $db->prepare("SELECT * FROM `clients` WHERE `id` = ?");
            $stm->bindParam(1, $id, \PDO::PARAM_INT);
            $stm->execute();
            $count = $stm->rowCount();

            if ($count  > 0) {
                $client = $stm->fetch();
                $addresses = parent::getAllAddress($client['id']);
                $client['addresses'] = $addresses;
                return $client;
            }

            return null;
        } catch (\PDOException $x) {
            die("Internal Server Error");
        } finally {
            $stm = null;
            $database->closeConnection();
        }
    }

    public function getAllClients()
    {
        try {
            $database = new \App\DB\Connection();
            $db = $database->openConnection();

            $stm = $db->prepare("SELECT * FROM `clients`");
            $stm->execute();
            $count = $stm->rowCount();

            if ($count  > 0) {
                $clients = $stm->fetchAll();
                foreach ($clients as $key => $client) {
                    $addresses = parent::getAllAddress($client['id']);
                    $clients[$key]['addresses'] = $addresses;
                }

                return $clients;
            }

            return null;
        } catch (\PDOException $x) {
            die("Internal Server Error");
        } finally {
            $stm = null;
            $database->closeConnection();
        }
    }

    public function saveClient($client)
    {

        try {
            $database = new \App\DB\Connection();
            $db = $database->openConnection();

            $now = new \DateTime('NOW');
            $now = $now->format("Y-m-d H:i:s");

            $stm = $db->prepare("INSERT INTO `clients`(`name`, `birthday`, `cpf`, `rg`, `phone`, `users_id`, `created_at`) VALUES (?,?,?,?,?,?,?)");
            $stm->bindParam(1, $client->getName(), \PDO::PARAM_STR);
            $stm->bindParam(2, $client->getBirthday(), \PDO::PARAM_STR);
            $stm->bindParam(3, $client->getCpf(), \PDO::PARAM_STR);
            $stm->bindParam(4, $client->getRg(), \PDO::PARAM_STR);
            $stm->bindParam(5, $client->getPhone(), \PDO::PARAM_STR);
            $stm->bindParam(6, $client->getUsers_id(), \PDO::PARAM_INT);
            $stm->bindParam(7, $now);

            $stm->execute();

            $lastId = $db->lastInsertId();

            if ($lastId  > 0) {
                if (parent::saveListAddress($client->getAddress(), $lastId)) {
                    return true;
                }
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

    public function updateClient($client)
    {
        try {
            $database = new \App\DB\Connection();
            $db = $database->openConnection();

            $now = new \DateTime('NOW');
            $now = $now->format("Y-m-d H:i:s");

            $stm = $db->prepare("UPDATE `clients` SET `name`=?,`birthday`=?,`cpf`=?,`rg`=?,`phone`=?,`updated_at`=? WHERE `id`=?");
            $stm->bindParam(1, $client->getName(), \PDO::PARAM_STR);
            $stm->bindParam(2, $client->getBirthday(), \PDO::PARAM_STR);
            $stm->bindParam(3, $client->getCpf(), \PDO::PARAM_STR);
            $stm->bindParam(4, $client->getRg(), \PDO::PARAM_STR);
            $stm->bindParam(5, $client->getPhone(), \PDO::PARAM_STR);
            $stm->bindParam(6, $now);
            $stm->bindParam(7, $client->getId(), \PDO::PARAM_INT);

            $stm->execute();
            $count = $stm->rowCount();

            if ($count  > 0) {
                if (parent::updateListAddress($client->getAddress())) {
                    return true;
                }
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

    public function deleteClient($id)
    {
        parent::deleteAddress($id);

        try {
            $database = new \App\DB\Connection();
            $db = $database->openConnection();

            $stm = $db->prepare("DELETE FROM `clients` WHERE `id`=?");
            $stm->bindParam(1, $id, \PDO::PARAM_INT);
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
