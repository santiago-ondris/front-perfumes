/**
 * Componente EndpointTester
 * 
 * Proporciona un formulario dinamico para interactuar con un endpoint especifico de la API.
 * Permite probar distintos metodos (GET, POST, PUT, DELETE), y tambien como manejar descargas CSV.
 * 
 * Principales caracteristicas:
 * - Genera inputs dinamicos basados en la definicion de parametros del endpoint (tipo, nombre).
 * - Maneja la logica de envío de solicitudes con axios.
 * - Muestra notificaciones de exito o error utilizando react-toastify.
 * - Descarga archivos CSV en su respectivo endpoint.
 * - Muestra la respuesta de la API en un componente separado (ResponseDisplay).
 */

import React, { useState } from "react";
import axios from "axios";
import ResponseDisplay from "./ResponseDisplay";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

/**
 * @param {Object} props
 * @param {Object} props.endpoint - Informacion completa del endpoint a probar.
 * @param {string} props.endpoint.name - Nombre descriptivo del endpoint (ej. "List Perfumes").
 * @param {string} props.endpoint.description - Descripcion del endpoint.
 * @param {string} props.endpoint.path - Ruta de la API (ej. "/api/perfumes").
 * @param {string} props.endpoint.method - Metodo HTTP (GET, POST, PUT, DELETE).
 * @param {Object[]} props.endpoint.parameters - Lista de parametros requeridos por el endpoint.
 * @param {string} props.endpoint.parameters[].name - Nombre del parametro (ej. "id", "page").
 * @param {string} props.endpoint.parameters[].type - Tipo del parametro (ej. "number", "text", "date", "file").
 */
const EndpointTester = ({ endpoint }) => {
  // Almacena los valores ingresados en el formulario.
  // Se generan valores iniciales basados en el tipo y nombre de cada parametro.
  // Por ejemplo, para "page" se inicia en 1, "pagesize" en 10, y otros numeros en 0.
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

  // Estado para almacenar la respuesta recibida de la API.
  const [response, setResponse] = useState(null);

  /**
   * Maneja el cambio de valor en los inputs del formulario.
   * Si es de tipo "number", se convierte a Number para evitar problemas de tipado.
   * Si es de tipo "file", se guarda directamente el objeto File.
   */
  const handleInputChange = (paramName, value, type) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [paramName]: type === "number" ? Number(value) : value,
    }));
  };

  /**
   * Envia la solicitud a la API al hacer submit del formulario.
   * El comportamiento varia dependiendo del metodo HTTP y del endpoint especifico.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Se construye la URL final concatenando baseUrl + path.
    let url = baseUrl + endpoint.path;

    // Caso especial: si la ruta usa {id}, se reemplaza si formValues["id"] existe.
    if (url.includes("{") && formValues["id"]) {
      url = url.replace("{id}", formValues["id"]);
    }

    try {
      let res; // Variable para almacenar la respuesta de la solicitud.
      
      // Caso especial: descarga de CSV cuando el metodo es GET y el endpoint.name es "Export Report (CSV)".
      if (endpoint.method === "GET" && endpoint.name === "Export Report (CSV)") {
        res = await axios.get(url, {
          params: formValues,
          responseType: "blob", // Importante para manejar archivos binarios.
        });

        // Se crea un Blob y se fuerza la descarga del archivo "perfumes.csv".
        const blob = new Blob([res.data], { type: "text/csv" });
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = "perfumes.csv";
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(downloadUrl);

        // Notificacion de éxito y actualizacion del estado con un mensaje.
        toast.success("Archivo descargado: perfumes.csv");
        setResponse({ message: "Archivo descargado: perfumes.csv" });
      
      } else if (endpoint.method === "GET") {
        // Si es un GET normal, se pasan los formValues como query parameters.
        res = await axios.get(url, { params: formValues });
        setResponse(res.data);

      } else if (endpoint.method === "POST" || endpoint.method === "PUT") {
        // Para POST o PUT, determinamos si alguno de los parametros es un archivo.
        const hasFile = endpoint.parameters.some((p) => p.type === "file");
        let data;

        // Si hay archivos, se usa FormData. Si no, se usa un objeto normal.
        if (hasFile) {
          data = new FormData();
          Object.keys(formValues).forEach((key) => {
            data.append(key, formValues[key]);
          });
        } else {
          data = formValues;
        }

        // Si es POST o PUT.
        if (endpoint.method === "POST") {
          res = await axios.post(url, data, {
            headers: hasFile ? { "Content-Type": "multipart/form-data" } : {},
          });
        } else {
          res = await axios.put(url, data, {
            headers: hasFile ? { "Content-Type": "multipart/form-data" } : {},
          });
        }

        // Maneja la respuesta: si esta vacia o es null, hay un mensaje por defecto.
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

        // Notificación de éxito.
        toast.success(dataResp.message || "Operación completada con éxito");
      
      } else if (endpoint.method === "DELETE") {
        // Para DELETE
        res = await axios.delete(url, { params: formValues });
        let dataResp = res.data;

        // Mensaje por defecto para respuesta vacia.
        if (
          dataResp == null ||
          (typeof dataResp === "object" &&
            !Array.isArray(dataResp) &&
            Object.keys(dataResp).length === 0)
        ) {
          dataResp = { message: "Operación completada con éxito" };
        }
        setResponse(dataResp);

        // Notificacion de exito.
        toast.success(dataResp.message || "Operación completada con éxito");
      }
    } catch (error) {
      // Manejo de errores: se muestra un toast con el mensaje devuelto por la API o el error generico.
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

      {/* Formulario que se genera dinamicamente a partir de endpoint.parameters */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {endpoint.parameters.map((param, index) => {
          // Se detrmina el "type" del input HTML en funcion del tipo de parametro.
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
                    // Para archivos, se guarda directamente el File object en el estado.
                    handleInputChange(param.name, e.target.files[0], param.type);
                  } else {
                    // Para texto, numeros, fechas, etc.
                    handleInputChange(param.name, e.target.value, param.type);
                  }
                }}
                // Para inputs de tipo file no se asigna value
                value={
                  param.type === "file" ? undefined : formValues[param.name]
                }
              />
            </div>
          );
        })}

        {/* Botin de envío. Indica el método HTTP para mayor claridad. */}
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
        >
          Ejecutar {endpoint.method}
        </button>
      </form>

      {/* Seccion para mostrar la respuesta que devuelva la API */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-green-800">Respuesta</h3>
        <ResponseDisplay response={response} />
      </div>

      {/* Contenedor de notificaciones de react-toastify */}
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default EndpointTester;
