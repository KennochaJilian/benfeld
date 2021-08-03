<?php

namespace App\EventSubscriber;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Booking;
use App\Repository\UserRepository;
use App\Service\MailService;
use PhpParser\Node\Stmt\ElseIf_;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;

final class BookingMailSubscriber implements EventSubscriberInterface
{
    private $mailService;

    public function __construct(MailService $mailService, UserRepository $userRepository)
    {
        $this->mailService = $mailService;
        $this->userRepository = $userRepository; 
    }

    public static function getSubscribedEvents()
    { 
        return [
            KernelEvents::VIEW => ['sendMail', EventPriorities::POST_WRITE],
            KernelEvents::VIEW => ['sendMail', EventPriorities::PRE_SERIALIZE],
        ];
    }

    public function sendMail(ViewEvent $event): void
    {
        $booking = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if (!$booking instanceof Booking) {
            return;
        }

        if($method == Request::METHOD_POST){
            $adminUsers = $this->userRepository->findAdminUsers();
            $adminMails = []; 
    
            foreach ($adminUsers as $user) {
                $adminMails[]=$user->getEmail();
            }
    
            $this->mailService->bookingCreated($booking, $adminMails);

        }else if($method == Request::METHOD_PATCH){
            $this->mailService->bookingUpdated($booking); 
        }



    }
}