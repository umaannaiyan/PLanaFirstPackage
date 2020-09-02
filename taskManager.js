import Task from "./task.js"  
 
// TaskManger Class Constructor
export default class TaskManager{
    constructor(task){
        
        this.taskList = JSON.parse(localStorage.getItem("Banana")) || [];   
        this.currentId= parseInt(localStorage.getItem('CurrentID')) || 1;
        localStorage.setItem('CurrentID', this.currentId);       
    }

    // Adding the task entered the in the modal to the Local Storage and Array
    addTask(name,descrip,assign,stat,date){
       const task = new Task(
        `task${this.currentId++}`, //creating unique identifier
        name,
        descrip,
        assign,
        stat, 
        date
    );
    
    localStorage.setItem('CurrentID', this.currentId);
    //if Local storage is emptym then a new key Banana will be created
    // or else fetch the items from the local storage
    let myNewTasks = JSON.parse(localStorage.getItem("Banana")) || [];
    myNewTasks.push(task); //pushing to the local Storage
    localStorage.setItem('Banana', JSON.stringify(myNewTasks));
    this.taskList.push(task);
}

//Deleting an item from the local storage
deleteTask(id){
    this.taskList=this.taskList.filter(m => m.taskId !== id);
    
    let myTaskList = JSON.parse(localStorage.getItem("Banana"));
    myTaskList=myTaskList.filter(m => m.taskId !== id);
    localStorage.setItem("Banana", JSON.stringify(myTaskList));
            
}
//Updating the task and pushing back to local storage
updateTask(taskId,name,descrip,assign,stat,date){

    let myTaskList = JSON.parse(localStorage.getItem("Banana")); 
   
    for(let i=0;i< myTaskList.length;i++){
        if(myTaskList[i].taskId === taskId){
            myTaskList[i].name = name,
            myTaskList[i].descrip = descrip,
            myTaskList[i].assign = assign,
            myTaskList[i].stat = stat,
            myTaskList[i].date = date;
            localStorage.setItem("Banana", JSON.stringify(myTaskList));
            

            this.taskList[i].taskId=taskId,
            this.taskList[i].name=name,
            this.taskList[i].descrip=descrip,
            this.taskList[i].assign=assign,
            this.taskList[i].stat=stat,
            this.taskList[i].date=date
          
            break;
        }
    }
}
    
}