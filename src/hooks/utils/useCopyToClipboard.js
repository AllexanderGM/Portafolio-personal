import { useState } from 'react'

/**
 * Hook custom para copiar al portapapeles
 * @returns {[Function, boolean]} Función para copiar y estado copiado
 */
export const useCopyToClipboard = () => {
  const [isCopied, setIsCopied] = useState(false)

  const copy = async text => {
    try {
      await navigator.clipboard.writeText(text)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (error) {
      console.error('Error al copiar:', error)
      setIsCopied(false)
    }
  }

  return [copy, isCopied]
}

export default useCopyToClipboard
