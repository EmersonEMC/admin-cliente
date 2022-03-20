<?php

namespace App\DB;

class Connection
{
    private $dsn = DB_CONNECTION . ":host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_DATABASE . ";charset=" . DB_CHARSET;
    private $user = DB_USERNAME;
    private $pass = DB_PASSWORD;

    protected $pdo = null;

    private $options = [
        \PDO::ATTR_ERRMODE            => \PDO::ERRMODE_EXCEPTION,
        \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
        \PDO::ATTR_EMULATE_PREPARES   => false
    ];

    public function openConnection()
    {
        try {
            $this->pdo = new \PDO($this->dsn, $this->user, $this->pass, $this->options);
            return $this->pdo;
        } catch (\PDOException $e) {
            throw new \PDOException($e->getMessage(), (int) $e->getCode());
        }
    }

    public function closeConnection()
    {
        $this->con = null;
    }
}
