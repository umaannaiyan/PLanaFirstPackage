import TaskManager from "./taskManager.js"
export default class Task{
    constructor(taskId, name, descrip, assign, stat, date){
        this.taskId = taskId,
        this.name = name,
        this.descrip = descrip,
        this.assign = assign,
        this.stat = stat,
        this.date =date
}

toHtmlElement(){
    const html = this.addToHTML();
    const element = document.createRange().createContextualFragment(html);
    return element;
}


addToHTML()
{   
        const addHtml = `
        <div  class="itemBox"  class="list-group" >
            <a id="${this.taskId}" id= "anchor" href="#" class="list-group-item list-group-item-action "  >
                <div id = "taskNameTag" class="d-flex w-100 justify-content-between" style="display: flex-end background-color: rgb(159, 133, 159)">
                    <h5 id="h5" class="mb-1">${this.name}</h5>
                    <div class="d-flex flex-row bd-highlight mb-3">
                        <div class="p-2 bd-highlight" >
                            <small>${this.date} </small>  
                        </div>
                        <div class="p-2 bd-highlight">
                            <small style= "color:"> ${this.assign} </small>   
                        </div>
                        <div class="p-2 bd-highlight ">
                            <span style="${this.stat === "Done" ? "color: green": "color:black"}"> ${this.stat} </span>   
                        </div>
                        <button class="edit btn btn-primary btn-sm float-right ml-2 "  
                        value="${this.taskId}" 
                        style = " color: white";">           
                        E</button>
                        <button  class="delete btn btn-danger btn-sm float-right" 
                        value="${this.taskId}" 
                        style = "color: white;">
                        X
                        </button>
                    </div>
                </div>
                <div>
                    <p class="mb-1"><small>${this.descrip}</small></p>
                </div>
                
            </a>  
            
        </div>
    `;
    return addHtml;
    }
}