document.addEventListener("DOMContentLoaded", function() {
    fetchBooks();

    document.getElementById("book-form").addEventListener("submit", function(event) {
        event.preventDefault();
        addBook();
    });

    document.getElementById("update-book-form").addEventListener("submit", function(event) {
        event.preventDefault();
        updateBook();
    });
});

function fetchBooks() {
    fetch("http://localhost:8000/v1/books")
        .then(response => response.json())
        .then(books => {
            let booksList = document.getElementById("books-list");
            booksList.innerHTML = "";

            books.forEach(book => {
                booksList.innerHTML += `
                    <p>
                        <strong>ID:</strong> ${book.id} | 
                        <strong>${book.title}</strong> - ${book.author} (${book.publication_year})<br>
                        <strong>Genre:</strong> ${book.genre} | 
                        <strong>ISBN:</strong> ${book.isbn} <br>
                        <button onclick="editBook(${book.id}, '${book.title}', '${book.author}', ${book.publication_year}, '${book.genre}', '${book.isbn}')">✏ Modifier</button>
                        <button onclick="deleteBook(${book.id})" style="background: red;">🗑 Supprimer</button>
                    </p>
                    <hr>
                `;
            });
        })
        .catch(error => console.error("Erreur lors de la récupération des livres :", error));
}

// Fonction pour remplir le formulaire de modification automatiquement
function editBook(id, title, author, year, genre, isbn) {
    document.getElementById("update-book-id").value = id;
    document.getElementById("update-title").value = title;
    document.getElementById("update-author").value = author;
    document.getElementById("update-year").value = year;
    document.getElementById("update-genre").value = genre;
    document.getElementById("update-isbn").value = isbn;
}

// Fonction pour supprimer un livre
function deleteBook(bookId) {
    if (confirm("Voulez-vous vraiment supprimer ce livre ?")) {
        fetch(`http://localhost:8000/v1/books/${bookId}`, {
            method: "DELETE"
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erreur lors de la suppression");
                }
                return response.text();
            })
            .then(() => {
                alert("Livre supprimé avec succès !");
                fetchBooks();
            })
            .catch(error => alert(error.message));
    }
}



function addBook() {
    let bookData = {
        title: document.getElementById("title").value,
        author: document.getElementById("author").value,
        publication_year: document.getElementById("year").value,
        genre: document.getElementById("genre").value,
        isbn: document.getElementById("isbn").value
    };

    fetch("http://localhost:8000/v1/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookData)
    }).then(response => response.json())
        .then(() => fetchBooks());
}

document.getElementById("update-book-form").addEventListener("submit", function(event) {
    event.preventDefault();
    updateBook();
});

function updateBook() {
    let bookId = document.getElementById("update-book-id").value;
    let bookData = {
        title: document.getElementById("update-title").value,
        author: document.getElementById("update-author").value,
        publication_year: parseInt(document.getElementById("update-year").value),
        genre: document.getElementById("update-genre").value,
        isbn: document.getElementById("update-isbn").value
    };

    fetch(`http://localhost:8000/v1/books/${bookId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur lors de la mise à jour du livre");
            }
            return response.json();
        })
        .then(() => {
            alert("Livre mis à jour avec succès !");
            document.getElementById("update-book-form").reset(); // Vider les champs ✅
            fetchBooks(); // Rafraîchir la liste des livres
        })
        .catch(error => alert(error.message));
}
