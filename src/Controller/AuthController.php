<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\BookingRepository;
use App\Repository\UserRepository;
use App\Service\MailService;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AuthController extends AbstractController
{
    /**
     * @Route("api/register", name="register")
     * 
     */
    public function index(Request $request, UserPasswordEncoderInterface $encoder, SerializerInterface $serializer, EntityManagerInterface $em): Response
    {
        $data = $request->getContent();
        $user = $serializer->deserialize($data, User::class, 'json');
        $hash = $encoder->encodePassword($user, $user->getPassword());
        $user->setPassword($hash);
        $user->setIsDeleted(FALSE); 
        $em->persist($user);
        $em->flush();
        return $this->json([
            'user' => $user->getEmail()
        ]);
    }
     /**
     * @Route("send_mail", name="register")
     * 
     */
    public function send_mail(MailService $service, BookingRepository $repo, UserRepository $userRepo): Response
    {

        $booking = $repo->findOneBy(['id' => 59]);
        $adminUsers = $userRepo->findAdminUsers();
        $adminMails = []; 

        foreach ($adminUsers as $user) {
            $adminMails[]=$user->getEmail();
        }

        $service->bookingCreated($booking, $adminMails);

        return $this->json(["response" => "ok"]);
    }
}
