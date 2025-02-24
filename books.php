<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Livres</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
<header>
    <h1>📖 Gestion des Livres</h1>
    <nav>
        <ul>
            <li><a href="index.php">🏠 Accueil</a></li>
        </ul>
    </nav>
</header>

<main>
    <h2>Liste des Livres</h2>
    <div id="books-list"></div>
    <div class="livres">
        <div class="1">
            <h2>Ajouter un livre</h2>
            <form id="book-form">
                <div class="book-form-page">
                    <input type="text" id="title" placeholder="Titre" required>
                    <input type="text" id="author" placeholder="Auteur" required>
                    <input type="number" id="year" placeholder="Année" required>
                    <input type="text" id="genre" placeholder="Genre" required>
                    <input type="text" id="isbn" placeholder="ISBN" required>
                </div>
                <div class="book-form-sub">
                    <button type="submit">Ajouter</button>
                </div>
            </form>
        </div>
        <div class="2">
            <h2>Modifier un Livre</h2>
            <form id="update-book-form">
                <div class="book-form-page">
                    <input type="number" id="update-book-id" placeholder="ID du Livre" required>
                    <input type="text" id="update-title" placeholder="Titre" required>
                    <input type="text" id="update-author" placeholder="Auteur" required>
                    <input type="number" id="update-year" placeholder="Année" required>
                    <input type="text" id="update-genre" placeholder="Genre" required>
                    <input type="text" id="update-isbn" placeholder="ISBN" required>
                </div>
                <div class="book-form-sub">
                    <button type="submit">Modifier</button>
                </div>
            </form>
        </div>
    </div>
</main>

<script src="js/books.js"></script>
</body>
</html>
