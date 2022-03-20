<?php
require './../vendor/autoload.php';
require_once './../config/config.php';
require_once './../config/env.php';
require './../app/helpers/Helper.php';
require './../app/helpers/JsonFormatter.php';
require './../app/helpers/Validator.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,PATCH,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require './../app/Core/Routes.php';
