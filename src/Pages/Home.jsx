// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-8">
      {/* Título Principal */}
      <h1 className="text-5xl font-bold text-green-800 mb-4">
        WEB API PERFUME
      </h1>

      {/* Introducción */}
      <p className="text-lg text-green-700 mb-8 text-center max-w-3xl">
        Bienvenido a la API de Perfumes, un servicio simple para gestionar la
        información de perfumes. Aquí podrás consultar, crear, actualizar y
        eliminar perfumes, además de obtener reportes en formato CSV. Explora
        los diferentes endpoints y descubre cómo interactuar con esta API.
      </p>

      {/* Manual de Uso */}
      <div className="bg-green-100 p-6 rounded shadow-md max-w-3xl mb-8">
        <h2 className="text-2xl font-semibold text-green-800 mb-4">
          ¿Cómo usar esta API?
        </h2>
        <ul className="list-disc list-inside text-green-700 space-y-2">
          <li>
            <strong>GET /api/perfumes:</strong> Consulta la lista de perfumes con
            paginación.
          </li>
          <li>
            <strong>POST /api/perfumes:</strong> Crea un nuevo perfume enviando
            datos como nombre, descripción, fecha de publicación, foto y los IDs
            de ingrediente y precio.
          </li>
          <li>
            <strong>PUT /api/perfumes/{`{id}`}:</strong> Actualiza un perfume
            existente.
          </li>
          <li>
            <strong>DELETE /api/perfumes/{`{id}`}:</strong> Elimina un perfume.
          </li>
          <li>
            <strong>GET /api/perfumes/reporte:</strong> Genera y descarga un
            reporte en CSV de los perfumes.
          </li>
          <li>
            También hay endpoints para gestionar usuarios, ingredientes,
            precios y calificaciones.
          </li>
        </ul>
      </div>

      {/* Botón para ir al API Tester */}
      <div className="mb-8">
        <Link
          to="/api"
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition-colors"
        >
          Ir al API TESTER
        </Link>
      </div>

      {/* Tecnologías y Patrones Utilizados */}
      <div className="mt-8 text-green-700">
        <p className="mb-2 font-semibold">Tecnologías y Patrones Utilizados:</p>
        <ul className="list-disc list-inside">
          <li>.NET 9 SDK</li>
          <li>
            Arquitectura en Capas: <em>Infrastructure, Persistence, Domain,
            Application y WebApi</em>
          </li>
          <li>Entity Framework Core</li>
          <li>Arquitectura CQRS</li>
          <li>Middleware personalizado</li>
          <li>Subida de imágenes con Cloudinary</li>
          <li>Swagger para documentación de la API</li>
          <li>JWT Authentication</li>
          <li>React con Vite</li>
          <li>Tailwind CSS</li>
          <li>React Router</li>
          <li>
            <strong>Azure App Service:</strong> Desplegado en Azure
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
