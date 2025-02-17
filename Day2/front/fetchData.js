
export const getEmployees=async ()=>{
    try {
        console.log("Fetching employee data...");
        let response = await fetch("http://localhost:3000/data");

        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        let employees = await response.json();
        ShowData(employees);
        console.log("Employees:", employees);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}


export const ShowData=(data)=>{

    let table=document.getElementsByTagName("table")[0];
    let tbody=table.getElementsByTagName("tbody")[0];
    data.forEach((employee)=>{
        let row=tbody.insertRow();
        let name=row.insertCell(0);
        let email=row.insertCell(1);
        let level=row.insertCell(2);
        let experience=row.insertCell(3);
        let salary=row.insertCell(4);
        name.innerHTML=employee.name;
        email.innerHTML=employee.email;
        level.innerHTML=employee.level;
        experience.innerHTML=employee.experience;
        salary.innerHTML=employee.salary;
    });
}


const addNewEmployeeToTable=(employee)=>{

    let table=document.getElementsByTagName("table")[0];
    let tbody=table.getElementsByTagName("tbody")[0];
    let row=tbody.insertRow();
    let name=row.insertCell(0);
    let email=row.insertCell(1);
    let level=row.insertCell(2);
    let experience=row.insertCell(3);
    let salary=row.insertCell(4);
    name.innerHTML=employee.name;
    email.innerHTML=employee.email;
    level.innerHTML=employee.level;
    experience.innerHTML=employee.experience;
    salary.innerHTML=employee.salary;
}

export const sendPostRequest = async (emPname, emPexperience, emPsalary, emPlevel, emPemail) => {
        const response = await fetch("http://localhost:3000/data", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                 'html-api-key': 'indexFile-secret-api-key'
            },
            body: JSON.stringify({
                name: emPname,
                email: emPemail,
                level: emPlevel,
                experience: emPexperience,
                salary: emPsalary,
            }),
        });

        const data = await response.json();
        console.log("Response:", data);
        if (!response.ok) {
            alert(`Error: ${data.message}`);
        } else {
            addNewEmployeeToTable(data.employee);
        }
    
};