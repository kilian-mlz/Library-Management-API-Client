<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Utilisateurs</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
<header>
    <h1>👤 Gestion des Utilisateurs</h1>
    <nav>
        <ul>
            <li><a href="index.php">🏠 Accueil</a></li>
        </ul>
    </nav>
</header>

<main>
    <h2>Liste des Utilisateurs</h2>
    <div id="users-list"></div>

    <h2>Ajouter un Utilisateur</h2>
    <form id="user-form">
        <input type="text" id="name" placeholder="Nom" required>
        <input type="email" id="email" placeholder="Email" required>
        <input type="text" id="card_number" placeholder="Numéro de carte" required>
        <button type="submit">Ajouter</button>
    </form>
</main>

<script src="js/users.js"></script>
</body>
</html>
