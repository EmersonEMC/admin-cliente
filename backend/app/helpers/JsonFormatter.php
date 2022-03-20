<?php

namespace App\Helpers;

class JsonFormatter
{
    protected function toJSONPaginate($message = null, $data = null, $key)
    {
        header('HTTP/1.0 200 OK');
        $response['message'] = $message;
        $response['data'] = $data[$key];
        $response['recordsFiltered'] = $data['count'];
        $response['recordsTotal'] = $data['count'];

        return json_encode($response);
    }

    protected function toJSON($message = null, $data = null)
    {
        header('HTTP/1.0 200 OK');
        $response['message'] = $message;
        $response['data'] = $data;

        return json_encode($response);
    }

   protected function toJSON200($message = null, $data = null)
    {
        header('HTTP/1.0 200 OK');
        $response['message'] = $message;
        $response['data'] = $data;

        return json_encode($response);
    }

    function toJSON401($message = null, $data = null)
    {
        header('HTTP/1.0 401 Unauthorized');
        $response['message'] = $message;
        $response['data'] = $data;

        return json_encode($response);
    }

    function toJSON400($message = null, $data = null)
    {
        header('HTTP/1.0 400 Bad Request');
        $response['message'] = $message;
        $response['data'] = $data;

        return json_encode($response);
    }
}
