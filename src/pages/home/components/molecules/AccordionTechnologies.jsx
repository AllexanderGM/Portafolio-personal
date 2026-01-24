import { useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, FreeMode, A11y } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/free-mode'

import './accordionTechnologies.scss'

const AccordionTechnologies = ({ technologies }) => {
  const resolvedTechnologies = useMemo(
    () =>
      technologies.map(item => ({
        ...item,
        src: new URL(`../../../../assets/icon/${item.icon}`, import.meta.url).href
      })),
    [technologies]
  )

  const handleAutoplayPause = useCallback(swiper => {
    if (swiper?.autoplay) {
      swiper.autoplay.stop()
    }
  }, [])

  const handleAutoplayResume = useCallback(swiper => {
    if (swiper?.autoplay) {
      swiper.autoplay.start()
    }
  }, [])

  if (!resolvedTechnologies.length) return null

  return (
    <article className='slider' aria-label='Tecnologías utilizadas'>
      <Swiper
        className='slider__swiper'
        modules={[Autoplay, FreeMode, A11y]}
        slidesPerView='auto'
        spaceBetween={0}
        loop={resolvedTechnologies.length > 1}
        speed={2400}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
          stopOnLastSlide: false
        }}
        freeMode={{ enabled: true, momentum: false, sticky: false }}
        preventInteractionOnTransition={false}
        allowTouchMove
        simulateTouch
        grabCursor
        watchOverflow={false}
        onTouchStart={handleAutoplayPause}
        onTouchEnd={handleAutoplayResume}
        a11y={{ enabled: true }}>
        {resolvedTechnologies.map(item => (
          <SwiperSlide key={item.icon} className='slide'>
            <img src={item.src} alt={`Imagen de la tecnología de ${item.name}`} loading='lazy' />
            <span className='slide__label'>{item.name}</span>
          </SwiperSlide>
        ))}
      </Swiper>
    </article>
  )
}

AccordionTechnologies.propTypes = {
  technologies: PropTypes.array.isRequired
}

export default AccordionTechnologies
