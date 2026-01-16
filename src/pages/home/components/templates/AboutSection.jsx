// Dependences
import { useMemo } from 'react'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { Users, Heart, Layers, User } from 'lucide-react'

import ScrollAnimationWrapper from '../../../../library/utils/ScrollAnimationWrapper'
import getScrollAnimation from '../../../../library/utils/GetScrollAnimation.jsx'
import ParticlesBackground from '@library/particles/ParticlesBackground'

// Components
import AboutContent from '../organisms/AboutContent'
import BtnGeneric from '../../../../library/btns/BtnGeneric'

// Principal component
const ABILITY_ICONS = [Users, Heart, Layers, User]

const AboutSection = ({ abilities, arrow, btnlink, profileData, experiences }) => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), [])
  const abilityItems = abilities.map((text, index) => ({
    Icon: ABILITY_ICONS[index],
    text
  }))

  return (
    <ScrollAnimationWrapper className='about-section' id='about'>
      <ParticlesBackground />
      <article className='container'>
        <motion.h2 variants={scrollAnimation}>Sobre mí</motion.h2>

        <AboutContent ability={abilityItems} arrow={arrow} profileData={profileData} experiences={experiences} />
        <BtnGeneric text={btnlink.text} url={btnlink.cvUrl} variant='shadow' />
      </article>
    </ScrollAnimationWrapper>
  )
}

AboutSection.propTypes = {
  abilities: PropTypes.arrayOf(PropTypes.string).isRequired,
  arrow: PropTypes.string.isRequired,
  btnlink: PropTypes.object.isRequired,
  profileData: PropTypes.object.isRequired,
  experiences: PropTypes.array.isRequired
}

export default AboutSection
