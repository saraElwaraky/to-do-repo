import { UserManager, Auth } from "/js/classes.js";

const loginForm = document.getElementById("loginForm");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  emailError.textContent = "";
  passwordError.textContent = "";

  // authuntication

  if (!email || !password) {
    passwordError.textContent = "Please enter email and password.";
    passwordError.classList.add("show");
    return;
  }
  try {
    const user = UserManager.authenticate(email, password);

    if (user) {
      Auth.login(user);
      window.location.href = "todo.html";
    } else {
      passwordError.textContent = "Invalid email or password.";
      passwordError.classList.add("show");
    }
  } catch (error) {
    passwordError.textContent = error.message;
    passwordError.classList.add("show");
  }
});
