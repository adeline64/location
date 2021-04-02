# SYMFONY

## NOUVEAU PROJET

- dans un vouveau terminal :
```
composer create-project symfony/website-skeleton nom_du_projet
```

## GIT

- créer un dépôt Git sur GitHub
- initialtiser un dépôt local :
```
git init
```
- lier le dépôt distant au dépôt local :
```
git remote add origin https://github.com/davidHurtrel/symfony-WF3-787.git
```
- ajouter tous les fichiers :
```
git add *
```
- donner un nom au commit :
```
git commit -m "message_du_commit"
```
- récupérer les dernières modifications :
```
git pull origin master
```
- envoyer vos modifications :
```
git push origin master
```
- voir la liste des commit (flèches haut bas pour naviguer dans la liste, q pour quitter) :
```
git log
```

## RÉCUPÉRER UN PROJET

- télécharger le zip ou faire un pull
- recréer le fichier .env à la racine du projet (avec ses propres informations)
- les infos importantes sont APP_ENV et MAILER_URL
- mettre à jour le projet :
```
composer update
```
- créer la base de données :
```
php bin/console doctrine:database:create
```
- créer les tables :
```
php bin/console doctrine:migrations:migrate
```
- importer les "fausses" données :
```
php bin/console doctrine:fixtures:load
```

## APACHE-PACK

- barre de débug / routing / .htaccess
- dans le terminal :
```
composer require symfony/apache-pack
```

## CONTROLLER

```
php bin/console make:controller Nom_du_controller
```

## BASE DE DONNÉES

- .env :
```
DATABASE_URL="mysql://root:root@127.0.0.1:8889/symfony-wf3-787?serverVersion=5.7"
```
- créer la base de données :
```
php bin/console doctrine:database:create
```
- créer une entité (table) :
```
php bin/console make:entity
```
- migration :
```
php bin/console make:migration
```
```
php bin/console doctrine:migrations:migrate
```

## FIXTURES

- installer le bundle :
```
composer require --dev orm-fixtures
```
- compléter le fichier src/DataFixtures/AppFixtures.php
- persist()
- flush()
- envoyer en base de données (en écrasant) :
```
php bin/console doctrine:fixtures:load
```
- envoyer en base de données (en ajoutant à la suite) :
```
php bin/console doctrine:fixtures:load --append
```
- bundle pour générer de fausses données :
```
composer require fakerphp/faker
```

## ROUTER

- voir toutes les routes :
```
php bin/console debug:router
```
- vérifier si une route existe (et obtenir ses informations) :
```
php bin/console router:match /url_de_la_route
```
