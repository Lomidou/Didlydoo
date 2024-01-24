fetch ("http://localhost:3000/api/events")
.then(response => response.json())
.then(data => {
    let allEventsButton = document.getElementById('all-events')
    let myEventList = document.getElementById('list-container')

    allEventsButton.addEventListener("click", () => {
        data.forEach(event => {
            let myTitleEvent = document.createElement("div")
            let myDescriptionEvent = document.createElement("div")

            myTitleEvent.innerText = event.name
            myDescriptionEvent.innerText = event.description

            myTitleEvent.appendChild(myDescriptionEvent)
            myEventList.appendChild(myTitleEvent)

            myEventList.style.display = 'block'
        })

        data.forEach(date =>{
            let myTable = document.createElement("table")
            let myTableRow = document.createElement("tr")
            let myTableData = document.createElement("td")

            for (let i = 0; i < data.dates.length; i++){
                
            }
        })
        console.table(data)
    })
})
.catch(error => {
    console.error('Erreur:', error)
  })