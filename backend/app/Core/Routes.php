<?php

use \App\Helpers\Helper;
use \App\Helpers\JsonFormatter;

$router = new \App\Core\Router();
$router->setNamespace('\App\Controllers');
$router->set404('ErrorController@notFound');
$router->post('login', 'LoginController@login');

$router->before('GET|POST|PATCH|PUT|DELETE', '/clientes/.*', function () {
    $isValid = Helper::getAuthorizationHeader();
    if (!$isValid) {
        $json = new JsonFormatter();
        echo $json->toJSON401('Não autorizado');
        exit();
    }
});

$router->get('clientes', 'ClientesController@getAll');
$router->get('clientes/search(.*=.+)*(&.*=.+)?', 'ClientesController@search');
$router->get('clientes/{id}', 'ClientesController@getOne');
$router->post('clientes', 'ClientesController@create');
$router->patch('clientes/{id}', 'ClientesController@update');
$router->delete('clientes/{id}', 'ClientesController@delete');


$router->run();
