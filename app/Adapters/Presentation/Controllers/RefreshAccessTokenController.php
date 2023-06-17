<?php

namespace App\Adapters\Presentation\Controllers;

use App\Main\Config\HttpRequest;
use App\Usecases\RefreshAccessToken\RefreshAccessToken;
use App\Usecases\RefreshAccessToken\RefreshAccessTokenInputData;
use App\Utils\HttpUtils;

class RefreshAccessTokenController
{
    private $refreshAccessToken;

    function __construct(RefreshAccessToken $refreshAccessToken)
    {
        $this->refreshAccessToken = $refreshAccessToken;
    }

    function handle(HttpRequest $request)
    {
        try {
            $inputData = new RefreshAccessTokenInputData($request->body["refresh_token"]);
            $refreshAccessTokenResponse = $this->refreshAccessToken->execute($inputData);

            HttpUtils::ok($refreshAccessTokenResponse);
        } catch (\Exception $exception) {
            HttpUtils::badRequest($exception->getMessage());
        }
    }
}
