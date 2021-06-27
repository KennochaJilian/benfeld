<?php

namespace App\Controller;

use App\Entity\User;
use App\Service\UserService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

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
        /**
     * @Route("api/users/{id}/updatePassword", name="user_update_password")
     * @Paramconverter("user", options={"mapping": {"id" : "id"}})
     */
    public function updatePassword(Request $request, UserPasswordEncoderInterface $encoder, SerializerInterface $serializer, EntityManagerInterface $em, User $user): Response
    {

        $data = json_decode($request->getContent());
        if(!$encoder->isPasswordValid($user, $data->oldPassword)){
            return $this->json("L'ancien mot de passe est invalide", 401);
        }
        $hash = $encoder->encodePassword($user, $data->newPassword);
        $user->setPassword($hash);
        $em->persist($user);
        $em->flush();        

        return $this->json("Mot de passe modifié", 200);
    }
}
