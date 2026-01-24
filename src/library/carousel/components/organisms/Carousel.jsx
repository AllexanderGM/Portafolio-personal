import { useState, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y } from 'swiper/modules'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import 'swiper/css'

import CarouselSlide from '../molecules/CarouselSlide'
import ImageLightbox from '../molecules/ImageLightbox'
import useCarouselImages from '../../hooks/useCarouselImages'

import './carousel.scss'

/**
 * Carousel - Muestra imágenes en un carrusel con navegación y lightbox
 * Mobile: 1 imagen | Desktop: 2 imágenes
 */
const Carousel = ({ images = [], circular = false }) => {
  const resolvedImages = useCarouselImages(images)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Refs para navegación externa
  const prevRef = useRef(null)
  const nextRef = useRef(null)
  const paginationRef = useRef(null)

  const handleImageClick = useCallback(
    (src) => {
      const index = resolvedImages.findIndex((img) => img === src)
      setCurrentImageIndex(index >= 0 ? index : 0)
      setLightboxOpen(true)
    },
    [resolvedImages]
  )

  const handlePrev = useCallback(() => {
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : resolvedImages.length - 1))
  }, [resolvedImages.length])

  const handleNext = useCallback(() => {
    setCurrentImageIndex((prev) => (prev < resolvedImages.length - 1 ? prev + 1 : 0))
  }, [resolvedImages.length])

  const handleCloseLightbox = useCallback(() => {
    setLightboxOpen(false)
  }, [])

  if (!resolvedImages.length) return null

  return (
    <>
      <section className='carousel' aria-label='Galería de imágenes del proyecto' aria-roledescription='carrusel'>
        {/* Contenedor con botones sobre las imágenes */}
        <div className='carousel__wrapper'>
          <Swiper
            className='carousel__viewport'
            modules={[Navigation, Pagination, A11y]}
            slidesPerView={1}
            spaceBetween={0}
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: 0
              }
            }}
            loop={circular && resolvedImages.length > 2}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current
            }}
            pagination={{
              el: paginationRef.current,
              clickable: true
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current
              swiper.params.navigation.nextEl = nextRef.current
              swiper.params.pagination.el = paginationRef.current
            }}
            watchOverflow
            grabCursor
            observer
            observeParents
            a11y={{
              enabled: true,
              prevSlideMessage: 'Imagen anterior',
              nextSlideMessage: 'Imagen siguiente',
              paginationBulletMessage: 'Ir a imagen {{index}}'
            }}>
            {resolvedImages.map((image, index) => (
              <SwiperSlide key={`slide-${index}`}>
                <CarouselSlide src={image} alt={`Captura ${index + 1} del proyecto`} onImageClick={handleImageClick} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Botones sobre las imágenes */}
          <button ref={prevRef} className='carousel__nav-btn carousel__nav-btn--prev' aria-label='Imagen anterior'>
            <ChevronLeft size={18} />
          </button>
          <button ref={nextRef} className='carousel__nav-btn carousel__nav-btn--next' aria-label='Imagen siguiente'>
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Paginación inferior */}
        <div className='carousel__pagination-wrapper'>
          <div ref={paginationRef} className='carousel__pagination' />
        </div>
      </section>

      {/* Lightbox para visualización ampliada */}
      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={handleCloseLightbox}
        src={resolvedImages[currentImageIndex] || ''}
        alt={`Captura ${currentImageIndex + 1} del proyecto`}
        onPrev={handlePrev}
        onNext={handleNext}
        hasPrev={resolvedImages.length > 1}
        hasNext={resolvedImages.length > 1}
      />
    </>
  )
}

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])),
  circular: PropTypes.bool
}

export default Carousel
