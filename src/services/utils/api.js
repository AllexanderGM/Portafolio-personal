import axios from 'axios'

// ========================================
// CONFIGURACIÓN DE AXIOS
// ========================================

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// ========================================
// INTERCEPTORES DE REQUEST
// ========================================

api.interceptors.request.use(
  config => {
    // Agregar token si existe
    const token = localStorage.getItem('auth-token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// ========================================
// INTERCEPTORES DE RESPONSE
// ========================================

api.interceptors.response.use(
  response => response,
  error => {
    // Manejo de errores globales
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // No autorizado - limpiar tokens
          localStorage.removeItem('auth-token')
          break
        case 403:
          // Prohibido
          console.error('Acceso prohibido')
          break
        case 404:
          console.error('Recurso no encontrado')
          break
        case 500:
          console.error('Error del servidor')
          break
        default:
          console.error('Error en la petición:', error.response.status)
      }
    }
    return Promise.reject(error)
  }
)

export default api
