# Contribuer au développement du Réseau Social React

Nous accueillons les Pull Requests (PR) ainsi que la participation de personnes travaillant à résoudre ses problèmes actuels. Si vous rejoignez ce projet pour la première fois.

Si vous remarquez un problème avec cette application, n'hésitez pas à ouvrir une nouvelle demande.

Beaucoup de développeurs préfèrent demander s'ils peuvent contribuer ou se voir attribuer une tâche en réponse à un problème signalé dans l'onglet des problèmes. C'est excellent. Nous avons une politique stricte de non-verrouillage dans l'ensemble de ces projets. Vous êtes invité(e) à travailler sur n'importe quelle tâche/problème, il vous suffit de nous informer que vous allez travailler sur le problème.

Si vous n'êtes pas sûr(e) du style et du design, il y a un problème ici : https://github.com/gbowne1/reactsocialnetwork/discussions/36. En général, si vous pensez que cela vous prendra plus de 72 heures après avoir été attribué(e) pour soumettre une Pull Request (PR), faites-le nous savoir de manière à ce que les problèmes ne deviennent pas obsolètes.

Certaines tâches peuvent ne pas être adaptées aux débutants même si elles sont étiquetées comme `good first issue` (bon premier problème). Essayez d'évaluer la tâche en conséquence. Si vous êtes débutant(e), il y a des tâches plus petites sur lesquelles un débutant peut travailler, comme les problèmes de style.

Vous devriez déjà être familier(e) avec React 17 et/ou 18, JavaScript ES5/ES6/ES7.

## Style

Je n'ai pas encore créé de guide de style officiel. Si quelqu'un souhaite créer un guide de style pour nous, veuillez créer une discussion.

La mise en page est une disposition à trois colonnes, commençant par une vue bureau avec un panneau gauche de 200 à 250 pixels, un panneau central de 1400 à 1500 pixels et un panneau droit de 200 à 250 pixels, similaire à la vue bureau de Facebook lorsqu'on regarde la racine '/'.

## Développement

Si vous n'êtes pas sûr(e) de quoi travailler, veuillez consulter la liste des problèmes. Il y a également des tâches à faire (TODO's) répertoriées dans le fichier TODO.md inclus.

**Note** : Au cas où vous auriez besoin de construire une interface utilisateur (UI), vous pouvez utiliser l'un de nos [composants-réutilisables](REUSABLE_COMPONENTS.md) (situés sous [src/components](../src/components) ), afin de ne pas avoir à réinventer la roue.

### Demandes d'extraction (Pull Requests - PR’s)

Lorsque vous effectuez une PR sur GitHub, veuillez vous assurer de remplir la section à droite, Assignations, Examinateurs, Étiquettes, Projets, Étape(s) et Développement avant de soumettre la PR. Veuillez également partager une capture d'écran ou montrer la correction fonctionnelle dans le message de la demande d'extraction, ainsi qu'une brève description de ce que vous avez corrigé. Les problèmes et descriptions vides peuvent ne pas être fusionnés.

- Lier un problème à Développement que la PR résoudra
- Assurez-vous de marquer un examinateur, c'est-à-dire @gbowne1
- Choisissez les étiquettes appropriées parmi les Étiquettes
- Assurez-vous d'être l'assigné à la PR.
- Milestone, choisissez Frontend ou Backend (d'autres peuvent venir plus tard)

### Problèmes

@gbowne1 attribuera des utilisateurs aux problèmes sur la base du premier arrivé, premier servi. À l'avenir, j'aimerais avoir un minimum de 2 personnes travaillant sur le Frontend et 2 personnes travaillant sur le Backend, puis nous pourrons attribuer des groupes spécifiques de personnes s'occupant de choses comme le CSS, les composants, etc.

## Éditeur & IDE

Le dépôt contient des dossiers avec des paramètres et des configurations appropriés au projet pour Visual Studio et Visual Studio Code, mais au-delà de cela, nous sommes agnostiques en matière d'outils, d'éditeurs et d'IDE, donc vous pouvez utiliser l'éditeur ou l'IDE de votre choix.

## Paramètres & Configurations

Les espaces de travail, paramètres, configurations et plugins inclus concernent:

Babel
Webpack
ESLint
Prettier
VSCode (.vscode)
Visual Studio 2019+ (.vs)
GitHub (.github)

Ils peuvent ne pas être à 100% corrects, donc si vous pouvez contribuer pour les rendre plus précis pour le développement React, cela est bienvenu.

## Stack Technologique

Ce projet a été initialisé avec Create React App.
Cette application est construite avec:

- React 18.0 - 18.2
- CSS3
- JavaScript (ES5/ES6/ES7/ES2015/etc.)
- Node
- Express
- Material UI v5.11.6

## Branches

Nos branches suivent GitFlow / GitHub Flow en règle générale.

- [ main ] branche principale de travail
- [ master ] Branche permanente // Archive
- [ test ] code non testé
- Feature Branch (Branche de fonctionnalité) # de fonctionnalité - {fonctionnalité}
- [bugfix - {bug corrigé}]
- [hotfix - {correction}]

Utilisez une branche de test pour commit/push du code que vous pensez fonctionner mais qui n'est pas entièrement testé.
