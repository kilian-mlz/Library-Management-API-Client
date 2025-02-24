<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Emprunts</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
<header>
    <h1>📥 Gestion des Emprunts</h1>
    <nav>
        <ul>
            <li><a href="index.php">🏠 Accueil</a></li>
        </ul>
    </nav>
</header>

<h2>📋 Voir tous les emprunts</h2>
<a href="loans_list.php"><button>Voir la liste</button></a>

<main>
    <h2>Emprunter un livre</h2>
    <form id="loan-form">
        <input type="number" id="user_id" placeholder="ID Utilisateur" required>
        <input type="number" id="book_id" placeholder="ID Livre" required>
        <button type="submit">Emprunter</button>
    </form>

    <h2>📌 Liste des emprunts par utilisateur</h2>
    <input type="number" id="user-id-loans" placeholder="ID Utilisateur">
    <button id="fetch-loans">Voir les emprunts</button>
    <div id="loans-list"></div>
</main>

<script src="js/loans.js"></script>
</body>
</html>
