import api from './api.js'

// ========================================
// CLASE BASE PARA SERVICIOS REST
// ========================================

export class ServiceREST {
  // Propiedades estáticas para caché y deduplicación
  static pendingRequests = new Map()
  static CACHE_EXPIRY = 30000 // 30 segundos
  static deduplicationEnabled = true

  // ========================================
  // MÉTODOS HTTP
  // ========================================

  static async get(url, config = {}) {
    try {
      const response = await api.get(url, config)
      return { success: true, data: response.data, status: response.status }
    } catch (error) {
      return this.handleError(error)
    }
  }

  static async post(url, data, config = {}) {
    try {
      const response = await api.post(url, data, config)
      return { success: true, data: response.data, status: response.status }
    } catch (error) {
      return this.handleError(error)
    }
  }

  static async put(url, data, config = {}) {
    try {
      const response = await api.put(url, data, config)
      return { success: true, data: response.data, status: response.status }
    } catch (error) {
      return this.handleError(error)
    }
  }

  static async patch(url, data, config = {}) {
    try {
      const response = await api.patch(url, data, config)
      return { success: true, data: response.data, status: response.status }
    } catch (error) {
      return this.handleError(error)
    }
  }

  static async delete(url, config = {}) {
    try {
      const response = await api.delete(url, config)
      return { success: true, data: response.data, status: response.status }
    } catch (error) {
      return this.handleError(error)
    }
  }

  // ========================================
  // MANEJO DE ERRORES
  // ========================================

  static handleError(error) {
    if (error.response) {
      // Error de respuesta del servidor
      return {
        success: false,
        data: null,
        message: error.response.data?.message || 'Error en la petición',
        status: error.response.status,
        errors: error.response.data?.errors || []
      }
    } else if (error.request) {
      // No hubo respuesta del servidor
      return {
        success: false,
        data: null,
        message: 'No se pudo conectar con el servidor',
        status: 0
      }
    } else {
      // Error en la configuración de la petición
      return {
        success: false,
        data: null,
        message: error.message || 'Error desconocido',
        status: 0
      }
    }
  }

  // ========================================
  // MANEJO DE RESPUESTAS
  // ========================================

  static handleServiceResponse(result, context = '') {
    if (result.success) {
      return {
        success: true,
        data: result.data,
        message: result.data?.message || 'Operación exitosa',
        status: result.status
      }
    } else {
      console.error(`[${context}] Error:`, result.message)
      return {
        success: false,
        data: null,
        message: result.message,
        status: result.status,
        errors: result.errors
      }
    }
  }

  // ========================================
  // DEDUPLICACIÓN DE PETICIONES
  // ========================================

  static generateRequestKey(config) {
    const { method = 'get', url, params, data } = config
    return `${method.toUpperCase()}-${url}-${JSON.stringify(params)}-${JSON.stringify(data)}`
  }

  static checkPendingRequest(config) {
    if (!this.deduplicationEnabled) return null

    const key = this.generateRequestKey(config)
    return this.pendingRequests.get(key)
  }

  static registerPendingRequest(config, promise) {
    if (!this.deduplicationEnabled) return

    const key = this.generateRequestKey(config)
    this.pendingRequests.set(key, promise)

    // Limpiar después de que se resuelva
    promise.finally(() => {
      this.pendingRequests.delete(key)
    })
  }
}

export default ServiceREST
