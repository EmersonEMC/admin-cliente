<?php

namespace App\Controllers;

use App\Core\BaseController;
use App\Helpers\Validator;
use App\Models\Client;
use App\Models\Address;

class ClientesController extends BaseController
{

    public function getAll()
    {

        $clients = new Client();

        $data = $clients->getAll();
        $response = $this->getResponsePaginate($data, 'clients');
        echo $response;
    }

    public function search($url, $start, $lenght, $order)
    {
        $clients = new Client();

        $data = $clients->getAllPaginate($start, $lenght, $order);
        $response = $this->getResponsePaginate($data, 'clients');
        echo $response;
    }

    public function getOne($url, $id)
    {
        $clients = new Client();

        $data = $clients->getOne($id);
        $response = $this->getResponse($data);
        echo $response;
    }


    public function create()
    {
        $input = $this->getRequestData();

        $isValidFields = ['name', 'birthday', 'cpf', 'rg', 'phone'];
        Validator::validationRequired($isValidFields, $input);

        $client = new Client();
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

        $data = $client->save($client);
        $response = $this->createResponse($data);

        echo $response;
    }

    public function update($url, $id)
    {
        $input = $this->getRequestData();

        $isValidFields = ['name', 'birthday', 'cpf', 'rg', 'phone'];
        Validator::validationRequired($isValidFields, $input);

        $client = new Client();
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

        $data = $client->update($client);
        $response = $this->updateResponse($data);
        echo $response;
    }

    public function delete($url, $id)
    {
        $clients = new Client();
        $data = $clients->delete($id);

        $response = $this->deleteResponse($data);
        echo $response;
    }
}
