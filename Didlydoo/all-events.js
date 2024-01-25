//const { get } = require("shortid/lib/alphabet")

let allEventsButton = document.getElementById('all-events')

fetch("http://localhost:3000/api/events")
    .then(response => response.json())
    .then(data => {
        let myEventList = document.getElementById('list-container')

        allEventsButton.addEventListener("click", () => {

            data.forEach(event => {
                let myTitleEvent = document.createElement("div")
                let myDescriptionEvent = document.createElement("div")

                myTitleEvent.innerText = event.name
                myDescriptionEvent.innerText = event.description
                let myID = event.id

                myTitleEvent.appendChild(myDescriptionEvent)
                myEventList.appendChild(myTitleEvent)

                myEventList.style.display = 'block'

                let myTable = document.createElement("table")
                let myDates = event.dates.map(datum => datum.date).join("</th> <th>")

                myTable.innerHTML =
                    `<thead>
            <tr>
                <th>Participant(s)</th>
                <th colspan="${event.dates.length}">${myDates}</th>
            </tr>
            </thead>`

                getNames(myTable, myID)

                getAvailable()

                myEventList.appendChild(myTable)
            })
        })
    })

    .catch(error => {
        console.error('Erreur:', error)
    })

function getNames(myTable, myID) {
    fetch("http://localhost:3000/api/attendees")
        .then(response => response.json())
        .then(datas => {
            datas.forEach(data => {
                const myName = data.name
                const id = data.events.map(id => id.id)

                if (id.includes(myID)) {
                    let myBody = document.createElement("tbody")
                    let myRow = document.createElement("tr")
                    let myData = document.createElement("td")

                    myData.innerText = myName

                    myRow.appendChild(myData)
                    myBody.appendChild(myRow)
                    myTable.appendChild(myBody)
                }
            })
        })
        .catch(error => {
            console.error('Erreur:', error)
        })
}

function getAvailable() {
    fetch("http://localhost:3000/api/events")
        .then(response => response.json())
        .then(data => {
            data.forEach(data => {
                const date = data.dates.map(date => date.attendees)

                date.forEach(event => {
                    const availableList = event.map(events => events.available)

                    console.log(availableList)
                })
            }
            )
        })
        .catch(error => {
            console.error('Erreur:', error)
        })
}