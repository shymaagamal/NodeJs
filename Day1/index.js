

const { AddUser,ListAllEmployees,EditEmployeeData,DeleteEmployeeData,ListEmployeeUsingID,ListEmployeeUsingFilters } = require("./utilites.js");
const { validation, HandleData } = require("./handleInputData.js");
const UserInputs=()=>{
    [ , , cmd,...EmpData] = process.argv;    
    cmd=cmd.toLowerCase();
    let employee;
    if(cmd == "add")
    {
        employee=HandleData(EmpData);
        employee.level=employee.level || 'Jr';
        employee.experience = employee.experience ? Number(employee.experience) : 0;
        validation(employee);
        AddUser(employee);
    }
    else if(cmd=="list")
    {
        if(!EmpData.length)
        {
            
            
            ListAllEmployees()
        }
        else if(EmpData.length===1) 
        {
            let filters=HandleData(EmpData);

            ListEmployeeUsingID(filters.id);
        }
        else{
            let filters=HandleData(EmpData);
            console.log(Object.entries(filters));
            
            ListEmployeeUsingFilters(filters);
        }
    }
    else if(cmd=="edit")
    {
        let UpdatedDataEmployee=HandleData(EmpData);
        let emplyee=EditEmployeeData(UpdatedDataEmployee);
        
    }
    else if(cmd=="delete")
    {
        let EmployeeId=HandleData(EmpData);
        DeleteEmployeeData(EmployeeId.id);
    }


    
}

UserInputs();








