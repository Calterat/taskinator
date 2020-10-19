const formEl = document.querySelector("#task-form");
const tasksToDoEl = document.querySelector("#tasks-to-do");


const createTaskHandler = (event) => {

    event.preventDefault();

    let taskNameInput = document.querySelector("input[name='task-name']").value;
    let taskTypeInput = document.querySelector("select[name='task-type']").value;
    // create list item
    let listItemsEl = document.createElement("li");
    listItemsEl.textContent = taskNameInput;
    listItemsEl.className = "task-item";

    // create a div to hold task info and add to list item
    let taskInfoEl = document.createElement("div");
    // give it a class name
    taskInfoEl.className = "task-info";
    // add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";

    tasksToDoEl.appendChild(listItemsEl);
}

formEl.addEventListener("submit", createTaskHandler);
