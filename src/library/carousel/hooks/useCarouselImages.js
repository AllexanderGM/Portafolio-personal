import { useMemo } from 'react'

/**
 * Hook para resolver URLs de imágenes del carrusel.
 * Maneja tanto arrays planos ["img1.webp", "img2.webp"]
 * como arrays anidados [["img1.webp", "img2.webp"], ["img3.webp"]]
 */
const useCarouselImages = (images = []) => {
  return useMemo(() => {
    if (!images || !images.length) return []

    // Aplanar el array si tiene arrays anidados
    const flatImages = images.flat(Infinity).filter(img => typeof img === 'string' && img.trim())

    // Resolver URLs
    return flatImages.map(image => {
      try {
        return new URL(`../../../assets/proyects/${image}`, import.meta.url).href
      } catch {
        console.warn(`Failed to resolve image: ${image}`)
        return null
      }
    }).filter(Boolean)
  }, [images])
}

export default useCarouselImages
