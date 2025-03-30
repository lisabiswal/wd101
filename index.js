let nameInp = document.getElementById("name")
let emailInp = document.getElementById("email")
let passwordInp = document.getElementById("password")
let dobInp = document.getElementById("dob")
let tAndC = document.getElementById("tc")

let nametb = document.getElementById("nametb")
let emailtb = document.getElementById("emailtb")
let passwordtb = document.getElementById("passwordtb")
let dobtb = document.getElementById("dobtb")
let tctb = document.getElementById("tctb")


document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault()

  let currYear = new Date().getFullYear();

  let [year, month, day] = dobInp.value.split("-").map(Number); 
  let age = currYear - year;

  console.log(age)

  if(age>=18 && age<=55){
    dobInp.setCustomValidity("")
  }else{
    dobInp.setCustomValidity("the value must be 09/11/1967 or later")
    dobInp.reportValidity(); 
    return
  }
  
  let allInp = {
    name: nameInp.value,
    email: emailInp.value,
    password: passwordInp.value,
    dob: dobInp.value,
    tc: tAndC.checked
  }

  console.log(allInp)
  let toStr = JSON.stringify(allInp)
  localStorage.setItem("user", toStr)

  let obj = JSON.parse(localStorage.getItem("user"))

  let tbl = document.querySelector("tbody")

  let tbody = `
        <tr>
          <td >${obj.name}</td>
          <td >${obj.email}</td>
          <td >${obj.password}</td>
          <td >${obj.dob}</td>
          <td >${obj.tc ? "true" : "false"}</td>
        </tr>
  `
  nameInp.value = ""
  emailInp.value = ""
  passwordInp.value = ""
  dobInp.value = ""
  tAndC.checked = ""

  tbl.innerHTML += tbody

})

