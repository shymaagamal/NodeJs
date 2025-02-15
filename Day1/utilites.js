const {validation}=require('./handleInputData')

const fs = require('node:fs');
const path = require("path");
const fullPath = path.join(__dirname,  "employee.json");

exports.AddUser=(employee)=>{
    let employees =  JSON.parse(fs.readFileSync(fullPath,"utf8"));
    employee.id = employees.length ? employees[employees.length-1].id+1 : 1; 
    employees.push(employee);
    fs.writeFileSync(fullPath, JSON.stringify(employees));

}
exports.ListAllEmployees=()=>
{
    let employees =  JSON.parse(fs.readFileSync(fullPath,"utf8"));
    fs.writeSync(1, JSON.stringify(employees, null, 1) + "\n"); 
}

exports.ListEmployeeUsingID=(id)=>{
        let employees =  JSON.parse(fs.readFileSync(fullPath,"utf8"));

        let employee=employees.find(emp=>emp.id === Number(id));
        if(!employee)
        {
            console.log("Employee is not found");
        }
        else
        {
            fs.writeSync(1, JSON.stringify(employee, null, 1) + "\n"); 
        }
}
exports.ListEmployeeUsingFilters=(filters)=>
{
    let employees =  JSON.parse(fs.readFileSync(fullPath,"utf8"));

    let matchedEmployee=employees.filter((emp)=>Object.entries(filters).every((key) => String(emp[key]) === String(filters[key])));
    console.log(matchedEmployee)
    
    fs.writeSync(1, JSON.stringify(matchedEmployee, null, 1) + "\n"); 


}


exports.EditEmployeeData=(UpdatedEmployee)=>{
    let employees =  JSON.parse(fs.readFileSync(fullPath,"utf8"));
    const employeeIndex = employees.findIndex(emp => emp.id === Number(UpdatedEmployee.id));
    if(employeeIndex ===-1)
    {
        console.log("Employee is not found");
    }
    else
    {
        const { id, ...updateFields } = UpdatedEmployee;
        let editableEmplee={...employees[employeeIndex],...updateFields};
        validation(editableEmplee);
        employees[employeeIndex]=editableEmplee;
        fs.writeFileSync(fullPath, JSON.stringify(employees));


    }
}

exports.DeleteEmployeeData=(id)=>{
    let employees =  JSON.parse(fs.readFileSync(fullPath,"utf8"));
    filteredEmployees= employees.filter(emp => emp.id !== Number(id));
    if(filteredEmployees.length ===employees.length)
    {
        throw new Error("This Employee is not exist");
    }
    fs.writeFileSync(fullPath, JSON.stringify(filteredEmployees));
}