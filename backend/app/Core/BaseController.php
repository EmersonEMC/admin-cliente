<?php

namespace  App\Core;

use \App\Helpers\JsonFormatter;

class BaseController extends JsonFormatter
{

    protected function getRequestData()
    {
        return (array) json_decode(file_get_contents('php://input'), TRUE);
    }

    protected function getResponsePaginate($data, $key)
    {
        return $this->toJSONPaginate(null, $data, $key);
    }

    protected function getResponse($data, $message = null)
    {
        if ($data === null) {
            $message = "Não foi possivel encontrar o(s) dado(s) solicitado(s)";
        }

        return $this->toJSON($message, $data);
    }

    protected function createResponse($data)
    {
        if ($data) {
            return $this->toJSON200("Criado com sucesso!", $data);
        } else {
            return $this->toJSON400("Não foi possivel criar", $data);
        }
    }

    protected function updateResponse($data)
    {
        if ($data) {
            return $this->toJSON200("Alterado com sucesso!", $data);
        } else {
            return $this->toJSON400("Não foi possivel alteracao", $data);
        }
    }

    protected function deleteResponse($data)
    {
        if ($data) {
            return $this->toJSON200("Removido com sucesso!", $data);
        } else {
            return $this->toJSON400("Não foi possivel remover", $data);
        }
    }
}
