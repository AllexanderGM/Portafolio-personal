import { useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@heroui/button'
import { Modal, ModalContent } from '@heroui/modal'

import './imageLightbox.scss'

const ImageLightbox = ({ isOpen, onClose, src, alt, onPrev, onNext, hasPrev = false, hasNext = false }) => {
  // Navegación con teclado
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'ArrowLeft' && hasPrev) onPrev?.()
      if (e.key === 'ArrowRight' && hasNext) onNext?.()
      if (e.key === 'Escape') onClose()
    },
    [hasPrev, hasNext, onPrev, onNext, onClose]
  )

  // Agregar listener de teclado cuando está abierto
  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, handleKeyDown])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size='full'
      hideCloseButton
      classNames={{
        base: 'lightbox-modal',
        backdrop: 'lightbox-backdrop',
        wrapper: 'lightbox-wrapper'
      }}>
      <ModalContent>
        <div className='lightbox-container'>
          {/* Botón cerrar */}
          <Button isIconOnly variant='flat' className='lightbox-close' onPress={onClose} aria-label='Cerrar visualización'>
            <X size={24} />
          </Button>

          {/* Navegación anterior */}
          {hasPrev && (
            <Button isIconOnly variant='flat' className='lightbox-nav lightbox-nav--prev' onPress={onPrev} aria-label='Imagen anterior'>
              <ChevronLeft size={28} />
            </Button>
          )}

          {/* Navegación siguiente */}
          {hasNext && (
            <Button isIconOnly variant='flat' className='lightbox-nav lightbox-nav--next' onPress={onNext} aria-label='Imagen siguiente'>
              <ChevronRight size={28} />
            </Button>
          )}

          {/* Imagen */}
          <img src={src} alt={alt} className='lightbox-image' />
        </div>
      </ModalContent>
    </Modal>
  )
}

ImageLightbox.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onPrev: PropTypes.func,
  onNext: PropTypes.func,
  hasPrev: PropTypes.bool,
  hasNext: PropTypes.bool
}

export default ImageLightbox
