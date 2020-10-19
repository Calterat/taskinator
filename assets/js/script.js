const formEl = document.querySelector("#task-form");
const tasksToDoEl = document.querySelector("#tasks-to-do");


const taskFormHandler = (event) => {
    event.preventDefault();
    let taskNameInput = document.querySelector("input[name='task-name']").value;
    let taskTypeInput = document.querySelector("select[name='task-type']").value;

    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }

    formEl.reset();
    
    // package up data as an object
    let taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };
    // send object as an argument to createTaskEl()
    createTaskEl(taskDataObj);
}

const createTaskEl = (taskDataObj) => {
        // create list item
        let listItemsEl = document.createElement("li");
        listItemsEl.className = "task-item";
        // create a div to hold task info and add to list item
        let taskInfoEl = document.createElement("div");
        // give it a class name
        taskInfoEl.className = "task-info";
        // add HTML content to div
        taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
        listItemsEl.appendChild(taskInfoEl);
        // add entire list item to list
        tasksToDoEl.appendChild(listItemsEl);    
}

formEl.addEventListener("submit", taskFormHandler);
