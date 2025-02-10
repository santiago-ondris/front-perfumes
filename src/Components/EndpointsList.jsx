import React from "react";

/**
 * Componente EndpointsList
 *
 * Este componente muestra una lista de endpoints agrupados por categorias,
 * facilitando la navegacion y seleccion de un endpoint especifico.
 *
 * @param {Object[]} props.endpoints - Array de objetos que representan los endpoints.
 * @param {string} props.endpoints[].name - Nombre descriptivo del endpoint.
 * @param {string} props.endpoints[].path - Ruta o URL del endpoint.
 * @param {string} props.endpoints[].method - Metodo HTTP utilizado (GET, POST, etc.).
 * @param {string} props.endpoints[].category - Categoria a la que pertenece el endpoint.
 * @param {Function} props.onSelect - Funcion callback que se ejecuta al hacer clic en un endpoint.
 */
const EndpointsList = ({ endpoints, onSelect }) => {
  // Agrupar endpoints por la propiedad "category".
  // Esto facilita la lectura al separar visualmente los endpoints por categorias en la UI.
  const grouped = endpoints.reduce((acc, endpoint) => {
    if (!acc[endpoint.category]) {
      acc[endpoint.category] = [];
    }
    acc[endpoint.category].push(endpoint);
    return acc;
  }, {});

  return (
    <div className="w-full md:w-1/3 border-r border-green-300 pr-4 mb-4 md:mb-0">
      {/* Iteramos sobre cada categoria encontrada en el objeto "grouped" */}
      {Object.keys(grouped).map((category, i) => (
        <div key={i} className="mb-6">
          {/* Titulo de la categoria */}
          <h3 className="text-lg font-bold text-green-700 mb-2">{category}</h3>

          <ul className="list-none">
            {/* Por cada endpoint dentro de la categoria, se renderiza un elemento de lista */}
            {grouped[category].map((endpoint, index) => (
              <li
                key={index}
                className="cursor-pointer mb-2 p-2 hover:bg-green-100 rounded transition-colors"
                // Al hacer clic en cada endpoint, se llama a la funcion onSelect
                // pasandole el endpoint como argumento.
                onClick={() => onSelect(endpoint)}
              >
                <div className="font-bold">{endpoint.name}</div>
                <div className="text-sm text-green-600">
                  {endpoint.method} {endpoint.path}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default EndpointsList;
