// src/endpoints.js

const endpoints = [
    // =====================================================
    // Endpoints del AccountController
    // =====================================================
    {
      category: "Account",
      name: "Login",
      description: "Permite al usuario autenticarse.",
      method: "POST",
      path: "/api/account/login",
      parameters: [
        { name: "email", type: "string", description: "Correo del usuario" },
        { name: "password", type: "string", description: "Contraseña" }
      ]
    },
    {
      category: "Account",
      name: "Register",
      description: "Registra un nuevo usuario.",
      method: "POST",
      path: "/api/account/register",
      parameters: [
        { name: "nombreCompleto", type: "string", description: "Nombre completo del usuario" },
        { name: "username", type: "string", description: "Nombre de usuario" },
        { name: "email", type: "string", description: "Correo del usuario" },
        { name: "password", type: "string", description: "Contraseña" }
      ]
    },
    {
      category: "Account",
      name: "Get Current User",
      description: "Obtiene el perfil del usuario autenticado.",
      method: "GET",
      path: "/api/account/me",
      parameters: [] // Se utiliza el token de autenticación para obtener el email
    },
  
    // =====================================================
    // Endpoints del CalificacionesController
    // =====================================================
    {
      category: "Calificaciones",
      name: "List Calificaciones",
      description: "Obtiene las calificaciones con paginación.",
      method: "GET",
      path: "/api/calificaciones",
      parameters: [
        { name: "page", type: "number", description: "Número de página" },
        { name: "pageSize", type: "number", description: "Tamaño de la página" },
        { name: "usuario", type: "string", description: "Filtro por usuario" },
        { name: "perfumeId", type: "string", description: "ID del perfume (GUID)" }
      ]
    },
  
    // =====================================================
    // Endpoints del IngredientesController
    // =====================================================
    {
      category: "Ingredientes",
      name: "List Ingredientes",
      description: "Obtiene los ingredientes con paginación.",
      method: "GET",
      path: "/api/ingredientes",
      parameters: [
        { name: "page", type: "number", description: "Número de página" },
        { name: "pageSize", type: "number", description: "Tamaño de la página" },
        { name: "nombre", type: "string", description: "Filtro por nombre del ingrediente" }
      ]
    },
  
    // =====================================================
    // Endpoints del PerfumesController
    // =====================================================
    {
      category: "Perfumes",
      name: "List Perfumes",
      description: "Obtiene la lista de perfumes con paginación.",
      method: "GET",
      path: "/api/perfumes",
      parameters: [
        { name: "page", type: "number", description: "Número de página" },
        { name: "pagesize", type: "number", description: "Tamaño de la página" },
        { name: "nombre", type: "string", description: "Filtro por nombre" },
        { name: "descripcion", type: "string", description: "Filtro por descripción" }
      ]
    },
    {
      category: "Perfumes",
      name: "Get Perfume",
      description: "Obtiene un perfume por su ID.",
      method: "GET",
      path: "/api/perfumes/{id}",
      parameters: [
        { name: "id", type: "string", description: "ID del perfume (GUID)" }
      ]
    },
    {
      category: "Perfumes",
      name: "Create Perfume",
      description: "Crea un nuevo perfume.",
      method: "POST",
      path: "/api/perfumes",
      parameters: [
        { name: "nombre", type: "string", description: "Nombre del perfume" },
        { name: "descripcion", type: "string", description: "Descripción del perfume" },
        { name: "fechaPublicacion", type: "date", description: "Fecha de publicación (YYYY-MM-DD)" },
        { name: "foto", type: "file", description: "Foto del perfume" },
        { name: "ingredienteId", type: "string", description: "ID del ingrediente (GUID)" },
        { name: "precioId", type: "string", description: "ID del precio (GUID)" }
      ]
    },
    {
      category: "Perfumes",
      name: "Update Perfume",
      description: "Actualiza un perfume existente.",
      method: "PUT",
      path: "/api/perfumes/{id}",
      parameters: [
        { name: "id", type: "string", description: "ID del perfume (GUID)" },
        { name: "nombre", type: "string", description: "Nuevo nombre del perfume (opcional)" },
        { name: "descripcion", type: "string", description: "Nueva descripción del perfume (opcional)" },
        { name: "fechaPublicacion", type: "date", description: "Nueva fecha de publicación (YYYY-MM-DD, opcional)" }
      ]
    },
    {
      category: "Perfumes",
      name: "Delete Perfume",
      description: "Elimina un perfume por su ID.",
      method: "DELETE",
      path: "/api/perfumes/{id}",
      parameters: [
        { name: "id", type: "string", description: "ID del perfume (GUID)" }
      ]
    },
    {
      category: "Perfumes",
      name: "Export Report (CSV)",
      description: "Descarga un reporte de perfumes en formato CSV.",
      method: "GET",
      path: "/api/perfumes/reporte",
      parameters: []
    },
  
    // =====================================================
    // Endpoints del PreciosController
    // =====================================================
    {
      category: "Precios",
      name: "List Precios",
      description: "Obtiene la lista de precios con paginación.",
      method: "GET",
      path: "/api/precios",
      parameters: [
        { name: "page", type: "number", description: "Número de página" },
        { name: "pageSize", type: "number", description: "Tamaño de la página" },
        { name: "nombre", type: "string", description: "Filtro por nombre del precio" }
      ]
    }
  ];
  
  export default endpoints;
  