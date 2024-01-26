/*document.addEventListener("DOMContentLoaded", function () {
    const addButton = document.getElementById("modal-button");
  
    addButton.addEventListener("click", addEvent);
  
    function addEvent() {
      let nameInput = document.getElementById("input-user");
      let eventInput = document.getElementById("input-title");
      let descriptionInput = document.getElementById("input-description");
      let dateInput = document.getElementById("input-date");
  
      let nameValue = nameInput.value;
      let eventValue = eventInput.value;
      let descriptionValue = descriptionInput.value;
      let dateValue = dateInput.value;

      if (!nameValue || !eventValue || !descriptionValue || !dateValue) {
        console.log("Veuillez remplir tous les champs.");
        return;
      }
  
      console.log("Nom:", nameValue);
      console.log("Événement:", eventValue);
      console.log("Description:", descriptionValue);
      console.log("Date sélectionnée:", dateValue);
  
      let eventData = {
        name: eventValue,
        dates: [dateValue], 
        author: nameValue,
        description: descriptionValue,
      };
  
      let options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      };
  
      let url = "http://localhost:3000/api/events/";
  
      fetch(url, options)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Échec de la requête.");
          }
          return res.json();
        })
        .then((data) => {
          console.log("Événement ajouté avec succès:", data);
        })
        .catch((err) => {
          console.log(`Erreur lors de l'ajout de l'événement: ${err.message}`);
        });
    }
  });*/

