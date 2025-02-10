// src/App.jsx
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import LoginForm from "./Components/LoginForm";
import RegisterForm from "./Components/RegisterForm";
import ApiTesterPage from "./Pages/ApiTesterPage"; // La página que muestra tu API Tester

const App = () => {
  return (
    <div>
      <nav className="bg-green-600 p-4 text-white">
        <ul className="flex space-x-4">
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/login">Iniciar Sesión</Link>
          </li>
          <li>
            <Link to="/register">Registro</Link>
          </li>
          <li>
            <Link to="/api">API Tester</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/api" element={<ApiTesterPage />} />
      </Routes>
    </div>
  );
};

export default App;
