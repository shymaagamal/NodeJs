
exports.validation=(employee)=>{
    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const levelRegex=/^(Jr|Mid-Level|Sr|Lead)$/


    if(!nameRegex.test(employee.name))
    {
        throw new Error("name doesnt follow standered or not found"); 
    }
    else if(!emailRegex.test(employee.email))
    {
        throw new Error("email doesnt follow standered or not found"); 

    }
    else if(employee.salary < 0)
    {
        throw new Error("salary doesnt follow standered or not found"); 

    }
    else if(!levelRegex.test(employee.level))
    {
        throw new Error("level doesnt follow standered or not found"); 

    }
    else if(employee.experience <0)
    {
        throw new Error("yearsOfExperience doesnt follow standered or not found"); 

    }
}


exports.HandleData =(EmpData)=>{
    let employee={};
    EmpData.forEach(data => {
        const value=data.split('=');
        const key= value[0].slice(2);
        employee[key.toLowerCase()]= value[1];

    });

    return employee;
}


