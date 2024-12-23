import React, { useContext, useState } from "react";
import { EmployeeContext } from "../context/EmployeeContext";
import { Employee } from "../types/Employee";
import "../styles/EmployeeForm.scss";
interface Props {
  employee?: Employee;
  onClose: () => void;
}

const EmployeeForm: React.FC<Props> = ({ employee, onClose }) => {
  const { addEmployee, updateEmployee } = useContext(EmployeeContext)!;
  const [formData, setFormData] = useState<Employee>(
    employee || { id: "", name: "", department: "", position: "" }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (employee) {
      updateEmployee(formData.id, formData); // Edit functionality
    } else {
      addEmployee({ ...formData, id: crypto.randomUUID() }); // Add new employee
    }
    onClose();
  };

  return (
    <div className="employee-form-overlay">
      <div className="employee-form-container">
        <form onSubmit={handleSubmit}>
          <h2>{employee ? "Edit Employee" : "Add Employee"}</h2>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="position"
            placeholder="Position"
            value={formData.position}
            onChange={handleChange}
            required
          />
          <button type="submit">{employee ? "Update" : "Add"}</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
