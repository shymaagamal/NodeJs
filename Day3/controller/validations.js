export const HandleData = (employee) => {
  employee = Object.entries(employee).reduce((acc, [key, value]) => {
    acc[key.toLowerCase()] = value;
    return acc;
  }, {});

  return employee;
};

export const validation = (employee) => {
  const nameRegex = /^[a-z\s]+$/i;
  const emailRegex = /^[\w.%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
  const levels = ['Jr', 'Mid-Level', 'Sr', 'Lead'];

  employee = HandleData(employee);
  if (!nameRegex.test(employee.name)) {
    return {employee, status: 404, error: 'name doesnt follow standered or not found, it should be only letters'};
  } else if (!emailRegex.test(employee.email)) {
    return {employee, status: 404, error: 'email doesnt follow standered or not found, it should be in the format of shaimaa@gmail.com'};
  } else if (employee.salary < 0) {
    return {employee, status: 404, error: 'salary doesnt follow standered or not found ,it should be greater than 0'};
  } else if (!levels.includes(employee.level)) {
    return {employee, status: 404, error: 'level doesnt follow standered or not found, it should be Jr, Mid-Level, Sr, Lead'};
  } else if (employee.experience < 0) {
    return {employee, status: 404, error: 'experience doesnt follow standered or not found, it should be greater than 0'};
  }
  return {employee, status: 200};
};
