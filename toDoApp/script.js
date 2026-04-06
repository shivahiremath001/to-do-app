// TO DO LIST

const inputBox = document.getElementById("inputBox");
const inputForm = document.querySelector(".inputAndAppend");
const taskContainer = document.querySelector(".taskContainer");
const taskBlock = document.querySelector(".tasks");

let allObjects;
if (localStorage.getItem("toDoListData") !== null){
    allObjects = localStorage.getItem("toDoListData");
    console.log(allObjects);
}
else{
    allObjects = [{num: 0}, []];
    localStorage.setItem("toDoListData", allObjects);
}

let taskList = allObjects[1];

taskList.forEach(task =>{
        const newTaskElement = new Task(task.name, task.timeCreated);
        taskContainer.appendChild(newTaskElement.element);
});

// APPEND NEW TASKS TO LIST
inputForm.addEventListener("submit", async event => {
    event.preventDefault();

    if (!doesAlreadyExists()){
        appendTaskToList();
    }

    inputBox.value = null;

    taskContainer.innerHTML = ``;

    taskList.forEach(task =>{
        const newTaskElement = new Task(task.name, task.dateCreated, task.timeCreated);
        taskContainer.appendChild(newTaskElement.element);
    });
});

// TASK BLOCK CONSTRUCTOR
class Task{
    constructor(task, dateCreated, timeCreated){
        this.element = document.createElement("div");
        this.element.classList.add("tasks");

        this.element.innerHTML = `
            <div class="task">
                <input type="checkbox" class="checkBox" name="task1" id="task1">
                <label for="task1">${task}</label>
            </div>  
            <p class="dateAndTime">Date: ${dateCreated}</p>
            <p class="dateAndTime">Time: ${timeCreated}</p>
        `;
    }
};

function doesAlreadyExists(){
    let doesExists;

    taskList.forEach(task => {
        task.name == inputBox.value? doesExists = true: doesExists = false;
    });
    return doesExists;
}

// APPEND TASK TO TASKLIST
function appendTaskToList(){
    const taskName = inputBox.value;
    const dateAndTime = getDateAndTime();

    taskList.push({id: allObjects[0].num, name: taskName, dateCreated: dateAndTime[0],timeCreated: dateAndTime[1]});
    allObjects[0].num++;
}

// GET CURRENT DATE AND TIME
function getDateAndTime(){
    const date = new Date();
    const taskCreatedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

    let amOrPm = date.getHours() >= 12? "pm": "am";
    const hours = date.getHours() !== 0? date.getHours() % 12: 12;
    
    const taskCreatedTime = `${hours}:${(date.getMinutes()).toString().padStart(2, 0)} ${amOrPm}`;

    return [taskCreatedDate, taskCreatedTime];
}


