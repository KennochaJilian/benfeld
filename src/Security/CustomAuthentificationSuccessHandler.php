<?php
namespace App\Security;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationFailureEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Security\Http\Authentication\AuthenticationSuccessHandler;

class CustomAuthentificationSuccessHandler extends AuthenticationSuccessHandler
{
    public function handleAuthenticationSuccess(UserInterface $user, $jwt = null){
        
        if($user->getIsDeleted()){            
            return new Response("User deleted", 401);                   
        }; 
        
        return parent::handleAuthenticationSuccess($user, $jwt); 
        
    }
}