<?php

namespace App\Controllers;

use App\Helpers\Helper;
use App\Helpers\JsonFormatter;
use \App\Models\User;

class LoginController extends JsonFormatter
{

    public function login()
    {
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);

        $userLogin = new User();
        $isLogin = $userLogin->login($input['email'], $input['password']);

        if ($isLogin === null) {
            echo $this->toJSON401('Email e/ou senha incorretos!');
            exit();
        }

        $headers = array('alg' => 'HS256', 'typ' => 'JWT');
        $payload = array('sub' => $isLogin->getId(), 'name' => $isLogin->getName(), 'email' => $isLogin->getEmail(), 'exp' => (time() + 60));

        $jwt = Helper::generateJwt($headers, $payload, JWT_SECRET);
        $payload['token'] = $jwt;
        echo $this->toJSON200(null, $payload);
    }
}
