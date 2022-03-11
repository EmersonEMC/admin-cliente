<?php

namespace App\Controllers;

class ErrorController
{

    public function notFound()
    {
        $data['error'] = 'Page Not Found';

    }
}
