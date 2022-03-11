  
<?php

$router = new \App\Core\Router();
$router->setNamespace('\App\Controllers');
$router->set404('ErrorController@notFound');
$router->post('login', 'LoginController@login');
$router->get('logout', 'LoginController@logout');

$router->get('clientes', 'ClientesController@getAll');
$router->get('clientes/{id}', 'ClientesController@getOne');
$router->post('clientes', 'ClientesController@create');
$router->put('clientes/{id}', 'ClientesController@update');
$router->delete('clientes/{id}', 'ClientesController@delete');


$router->run();
