<?php

require './../vendor/autoload.php';
require_once './../config/config.php';
require_once './../config/env.php';
require './../app/interfaces/resource.php';
require './../app/helpers/Helper.php';
require './../app/helpers/JsonFormatter.php';
require './../app/helpers/Validator.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    return;

}

require './../app/Core/Routes.php';
