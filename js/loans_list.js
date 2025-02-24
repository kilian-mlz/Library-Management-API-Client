document.addEventListener("DOMContentLoaded", function() {
    fetchAllLoans();
});

function fetchAllLoans() {
    fetch("http://localhost:8000/v1/loans")
        .then(response => response.json())
        .then(data => {
            console.log("Réponse API:", data); // Debugging
            let loansList = document.getElementById("loans-list");
            loansList.innerHTML = "";

            if (!Array.isArray(data)) {
                throw new Error("Données incorrectes reçues");
            }

            if (data.length === 0) {
                loansList.innerHTML = "<p>Aucun emprunt enregistré.</p>";
                return;
            }

            data.forEach(loan => {
                let status = loan.is_returned ? "✅ Rendu" : "❌ En cours";
                let returnButton = loan.is_returned
                    ? "" // Pas de bouton si déjà rendu
                    : `<button onclick="returnBook(${loan.id})">Rendre</button>`;

                loansList.innerHTML += `
                    <p>
                        <strong>${loan.book.title}</strong> - Emprunté par <strong>ID ${loan.user_id}</strong> (${status})
                        ${returnButton}
                    </p>
                `;
            });
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
            fetchAllLoans(); // Rafraîchir la liste des emprunts
        })
        .catch(error => alert(error.message));
}
