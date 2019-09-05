// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

function loadEventListeners() {
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);

    // Add task event
    form.addEventListener('submit', addTask);

    // Remove task event
    taskList.addEventListener('click', removeTask);

    // Clear tasks event
    clearBtn.addEventListener('click', clearTasks);

    // Filter tasks
    filter.addEventListener('keyup', filterTasks);
}

// Get tasks from LS
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = localStorage.getItem('tasks');
        tasks = JSON.parse(tasks);
    }

    tasks.forEach(function(task) {
        // create li element
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));

        // create new link
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        
        // append link into li
        li.appendChild(link);
        // append li into ul
        taskList.appendChild(li);
    });
}

// Add task
function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task');
    } else {
        // create li element
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(taskInput.value));

        // create new link
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        
        // append link into li
        li.appendChild(link);
        // append li into ul
        taskList.appendChild(li);

        // store in LS
        storeTaskInLocalStorage(taskInput.value);

        // clear input
        taskInput.value = '';
    }
    e.preventDefault();
}

// Store task
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = localStorage.getItem('tasks');
        tasks = JSON.parse(tasks);
    }

    tasks.push(task);
    tasks = JSON.stringify(tasks);
    localStorage.setItem('tasks', tasks);
}

// Remove task
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();

            // remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = localStorage.getItem('tasks');
        tasks = JSON.parse(tasks);
    }

    tasks.forEach((task, index) => {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    tasks = JSON.stringify(tasks);
    localStorage.setItem('tasks', tasks);
}

// Clear tasks
function clearTasks() {
    if (confirm('Are you sure?')) {
        // way 1
        // taskList.innerHTML = '';

        // way 2, little bit faster
        while(taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }

        // clear tasks from LS
        clearTasksFromLocalStorage();
    }
}

// clear tasks from LS
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

// Filter tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}