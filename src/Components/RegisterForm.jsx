// src/components/RegisterForm.jsx
import React, { useState } from "react";
import axios from "axios";

const RegisterForm = () => {
  // Estado para almacenar los datos del formulario.
  const [formData, setFormData] = useState({
    NombreCompleto: "",
    Username: "",
    Email: "",
    Password: "",
  });
  // Estado para almacenar la respuesta exitosa (el perfil) o los errores.
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  // Maneja los cambios en los inputs y actualiza el estado.
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Al enviar el formulario, realiza la llamada al endpoint de registro.
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Asegúrate de que la URL base y el path coincidan con tu backend.
      const res = await axios.post(
        "https://apiperfumes-awehgvd8fgerf2ev.brazilsouth-01.azurewebsites.net/api/account/register",
        formData
      );
      setProfile(res.data);
      setError(null);
      // Opcional: almacenar el token en localStorage o actualizar el estado global.
      // localStorage.setItem("token", res.data.Token);
    } catch (err) {
      setError(err.response?.data || "Error en el registro");
      setProfile(null);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-green-50 p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-green-800">Registro</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {profile ? (
        <div>
          <p className="text-green-700 mb-2">¡Registro exitoso!</p>
          <div className="border p-4 rounded bg-green-100">
            <p className="font-bold">Bienvenido, {profile.NombreCompleto}</p>
            <p>Email: {profile.Email}</p>
            <p>Username: {profile.Username}</p>
            {/* Aquí podrías mostrar también el token o redirigir al usuario */}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-green-600 font-medium mb-1">
              Nombre Completo
            </label>
            <input
              type="text"
              name="NombreCompleto"
              value={formData.NombreCompleto}
              onChange={handleChange}
              className="w-full border border-green-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Ingresa tu nombre completo"
            />
          </div>
          <div>
            <label className="block text-green-600 font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              name="Username"
              value={formData.Username}
              onChange={handleChange}
              className="w-full border border-green-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Elige un nombre de usuario"
            />
          </div>
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
              placeholder="Elige una contraseña"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors"
          >
            Registrarse
          </button>
        </form>
      )}
    </div>
  );
};

export default RegisterForm;
