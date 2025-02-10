// src/components/ResponseDisplay.jsx
import React from "react";

// Función recursiva para renderizar un valor (ya sea primitivo, objeto o array)
const renderValue = (value) => {
  if (Array.isArray(value)) {
    return (
      <ul className="ml-4 list-disc">
        {value.map((item, index) => (
          <li key={index}>{renderValue(item)}</li>
        ))}
      </ul>
    );
  } else if (typeof value === "object" && value !== null) {
    return (
      <div className="ml-4">
        {Object.entries(value).map(([key, val]) => (
          <div key={key} className="mb-1">
            <span className="font-bold">{key}: </span>
            {renderValue(val)}
          </div>
        ))}
      </div>
    );
  } else {
    return <span>{value?.toString()}</span>;
  }
};

const ResponseDisplay = ({ response }) => {
  // Si no hay respuesta o no es un objeto, mostramos un mensaje simple.
  if (!response || typeof response !== "object") {
    return (
      <div className="bg-green-50 border border-green-300 rounded p-4 shadow-sm">
        <p className="text-green-700">No hay respuesta para mostrar.</p>
      </div>
    );
  }

  // Si la respuesta es paginada (tiene items como array)
  if (Array.isArray(response.items)) {
    return (
      <div className="space-y-4">
        <div className="mb-4">
          <p className="text-green-800">
            Página: {response.currentPage} de {response.totalPages}{" "}
            <span className="text-sm text-green-600">
              ({response.totalCount} elementos)
            </span>
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {response.items.map((item, index) => (
            <div
              key={index}
              className="bg-green-50 border border-green-300 rounded p-4 shadow-sm"
            >
              {Object.entries(item).map(([key, value]) => (
                <div key={key} className="mb-1">
                  <span className="font-bold">{key}: </span>
                  {renderValue(value)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Para respuestas no paginadas, mostramos el JSON formateado.
  return (
    <div className="bg-green-50 border border-green-300 rounded p-4 shadow-sm">
      <pre className="text-sm font-mono text-green-800 whitespace-pre-wrap">
        {JSON.stringify(response, null, 2)}
      </pre>
    </div>
  );
};

export default ResponseDisplay;
