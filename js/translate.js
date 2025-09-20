const translations = {
  en: {
    registerTitle: "Register",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email Address",
    password: "Password",
    confirmPassword: "Confirm Password",
    signUp: "Sign up",
    login: "Login",
    todoTitle: "My To Do List",
    addPlcHold: "Add a new task...",
    addTaskBtn: "Add",
    signUpBtn: "Sign Up",
    signUpLink: "Don't have an account? ",
    create: "Create one",
    successMsg: "sign up Successful!",
    successP: "Redirecting to your dashbord...",
    logOut: "Logout",
  },
  ar: {
    registerTitle: " تسجيل الدخول",
    firstName: "الاسم الأول",
    lastName: "اسم العائلة",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    confirmPassword: "تأكيد كلمة المرور",
    signUp: "تسجيل",
    login: "تسجيل دخول",
    todoTitle: "مهامك",
    addPlcHold: " ... أضف مهمة",
    addTaskBtn: "أضف",
    signUpBtn: "إنشاء حساب",
    signUpLink: "ليس لديك حساب؟ ",
    create: "إنشئ واحدًا",
    successMsg: "تم التسجيل بنجاح!",
    successP: "إعادة التوجيه إلى لوحة التحكم الخاصة بك...",
    logOut: "تسجيل خروج",
  },
};

let currentLang = "en";

function setDirection(lang) {
  if (lang === "ar") {
    document.documentElement.dir = "rtl"; // الصفحة من اليمين لليسار
  } else {
    document.documentElement.dir = "ltr"; // الصفحة من اليسار لليمين
  }
}

function translatePage(lang) {
  if (currentLang === "ar") {
    document.body.classList.add("rtl");
  } else {
    document.body.classList.remove("rtl");
  }
  const elements = document.querySelectorAll("[data-key]");
  elements.forEach((el) => {
    const key = el.dataset.key;
    const textSpan = el.querySelector(".btn-text");
    if (textSpan) textSpan.textContent = translations[lang][key];
    el.textContent = translations[lang][key];
  });
  const placeholders = document.querySelectorAll("[data-placeholder-key]");
  placeholders.forEach((plc) => {
    const key = plc.dataset.placeholderKey;
    plc.placeholder = translations[lang][key];
  });
  setDirection(lang);
}
const translateBtn = document.getElementById("translateBtn");
translateBtn.addEventListener("click", () => {
  currentLang = currentLang === "en" ? "ar" : "en";
  translatePage(currentLang);
});
