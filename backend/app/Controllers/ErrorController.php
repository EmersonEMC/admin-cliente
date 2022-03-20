<?php

namespace App\Controllers;

class ErrorController
{

    public function notFound()
    {
        header('HTTP/1.1 404 Not Found');
        $response['message'] = 'Not Found';
        $response['data'] = null;

        echo json_encode($response);
    }
}
