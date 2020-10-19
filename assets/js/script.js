const formEl = document.querySelector("#task-form");
const tasksToDoEl = document.querySelector("#tasks-to-do");


const createTaskHandler = (event) => {

    event.preventDefault();

    let taskItemsEl = document.createElement("li");
    taskItemsEl.textContent = "This is a new task";
    taskItemsEl.className = "task-item";
    tasksToDoEl.appendChild(taskItemsEl);
}

formEl.addEventListener("submit", createTaskHandler);
