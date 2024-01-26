const myButton = document.getElementById('button');
let myModal = document.getElementById('modal');
let myArray = [];
let InputTitle = document.getElementById('input-title');
let InputDescription = document.getElementById('input-description');
let InputDate = document.getElementById('input-date');
let InputUser = document.getElementById('input-user');
let myTaskList = document.getElementById('list-container');
let addDate = document.getElementById('date-button');
let available = document.getElementById('available');
let notAvailable = document.getElementById('notAvailable');
let newInput;

myButton.addEventListener("click", () => {
    myModal.style.display = "flex";
    myButton.style.display = "none";
});

addDate.addEventListener("click", () => {
    newInput = document.createElement('input');
    newInput.type = 'date';
    newInput.placeholder = 'Closing date';
    newInput.classList = 'newDate';

    InputDate.parentNode.insertBefore(newInput, InputDate.nextSibling);
});

let myClosingButton = document.getElementById('close-modal');

myClosingButton.addEventListener("click", () => {
    myModal.style.display = "none";
    myButton.style.display = "block";
});

let addingTask = document.getElementById('modal-button');

addingTask.addEventListener("click", () => {
    if (InputTitle.value === '' || InputDescription.value === '' || InputUser.value === '' || InputDate.value === ''){
        alert('Vous devez remplir tous les champs !');
    } else {
        let myTitle = InputTitle.value;
        let myDescription = InputDescription.value;
        let myUser = InputUser.value;
        let myDate = InputDate.value;
        let myNewDate = newInput ? newInput.value : '';

        let dates = [myDate];
        if (myNewDate) {
            dates.push(myNewDate);
        }

        myArray.push({
            title: myTitle,
            description: myDescription,
            user: myUser,
            date: dates,
        });
        console.table(myArray);

        myModal.style.display = "none";
        myButton.style.display = "block";
        myTaskList.style.display = 'block';

        InputTitle.value = "";
        InputDescription.value = "";
        InputDate.value = "";
        InputUser.value = "";
        if (newInput) {
            newInput.value = "";
        }

        createEvent(myTitle, myDescription, myUser, dates);
    }
});

console.log(myArray);

function createEvent(title, description, user, dates) {
    let myBody = {
        name: title,
        dates: dates,
        author: user,
        description: description,
    };

    fetch("http://localhost:3000/api/events/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(myBody),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);

            let myContainer = document.createElement("div");

            let myEditButton = document.createElement("button");
            myEditButton.innerText = "Modifier";

            let myDeleteButton = document.createElement("button");
            myDeleteButton.id = "supprimer";
            myDeleteButton.innerHTML = "&#10007";

            let myButtons = document.createElement("div");
            myButtons.appendChild(myEditButton);
            myButtons.appendChild(myDeleteButton);
            myContainer.appendChild(myButtons);

            let myTitleElement = document.createElement('div');
            myTitleElement.innerText = title;

            let myDescriptionElement = document.createElement('div');
            myDescriptionElement.innerText = description;

            myContainer.appendChild(myTitleElement);
            myContainer.appendChild(myDescriptionElement);

            let myTable = document.createElement("table");
            let myThead = document.createElement("thead");
            let myTbody = document.createElement("tbody");

            let myHeaderRow = document.createElement("tr");
            let myNameHeader = document.createElement("th");
            myNameHeader.innerText = "Participant(s)";
            myHeaderRow.appendChild(myNameHeader);

            myThead.appendChild(myHeaderRow);
            myTable.appendChild(myThead);
            myTable.appendChild(myTbody);

            myContainer.appendChild(myTable);

            myTaskList.appendChild(myContainer);

            let userRow = document.createElement("tr");
            let userCell = document.createElement("td");
            userCell.innerText = user;
            userRow.appendChild(userCell);
            myTbody.appendChild(userRow);

            let eventID = data.id;
            let eventDates = data.dates || [];

            for (let date of eventDates) {
                let dateCell = document.createElement("th");
                dateCell.innerText = date;
                myHeaderRow.appendChild(dateCell);
            }

            deleteEvent(myContainer, eventID);
            attendeesEvent(myContainer, eventID, myEditButton);
        })
        .catch(error => {
            console.error("Erreur de la requête Fetch :", error);
        });
}

function deleteEvent(container, eventID) {
    deleteButton.addEventListener("click", () => {
        fetch(`http://localhost:3000/api/events/${eventID}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => {
                if (response.ok) {
                    container.remove();
                } else {
                    console.error("Erreur lors de la suppression de l'événement :", response.statusText);
                }
            })
            .catch(deleteError => {
                console.error("Erreur de la requête Fetch lors de la suppression :", deleteError);
            });
    });
}

function attendeesEvent(container, eventID, editButton) {
    editButton.addEventListener("click", () => {
        let isAvailable = available.checked;
        let isNotAvailable = notAvailable.checked;

        let myBody = {
            name: title,
            dates: [{
                date: date,
                available: isAvailable,
                notAvailable: isNotAvailable,
            }]
        };

        fetch(`http://localhost:3000/api/events/${eventID}/attend`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(myBody),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Faire le traitement nécessaire ici en fonction de la réponse du serveur
        })
        .catch(modifyError => {
            console.error("Erreur de la requête Fetch lors de la modification :", modifyError);
        });
    });
}
