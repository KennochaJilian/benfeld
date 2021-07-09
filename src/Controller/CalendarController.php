<?php

namespace App\Controller;

use App\Entity\Booking;
use App\Repository\BookingRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class CalendarController extends AbstractController
{
    /**
     * @Route("api/bookings/calendar", name="bookings_calendar")
     */
    public function getCalendar(Request $request, BookingRepository $bookingRepository, SerializerInterface $serializer): Response
    {
        $startDate = $request->query->get('start_date');
        $endDate = $request->query->get('end_date');

        $bookings = $bookingRepository->findAll(); 

        if($startDate && $endDate){
            $bookings = $bookingRepository->getByDate($startDate, $endDate);
        }

        return $this->json($bookings, 200, [], ['groups' => 'bookings:read']); 
    }
}
