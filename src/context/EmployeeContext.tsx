import React, { createContext, useState, ReactNode } from "react";
import { Employee } from "../types/Employee";

interface EmployeeContextType {
  employees: Employee[];
  addEmployee: (employee: Employee) => void;
  updateEmployee: (id: string, updatedEmployee: Employee) => void;
  deleteEmployee: (id: string) => void;
}

export const EmployeeContext = createContext<EmployeeContextType | undefined>(
  undefined
);

export const EmployeeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const addEmployee = (employee: Employee) =>
    setEmployees((prev) => [...prev, employee]);

  const updateEmployee = (id: string, updatedEmployee: Employee) =>
    setEmployees((prev) =>
      prev.map((employee) => (employee.id === id ? updatedEmployee : employee))
    );

  const deleteEmployee = (id: string) =>
    setEmployees((prev) => prev.filter((employee) => employee.id !== id));

  return (
    <EmployeeContext.Provider
      value={{ employees, addEmployee, updateEmployee, deleteEmployee }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};
