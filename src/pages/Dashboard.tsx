import React, { useState } from "react";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeTable from "../components/EmployeeTable";
import "../styles/Dashboard.scss";

const Dashboard: React.FC = () => {
  const [isFormVisible, setFormVisible] = useState(false);

  return (
    <div className="dashboard-container">
      <h1>Employee Management</h1>
      <button onClick={() => setFormVisible(true)}>Add Employee</button>
      {isFormVisible && <EmployeeForm onClose={() => setFormVisible(false)} />}
      <div className="employee-table-container">
        <EmployeeTable />
      </div>
    </div>
  );
};

export default Dashboard;
