const formEl = document.querySelector("#task-form");
const tasksToDoEl = document.querySelector("#tasks-to-do");
let taskIdCounter = 0;
const pageContentEl = document.querySelector("#page-content");
const tasksInProgressEl = document.querySelector("#tasks-in-progress");
const tasksCompletedEl = document.querySelector("#tasks-completed");
let tasks = [];


const taskFormHandler = (event) => {
    event.preventDefault();
    let taskNameInput = document.querySelector("input[name='task-name']").value;
    let taskTypeInput = document.querySelector("select[name='task-type']").value;

    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }

    formEl.reset();

    // setting up conditional for task editing
    let isEdit = formEl.hasAttribute("data-task-id");
    
    // has data attribute, so get task id and call function to complete edit process
    if (isEdit) {
        let taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    } else {
        let taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput,
            status: "to do"
        }
        createTaskEl(taskDataObj);
    }
}

const createTaskEl = (taskDataObj) => {
        // create list item
        let listItemsEl = document.createElement("li");
        listItemsEl.className = "task-item";
        // add a task ID as a custom attribute
        listItemsEl.setAttribute("data-task-id", taskIdCounter);
        listItemsEl.setAttribute("draggable", "true");
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
        // add ID to task object
        taskDataObj.id = taskIdCounter;
        // push task object to tasks
        tasks.push(taskDataObj);
        // save to storage
        saveTasks(); 
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

    // create new array to hold updated list of tasks
    let updatedTaskArr = [];

    // loop through current tasks
    for (i = 0; i < tasks.length; i++) {
        // if tasks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
        if (tasks[i].id !== parseInt(taskId)) {
            updatedTaskArr.push(tasks[i]);
        }
    }
    //reassign tasks array to be the same as updatedTaskArr
    tasks = updatedTaskArr;
    saveTasks();
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

const completeEditTask = (taskName, taskType, taskId) => {
    // find the matching task list item
    let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;
    // loop through tasks array and task object with new content
    for (i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskID)) {
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    }
    saveTasks();
    alert("Task Updated!");
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
}

const taskStatusChangeHandler = (event) => {
    // get the task item's ID
    let taskId = event.target.getAttribute("data-task-id");

    // get the currently selected option's value and convert to lowercase
    let statusValue = event.target.value.toLowerCase();

    // find the parent task item element based on the ID
    let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    } else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    } else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    }
    //update tasks's status in tasks array
    for (i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].status = statusValue;
        }
    }
    saveTasks();
}

const dragTaskHandler = (event) => {
    // get the dragged items attribute for data id
    let taskId = event.target.getAttribute("data-task-id");
    // set data task ID in the dataTransfer storage
    event.dataTransfer.setData("text/plain", taskId);
}

const dropZoneDragHandler = (event) => {
    let taskListEl = event.target.closest(".task-list");
    if (taskListEl) {
        event.preventDefault();
        taskListEl.setAttribute("style", "background: rgba(68,233,255,0.7); border-style: dashed;")
    }
}

const dropTaskHandler = (event) => {
    let id = event.dataTransfer.getData("text/plain");
    let draggableElement = document.querySelector("[data-task-id='" + id + "']");
    let dropZoneEl = event.target.closest(".task-list");
    let statusType = dropZoneEl.id;
    //set status of task based on dropZone id
    let statusSelectEl = draggableElement.querySelector("select[name='status-change']");
    if (statusType === "tasks-to-do") {
        statusSelectEl.selectedIndex = 0;
    } else if (statusType === "tasks-in-progress") {
        statusSelectEl.selectedIndex = 1;
    } else if (statusType === "tasks-completed") {
        statusSelectEl.selectedIndex = 2;
    }
    dropZoneEl.appendChild(draggableElement);
    dropZoneEl.removeAttribute("style");

    // loop through tasks array to find and update the updated task's status
    for (i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(id)) {
            tasks[i].status = statusSelectEl.value.toLowerCase();
        }
    }
    saveTasks();
}

const dragLeaveHandler = (event) => {
    let taskListEl = event.target.closest(".task-list");
    if (taskListEl) {
        taskListEl.removeAttribute("style");
    }
}

const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

const loadTasks = () => {
    // get task item from local storage
    tasks = localStorage.getItem("tasks");
    // convert tasks from stringified format back into an array of objects
    if (tasks === null) {
        tasks = [];
        return false;
    }
    tasks = JSON.parse(tasks);
    console.log(tasks[0].status);
    // iterates through tasks array and creates task elements on the page from it
    for (a =0; a < tasks.length; a++) {
        taskIdCounter = tasks[a].id;
        let listItemEl = document.createElement("li");
        listItemEl.className = "task-item";
        listItemEl.setAttribute("data-task-id", tasks[a].id);
        listItemEl.setAttribute("draggable", true);
        let taskInfoEl = document.createElement("div");
        taskInfoEl.className = "task-info";
        taskInfoEl.innerHTML = "<h3 class='task-name'>" + tasks[a].name + "</h3><span class='task-type'>" + tasks[a].type + "</span>";
        listItemEl.appendChild(taskInfoEl);
        const taskActionsEl = createTaskActions(tasks[a].id);
        listItemEl.appendChild(taskActionsEl);
        if (tasks[a].status === 'to do') {
            listItemEl.querySelector("select[name='status-change']").selectedIndex = 0;
            tasksToDoEl.appendChild(listItemEl);
        } else if (tasks[a].status === 'in progress') {
            listItemEl.querySelector("select[name='status-change']").selectedIndex = 1;
            tasksInProgressEl.appendChild(listItemEl);
        } else if (tasks[a].status === 'complete') {
            listItemEl.querySelector("select[name='status-change']").selectedIndex = 2;
            tasksCompletedEl.appendChild(listItemEl);
        }
        taskIdCounter++;
        console.log(listItemEl);
    }
}

// listens for a submit on the form element
formEl.addEventListener("submit", taskFormHandler);
// listens for a click on the task actions
pageContentEl.addEventListener("click", taskButtonHandler);
// listens for a value change for the tasks
pageContentEl.addEventListener("change", taskStatusChangeHandler);
// listens for dragstarts
pageContentEl.addEventListener("dragstart", dragTaskHandler);
// listens for dragover events
pageContentEl.addEventListener("dragover", dropZoneDragHandler);
// listens for the drop
pageContentEl.addEventListener("drop", dropTaskHandler);
// listens for dragleave
pageContentEl.addEventListener("dragleave", dragLeaveHandler);

loadTasks();