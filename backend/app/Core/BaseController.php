<?php

namespace  App\Core;

class BaseController
{
    protected function getResponse($data)
    {
        return $this->toJSON(null, $data);
    }

    protected function createResponse($data)
    {
        return $this->toJSON("Criado com sucesso!", $data);
    }

    protected function updateResponse($data)
    {
        return $this->toJSON("Alterado com sucesso!", $data);
    }

    protected function deleteResponse()
    {
        return $this->toJSON("Removido com sucesso!");
    }

    protected function toJSON($message = null, $data = null)
    {
        $response['message'] = $message;
        $response['data'] = $data;

        return json_encode($response);
    }
}
