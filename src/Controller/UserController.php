<?php

namespace App\Controller;

use App\Service\UserService;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class UserController extends AbstractController
{
    /**
     * @Route("api/users/me", name="user_me")
     */
    public function me(UserService $userService, SerializerInterface $serializer): Response
    {

        $user = $userService->getCurrentUser();
        // $user = $serializer->serialize($user, 'json');       

        return $this->json($user);
    }
}
