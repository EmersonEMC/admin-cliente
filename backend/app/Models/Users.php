<?php

namespace App\Models;

class Users
{
    private $id;
    private $email;
    private $name;
    private $password;
    private $created_at;
    private $updated_at;

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
    public function getEmail()
    {
        return $this->email;
    }

    public function setEmail($email)
    {
        $this->email = $email;
    }

    public function getName()
    {
        return $this->name;
    }

    public function setName($name)
    {
        $this->name = $name;
    }

    public function getPassword()
    {
        return $this->password;
    }

    public function setPassword($password)
    {
        $this->password = $password;
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

    public function login($email, $password)
    {
        try {
            $database = new \App\DB\Connection();
            $db = $database->openConnection();

            $stm = $db->prepare("SELECT * FROM `users` WHERE `email` = :email");
            $stm->setFetchMode(\PDO::FETCH_CLASS, self::class);
            $stm->bindParam(":email", $email);
            $stm->execute();
            $users = $stm->fetch(\PDO::FETCH_CLASS);
            $stm->closeCursor();

            if ($users) {
                if (md5($password) === $users->password) {
                    $_SESSION['logged_in'] = TRUE;
                    $_SESSION['user_id'] = $users->id;
                    $_SESSION['user_name'] = $users->name;
                    return true;
                }
            }

            return false;
        } catch (\PDOException $x) {
            die("Internal Server Error");
        } finally {
            $stm = null;
            $database->closeConnection();
        }
    }
}
