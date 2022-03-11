<?php

namespace App\Controllers;

use \App\Models\Users;

class LoginController
{

    public function login()
    {
        $userLogin = new Users();
        $isLogin = $userLogin->login($_POST['email'], $_POST['password']);
        // if ($isLogin) {
        //     header('Location: /');
        // } else {
        //     header('Location: /login?error=Login e/ou senha incorretos');
        // }
    }

    public function logout()
    {
        $_SESSION = array();
        session_destroy();

    }
}
