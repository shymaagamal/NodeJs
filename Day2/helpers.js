import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { error } from "console";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const addEmployeeData=(newemployee,res)=>{
    let filePath = path.join(__dirname, "employee.json" );
    const employees = JSON.parse(fs.readFileSync(filePath));
    newemployee.id = employees.length ? employees[employees.length-1].id+1 : 1; 
    employees.push(newemployee);
    fs.writeFileSync(filePath, JSON.stringify(employees));

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({message:"Employee added", employees:employees,employee:newemployee}));
    
}; 

export const EmployeeDataPage= (req,res) => {
    let filePath = path.join(__dirname, req.url === "/" ? "index.html" : req.url);
    res.writeHead(200, { "Content-Type": "text/html" });
    const readStream = fs.createReadStream(filePath);
    readStream.on('error', () => {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "File not found" }));
    });
    readStream.pipe(res);
}

export  const DataRequest= (req,res) => {
    let filePath = path.join(__dirname, "employee.json" );
    const readStream = fs.createReadStream(filePath);
    res.writeHead(200, { "Content-Type": "application/json" });
    readStream.on("error",()=>{
        res.writeHead(404,{"content-type": 'application/json'});
        res.end(JSON.stringify({message:"file not found"}));
    });

    readStream.pipe(res);

}

export const HandelOtherRequets=(req,res)=>{
    if (req.url === "/data" || req.url === "/") {
        return;
    }

    let filePath = path.join(__dirname ,req.url);
    
    let contentType="text/html";
    let exname=path.extname(req.url);
    switch (exname) {
        case ".css":
            contentType = "text/css";
            break;
            case ".js":
                contentType = "application/javascript";
            break;
            case ".json":
                contentType = "application/json";
                break;
            case ".jpg":
                contentType = "image/jpg";
                break; 
            case ".jpeg":
                contentType = "image/jpeg";
                break;   

    }

    if(contentType==="text/html"){
        let notFoundPath = path.join(__dirname, "404.html");
        res.writeHead(404, { "Content-Type": "text/html" });

        fs.createReadStream(notFoundPath).pipe(res).on("error", () => {
            res.end("<h1>404 - Page Not Found</h1>");
        });
    }
    else{
    res.writeHead(200, { "Content-Type": contentType });
    const readStream = fs.createReadStream(filePath);
    readStream.on('error', () => {
 
        res.end(JSON.stringify({ message: "File not found" }));
    });

    readStream.pipe(res);
}

}   


export const ImageDataPage=(fileName,req,res)=>{  

    let filePath = path.join(__dirname, fileName);
    res.writeHead(200, { "Content-Type": "text/html" });
    const readStream = fs.createReadStream(filePath);
    readStream.on('error', () => {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "File not found" }));
    });
    readStream.pipe(res);
}

export const ImageAstronomyDownload=(req,res)=>{
    let filePath = path.join(__dirname, "./Images/fossils-and-climate-change-museum.jpg");
    res.writeHead(200, { "Content-Type": "image/jpg","Content-Disposition":"attachment; filename=fossils-and-climate-change-museum.jpg" });
    const readStream = fs.createReadStream(filePath);
    readStream.on('error', () => {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "File not found" }));
    });
    readStream.pipe(res);
}
