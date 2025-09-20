import { UserManager, Auth, Task, TaskManager } from "/js/classes.js";

const currentUser = Auth.getCurrentUser();
if (!currentUser) {
  window.location.href = "login.html";
}
const userNameDisplay = document.getElementById("userName");
userNameDisplay.textContent = `${currentUser.fName} ${currentUser.lName}`;

// logout
const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click", () => {
  Auth.logout();
  window.location.href = "login.html";
});

// Task Management
const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todo-list");

const taskManager = new TaskManager(currentUser.email);

//rendering tasks
function renderTasks() {
  todoList.innerHTML = "";
  taskManager.tasks.forEach((task) => {
    const li = document.createElement("li");
    const taskText = document.createElement("span");
    taskText.classList.add("task-text");
    taskText.textContent = task.text;
    if (task.completed) {
      li.classList.add("completed");
      taskText.classList.add("completed");
    }
    li.addEventListener("click", () => {
      task.toggleComplete();
      taskManager.saveTasks();
      renderTasks();
    });

    const deleteBtn = document.createElement("span");
    deleteBtn.innerHTML = "\u00D7";
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent triggering the li click event
      taskManager.deleteTask(task.id);
      renderTasks();
    });

    const editBtn = document.createElement("span");
    editBtn.innerHTML = "\u270E"; // Pencil icon
    editBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent triggering the li click event
      const newText = prompt("Edit task:", task.text);
      if (newText !== null && newText.trim() !== "") {
        taskManager.editTask(task.id, newText.trim());
        renderTasks();
      }
    });

    const btnContainer = document.createElement("div");
    btnContainer.classList.add("btn-container");
    btnContainer.appendChild(editBtn);
    btnContainer.appendChild(deleteBtn);
    li.appendChild(taskText);
    li.appendChild(btnContainer);

    todoList.appendChild(li);
  });
}

//add task
addBtn.addEventListener("click", () => {
  console.log("Add button clicked");
  const inputText = todoInput.value.trim();
  if (!inputText) return;
  taskManager.addTask(inputText);
  renderTasks();

  todoInput.value = "";
});

document.addEventListener("DOMContentLoaded", renderTasks);
