import Task from "./task.js"; 
import TaskManager from "./taskManager.js"; 

// localStorage.clear();
//MODAL Form Elements Initialising

const taskName=document.querySelector("#taskName");
const description=document.querySelector("#description");
const assignee=document.querySelector("#assignee");
const taskDate=document.querySelector("#taskDate");
const statusSelect=document.querySelector("#statusSelect");

const hiddenTaskId=document.querySelector("#hiddenTaskId");
const taskNameEdit=document.querySelector("#taskNameEdit");
const descriptionEdit=document.querySelector("#descriptionEdit");
const assigneeEdit=document.querySelector("#assigneeEdit");
const taskDateEdit=document.querySelector("#taskDateEdit");
const statusSelectEdit=document.querySelector("#statusSelectEdit");

//Task Card initialisation

const tsk=document.querySelector("#tsk");
const asn=document.querySelector("#asn");
const due=document.querySelector("#due");
const st=document.querySelector("#st");

//Modal and Form Buttons initialisation

const btnSave=document.querySelector("#btnSave");
btnSave.addEventListener("click",saveButtonClicked);

const btnEditSave=document.querySelector("#btnEditSave");
btnEditSave.addEventListener("click",editSaveButtonClicked);

const btnDisplay =document.querySelector("#btnDisplay");
btnDisplay.addEventListener("click",displayTask);

const btnFilter =document.querySelector("#btnFilter");
btnFilter.addEventListener("click",filterSelection);

const btnToday =document.querySelector("#btnToday");
btnToday.addEventListener("click",todaySelection);

const btnAModalReset = document.querySelector("#btnAModalReset");
btnAModalReset.addEventListener("click", clearAll);

const btnEModalReset = document.querySelector("#btnEModalReset");
btnEModalReset.addEventListener("click", clearEdit);

const toDo =document.querySelector("#toDo");
const inProgress =document.querySelector("#inProgress");
const review =document.querySelector("#review");
const done =document.querySelector("#done");

const listGroupContainer=document.querySelector("#listGroupContainer");


// Validation initialisation

var taskNameEvent = new Boolean();
var assigneeEvent = new Boolean();
var descriptionEvent = new Boolean();
var statusEvent = new Boolean();
var dateEvent = new Boolean();

taskNameEvent = false;
assigneeEvent = false;

var taskNameEditEvent = new Boolean(false);
var assigneeEditEvent = new Boolean(false);
var descriptionEditEvent = new Boolean(false);

// Initialising(creating instances) classes

const task = new Task();
const taskManager = new TaskManager();

// Add task Modal - Save button

function saveButtonClicked(event){
    if(taskNameEvent && assigneeEvent && descriptionEvent && statusEvent){
        taskManager.addTask(taskName.value, description.value, assignee.value, statusSelect.value, taskDate.value);
        displayTask();  //displaying the tasks and creating the dynamic HTML element  
        clearAll(); // clearing the inputs of the Add Task modal form 
        $('#staticBackdrop').modal("hide");
        taskNameEvent = false; // setting validation for avoiding submission of empty form
        assigneeEvent = false;   
    }       
    else 
    {
        $('#staticBackdrop').modal("show"); 
    }
}
// Edit task Modal Save Button
function editSaveButtonClicked(event){
    if(taskNameEditEvent && assigneeEditEvent && descriptionEditEvent){
            taskManager.updateTask(hiddenTaskId.value, taskNameEdit.value, descriptionEdit.value, assigneeEdit.value, statusSelectEdit.value, taskDateEdit.value);
            displayTask();    
            $('#staticBackdropEdit').modal("hide");
            return true;
    }
    else{
        $('#staticBackdropEdit').modal("show");
    }
}

function displayTask(){ 
    listGroupContainer.innerHTML="";
    let myTaskList = JSON.parse(localStorage.getItem ('Banana'));
    taskManager.taskList = myTaskList; // this taskList is purely for testing purpose
    for(let i=0; i< myTaskList.length;i++){
            const task = new Task(
                myTaskList[i].taskId,
                myTaskList[i].name,
                myTaskList[i].descrip,
                myTaskList[i].assign,
                myTaskList[i].stat,         
                myTaskList[i].date
            );

    const addHtml=task.addToHTML();
    const element = document.createRange().createContextualFragment(addHtml);
    const btnDelete=element.querySelector("button.delete");
    const btnEdit=element.querySelector("button.edit");
            
    btnDelete.addEventListener("click",deleteButtonClicked);
    btnEdit.addEventListener("click", editButtonClicked);

    const itemBox = element.querySelector("a.list-group-item");
    itemBox.addEventListener("mouseover", cardDisplay);
    //adding the dynamic HTMl element
    listGroupContainer.append(element);
   }
}
// when filter button is clicked displayFilter function displays according to the status selection
function displayFilter(taski){
    listGroupContainer.innerHTML="";
       for(let i=0; i< taski.length;i++){
            const task = new Task(
                taski[i].taskId,
                taski[i].name,
                taski[i].descrip,
                taski[i].assign,
                taski[i].stat,         
                taski[i].date
            );

    const addHtml=task.addToHTML();
    const element = document.createRange().createContextualFragment(addHtml);
    const btnDelete=element.querySelector("button.delete");
    const btnEdit=element.querySelector("button.edit");
            
    btnDelete.addEventListener("click",deleteButtonClicked);
    btnEdit.addEventListener("click", editButtonClicked);

    const itemBox = element.querySelector("a.list-group-item");
    itemBox.addEventListener("mouseover", cardDisplay);

    listGroupContainer.append(element);
    }
}
// when mouse over the dynamic task list, the card display's the corresponding task
function cardDisplay(event){
  let id= event.target.id;
  
  const myTask = JSON.parse(localStorage.getItem ('Banana'));
  let task = myTask.find(m => m.taskId === id);

  tsk.textContent = task.name;
  asn.textContent = task.assign;
  due.textContent = task.date;
  st.textContent = task.stat;

}
// when the Today's Task button is clicked, it selects the task for Today
function todaySelection(event){
    let today = new Date();
    let todayTskList = [];
    const myTask = JSON.parse(localStorage.getItem ('Banana'));
    if(myTask != []){
        for(let i=0; i< myTask.length;i++){
            let tskDate = new Date(myTask[i].date);  
            if(tskDate.getDate() === today.getDate() && tskDate.getMonth() ===today.getMonth() && tskDate.getFullYear() === today.getFullYear()){
                todayTskList.push(myTask[i]);
            } 
        }
        displayFilter(todayTskList);
    }
}

// when filter is pressed, the selection of the event is handled in filterSelection
function filterSelection(event){
    const myTask = JSON.parse(localStorage.getItem ('Banana'));
    if(myTask != []){
        toDo.addEventListener("click", function(event){
            let toDoList = myTask.filter(m => m.stat === "To Do");
            displayFilter(toDoList);
        });
        inProgress.addEventListener("click", function(event){
            let toDoList = myTask.filter(m => m.stat === "In Progress");
            displayFilter(toDoList);
        });
        done.addEventListener("click", function(event){
            let toDoList = myTask.filter(m => m.stat === "Done");
            displayFilter(toDoList);
        });
        review.addEventListener("click", function(event){
            let toDoList = myTask.filter(m => m.stat === "Review");
            displayFilter(toDoList);
        });
    }
}  
// when delete button is clicked in the task list, the corresponding task id is selected
// and the delete function happens in the task manager class
function deleteButtonClicked(event)
{
    const id= event.target.value;
    taskManager.deleteTask(id);
    displayTask();       
}    
// when the edit button of the task list is clicked the event is picking up the task id
// and displaying the in the Edit Task Modal
function editButtonClicked(event)
{
    $('#staticBackdropEdit').modal("show");
    const id= event.target.value;
    
    let myTaskList = JSON.parse(localStorage.getItem("Banana"));
    let task=myTaskList.find(m => m.taskId === id);
    
    hiddenTaskId.value = task.taskId;
    taskNameEdit.value = task.name;
	descriptionEdit.value = task.descrip;
	assigneeEdit.value = task.assign;
	taskDateEdit.value = task.taskDate;
	statusSelectEdit.value = task.stat;
          
} 

// clearing the Add Task Modal form

function clearAll(){

    taskName.value=null;
    description.value=null;
    assignee.value=null;
    taskDate.value=null;
    statusSelect.value=null;
    // removing the validation placeholder
    taskName.classList.remove("is-valid", "is-valid");
    description.classList.remove("is-valid", "is-valid");
    assignee.classList.remove("is-valid", "is-valid");
    statusSelect.classList.remove("is-valid", "is-valid");
    taskDate.classList.remove("is-valid", "is-valid");
}

// clearing the Edit Task Modal for next edit
function clearEdit(){
    taskNameEdit.value = null;
	descriptionEdit.value = null;
	assigneeEdit.value = null;
	taskDateEdit.value = null;
    statusSelectEdit.value = null;
    // removing the validation placeholder
    taskNameEdit.classList.remove("is-valid", "is-invalid");
    descriptionEdit.classList.remove("is-valid", "is-invalid");
    assigneeEdit.classList.remove("is-valid", "is-invalid");
    statusSelectEdit.classList.remove("is-valid", "is-invalid");
    taskDateEdit.classList.remove("is-valid", "is-invalid");
}

//Task form validation  Begins here

//Taskname validation for Add Task Modal
taskName.addEventListener("input",function(event){
    if (event.target.value && event.target.value.length >= 6) {
            event.target.classList.remove("is-invalid");
            event.target.classList.add("is-valid");
            taskNameEvent= true;         
    } 
       
    else {
        event.target.classList.remove("is-valid");
        event.target.classList.add("is-invalid");
        taskNameEvent= false;
    }
});
// Task name Validation for Edit Task Modal
taskNameEdit.addEventListener("input",function(event){
    if (event.target.value && event.target.value.length >= 6) {
        event.target.classList.remove("is-invalid");
        event.target.classList.add("is-valid");
        
        taskNameEditEvent= true;         
    } else {
    event.target.classList.remove("is-valid");
    event.target.classList.add("is-invalid");
    taskNameEditEvent= false;
    }
});

// assignee validation for Add Task Modal
assignee.addEventListener("input",function(event){
        if (event.target.value && event.target.value.length >= 3) {
            event.target.classList.remove("is-invalid");
            event.target.classList.add("is-valid");
            assigneeEvent= true;
        } else {
        event.target.classList.remove("is-valid");
        event.target.classList.add("is-invalid");
        assigneeEvent = false;
        }
});

//assignee validation for Edit Task Modal
assigneeEdit.addEventListener("input",function(event){
    if (event.target.value && event.target.value.length >= 3) {
        event.target.classList.remove("is-invalid");
        event.target.classList.add("is-valid");
        assigneeEditEvent= true;
    } else {
    event.target.classList.remove("is-valid");
    event.target.classList.add("is-invalid");
    assigneeEditEvent = false;
    }
});
//description validation for Add Task Modal
description.addEventListener("input",function(event){
        if (event.target.value && event.target.value.length >= 8) {
            event.target.classList.remove("is-invalid");
            event.target.classList.add("is-valid");
            descriptionEvent=true;
        } else {
            event.target.classList.remove("is-valid");
            event.target.classList.add("is-invalid");
            descriptionEvent=false;
        }
});
//description validation for Edit Task Modal
descriptionEdit.addEventListener("input",function(event){
    if (event.target.value && event.target.value.length >= 8) {
        event.target.classList.remove("is-invalid");
        event.target.classList.add("is-valid");
        descriptionEditEvent=true;
    } else {
        event.target.classList.remove("is-valid");
        event.target.classList.add("is-invalid");
        descriptionEditEvent=false;
    }
});
//status validation for Add Task Modal
statusSelect.addEventListener("input",function(event){
        if (event.target.value ) {
            event.target.classList.remove("is-invalid");
            event.target.classList.add("is-valid");
            statusEvent=true;
        } else {
            event.target.classList.remove("is-valid");
            event.target.classList.add("is-invalid");
            statusEvent=false;
        }
});


 // Task Form Validation Ends here
