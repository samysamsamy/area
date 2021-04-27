# Git Workflow

Document présentant les différentes choses à savoir avant d'utiliser le repository.

## Répertoire
Cette partie est destinée à l'utilisation et à la création de répertoire interne au répository
-   Le chemin et le nom d'un repertoire doit être en  **anglais**
- Un répertoire qui n'est ni lié au front du client web ni du client mobile doit être dans le dossier **server** prévu pour gérer le backend de notre application.
-  Le chemin d'un répertoire git doit être en  **Snake Case**
>repository_name

##  Merge request

Cette partie est destinée à l'utilisation des merge request
-  Le nom de la merge request doit être en  **anglais**
- Le nom de la merge request doit être précédée de  **DEV**: quand la fonctionnalité est en développement
>DEV: [ADD] -> token issue
- Il peut y avoir plusieurs merge requests à partir d'une branche

## Branche

-   La branche master contient  **uniquement**  le code de la production
- Tous les merges sur la branche master doivent être testés en amont sur la branche **dev**
-    Le nom d'une branche doit être en  **anglais**
-   Les branches doivent êtres divisées  **par feature**  et avoir un nom en  **snake case**  sous la forme :
>feature_for_mobile_client

## Commit

-   Le nom d'un commit doit être en  **anglais**
-   Tous les commits doivent êtres fait sous la forme :
>[EDIT] -> mobile: name of commit 
