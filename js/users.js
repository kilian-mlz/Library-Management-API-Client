document.addEventListener("DOMContentLoaded", function() {
    fetchUsers();

    document.getElementById("user-form").addEventListener("submit", function(event) {
        event.preventDefault();
        addUser();
    });
});

function fetchUsers() {
    fetch("http://localhost:8000/v1/users")
        .then(response => response.json())
        .then(users => {
            let usersList = document.getElementById("users-list");
            usersList.innerHTML = "";
            users.forEach(user => {
                usersList.innerHTML += `<p>${user.id} - ${user.name} (${user.email})</p>`;
            });
        })
        .catch(error => console.error("Erreur lors de la récupération des utilisateurs :", error));
}

function addUser() {
    let userData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        card_number: document.getElementById("card_number").value
    };

    fetch("http://localhost:8000/v1/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur lors de l'ajout de l'utilisateur");
            }
            return response.json();
        })
        .then(() => {
            fetchUsers(); // Rafraîchir la liste des utilisateurs
            document.getElementById("user-form").reset(); // Réinitialiser le formulaire
        })
        .catch(error => console.error(error));
}
