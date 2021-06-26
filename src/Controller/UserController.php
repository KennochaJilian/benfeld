<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends AbstractController
{
    /**
     * @Route("api/users/me", name="user_me")
     */
    public function index(Request $request): Response
    {

        dd($request); 

        return $this->json([
            'user' => "toto"
        ]);
    }
}
