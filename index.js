let nameInp = document.getElementById("name");
let emailInp = document.getElementById("email");
let passwordInp = document.getElementById("password");
let dobInp = document.getElementById("dob");
let tAndC = document.getElementById("tc");

let tableBody = document.querySelector("tbody");


function isValidEmail(email) {
  let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}


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


function addUserToTable(user) {
  let row = `
        <tr>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.password}</td>
          <td>${user.dob}</td>
          <td>${user.tc ? "true" : "false"}</td>
        </tr>
  `;
  tableBody.innerHTML += row;
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
  } else {
    emailInp.setCustomValidity("");
  }

  if (!isAgeValid(dobInp.value)) {
    dobInp.setCustomValidity("Age must be between 18 and 55.");
    dobInp.reportValidity();
    return;
  } else {
    dobInp.setCustomValidity("");
  }

  let newUser = {
    name: nameInp.value,
    email: emailInp.value,
    password: passwordInp.value,
    dob: dobInp.value,
    tc: tAndC.checked,
  };


  let storedUsers = JSON.parse(localStorage.getItem("users")) || [];
  storedUsers.push(newUser);
  localStorage.setItem("users", JSON.stringify(storedUsers));


  addUserToTable(newUser);


  nameInp.value = "";
  emailInp.value = "";
  passwordInp.value = "";
  dobInp.value = "";
  tAndC.checked = false;
});
