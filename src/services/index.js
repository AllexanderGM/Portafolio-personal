// ========================================
// ÍNDICE CENTRAL DE SERVICIOS
// ========================================

// Servicios base y utilidades
export { ServiceREST } from './utils/serviceREST.js'
export { default as api } from './utils/api.js'

// Servicios por módulo
export { default as contactService } from './contact/contactService.js'

// ========================================
// SERVICIOS AGRUPADOS POR CATEGORÍA
// ========================================

export const contactServices = {
  contactService: () => import('./contact/contactService.js')
}

// ========================================
// REGISTRO COMPLETO DE SERVICIOS
// ========================================

const services = {
  ServiceREST: () => import('./utils/serviceREST.js'),
  api: () => import('./utils/api.js'),
  contactService: () => import('./contact/contactService.js')
}

export default services
