// src/components/LoginForm.jsx
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  // Estado para almacenar los datos del formulario de login.
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });
  // Estado para almacenar el perfil del usuario (resultado exitoso).
  const [profile, setProfile] = useState(null);
  // Estado para almacenar mensajes de error.
  const [error, setError] = useState(null);

  // Maneja los cambios en los inputs y actualiza el estado.
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Al enviar el formulario, realiza la solicitud al endpoint de login.
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Enviando formulario de login con:", formData);
    try {
      const res = await axios.post(
        "https://apiperfumes-awehgvd8fgerf2ev.brazilsouth-01.azurewebsites.net/api/account/login",
        formData
      );
      console.log("Respuesta del login:", res.data);
      setProfile(res.data);
      setError(null);
      toast.success("¡Login exitoso!");
      // Opcional: almacenar el token en localStorage o actualizar el estado global.
      // localStorage.setItem("token", res.data.Token);
    } catch (err) {
      console.error("Error en login:", err);
      const errMsg = err.response?.data || "Error al iniciar sesión";
      setError(errMsg);
      setProfile(null);
      // Si el error es un objeto, tratamos de extraer la propiedad "title" o convertirlo a string.
      const errorMessage =
        typeof errMsg === "object"
          ? errMsg.title || JSON.stringify(errMsg)
          : errMsg;
      toast.error("Error al iniciar sesión: " + errorMessage);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-green-50 p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-green-800">Iniciar Sesión</h2>
      {error && (
        <p className="text-red-600 mb-4">
          {typeof error === "object" ? error.title || JSON.stringify(error) : error}
        </p>
      )}
      {profile ? (
        <div>
          <p className="text-green-700 mb-2">¡Login exitoso!</p>
          <div className="border p-4 rounded bg-green-100">
            <p className="font-bold">Bienvenido, {profile.NombreCompleto}</p>
            <p>Email: {profile.Email}</p>
            <p>Username: {profile.Username}</p>
          </div>
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-green-600 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                name="Email"
                value={formData.Email}
                onChange={handleChange}
                className="w-full border border-green-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="tu@correo.com"
              />
            </div>
            <div>
              <label className="block text-green-600 font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                name="Password"
                value={formData.Password}
                onChange={handleChange}
                className="w-full border border-green-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Contraseña"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors"
            >
              Iniciar Sesión
            </button>
          </form>

          {/* Sección de Credenciales de Prueba */}
          <div className="mt-6 bg-green-100 p-4 rounded shadow">
            <p className="text-green-800 font-bold mb-2">Credenciales de prueba:</p>
            <ul className="list-disc list-inside text-green-700">
              <li>
                <strong>Usuario Admin:</strong> santiagonicolas2001@gmail.com - Password: Password123$
              </li>
              <li>
                <strong>Usuario Cliente:</strong> julifigue@gmail.com - Password: Password123$
              </li>
            </ul>
          </div>
        </>
      )}
      {/* Contenedor para las notificaciones */}
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default LoginForm;
