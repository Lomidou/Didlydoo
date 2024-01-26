let allEventsButton = document.getElementById('all-events');

fetch("http://localhost:3000/api/events")
    .then(response => response.json())
    .then(data => {
        let myEventList = document.getElementById('list-container');

        allEventsButton.addEventListener("click", () => {
            data.forEach(event => {
                let myTitleEvent = document.createElement("div");
                let myDescriptionEvent = document.createElement("div");

                myTitleEvent.innerText = event.name;
                myDescriptionEvent.innerText = event.description;
                let myID = event.id;
                
                let myEditButton = document.createElement("button");
                myEditButton.innerText = "Edit";
                let myDeleteButton = document.createElement("button");
                myDeleteButton.innerHTML = "&#10007"; 
                let myContainer = document.createElement("div");
                let myButtons = document.createElement("div");
                myButtons.appendChild(myEditButton);
                myButtons.appendChild(myDeleteButton);
                myContainer.appendChild(myButtons);

                myEventList.appendChild(myButtons)
                myEventList.appendChild(myTitleEvent);
                myEventList.appendChild(myDescriptionEvent);

                let myTable = createTable(myID, event.dates);
                myEventList.appendChild(myTable);

                myEventList.style.display = 'block';

                deleteEvent(myDeleteButton, myContainer, myID)
            });
        });
    })
    .catch(error => {
        console.error('Erreur:', error);
    });

function createTable(myID, eventDates) {
    let myTable = document.createElement("table");
    let myThead = document.createElement("thead");
    let myTbody = document.createElement("tbody");

    let myHeaderRow = document.createElement("tr");
    let myNameHeader = document.createElement("th");
    myNameHeader.innerText = "Participant(s)";
    myHeaderRow.appendChild(myNameHeader);

    eventDates.forEach(date => {
        let myDateHeader = document.createElement("th")
        myDateHeader.innerText = date.date
        myHeaderRow.appendChild(myDateHeader)
    })

    myThead.appendChild(myHeaderRow);

    fetch("http://localhost:3000/api/attendees")
        .then(response => response.json())
        .then(datas => {
            let participants = datas.filter(data => data.events.some(ev => ev.id === myID));

            participants.forEach(participant => {
                let myRow = document.createElement("tr");
                let myNameCell = document.createElement("td");
                myNameCell.innerText = participant.name;
                myRow.appendChild(myNameCell);

                eventDates.forEach(date => {
                    let myCell = document.createElement("td");
                    let event = participant.events.find(ev => ev.id === myID);

                    if (event && event.dates.some(d => d.date === date.date && d.available)) {
                        myCell.innerText = "✅";
                    } else {
                        myCell.innerText = "❌";
                    }

                    myRow.appendChild(myCell);
                });

                myTbody.appendChild(myRow);
            });

            myTable.appendChild(myThead);
            myTable.appendChild(myTbody);
        })
        .catch(error => {
            console.error('Erreur:', error);
        });

    return myTable;
}

function deleteEvent(myDeleteButton, myContainer, eventID) {
    myDeleteButton.addEventListener("click", () => {
        fetch(`http://localhost:3000/api/events/${eventID}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => {
                if (response.ok) {
                    myContainer.remove();
                    myContainer.style.display = 'none'
                } else {
                    console.error("Error deleting event:", response.statusText);
                }
            })
            .catch(deleteError => {
                console.error("Fetch delete error:", deleteError);
            });
    });
}