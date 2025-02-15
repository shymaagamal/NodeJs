# Employee Management System

## Overview
This is a simple Employee Management System built using Node.js. The system allows users to:
- Add new employees
- List all employees
- Retrieve employee details by ID
- Filter employees based on various criteria
- Edit employee details
- Delete employees

The data is stored in a JSON file (`employee.json`), and all operations are performed through command-line arguments.

---

## Installation
### Prerequisites
- Node.js installed on your system

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/your-repo.git
   ```
2. Navigate to the project directory:
   ```sh
   cd your-repo
   ```
3. Install dependencies (if required in the future):
   ```sh
   npm install
   ```

---

## Usage
Run the script using Node.js with different commands to perform employee operations.

### **1. Add an Employee**
```sh
node main.js add --name=John Doe --email=john@example.com --salary=50000 --level=Mid-Level --experience=3
```
This command will add a new employee with the provided details.

### **2. List All Employees**
```sh
node main.js list
```
Displays all employees in the system.

### **3. List an Employee by ID**
```sh
node main.js list --id=1
```
Retrieves details of the employee with ID `1`.

### **4. Filter Employees by Criteria**
```sh
node main.js list --level=Mid-Level --experience=3
```
Lists all employees matching the given filters.

### **5. Edit an Employee**
```sh
node main.js edit --id=1 --salary=60000
```
Updates the employee with ID `1`, setting their salary to `60000`.

### **6. Delete an Employee**
```sh
node main.js delete --id=1
```
Deletes the employee with ID `1`.

---

## File Structure
```
📂 Repo/
├── 📄 main.js            # Entry point for command-line operations
├── 📄 utilities.js       # Core logic for handling employees
├── 📄 handleInputData.js # Input validation and processing
├── 📄 employee.json      # JSON file storing employee data
├── 📄 README.md          # Project documentation
```

---

## Code Explanation
### **`main.js` (Command-Line Handler)**
- Parses user input.
- Calls the appropriate function based on the command.

### **`utilities.js` (Employee Operations)**
- `AddUser`: Adds a new employee to `employee.json`.
- `ListAllEmployees`: Displays all employees.
- `ListEmployeeUsingID`: Retrieves an employee by ID.
- `ListEmployeeUsingFilters`: Filters employees based on given criteria.
- `EditEmployeeData`: Modifies employee details.
- `DeleteEmployeeData`: Removes an employee.

### **`handleInputData.js` (Input Handling & Validation)**
- `validation`: Ensures input data meets the required format.
- `HandleData`: Parses command-line arguments into an object.

