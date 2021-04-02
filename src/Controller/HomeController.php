<?php

namespace App\Controller;

use App\Repository\OutilsRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{
    /**
     * @Route("/", name="home")
     */
    public function index(OutilsRepository $outilsRepository): Response
    {
        $outils = $outilsRepository ->findAll();
        return $this->render('home/index.html.twig', [
            'outils' => $outils,
        ]);
    }
}
