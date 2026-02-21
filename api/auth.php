<?php
// Pure PHP JWT Implementation (no external libraries needed)

function base64UrlEncode($data)
{
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

function base64UrlDecode($data)
{
    return base64_decode(strtr($data, '-_', '+/'));
}

function generateToken($payload)
{
    $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
    $payload['iat'] = time();
    $payload['exp'] = time() + (24 * 60 * 60); // 24 hours
    $payloadJson = json_encode($payload);

    $headerEncoded = base64UrlEncode($header);
    $payloadEncoded = base64UrlEncode($payloadJson);

    $signature = hash_hmac('sha256', "$headerEncoded.$payloadEncoded", JWT_SECRET, true);
    $signatureEncoded = base64UrlEncode($signature);

    return "$headerEncoded.$payloadEncoded.$signatureEncoded";
}

function verifyToken($token)
{
    $parts = explode('.', $token);
    if (count($parts) !== 3)
        return false;

    [$headerEncoded, $payloadEncoded, $signatureEncoded] = $parts;

    // Verify signature
    $expectedSignature = base64UrlEncode(
        hash_hmac('sha256', "$headerEncoded.$payloadEncoded", JWT_SECRET, true)
    );

    if (!hash_equals($expectedSignature, $signatureEncoded))
        return false;

    // Decode payload
    $payload = json_decode(base64UrlDecode($payloadEncoded), true);

    // Check expiration
    if (isset($payload['exp']) && $payload['exp'] < time())
        return false;

    return $payload;
}

function requireAuth()
{
    $headers = getallheaders();
    $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';

    if (empty($authHeader) || !str_starts_with($authHeader, 'Bearer ')) {
        http_response_code(403);
        echo json_encode(['error' => 'No token provided']);
        exit;
    }

    $token = substr($authHeader, 7);
    $payload = verifyToken($token);

    if (!$payload) {
        http_response_code(403);
        echo json_encode(['error' => 'Invalid or expired token']);
        exit;
    }

    return $payload;
}

// str_starts_with polyfill for PHP < 8.0
if (!function_exists('str_starts_with')) {
    function str_starts_with($haystack, $needle)
    {
        return substr($haystack, 0, strlen($needle)) === $needle;
    }
}
