import { useMemo } from 'react'
import { m } from 'framer-motion'
import PropTypes from 'prop-types'

import Image from '@library/image'
import { SocialLink } from '@library/social'
import { getScrollAnimation } from '@library/animation'

import './bannerImage.scss'

const BannerImage = ({ data }) => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), [])

  const socialElements = data.social.map(item => {
    const icon = new URL(`../../../../assets/icon/${item.icon}`, import.meta.url).href
    return <SocialLink key={item.url} icon={icon} link={item.url} />
  })

  return (
    <m.figure variants={scrollAnimation} className='banner_image'>
      {/* Decoración esquina superior izquierda */}
      <div className='banner_corner banner_corner--top-left' />

      {/* Puntos geométricos - Extienden la esquina superior derecha */}
      <div className='banner_dots banner_dots--top'>
        <span className='banner_dot' />
        <span className='banner_dot' />
        <span className='banner_dot' />
      </div>

      {/* Puntos geométricos - Extienden la esquina inferior izquierda */}
      <div className='banner_dots banner_dots--bottom'>
        <span className='banner_dot' />
        <span className='banner_dot' />
        <span className='banner_dot' />
      </div>

      <Image
        className='picture'
        src={data.profile}
        alt='Fotografia de Jeisson Alexander'
        loading='eager'
        fetchpriority='high'
        decoding='async'
        width={893}
        height={894}
        useIntersectionObserver={false}
      />

      <ul className='banner_social'>{socialElements}</ul>
    </m.figure>
  )
}

BannerImage.propTypes = {
  data: PropTypes.object.isRequired
}

export default BannerImage
