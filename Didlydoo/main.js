//const { add } = require("date-fns")

let myButton = document.getElementById('button')
let myModal = document.getElementById('modal')
let myArray = [];
let InputTitle = document.getElementById('input-title')
let InputDescription = document.getElementById('input-description')
let InputDate = document.getElementById('input-date')
let InputUser = document.getElementById('input-user') 
let myTaskList = document.getElementById('list-container')

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
    let myUser = InputUser.value
    let myDate = InputDate.value

    myArray.push({
        title: myTitle,
        description: myDescription,
        user: myUser,
        date: myDate
    })
    console.table(myArray)

    myModal.style.display = "none"
    myButton.style.display = "block"
    myTaskList.style.display = 'block'

    InputTitle.value = ""
    InputDescription.value = ""
    InputDate.value = ""
    InputUser.value = ""

    createTaskList(myTitle, myDescription, myUser)
})

console.log(myArray)

function createTaskList(title, description, user){
    let myFirstTask = document.createElement('div')

    myFirstTask.classList = "task"
    myFirstTask.innerText = title
    myTaskList.appendChild(myFirstTask)

    let myTaskDescription = document.createElement('div')

    myTaskDescription.classList = "description"
    myTaskDescription.innerText = description
    myFirstTask.appendChild(myTaskDescription)

    let myTaskUser = document.createElement('div')

    myTaskUser.classList = "user"
    myTaskUser.innerText = user
    myFirstTask.appendChild(myTaskUser)
}