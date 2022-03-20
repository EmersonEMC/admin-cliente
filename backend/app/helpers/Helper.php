<?php

namespace App\Helpers;

class Helper
{

    public static function generateJwt($headers, $payload, $secret = 'secret')
    {
        $headers_encoded = Helper::base64urlEncode(json_encode($headers));

        $payload_encoded = Helper::base64urlEncode(json_encode($payload));

        $signature = hash_hmac('SHA256', "$headers_encoded.$payload_encoded", $secret, true);
        $signature_encoded = Helper::base64urlEncode($signature);

        $jwt = "$headers_encoded.$payload_encoded.$signature_encoded";

        return $jwt;
    }

    public static function base64urlEncode($str)
    {
        return rtrim(strtr(base64_encode($str), '+/', '-_'), '=');
    }

    public static function isJwtValid($jwt, $secret = 'secret')
    {

        $tokenParts = explode('.', $jwt);
        $header = base64_decode($tokenParts[0]);
        $payload = base64_decode($tokenParts[1]);
        $signature_provided = $tokenParts[2];

        $expiration = json_decode($payload)->exp;
        $is_token_expired = ($expiration - time()) < 0;

        $base64_url_header = Helper::base64urlEncode($header);
        $base64_url_payload = Helper::base64urlEncode($payload);
        $signature = hash_hmac('SHA256', $base64_url_header . "." . $base64_url_payload, $secret, true);
        $base64_url_signature = Helper::base64urlEncode($signature);

        $is_signature_valid = ($base64_url_signature === $signature_provided);

        if ($is_token_expired || !$is_signature_valid) {
            return FALSE;
        } else {
            return TRUE;
        }
    }

    public static function authorizationValidate()
    {
        $token = Helper::getAuthorizationHeader();

        if ($token === null) {
            return false;
        }

        return Helper::isJwtValid($token, JWT_SECRET);
    }

    public static function getAuthorizationHeader()
    {
        $headers = null;
        if (isset($_SERVER['Authorization'])) {
            $headers = trim($_SERVER["Authorization"]);
        } else if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
            $headers = trim($_SERVER["HTTP_AUTHORIZATION"]);
        } elseif (function_exists('apache_request_headers')) {
            $requestHeaders = apache_request_headers();
            $requestHeaders = array_combine(array_map('ucwords', array_keys($requestHeaders)), array_values($requestHeaders));
            if (isset($requestHeaders['Authorization'])) {
                $headers = trim($requestHeaders['Authorization']);
            }
        }
        return $headers;
    }


    public static function getBearerToken()
    {
        $headers = Helper::getAuthorizationHeader();
        if (!empty($headers)) {
            if (preg_match('/Bearer\s(\S+)/', $headers, $matches)) {
                return $matches[1];
            }
        }
        return null;
    }
}
