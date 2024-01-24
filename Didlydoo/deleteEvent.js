function displayDeleteButton(eventId) {
    // Créer un span pour la suppression de l'événement
    let deleteSpan = document.createElement("button");
    deleteSpan.innerText = "Delete";
    deleteSpan.classList.add("delete-event"); // Ajouter une classe pour le style ou d'autres opérations

    // Ajouter un gestionnaire d'événements pour le span de suppression
    deleteSpan.addEventListener("click", function () {
        // Appeler la fonction de suppression avec l'ID de l'événement
        deleteEvent(eventId);
    });

    // Ajouter le span de suppression à l'endroit approprié dans votre interface
    let eventContainer = document.getElementById("list-container");
    eventContainer.appendChild(deleteSpan);
}

function deleteEvent(eventId) {
    // Fonction pour supprimer un événement
    let url = `http://localhost:3000/api/events/${eventId}`;

    let options = {
        method: "DELETE",
    };

    return fetch(url, options)
        .then((res) => {
            if (!res.ok) {
                throw new Error("Échec de la requête de suppression.");
            }
            return res.json();
        })
        .then((data) => {
            console.log("Événement supprimé avec succès:", data);
            // Actualiser la liste des événements ou prendre d'autres mesures nécessaires
        })
        .catch((err) => {
            console.log(`Erreur lors de la suppression de l'événement: ${err.message}`);
        });
}
