"use strict";
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const dateInput = document.getElementById("date");
const submit = document.getElementById("addBtn");
const form = document.getElementById("form");
const tasksList = document.getElementById("tasksList");
const editBtns = document.getElementById("editBtns");
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
            this.todos[id] = {
                title: titleInput.value,
                description: descriptionInput.value,
                date: dateInput.value,
            };
            task.display();
        };
        this.display();
    }
    addTodo(item) {
        this.todos.push(item);
    }
    getAllTodos() {
        form.reset();
        return this.todos;
    }
    getId(id) {
        return this.todos.find((element, index) => index === id);
    }
    display() {
        tasksList.innerHTML = " ";
        this.getAllTodos().map((task, index) => {
            const mainDiv = document.createElement("div");
            mainDiv.className = "divLists";
            const check = document.createElement("input");
            check.type = "checkbox";
            check.checked = false;
            const p1 = document.createElement("p");
            const p2 = document.createElement("p");
            const p3 = document.createElement("p");
            const editButton = document.createElement("button");
            const deleteButton = document.createElement("button");
            editButton.id = "editBtn";
            editButton.innerHTML = "Edit";
            deleteButton.id = "deleteBtn";
            deleteButton.innerHTML = "Delete";
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
            deleteButton.addEventListener("click", () => {
                deleteLi(index);
            });
            editButton.addEventListener("click", () => {
                titleInput.value = task.title;
                descriptionInput.value = task.description;
                dateInput.value = task.date;
                // console.log(titleInput.value);
                editLi(index);
                editBtns.style.display = "block";
                addBtn.style.display = "none";
            });
            check.addEventListener("click", () => {
                checkLi(index);
            });
        });
    }
}
class CompletedTodos extends IncompletedTodos {
    constructor() {
        super();
        this.completedArray = [];
    }
    completeTodo(items) {
        this.completedArray.push(items);
    }
    getAllTodos() {
        form.reset();
        return this.completedArray;
    }
    checkedItems() {
        console.log("checked todo");
    }
}
const task = new IncompletedTodos();
const completetask = new IncompletedTodos();
submit.addEventListener("click", (e) => {
    e.preventDefault();
    const title = titleInput.value;
    const description = descriptionInput.value;
    const date = dateInput.value;
    const check = false;
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
function editLi(index) {
    editBtns.addEventListener("click", (e) => {
        e.preventDefault();
        task.updateTask(index);
        editBtns.style.display = "none";
        addBtn.style.display = "block";
    });
}
function checkLi(index) {
    const singlecompletedtask = task.getAllTodos()[index];
    // Add to completed Array
    completetask.getAllTodos().push(Object.assign({}, singlecompletedtask));
    console.log(completetask.getAllTodos());
    // remove from task array
    task.getAllTodos().splice(index, 1);
    task.display();
    let completed = document.querySelector("#complete");
    completetask.getAllTodos().map(function (item, i) {
        console.log(item.title);
        const p1 = document.createElement("p");
        const p2 = document.createElement("p");
        const p3 = document.createElement("p");
        p1.textContent = item.title;
        p2.textContent = item.description;
        p3.textContent = item.date;
        const newDiv = document.createElement("div");
        newDiv.appendChild(p1);
        newDiv.appendChild(p2);
        newDiv.appendChild(p3);
        completed.appendChild(newDiv);
    });
}
