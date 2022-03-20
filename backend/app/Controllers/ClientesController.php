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
        $response = $this->getResponsePaginate($data, 'clients');
        echo $response;
    }

    public function search($url, $start, $lenght, $order)
    {
        $clients = new Clients();

        $data = $clients->getAllClientsPaginate($start, $lenght, $order);
        $response = $this->getResponsePaginate($data, 'clients');
        echo $response;
    }

    public function getOne($url, $id)
    {
        $clients = new Clients();

        $data = $clients->getOneClient($id);
        $response = $this->getResponse($data);
        echo $response;
    }


    public function create()
    {
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);

        $client = new Clients();
        $client->setName($input['name']);
        $client->setBirthday($input['birthday']);
        $client->setCpf($input['cpf']);
        $client->setRg($input['rg']);
        $client->setPhone($input['phone']);

        foreach ($input['addresses'] as $value) {
            $address = new Address();
            $address->setDescription($value['description']);
            $address->setNumber($value['number']);
            $address->setCity($value['city']);
            $address->setState($value['state']);
            $client->setAddress($address);
        }

        $data = $client->saveClient($client);
        $response = $this->createResponse($data);

        echo $response;
    }

    public function update($url, $id)
    {
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);

        $client = new Clients();
        $client->setId($id);
        $client->setName($input['name']);
        $client->setBirthday($input['birthday']);
        $client->setCpf($input['cpf']);
        $client->setRg($input['rg']);
        $client->setPhone($input['phone']);

        foreach ($input['addresses'] as $value) {
            $address = new Address();
            $address->setDescription($value['description']);
            $address->setNumber($value['number']);
            $address->setCity($value['city']);
            $address->setState($value['state']);
            $client->setAddress($address);
        }
        
        $data = $client->updateClient($client);
        $response = $this->updateResponse($data);
        echo $response;
    }

    public function delete($url, $id)
    {
        $clients = new Clients();
        $data = $clients->deleteClient($id);

        $response = $this->deleteResponse($data);
        echo $response;
    }
}
