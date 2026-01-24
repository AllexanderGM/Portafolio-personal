import PropTypes from 'prop-types'
import { Maximize2 } from 'lucide-react'

import Image from '@library/image'

import './carouselSlide.scss'

const CarouselSlide = ({ src, alt, onImageClick }) => {
  const handleClick = () => {
    if (onImageClick) {
      onImageClick(src, alt)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  return (
    <div
      className='carousel__item'
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role='button'
      tabIndex={0}
      aria-label={`Ver ${alt} en tamaño completo`}>
      <Image src={src} alt={alt} className='carousel__media' />
      <span className='carousel__zoom-hint' aria-hidden='true'>
        <Maximize2 />
        Click para ampliar
      </span>
    </div>
  )
}

CarouselSlide.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onImageClick: PropTypes.func
}

export default CarouselSlide
