<?php
require_once 'env.php';

use Env\DotEnv;

error_reporting(E_ALL & ~E_NOTICE);

if (DIRECTORY_SEPARATOR == '/')
$absolute_path = dirname(dirname(__FILE__)) . DIRECTORY_SEPARATOR;
else
$absolute_path = str_replace('\\', '/', dirname(dirname(__FILE__)) . DIRECTORY_SEPARATOR);

(new DotEnv($absolute_path . '/.env'))->load();

// ENV SETTINGS
define('DB_CONNECTION', getenv('DB_CONNECTION'));
define('DB_HOST', getenv('DB_HOST'));
define('DB_PORT', getenv('DB_PORT'));
define('DB_DATABASE', getenv('DB_DATABASE'));
define('DB_CHARSET', 'utf8');
define('DB_USERNAME', getenv('DB_USERNAME'));
define('DB_PASSWORD', getenv('DB_PASSWORD'));
define('JWT_SECRET', getenv('JWT_SECRET'));
define('BASE_PATH', $absolute_path);
define('BASE_ROOT', $_SERVER['DOCUMENT_ROOT']);
define('BASE_HOST', "http://" . $_SERVER['HTTP_HOST'] );
define('APP_PATH', BASE_ROOT . "/");

// FILE PATHS
define("PATH_CONFIG", BASE_PATH . "config" . DIRECTORY_SEPARATOR);
