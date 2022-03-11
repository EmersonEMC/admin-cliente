<?php
require './../vendor/autoload.php';
require_once './../config/config.php';
require_once './../config/env.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require './../app/Core/routes.php';

if (isset($_GET['error'])) {
    echo '<div style="position: absolute;top: 0;text-align: center;padding: 10px 0;width: 100%;color: red;">' . $_GET['error'] . '</div>';
}
