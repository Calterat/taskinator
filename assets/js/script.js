const buttonEL = document.querySelector("#save-task");
const tasksToDoEl = document.querySelector("#tasks-to-do");


const createTaskHandler = () => {
    let taskItemsEl = document.createElement("li");
    taskItemsEl.textContent = "This is a new task";
    taskItemsEl.className = "task-item";
    tasksToDoEl.appendChild(taskItemsEl);
}

buttonEL.addEventListener("click", createTaskHandler);
