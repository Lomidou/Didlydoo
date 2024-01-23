//const { add } = require("date-fns")

let myButton = document.getElementById('button')
let myModal = document.getElementById('modal')
let myArray = [];
let InputTitle = document.getElementById('input-title')
let InputDescription = document.getElementById('input-description')
let InputDate = document.getElementById('input-date')

myButton.addEventListener("click", () =>{
    myModal.style.display = "flex"
    myButton.style.display = "none"
})

let myClosingButton = document.getElementById('close-modal')

myClosingButton.addEventListener("click", () =>{
    myModal.style.display = "none"
    myButton.style.display = "block"
})

let addingTask = document.getElementById('modal-button')

addingTask.addEventListener("click", () => {
    let myTitle = InputTitle.value
    let myDescription = InputDescription.value
    let myDate = InputDate.value

    myArray.push({
        title: myTitle,
        description: myDescription,
        date: myDate
    })
    console.log(myArray)

    myModal.style.display = "none"
    myButton.style.display = "block"

    InputTitle.value = ""
    InputDescription.value = ""
    InputDate.value = ""

    createTaskList(myTitle)
})

console.log(myArray)

function createTaskList(title, description){
    let myTaskList = document.getElementById('list-container')
    let myFirstTask = document.createElement('div')

    myFirstTask.classList = "task"
    myFirstTask.innerText = title, description
    myTaskList.appendChild(myFirstTask)
}