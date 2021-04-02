<?php

namespace App\DataFixtures;

use Faker;
use App\Entity\Outils;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $faker = Faker\Factory::create();

        for ($i = 1; $i <= 50; $i++) {
            $outil = new Outils();
            $outil->setNom($faker->name());
            $outil->setDescription($faker->text(255));
            $outil->setPrix($faker->numberBetween(0, 10000));
            $outil->setCategory($faker->text(255));
            $outil->setImg('outil1-1.jpg');
            $outil->setImgCategory('<i class="fas fa-hammer"></i>');
            $outil->setLat($faker->randomFloat(14, 48.80957673328024, 48.90377176147872));
            $outil->setLon($faker->randomFloat(14, 2.2552871704101567, 2.4242019653320312));

            $manager->persist($outil);
        }
        $manager->flush();
    }
}
