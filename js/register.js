import { UserManager, Auth } from "/js/classes.js";

const registerForm = document.getElementById("registerForm");

const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");

const successMessage = document.getElementById("successMessage");

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const fName = document.getElementById("register-fName").value.trim();
  const lName = document.getElementById("register-lName").value.trim();
  const email = document.getElementById("register-email").value.trim();
  const password = document.getElementById("register-password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  console.log(fName, lName, email, password, confirmPassword);

  emailError.textContent = "";
  passwordError.textContent = "";

  // validation
  if (!fName || !lName) {
    alert("First and Last names are required.");
    return;
  }
  if (fName.length > 15 || lName.length > 15) {
    alert("First or Last names are too long.");
    return;
  }
  if (email.length < 5 || !email.includes("@")) {
    emailError.textContent = "Please enter a valid email.";
    emailError.classList.add("show");
    return;
  } else {
    emailError.classList.remove("show");
  }
  if (password.length < 6) {
    passwordError.textContent = "Password must be at least 6 characters.";
    passwordError.classList.add("show");
    return;
  } else {
    passwordError.classList.remove("show");
  }
  if (password !== confirmPassword) {
    confirmPasswordError.textContent = "Passwords do not match.";
    confirmPasswordError.classList.add("show");

    return;
  } else {
    confirmPasswordError.classList.remove("show");
  }

  try {
    const newUser = UserManager.registerUser(fName, lName, email, password);
    Auth.login(newUser);
    registerForm.style.display = "none";
    successMessage.style.display = "block";
    successMessage.classList.add("show");

    setTimeout(() => {
      window.location.href = "todo.html";
    }, 2000);
  } catch (error) {
    if (error.message === "User already exists") {
      emailError.textContent = "An account with this email already exists.";
    }
  }
});
