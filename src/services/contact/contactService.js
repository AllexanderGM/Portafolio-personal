import { ServiceREST } from '../utils/serviceREST.js'

// ========================================
// SERVICIO DE CONTACTO
// ========================================

class ContactService extends ServiceREST {
  constructor() {
    super()
    this.endpoint = '/contact'
  }

  // ========================================
  // MÉTODOS DE CONTACTO
  // ========================================

  /**
   * Envía un mensaje de contacto
   * @param {Object} contactData - Datos del formulario de contacto
   * @param {string} contactData.name - Nombre del remitente
   * @param {string} contactData.email - Email del remitente
   * @param {string} contactData.subject - Asunto del mensaje
   * @param {string} contactData.message - Mensaje
   * @returns {Promise<Object>} Respuesta del servidor
   */
  async sendMessage(contactData) {
    const context = 'Envío de mensaje de contacto'
    try {
      const result = await ServiceREST.post(this.endpoint, contactData)
      return ServiceREST.handleServiceResponse(result, context)
    } catch (error) {
      this.logError(context, error)
      throw error
    }
  }

  /**
   * Valida datos del formulario de contacto
   * @param {Object} contactData - Datos a validar
   * @returns {Object} Objeto con validez y errores
   */
  validateContactData(contactData) {
    const errors = {}

    if (!contactData.name || contactData.name.trim().length < 2) {
      errors.name = 'El nombre debe tener al menos 2 caracteres'
    }

    if (!contactData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactData.email)) {
      errors.email = 'Email inválido'
    }

    if (!contactData.subject || contactData.subject.trim().length < 3) {
      errors.subject = 'El asunto debe tener al menos 3 caracteres'
    }

    if (!contactData.message || contactData.message.trim().length < 10) {
      errors.message = 'El mensaje debe tener al menos 10 caracteres'
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    }
  }

  // ========================================
  // MÉTODOS PRIVADOS
  // ========================================

  logError(operation, error) {
    console.error(`[ContactService] ${operation}:`, error?.response?.data || error)
  }
}

// Crear y exportar instancia única (singleton)
const contactService = new ContactService()
export default contactService
