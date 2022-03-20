
<?php

interface Resource
{
    public function save($data);
    public function getAll();
    public function getAllPaginate($start, $length, $order);
    public function getOne($id);
    public function update($data);
    public function delete($id);
}