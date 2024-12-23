import React from "react";
import Dashboard from "./pages/Dashboard";
import { EmployeeProvider } from "./context/EmployeeContext";

const App: React.FC = () => (
  <EmployeeProvider>
    <Dashboard />
  </EmployeeProvider>
);

export default App;
