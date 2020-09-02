import TaskManager from "./taskManager.js";
import Task from "./task.js" 



// creating object instances
const taskManager = new TaskManager();
const task = new Task(
    "task1",
    "Groceries",
    "Please buy milk and youghurt",
    "uma",
    "done",
    "2020-08-20"
);

// testing  for adding the task
test("Adding the new task",() =>{
    // const task = new Task("task1","groceries","new groceries","assignee","status","2020-08-09");
    taskManager.addTask("groceries","new groceries","assignee","status","2020-08-09");
    expect(taskManager.taskList.length).toBe(1);
});

//testing for updating the task
test("Updating the Task", () =>{
    // const task = new Task("task1","groceries","new groceries","assignee","status","2020-08-09");    taskManager.addTask("groceries","new groceries","assignee","status","2020-08-09");
    taskManager.updateTask("task1","groceries","Buy Milk","sam","To Do","2020-08-09");
    expect(taskManager.taskList[0].name).toBe("groceries");
    expect(taskManager.taskList[0].descrip).toBe("Buy Milk");
});
// testing for appending  the task to the HTML body
test("adding Task element to DOM", () => {
    const html = task.addToHTML();
    const element = task.toHtmlElement(html);
    document.body.append(element);
    expect(document.body.children.length).toBe(1);
})
// Deleting the task
test("Deleting the task",() =>{
    taskManager.deleteTask("task1");
    expect(taskManager.taskList.length).toBe(0);
});








