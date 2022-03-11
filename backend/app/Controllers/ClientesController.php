<?php

namespace App\Controllers;

use App\Core\BaseController;
use \App\Models\Clients;
use \App\Models\Address;

class ClientesController extends BaseController
{

    public function getAll()
    {

        $clients = new Clients();

        $data = $clients->getAllClients();
        $response = $this->getResponse($data);
        echo $response;
    }

    public function getOne($id)
    {

        $clients = new Clients();

        $data = $clients->getOneClient($id);
        $response = $this->getResponse($data);
        echo $response;
    }


    public function create()
    {

        $input = (array) json_decode(file_get_contents('php://input'), TRUE);
        $clients = new Clients();
        $clients->setName($input['name']);
        $clients->setBirthday($input['birthday']);
        $clients->setCpf($input['cpf']);
        $clients->setRg($input['rg']);
        $clients->setPhone($input['phone']);
        $clients->setUsers_id($input['users_id']);

        $listAddress = array_filter($input, function ($k) {
            return strpos($k, '__') !== false;
        }, ARRAY_FILTER_USE_KEY);

        $address = new Address();
        $address->setDescription($input['description']);
        $address->setNumber($input['number']);
        $address->setCity($input['city']);
        $address->setState($input['state']);
        $clients->setAddress($address);

        $list = array();
        $i = 0;
        $j = 0;
        foreach ($listAddress as $key => $value) {

            if (substr($key, 0, strrpos($key, '__')) === 'description') {
                array_push($list, array(substr($key, 0, strrpos($key, '__')) => $value));
                if ($j > 0) {
                    $i++;
                }
                $j++;
            } else {
                $index = substr($key, 0, strrpos($key, '__'));
                $list[$i][$index] = $value;
            }
        }

        foreach ($list as $key => $value) {
            $address = new Address();
            $address->setDescription($value['description']);
            $address->setNumber($value['number']);
            $address->setCity($value['city']);
            $address->setState($value['state']);
            $clients->setAddress($address);
        }

        $data = $clients->saveClient($clients);
        $response = $this->createResponse($data);
        echo $response;
    }

    public function update($id)
    {
        $_PUT = array();
        parse_str(file_get_contents('php://input'), $_PUT);

        $listAddress = array_filter($_PUT, function ($k) {
            return strpos($k, '__') !== false;
        }, ARRAY_FILTER_USE_KEY);


        $list = array();
        $i = 0;
        $j = 0;
        foreach ($listAddress as $key => $value) {

            if (substr($key, 0, strrpos($key, '__')) === 'id') {
                array_push($list, array(substr($key, 0, strrpos($key, '__')) => $value));
                if ($j > 0) {
                    $i++;
                }
                $j++;
            } else {
                $index = substr($key, 0, strrpos($key, '__'));
                $list[$i][$index] = $value;
            }
        }

        $clients = new Clients();
        $clients->setId($id);
        $clients->setName($_PUT['name']);
        $clients->setBirthday($_PUT['birthday']);
        $clients->setCpf($_PUT['cpf']);
        $clients->setRg($_PUT['rg']);
        $clients->setPhone($_PUT['phone']);

        foreach ($list as $key => $value) {
            $address = new Address();
            $address->setId($value['id']);
            $address->setDescription($value['description']);
            $address->setNumber($value['number']);
            $address->setCity($value['city']);
            $address->setState($value['state']);
            $clients->setAddress($address);
        }

        $data = $clients->updateClient($clients);
        $response = $this->updateResponse($data);
        echo $response;
    }

    public function delete($id)
    {
        $clients = new Clients();
        $clients->deleteClient($id);

        $response = $this->deleteResponse();
        echo $response;
    }
}
