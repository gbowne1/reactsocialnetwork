# Contribuer au développement du React Social Network

Nous acceptons les Pull Requests (PR) ainsi que les personnes qui travaillent à la résolution des problèmes actuels. Si vous venez sur ce projet pour la première fois.
Si vous remarquez un problème avec cette application, n'hésitez pas à ouvrir un problème.

Beaucoup de développeurs préfèrent demander s'ils peuvent contribuer ou se voir assigner une tâche en réponse à un problème signalé dans l'onglet Problèmes. C'est très bien. Nous appliquons une politique stricte de no gate-keeping dans tous ces projets. Vous pouvez travailler sur n'importe quelle tâche/problème, il vous suffit de nous faire savoir que vous allez travailler sur un problème.
Si vous n'êtes pas sûr du style et de la conception, il y a une discussion ici : <https://github.com/gbowne1/reactsocialnetwork/discussions/36>. 
En règle générale, si vous pensez qu'il vous faudra plus de 72 heures après avoir été assigné, pour soumettre un PR, faites-le nous savoir afin que les problèmes ne soient pas périmés.

Certaines tâches peuvent ne pas être adaptées aux débutants, même si elles sont étiquetées `good first issue`, alors essayez de juger la tâche en conséquence. Si vous êtes débutant, il y a des tâches plus petites sur lesquelles un débutant peut travailler comme les problèmes de style.

Vous devriez déjà être familier avec React 17 et/ou 18, JavaScript ES5/ES6/ES7.

## Style

Je n'ai pas encore créé de guide de style officiel. Si quelqu'un souhaite créer un guide de style pour nous, créez une discussion.

La mise en page est une mise en page à 3 colonnes, commençant par une vue desktop avec un panneau gauche de 200-250px, un panneau central de 1400-1500px et un panneau droit de 200-250px, similaire à la vue de bureau de Facebook lorsque l'on regarde la root '/'.

## Développement

Si vous ne savez pas sur quoi travailler, consultez la liste des problèmes. Il y a aussi des TODO listés dans le fichier TODO.md.

**Note:** Si vous avez besoin de construire une interface utilisateur, vous pouvez utiliser l'un de nos [composants réutilisables](REUSABLE_COMPONENTS.md) (situé sous [src/components](../src/components) ), afin de ne pas avoir à réinventer la roue.

### PR's

Lorsque vous faites une PR sur GitHub, assurez-vous de remplir la section de droite, Assignees, Reviewers, Labels, Projects, Milestone(s) et Development avant de soumettre la PR. Veuillez également partager une capture d'écran ou montrer la correction fonctionnelle dans le message de la demande de Pull et une brève description de ce que vous avez corrigé. Les problèmes et descriptions vides peuvent ne pas être fusionnés.

- Lier un problème au développement que le PR fermera
- Assurez-vous d'étiqueter un évaluateur, par exemple @gbowne1
- Choisissez les étiquettes appropriées dans la section Labels
- Assurez-vous d'être l'assigné du PR.
- Milestone, choisissez Frontend ou Backend (d'autres options seront proposées ultérieurement).

### Issues

@gbowne1 assignera les utilisateurs aux problèmes sur la base du premier arrivé, premier servi. A l'avenir, j'aimerais qu'un minimum de 2 personnes s'occupent du Frontend et de 2 personnes du Backend, puis nous pourrons assigner des groupes spécifiques de personnes s'occupant de choses comme les CSS, les composants, etc.

## Editeur & IDE

Le repository contient des dossiers avec les paramètres et configurations appropriés au projet pour Visual Studio et Visual Studio code, mais au-delà de cela, nous sommes agnostiques en matière d'outils et d'éditeurs/IDE, vous pouvez donc utiliser l'éditeur ou l'IDE de votre choix.

## Paramètres et configuration

Les espaces de travail, les paramètres, les configurations et les plugins inclus sont pour :

Babel
Webpack
ESLint
Prettier
VSCode (.vscode)
Visual Studio 2019+ (.vs)
GitHub (.github)

Elles peuvent ne pas être correctes à 100%, donc si vous pouvez contribuer à les rendre plus précises pour le développement de React, c'est le bienvenu.

## Tech Stack

Ce projet a été bootstrappé avec Create React App.
Cette application est construite avec :

- React 18.0 - 18.2
- CSS3
- JavaScript (ES5/ES6/ES7/ES2015/etc.)
- Node
- Express
- Material UI v5.11.6

## Branches

Nos branches suivent en règle générale le flux GitFlow / GitHub.

- [ main ] Branche de travail principale
- [ master ] Permanent // Branche d'archive
- [ test ] code non testé
- Branche de fonctionnalité # de fonctionnalité - {feature}
- [bugfix - {correction de bug}]
- [hotfix - { correctif }]]

Utilisez une branche de test pour livrer/pousser du code qui devrait fonctionner mais qui n'est pas complètement testé.
