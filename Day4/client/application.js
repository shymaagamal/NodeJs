

fetch('http://localhost:3000/employees/67bc7cb25d61b27a30b1e9eb/leaves?status=cancelled')
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    const leaves = data.employeeLeaves; 
    const tbody = document.querySelector('#leavesTable tbody');
    
    tbody.innerHTML = '';

    leaves.forEach((leave) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${leave._id}</td>
        <td>${leave.employeeId}</td>
        <td>${leave.empBukupId}</td>
        <td>${leave.leaveType}</td>
        <td>${leave.duration}</td>
        <td>${leave.status}</td>
      `;
      tbody.appendChild(tr);
    });
  })
  .catch(err => console.error('Fetch error:', err));
