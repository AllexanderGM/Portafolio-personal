/**
 * Hook custom para scroll suave
 * @returns {Object} Objeto con función scrollTo
 */
export const useScrollTo = () => {
  const scrollTo = id => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return { scrollTo }
}

export default useScrollTo
