"use strict";
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const dateInput = document.getElementById("date");
const submit = document.getElementById("addBtn");
const form = document.getElementById("form");
const tasksList = document.getElementById("tasksList");
const editBtn = document.getElementById("editBtn");
const addBtn = document.getElementById("addBtn");
class IncompletedTodos {
    constructor() {
        this.todos = [];
        this.deleteTask = (id) => {
            const item = this.getId(id);
            this.todos.splice(id, 1);
            this.display();
        };
        this.updateTask = (id) => {
            const item = this.getId(id);
            titleInput.value = item.title;
            descriptionInput.value = item.description;
            dateInput.value = item.date;
            console.log(titleInput.value);
            // this.todos.splice(id, 1);
            // this.display();
        };
        this.display();
    }
    addTodo(item) {
        // console.log(item);
        this.todos.push(item);
        // form.reset()
    }
    getAllTodos() {
        form.reset();
        return this.todos;
    }
    getId(id) {
        return this.todos.find((element, index) => index === id);
    }
    display() {
        tasksList.innerHTML = ' ';
        this.getAllTodos().map((task, index) => {
            const mainDiv = document.createElement('div');
            mainDiv.className = 'divLists';
            const check = document.createElement('input');
            check.type = 'checkbox';
            const p1 = document.createElement('p');
            const p2 = document.createElement('p');
            const p3 = document.createElement('p');
            const editButton = document.createElement('button');
            const deleteButton = document.createElement('button');
            editButton.id = 'editBtn';
            editButton.innerHTML = 'Edit';
            deleteButton.id = 'deleteBtn';
            deleteButton.innerHTML = 'Delete';
            p1.textContent = `${task.title}`;
            p2.textContent = `${task.description}`;
            p3.textContent = `${task.date}`;
            mainDiv.appendChild(check);
            mainDiv.appendChild(p1);
            mainDiv.appendChild(p2);
            mainDiv.appendChild(p3);
            mainDiv.appendChild(editButton);
            mainDiv.appendChild(deleteButton);
            tasksList.appendChild(mainDiv);
            deleteButton.addEventListener('click', () => {
                deleteLi(index);
            });
            editButton.addEventListener('click', () => {
                // console.log(index)
                editLi(index);
            });
        });
    }
}
function editLi(index) {
    // console.log(index);
    // const editVar = new 
    task.updateTask(index);
}
// editBtn.addEventListener('click', () => {
// })
const task = new IncompletedTodos();
submit.addEventListener('click', (e) => {
    e.preventDefault();
    const title = titleInput.value;
    const description = descriptionInput.value;
    const date = dateInput.value;
    if (titleInput.value === "") {
        alert("Title is required");
        return;
    }
    if (descriptionInput.value === "") {
        alert("Description is required");
        return;
    }
    if (dateInput.value === "") {
        alert("Date is required");
        return;
    }
    titleInput.value = "";
    descriptionInput.value = "";
    dateInput.value = "";
    task.addTodo({ title, description, date });
    task.display();
});
function deleteLi(index) {
    task.deleteTask(index);
    task.getAllTodos();
}
// const todoList: TodoItem[] = [];
// addBtn?.addEventListener("click", (e) => {
//   e.preventDefault();
//   if (title.value === "") {
//     alert("Title is required");
//     return;
//   }
//   if (description.value === "") {
//     alert("Description is required");
//     return;
//   }
//   if (date.value === "") {
//     alert("Date is required");
//     return;
//   }
//   let newTodo: TodoItem = {
//     title: title?.value,
//     description: description?.value,
//     date: date?.value,
//     completed:false
//   };
//   todoList.push(newTodo);
//   console.log(todoList);
//   form.reset();
//   const c = new PaintHtmlToDom(todoList, tasksList);
//   c.html();
// });
// class PaintHtmlToDom {
//   constructor(public data: any, id: any) { }
//   html() {
//     const htmlData = this.data
//       .map((item: any, index: number) => {
//         let htmlCode = `
//         <div class="todo-items">
//         <ul style="list-style: none;">
//             <li id="taskDone">
//                 <span  id="checkmark" style="padding-right: 10px;">
//                   <input ${
//                     this.data.completed ? "checked" : ""
//                   } onchange="completeTask(this, ${index})"type="checkbox" />
//                 </span>
//                 <span style="padding-right: 10px;" id="titleText">${item.title}</span>
//                 <span id="descriptionText">${item.description}</span>
//                 <span id="dateText">${item.date}</span>
//                 <span id="editBtn" style="padding-left: 10px;">
//                 <button id="editBtn" onclick="editTask(${index})" type="button">Edit</button>
//                 </span><span><button onclick="this.deleteTask(${index})" id="deleteBtn" type="button">Delete </button>
//                 </span>
//             </li>
//         </ul>
//     </div>
//     `;
//         return htmlCode;
//       })
//       .join("");
//     tasksList.innerHTML = htmlData;
//   }
//   getId(id:any){
//       return todoList.find((element, index) => index === id);
//   }
//   deleteTask = (id:any) =>{
//       const item:any = this.getId(id);
//       console.log(item);
//       todoList.splice(item, 1);
//       console.log(todoList);
//       this.html();
//   }
// }
