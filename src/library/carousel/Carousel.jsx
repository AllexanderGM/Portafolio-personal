import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './carousel.scss'

const BREAKPOINT = 800
const Carousel = ({ images = [], circular = true }) => {
  const resolvedImages = useMemo(() => images.map(image => new URL(`../../assets/proyects/${image}`, import.meta.url).href), [images])

  if (!resolvedImages.length) return null

  return (
    <section className='carousel' aria-label='Image carousel' aria-live='polite'>
      <Swiper
        className='carousel__swiper'
        modules={[Navigation, Pagination, A11y]}
        slidesPerView={1}
        spaceBetween={0}
        breakpoints={{
          [BREAKPOINT + 1]: {
            slidesPerView: 2
          }
        }}
        loop={circular && resolvedImages.length > 1}
        navigation
        pagination={{ clickable: true }}
        watchOverflow
        grabCursor
        observer
        observeParents
        a11y={{ enabled: true }}>
        {resolvedImages.map((image, index) => (
          <SwiperSlide key={image}>
            <div className='carousel__slide'>
              <img src={image} alt={`Slide ${index + 1}`} className='carousel__image' loading='lazy' />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
  circular: PropTypes.bool
}

export default Carousel
