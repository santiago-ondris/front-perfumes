// src/components/EndpointsList.jsx
import React from "react";

const EndpointsList = ({ endpoints, onSelect }) => {
  // Agrupar endpoints por la propiedad "category"
  const grouped = endpoints.reduce((acc, endpoint) => {
    if (!acc[endpoint.category]) {
      acc[endpoint.category] = [];
    }
    acc[endpoint.category].push(endpoint);
    return acc;
  }, {});

  return (
    <div className="w-full md:w-1/3 border-r border-green-300 pr-4 mb-4 md:mb-0">
      {Object.keys(grouped).map((category, i) => (
        <div key={i} className="mb-6">
          <h3 className="text-lg font-bold text-green-700 mb-2">{category}</h3>
          <ul className="list-none">
            {grouped[category].map((endpoint, index) => (
              <li
                key={index}
                className="cursor-pointer mb-2 p-2 hover:bg-green-100 rounded transition-colors"
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
