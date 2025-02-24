document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("loan-form").addEventListener("submit", function(event) {
        event.preventDefault();
        borrowBook();
    });

    document.getElementById("fetch-loans").addEventListener("click", function() {
        let userId = document.getElementById("user-id-loans").value;
        if (userId) {
            fetchLoansByUser(userId);
        }
    });
});

function borrowBook() {
    let loanData = {
        user_id: document.getElementById("user_id").value,
        book_id: document.getElementById("book_id").value
    };

    fetch("http://localhost:8000/v1/loans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loanData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur lors de l'emprunt du livre");
            }
            return response.json();
        })
        .then(() => {
            alert("Livre emprunté avec succès !");
            document.getElementById("loan-form").reset();
        })
        .catch(error => alert(error.message));
}

function fetchLoansByUser(userId) {
    fetch(`http://localhost:8000/v1/users/${userId}/loans`)
        .then(response => response.json())
        .then(loans => {
            let loansList = document.getElementById("loans-list");
            loansList.innerHTML = "";
            if (loans.length === 0) {
                loansList.innerHTML = "<p>Aucun emprunt trouvé pour cet utilisateur.</p>";
            } else {
                loans.forEach(loan => {
                    let status = loan.is_returned ? "✅ Rendu" : "❌ En cours";
                    loansList.innerHTML += `<p>${loan.book.title} - ${status}</p>`;
                });
            }
        })
        .catch(error => console.error("Erreur lors de la récupération des emprunts :", error));
}

function returnBook(loanId) {
    fetch(`http://localhost:8000/v1/loans/${loanId}/return`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur lors du retour du livre");
            }
            return response.json();
        })
        .then(() => {
            alert("Livre retourné avec succès !");
            let userId = document.getElementById("user-id-loans").value;
            if (userId) {
                fetchLoansByUser(userId);
            }
        })
        .catch(error => alert(error.message));
}
