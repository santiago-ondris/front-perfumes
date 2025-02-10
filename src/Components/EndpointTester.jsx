// src/components/EndpointTester.jsx
import React, { useState } from "react";
import axios from "axios";
import ResponseDisplay from "./ResponseDisplay";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// URL base de la API (asegúrate de incluir "https://")
const baseUrl =
  "https://apiperfumes-awehgvd8fgerf2ev.brazilsouth-01.azurewebsites.net";

const EndpointTester = ({ endpoint }) => {
  // Inicializa los valores del formulario según los parámetros definidos en el endpoint.
  // Se usan "page" y "pagesize" (en minúsculas) como en la versión original.
  const [formValues, setFormValues] = useState(() => {
    const initial = {};
    endpoint.parameters.forEach((param) => {
      if (param.type === "number") {
        if (param.name.toLowerCase() === "page") {
          initial[param.name] = 1;
        } else if (param.name.toLowerCase() === "pagesize") {
          initial[param.name] = 10;
        } else {
          initial[param.name] = 0;
        }
      } else {
        initial[param.name] = "";
      }
    });
    return initial;
  });

  const [response, setResponse] = useState(null);

  // Actualiza el estado formValues al cambiar un input.
  // Si el input es de tipo "number", convierte el valor a Number.
  const handleInputChange = (paramName, value, type) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [paramName]: type === "number" ? Number(value) : value,
    }));
  };

  // Manejador del envío del formulario: consulta la API y actualiza la respuesta.
  const handleSubmit = async (e) => {
    e.preventDefault();
    let url = baseUrl + endpoint.path;
    // Si la URL contiene parámetros en la ruta (por ejemplo, {id}), se reemplaza.
    if (url.includes("{") && formValues["id"]) {
      url = url.replace("{id}", formValues["id"]);
    }

    try {
      let res;
      // Si el endpoint es el de exportar reporte CSV, usamos responseType: 'blob'
      if (endpoint.method === "GET" && endpoint.name === "Export Report (CSV)") {
        res = await axios.get(url, {
          params: formValues,
          responseType: "blob",
        });
        // Procesa el blob recibido y fuerza la descarga
        const blob = new Blob([res.data], { type: "text/csv" });
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = "perfumes.csv";
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(downloadUrl);
        // Se muestra una notificación y se establece un mensaje en la respuesta.
        toast.success("Archivo descargado: perfumes.csv");
        setResponse({ message: "Archivo descargado: perfumes.csv" });
      } else if (endpoint.method === "GET") {
        res = await axios.get(url, { params: formValues });
        setResponse(res.data);
      } else if (endpoint.method === "POST" || endpoint.method === "PUT") {
        const hasFile = endpoint.parameters.some((p) => p.type === "file");
        let data;
        if (hasFile) {
          data = new FormData();
          Object.keys(formValues).forEach((key) => {
            data.append(key, formValues[key]);
          });
        } else {
          data = formValues;
        }
        if (endpoint.method === "POST") {
          res = await axios.post(url, data, {
            headers: hasFile ? { "Content-Type": "multipart/form-data" } : {},
          });
        } else {
          res = await axios.put(url, data, {
            headers: hasFile ? { "Content-Type": "multipart/form-data" } : {},
          });
        }
        let dataResp = res.data;
        if (
          dataResp == null ||
          (typeof dataResp === "object" &&
            !Array.isArray(dataResp) &&
            Object.keys(dataResp).length === 0)
        ) {
          dataResp = { message: "Operación completada con éxito" };
        }
        setResponse(dataResp);
        toast.success(dataResp.message || "Operación completada con éxito");
      } else if (endpoint.method === "DELETE") {
        res = await axios.delete(url, { params: formValues });
        let dataResp = res.data;
        if (
          dataResp == null ||
          (typeof dataResp === "object" &&
            !Array.isArray(dataResp) &&
            Object.keys(dataResp).length === 0)
        ) {
          dataResp = { message: "Operación completada con éxito" };
        }
        setResponse(dataResp);
        toast.success(dataResp.message || "Operación completada con éxito");
      }
    } catch (error) {
      const errMsg = error.response ? error.response.data : error.message;
      setResponse(errMsg);
      toast.error(typeof errMsg === "string" ? errMsg : "Ocurrió un error");
    }
  };

  return (
    <div className="w-full md:w-2/3 pl-4">
      <h2 className="text-2xl font-bold mb-4 text-green-800">
        {endpoint.name}
      </h2>
      <p className="mb-4 text-green-700">{endpoint.description}</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        {endpoint.parameters.map((param, index) => {
          let inputType = "text";
          if (param.type === "number") inputType = "number";
          else if (param.type === "date") inputType = "date";
          else if (param.type === "file") inputType = "file";
          return (
            <div key={index}>
              <label className="block font-medium mb-1 text-green-600">
                {param.name} ({param.type})
              </label>
              <input
                type={inputType}
                className="border border-green-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-400"
                onChange={(e) => {
                  if (param.type === "file") {
                    handleInputChange(param.name, e.target.files[0], param.type);
                  } else {
                    handleInputChange(param.name, e.target.value, param.type);
                  }
                }}
                value={param.type === "file" ? undefined : formValues[param.name]}
              />
            </div>
          );
        })}
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
        >
          Ejecutar {endpoint.method}
        </button>
      </form>
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-green-800">Respuesta</h3>
        <ResponseDisplay response={response} />
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default EndpointTester;
