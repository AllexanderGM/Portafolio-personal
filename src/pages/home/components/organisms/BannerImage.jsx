import { useMemo } from 'react'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

import Image from '../../../../library/image/Image.jsx'
import SocialLink from '../../../../library/utils/SocialLink'
import getScrollAnimation from '../../../../library/utils/GetScrollAnimation.jsx'

const BannerImage = ({ data }) => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), [])

  const socialElements = data.social.map((item) => {
    const icon = new URL(`../../../../assets/icon/${item.icon}`, import.meta.url).href
    return <SocialLink key={item.url} icon={icon} link={item.url} />
  })

  return (
    <motion.figure variants={scrollAnimation} className='banner_image'>
      <ul className='decoration'>
        <div></div>
        <div></div>
        <div></div>
      </ul>

      <Image className='picture' src={data.profile} alt='Fotografia de Jeisson Alexander' />

      <ul className='banner_social'>{socialElements}</ul>
    </motion.figure>
  )
}

BannerImage.propTypes = {
  data: PropTypes.object.isRequired
}

export default BannerImage
