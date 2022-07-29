const titleInput = document.getElementById("title") as HTMLInputElement;
const descriptionInput = document.getElementById(
  "description"
) as HTMLInputElement;
const dateInput = document.getElementById("date") as HTMLInputElement;
const submit = document.getElementById("addBtn") as HTMLButtonElement;
const form = document.getElementById("form") as HTMLFormElement;
const tasksList = document.getElementById("tasksList") as HTMLDivElement;
const editBtns = document.getElementById("editBtns") as HTMLButtonElement;
const addBtn = document.getElementById("addBtn") as HTMLButtonElement;

interface TodoItem {
  title: string;
  description: string;
  date: string;
}

class IncompletedTodos {
  private todos: TodoItem[] = [];
  constructor() {
    this.display();
  }
  addTodo(item: TodoItem) {
    this.todos.push(item);
  }
  getAllTodos() {
    form.reset();
    return this.todos;
  }
  getId(id: any) {
    return this.todos.find((element, index) => index === id);
  }
  display() {
    tasksList.innerHTML = " ";
    this.getAllTodos().map((task: any, index: any) => {
      const mainDiv = document.createElement("div");
      mainDiv.className = "divLists";

      const check = document.createElement("input");
      check.type = "checkbox";
      check.checked = false;
      // check.addEventListener('click',()=>{

      //   let completelist = document.querySelector('#complete')
      //   completelist?.appendChild(mainDiv);
      // })

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

  deleteTask = (id: number) => {
    const item: any = this.getId(id);

    this.todos.splice(id, 1);

    this.display();
  };
  updateTask = (id: number) => {
    this.todos[id] = {
      title: titleInput.value,
      description: descriptionInput.value,
      date: dateInput.value,
    };

    task.display();
  };
}
class CompletedTodos extends IncompletedTodos {
  public completedArray: TodoItem[] = [];
  constructor() {
    super();
  }
  completeTodo(items: TodoItem) {
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

function deleteLi(index: any) {
  task.deleteTask(index);
  task.getAllTodos();
}
function editLi(index: number) {
  editBtns.addEventListener("click", (e) => {
    e.preventDefault();
    task.updateTask(index);
    editBtns.style.display = "none";
    addBtn.style.display = "block";
  });
}

function checkLi(index: number) {
  const singlecompletedtask = task.getAllTodos()[index];

  // Add to completed Array
  completetask.getAllTodos().push({ ...singlecompletedtask });
  console.log(completetask.getAllTodos());

  // remove from task array

  task.getAllTodos().splice(index, 1);
  task.display();

  let completed = document.querySelector("#complete") as HTMLDivElement;

  completetask.getAllTodos().map(function (item, i) {
    console.log(item.title);

    const p1 = document.createElement("p") as HTMLParagraphElement;
    const p2 = document.createElement("p") as HTMLParagraphElement;
    const p3 = document.createElement("p") as HTMLParagraphElement;

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
