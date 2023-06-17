<?php

namespace App\Main;

use App\Factories\AuthUserFactory;
use App\Factories\CreateLinkFactory;
use App\Factories\CreateUserFactory;
use App\Factories\RefreshAccessTokenFactory;
use App\Main\Config\Router;

class Routes
{
    static function dispatch(): void
    {
        Router::post("/api/user", [CreateUserFactory::class, "execute"]);
        Router::post("/api/user/auth", [AuthUserFactory::class, "execute"]);
        Router::post("/api/user/refresh-token", [RefreshAccessTokenFactory::class, "execute"]);
        Router::post("/api/link", [CreateLinkFactory::class, "execute"]);
        
        Router::dispatch();
    }
}
