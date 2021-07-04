<?php

namespace App\Controller;

use App\Entity\Booking;
use App\Entity\User;
use App\Service\UserService;
use App\Repository\BookingRepository;
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

        return $this->json($user, 200, [], ['groups' => 'read:user']);
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


      /**
     * @Route("api/users/{id}/bookings", name="user_bookings")
     * @Paramconverter("user", options={"mapping": {"id" : "id"}})
     * 
     */
    public function listBookings(User $user, BookingRepository $bookingRepository, Request $request)
    {
        if (!$user) {
            return;
        }

        $status = $request->query->get('status');

        if ($status) {
            $bookings = $bookingRepository->findBy(['user' => $user->getId(), 'status' => $status]);
            
        } else {
            $bookings = $bookingRepository->findBy(['user' => $user->getId()]);
        }
        return $this->json($bookings, 200);
    }
    
}
