
---

# Employee Management System

## Overview
This project is a simple **Employee Management System** built using Node.js. The system allows users to:
- Add, edit, list, retrieve, and delete employee details.
- Perform various operations via command-line interface (CLI) and HTTP requests.
- Data is stored in a `employee.json` file, and operations are performed through both CLI commands (Day 1) and API requests (Day 2).

---

## **Day 1 - Command-Line Operations**

### Features
In Day 1, the system operates through a **command-line interface**. Users can perform operations on employee data using various commands.

### Installation
``
1. Install dependencies (if required in the future):
   ```
   npm install
   ```

### Usage
Run the script using Node.js with different commands to perform employee operations.

#### **1. Add an Employee**
```sh
node index.js add --name=John Doe --email=john@example.com --salary=50000 --level=Mid-Level --experience=3
```
This command will add a new employee with the provided details.

#### **2. List All Employees**
```sh
node index.js list
```
Displays all employees in the system.

#### **3. List an Employee by ID**
```sh
node index.js list --id=1
```
Retrieves details of the employee with ID `1`.

#### **4. Filter Employees by Criteria**
```sh
node index.js list --level=Mid-Level --experience=3
```
Lists all employees matching the given filters.

#### **5. Edit an Employee**
```sh
node index.js edit --id=1 --salary=60000
```
Updates the employee with ID `1`, setting their salary to `60000`.

#### **6. Delete an Employee**
```sh
node index.js delete --id=1
```
Deletes the employee with ID `1`.

### File Structure (Day 1)
```
📂 Repo/
├── 📄 main.js            # Entry point for command-line operations
├── 📄 utilities.js       # Core logic for handling employees
├── 📄 handleInputData.js # Input validation and processing
├── 📄 employee.json      # JSON file storing employee data
├── 📄 README.md          # Project documentation
```

---

## **Day 2 - Web API and Frontend**

### Features
On Day 2, the system expands to a **web-based interface** with API endpoints. Users can:
- Fetch employee data from the server.
- Add new employees via a POST request.
- Download an astronomy-related image.
- Serve static HTML pages for the frontend.

### API Endpoints

#### `GET /data`
- **Headers:**
  ```json
  { "html-api-key": "indexFile-secret-api-key" }
  ```
- **Response:** Returns a JSON array of employees.

#### `POST /data`
- **Headers:**
  ```json
  { "html-api-key": "indexFile-secret-api-key" }
  ```
- **Body (JSON):**
  ```json
  {
   "id": 1,
   "name": "John Doe",
   "email": "john@example.com",
   "level": "Senior",
   "experience": 5,
   "salary": 70000
  }
  ```
- **Response:** Employee is added and returned in JSON format.

#### `GET /astronomy/download`
- **Response:** Initiates a file download for `fossils-and-climate-change-museum.jpg`.

### File Structure (Day 2)
```
├── front/
│   ├── fetchData.js       # Handles fetching and displaying employee data
│   ├── handlingData.js    # Handles form validation and submitting new employee data
│
├── css/
│   ├── styling.css        # Styles for the web page
│   ├── astronomy.css      # Styles specific to the astronomy page
│
├── Images/
│   ├── fossils-and-climate-change-museum.jpg  # Image available for download
│   ├── DCnpfBy.jpeg       # Additional image used in the project
│
├── index.html             # Main frontend UI
├── astronomy.html         # Astronomy page
├── serbal.html            # Additional file or directory (please specify)
├── employee.json          # Stores employee data
├── helpers.js             # Utility functions for handling file operations
├── index.js               # Main server file
├── package.json           # Project dependencies and scripts
```

---

## Installation & Usage (Day 2)
1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the server:
   ```sh
   npm start
   ```
3. Access the web app at `http://localhost:3000/`.

---

## Notes
- **Day 1:** The employee data is manipulated via command-line commands.
- **Day 2:** The `html-api-key` header is required for authentication when accessing `/data` endpoints.
- Ensure that `employee.json` exists and is properly formatted before running the server.
