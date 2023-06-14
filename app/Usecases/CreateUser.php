<?php

namespace App\Usecases;

use App\Domain\Entities\User;
use App\External\Repositories\UsersRepository;

class CreateUser
{
    private $usersRepository;

    function __construct(UsersRepository $usersRepository)
    {
        $this->usersRepository = $usersRepository;
    }

    function execute(array $userData)
    {
        $user = User::create($userData);

        $this->usersRepository->add([
            "username" => $user->getUsername(),
            "displayName" => $user->getDisplayName(),
            "email" => $user->getEmail(),
            "password" => $user->getPassword()
        ]);

        return $user;
    }
}
