<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\BookingRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;


/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass=BookingRepository::class)
 * 
 */
class Booking
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups("bookings:read")
     */
    private $id;

    /**
     * @ORM\Column(type="datetime")
     * @Groups("bookings:read")
     */
    private $startAt;

    /**
     * @ORM\Column(type="datetime")
     * @Groups("bookings:read")
     */
    private $endAt;

    /**
     * @ORM\Column(type="string", columnDefinition="enum('pending', 'validated', 'refused', 'cancelled', 'passed')")
     * @Groups("bookings:read")
     */
    private $status;

    /**
     * @ORM\Column(type="datetime")
     * @Groups("bookings:read")
     */
    private $createdAt;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups("bookings:read")
     */
    private $cancellingReason;

    /**
     * @ORM\Column(type="datetime")
     * @Groups("bookings:read")
     */
    private $updatedAt;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="bookings")
     * @ORM\JoinColumn(nullable=false)
     * @Groups("bookings:read")
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity=Room::class, inversedBy="bookings")
     * @ORM\JoinColumn(nullable=false)
     * @Groups("bookings:read")
     */
    private $room;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups("bookings:read")
     */
    private $comment;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getStartAt(): ?\DateTimeInterface
    {
        return $this->startAt;
    }

    public function setStartAt(\DateTimeInterface $startAt): self
    {
        $this->startAt = $startAt;

        return $this;
    }

    public function getEndAt(): ?\DateTimeInterface
    {
        return $this->endAt;
    }

    public function setEndAt(\DateTimeInterface $endAt): self
    {
        $this->endAt = $endAt;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getCancellingReason(): ?string
    {
        return $this->cancellingReason;
    }

    public function setCancellingReason(?string $cancellingReason): self
    {
        $this->cancellingReason = $cancellingReason;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTimeInterface $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getRoom(): ?Room
    {
        return $this->room;
    }

    public function setRoom(?Room $room): self
    {
        $this->room = $room;

        return $this;
    }

    public function getComment(): ?string
    {
        return $this->comment;
    }

    public function setComment(?string $comment): self
    {
        $this->comment = $comment;

        return $this;
    }
}
