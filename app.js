//grab required elements
let form = document.querySelector('#task-form');
let taskList = document.querySelector('.collection');
let clearTasks = document.querySelector('.clear-task');
let filter = document.querySelector('#filter');
let taskInput = document.querySelector('#task');

//invoke all events
loadAllEvents();

//All events 
function loadAllEvents(){

    document.addEventListener('DOMContentLoaded', getTasks);
    //add task
    form.addEventListener('submit', addTask);
    //remove task
    taskList.addEventListener('click', removeTask);
    //remove all tasks
    clearTasks.addEventListener('click', removeAllTasks);
    //filter task
    filter.addEventListener('keyup', filterTasks);
}

//Add Task
function addTask(e){
    e.preventDefault();
    if(taskInput.value === ''){
        alert('Please Fill The Task Field');
    }

    let li = document.createElement('li');
    li.className = 'collection-item'; //materialize class
    li.appendChild(document.createTextNode(taskInput.value));

    let link = document.createElement('a');
    link.className = 'delete-item secondary-content'; //materialize class
    link.innerHTML = '<i class="fa fa-remove"></i>'; // delete icon
    li.appendChild(link);
    taskList.appendChild(li);
    storeTaskInLS(taskInput.value);
    taskInput.value = '';
}

//remove task   //attention to event delegation
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are You Sure?')){
            e.target.parentElement.parentElement.remove();
            removeTaskFromLS(e.target.parentElement.parentElement);
        }
    }
}

//remove all tasks
function removeAllTasks(e){
    e.preventDefault();
    //slower
    // taskList.innerHTML = '';

    //fatser
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    clearAllTasksFromLS();
}

//filter tasks
function filterTasks(e){
    let text = filter.value.toLowerCase();
    document.querySelectorAll('.collection-item')
        .forEach((task)=>{
            let content = task.textContent.toLocaleLowerCase();
            if(content.indexOf(text) != -1){
                task.style.display = 'block';
            }else{
                task.style.display = 'none';
            }
        })
}

//store task in LS
function storeTaskInLS(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//get tasks from LS
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach((task)=>{
    let li = document.createElement('li');
    li.className = 'collection-item'; //materialize class
    li.appendChild(document.createTextNode(task));

    let link = document.createElement('a');
    link.className = 'delete-item secondary-content'; //materialize class
    link.innerHTML = '<i class="fa fa-remove"></i>'; // delete icon
    li.appendChild(link);
    taskList.appendChild(li);
    })
}

//remove task from LS
//liTask: the list element with task content
//lsTask: local storage task
function removeTaskFromLS(liTask){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach((lsTask, index)=>{
        if(liTask.textContent === lsTask){
            tasks.splice(index, 1);
        }
    })

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//clear all tasks from LS
function clearAllTasksFromLS(){
    localStorage.clear();
}


