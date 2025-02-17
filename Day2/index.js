import http from "http";

import  {DataRequest , EmployeeDataPage, HandelOtherRequets,addEmployeeData ,ImageDataPage,ImageAstronomyDownload} from "./helpers.js";


const server = http.createServer((req, res) => {
    if(req.method==="GET" && req.url === "/data")
    {
        if (req.headers['html-api-key'] !== 'indexFile-secret-api-key') {
            res.writeHead(403, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Forbidden: You are not authorized to access this resource' }));
            return;
        }
        DataRequest(req,res);
    }
    else if(req.url === "/"){

        EmployeeDataPage(req,res);
    }
    else if(req.method==="POST" && req.url === "/data"){
        let data="";
        req.on("data",(chunk)=>{
            data+=chunk.toString();
        });
        req.on("end",()=>{
            try{

                if (req.headers['html-api-key'] !== 'indexFile-secret-api-key') {
                    res.writeHead(403, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Forbidden: You are not authorized to access this resource' }));
                    return;
                }

                const {name,email,level,experience,salary}=JSON.parse(data);
                addEmployeeData({name,email,level,experience,salary},res);
  


        }
        catch(error){
            console.error("Invalid data:",error);
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({message:"Invalid data"}));
        }
        });
    }
    else if(req.url === '/astronomy' )
    {
        ImageDataPage("astronomy.html",req,res); 
    }
    else if(req.url === '/serbal')
    {
        ImageDataPage("serbal.html",req,res); 
    }
    else if(req.url === '/astronomy/download')
    {
        ImageAstronomyDownload(req,res);
    }
    else{
        console.log("Other request");
        console.log("URL:",req.url);
        HandelOtherRequets(req,res);
    }

});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000/");
});
