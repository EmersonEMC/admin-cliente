<?php

namespace App\Helpers;

class Validator
{
    public static function validationRequired($fields, $data)
    {
        foreach ($fields as $field) {
            if (empty($data[$field])) {
                $message = "O Campo " . $field . " nao pode ser vazio";
                Validator::errorValidation($message);
                exit();
            }
        }
    }

    private static function errorValidation($message, $data = null)
    {

        header('HTTP/1.0 400 Bad Request');
        $response['message'] = $message;
        $response['data'] = $data;

        echo json_encode($response);
    }
}
