import React from "react";
import './Employee.css'; // Make sure you have this CSS file in the same directory

const ViewAllEmployees = () => {
  const employees = [
    {
      id: 1,
      name: "John Doe",
      technology: "JavaScript",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Jane Smith",
      technology: "Python",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Mark Johnson",
      technology: "Java",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      name: "Lucy Brown",
      technology: "C++",
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className="employee-list">
      <h2>View All Employees</h2>
      <div className="employee-cards">
        {employees.map((employee) => (
          <div key={employee.id} className="employee-card">
            <img
              src={employee.image}
              alt={employee.name}
              className="employee-image"
            />
            <div className="employee-details">
              <h3>{employee.name}</h3>
              <p>Technology: {employee.technology}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewAllEmployees;
