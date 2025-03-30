let nameInp = document.getElementById("name");
let emailInp = document.getElementById("email");
let passwordInp = document.getElementById("password");
let dobInp = document.getElementById("dob");
let tAndC = document.getElementById("tc");
let tableBody = document.querySelector("tbody");


function isAgeValid(dob) {
  let birthDate = new Date(dob);
  let currDate = new Date();
  let age = currDate.getFullYear() - birthDate.getFullYear();

  let monthDiff = currDate.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && currDate.getDate() < birthDate.getDate())) {
    age--;
  }

  return age >= 18 && age <= 55;
}


dobInp.addEventListener("input", () => {
  if (isAgeValid(dobInp.value)) {
    dobInp.setCustomValidity("");
  }
});


function isValidEmail(email) {
  let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}


emailInp.addEventListener("input", () => emailInp.setCustomValidity(""));


function addUserToTable(user) {
  let row = document.createElement("tr");

  row.innerHTML = `
    <td>${user.name}</td>
    <td>${user.email}</td>
    <td>${user.password}</td>
    <td>${user.dob}</td>
    <td>${user.tc ? "true" : "false"}</td>
  `;

  tableBody.appendChild(row);
}


document.addEventListener("DOMContentLoaded", () => {
  let storedUsers = JSON.parse(localStorage.getItem("users")) || [];
  storedUsers.forEach(addUserToTable);
});


document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();

  if (!isValidEmail(emailInp.value)) {
    emailInp.setCustomValidity("Please enter a valid email address.");
    emailInp.reportValidity();
    return;
  }

  if (!isAgeValid(dobInp.value)) {
    dobInp.setCustomValidity("Age must be between 18 and 55.");
    dobInp.reportValidity();
    return;
  } else {
    dobInp.setCustomValidity("");
  }

  let newUser = {
    name: nameInp.value.trim(),
    email: emailInp.value.trim(),
    password: passwordInp.value.trim(),
    dob: dobInp.value,
    tc: tAndC.checked,
  };

 
  let storedUsers = JSON.parse(localStorage.getItem("users")) || [];
  storedUsers.push(newUser);
  localStorage.setItem("users", JSON.stringify(storedUsers));


  addUserToTable(newUser);


  document.querySelector("form").reset();
});
