import { useState } from 'react'

/**
 * Hook custom para manejar localStorage
 * @param {string} key - Clave del localStorage
 * @param {any} initialValue - Valor inicial
 * @returns {[any, Function]} Estado y función para actualizarlo
 */
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = globalThis.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error('Error al leer localStorage:', error)
      return initialValue
    }
  })

  const setValue = value => {
    try {
      const valueToStore = typeof value === 'function' ? value(storedValue) : value
      setStoredValue(valueToStore)
      globalThis.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error('Error al escribir en localStorage:', error)
    }
  }

  return [storedValue, setValue]
}

export default useLocalStorage
