const formEl = document.querySelector("#task-form");
const tasksToDoEl = document.querySelector("#tasks-to-do");
let taskIdCounter = 0
const pageContentEl = document.querySelector("#page-content");



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
        // add a task ID as a custom attribute
        listItemsEl.setAttribute("data-task-id", taskIdCounter);
        // create a div to hold task info and add to list item
        let taskInfoEl = document.createElement("div");
        // give it a class name
        taskInfoEl.className = "task-info";
        // add HTML content to div
        taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
        listItemsEl.appendChild(taskInfoEl);
        // append task actions to list item
        let taskActionsEl = createTaskActions(taskIdCounter);
        listItemsEl.appendChild(taskActionsEl);
        // add entire list item to list
        tasksToDoEl.appendChild(listItemsEl);    
        // increase task counter for a unique ID
        taskIdCounter++;
}

const createTaskActions = (taskId) => {
    // create container for task actions
    let actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";
    // create edit button
    let editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(editButtonEl);
    // create delete button
    let deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(deleteButtonEl);
    // create select dropdown
    let statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(statusSelectEl);

    let statusChoices = ["To Do", "In Progress", "Completed"];
    for (i = 0; i < statusChoices.length; i++) {
        // create option elements
        let statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);
        // append to Select
        statusSelectEl.appendChild(statusOptionEl);
    }
    return actionContainerEl;
}

const taskButtonHandler = (event) => {
    if ( event.target.matches(".edit-btn")) {
        // Edit Button was clicked
        let taskId = event.target.getAttribute("data-task-id");
        editTask(taskId);
        // Delete Button was clicked
    } else if (event.target.matches(".delete-btn")) {
        let taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);
    }
}

const deleteTask = (taskId) => {
    let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
}

const editTask = (taskId) => {
    // get a task list item element
    let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    // get content from task name and type
    let taskName = taskSelected.querySelector("h3.task-name").textContent;
    let taskType = taskSelected.querySelector("span.task-type").textContent;
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Task";
    formEl.setAttribute("data-task-id", taskId);
}

formEl.addEventListener("submit", taskFormHandler);

pageContentEl.addEventListener("click", taskButtonHandler);

