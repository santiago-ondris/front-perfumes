// src/pages/ApiTesterPage.jsx
import React, { useState } from "react";
import EndpointTester from "../Components/EndpointTester";
import endpoints from "../Endpoints";

const ApiTesterPage = () => {
  // Puedes inicializar con el primer endpoint de la lista (o el que prefieras)
  const [selectedEndpointIndex, setSelectedEndpointIndex] = useState(0);

  // Maneja el cambio en el desplegable
  const handleSelectChange = (e) => {
    setSelectedEndpointIndex(Number(e.target.value));
  };

  // Obtiene el endpoint seleccionado de la lista
  const selectedEndpoint = endpoints[selectedEndpointIndex];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-green-800">API Tester</h1>

      <div className="mb-6">
        <label className="block text-green-700 font-medium mb-2">
          Seleccione un endpoint:
        </label>
        <select
          value={selectedEndpointIndex}
          onChange={handleSelectChange}
          className="w-full border border-green-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          {endpoints.map((ep, index) => (
            <option key={index} value={index}>
              {ep.category} - {ep.name}
            </option>
          ))}
        </select>
      </div>

      {/* Renderiza el componente EndpointTester con el endpoint seleccionado */}
      {selectedEndpoint && <EndpointTester endpoint={selectedEndpoint} />}
    </div>
  );
};

export default ApiTesterPage;
