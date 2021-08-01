<?php

namespace App\Service\BookMailSubscriber;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Booking;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;

final class BookingMailSubscriber implements EventSubscriberInterface
{
    private $mailer;

    public function __construct(\Swift_Mailer $mailer)
    {
        $this->mailer = $mailer;
    }

    public static function getSubscribedEvents()
    {
        dd(); 
        return [
            KernelEvents::VIEW => ['sendMail', EventPriorities::POST_WRITE],
        ];
    }

    public function sendMail(ViewEvent $event): void
    {
        $booking = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();
        dd();

        if (!$booking instanceof Booking || Request::METHOD_POST !== $method) {
            return;
        }

        $message = (new \Swift_Message('A new book has been added'))
            ->setFrom('benfeldapp@gmail.com')
            ->setTo('tassa780@gmail.com')
            ->setBody(sprintf('The book #%d has been added.', $booking->getId()));

        $this->mailer->send($message);
    }
}