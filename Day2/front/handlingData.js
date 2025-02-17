import {getEmployees,sendPostRequest} from './fetchData.js';


const inputName=document.getElementById("name");
const inputExperience=document.getElementById("experience");
const inputSalary=document.getElementById("salary");
const inputLevel=document.getElementById("level");
const inputEmail=document.getElementById("email");  

const nameRegex=/^[a-zA-Z\s]+$/;


const validationName=(name)=>{  
    if(!nameRegex.test(name))
    {
        console.log("Name should contain only letters and spaces");
        inputName.setCustomValidity("Name should contain only letters and spaces");
    }
    else {
        console.log("Name is valid");
        inputName.setCustomValidity('');
    }
}


inputName.addEventListener("input",()=>{
    validationName(inputName.value);
});

inputExperience.addEventListener("input",()=>{
    if(inputExperience.value<0)
    {
        inputExperience.setCustomValidity("Experience should be a positive number");
    }
    else {
        inputExperience.setCustomValidity('');
    }
});



document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault();
    if (this.checkValidity()) {
        console.log("Form submitted");
        sendPostRequest(inputName.value,inputExperience.value,inputSalary.value,inputLevel.value,inputEmail.value); 
    }
});



///Display Employee Data that is fetched from the server
getEmployees();
