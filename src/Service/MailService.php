<?php

namespace App\Service;

use Symfony\Component\DependencyInjection\ContainerInterface;

class MailService{

    protected $mailer; 
    protected $templating; 
    public function __construct( \Swift_Mailer $mailer, \Twig\Environment $templating )
    {
        $this->mailer = $mailer;
        $this->templating = $templating;
    }
    public function bookingUpdated($booking){
        $message = (new \Swift_Message('Changement de statut de votre réservation'))
            ->setFrom('benfeldapp@gmail.com')
            ->setTo($booking->getUser()->getEmail())
            ->setBody(
                $this->templating->render(
                    'emails/updatedBooking.html.twig',[
                        'booking' =>  $booking,
                    ]
                    ),
                'text/html'
            );
        $this->mailer->send($message);
    }

    public function bookingCreated($booking, $mailsAdmin){

        $messages = [];
        foreach ($mailsAdmin as $mail) {
            
            $message = (new \Swift_Message('Nouvelle demande de réservation'))
            ->setFrom('benfeldapp@gmail.com')
            ->setTo($mail)
            ->setBody(
                $this->templating->render(
                    'emails/askedBooking.html.twig',[
                        'booking' =>  $booking,
                    ]
                    ),
                'text/html'
            );
            $messages[] = $message;
           
        }

        foreach ($messages as $message) {
            $this->mailer->send($message);
        }


    }

    
}