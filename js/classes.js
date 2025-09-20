class User {
  constructor(fName, lName, email, password) {
    this.fName = fName;
    this.lName = lName;
    this.email = email;
    this.password = btoa(password);
  }
  checkPassword(password) {
    return this.password === btoa(password);
  }
}

export class UserManager {
  static getAllUsers() {
    return JSON.parse(localStorage.getItem("users")) || {};
  }
  static saveAllUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
  }

  static registerUser(fName, lName, email, password) {
    const users = this.getAllUsers();
    if (users[email]) {
      throw new Error("User already exists");
    }
    const newUser = new User(fName, lName, email, password);
    users[email] = newUser;
    this.saveAllUsers(users);
    return newUser;
  }

  static authenticate(email, password) {
    const users = this.getAllUsers();
    const user = users[email];
    if (!user) {
      throw new Error("User not found");
    }
    const loggingUser = new User(
      user.fName,
      user.lName,
      user.email,
      atob(user.password)
    );
    if (user && loggingUser.checkPassword(password)) {
      return user;
    }
    throw new Error("Invalid password");
  }
}

export class Auth {
  static login(user) {
    localStorage.setItem("currentUserEmail", user.email);
  }
  static logout() {
    localStorage.removeItem("currentUserEmail");
  }
  static getCurrentUser() {
    const email = localStorage.getItem("currentUserEmail");
    if (!email) return null;
    const users = UserManager.getAllUsers();
    return users[email] || null;
  }
}

export class Task {
  constructor(text, completed = false) {
    this.id = Date.now().toString();
    this.text = text;
    this.completed = completed;
  }
  toggleComplete() {
    this.completed = !this.completed;
  }
}

export class TaskManager {
  constructor(userEmail) {
    this.userEmail = userEmail;
    this.key = `tasks_${userEmail}`;
    this.tasks = this.loadTasks();
  }

  loadTasks() {
    const tasks = JSON.parse(localStorage.getItem(this.key)) || [];
    return tasks.map((task) => new Task(task.text, task.completed));
  }

  saveTasks() {
    localStorage.setItem(this.key, JSON.stringify(this.tasks));
  }
  addTask(text) {
    const newTask = new Task(text);
    this.tasks.push(newTask);
    this.saveTasks();
  }
  editTask(taskId, newText) {
    this.tasks = this.tasks.map((task) =>
      task.id === taskId ? { ...task, text: newText } : task
    );

    // if (task.id === taskId) {
    //     task.text = newText;
    // }

    this.saveTasks();
  }
  deleteTask(taskId) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    this.saveTasks();
  }

  toggleTask(taskId) {
    this.tasks = this.tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    this.saveTasks();
  }
}
