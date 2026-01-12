// Dependences
import { useMemo } from 'react'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

import ScrollAnimationWrapper from '../../../../library/utils/ScrollAnimationWrapper'
import getScrollAnimation from '../../../../library/utils/GetScrollAnimation.jsx'

// Components
import SkillsAboutContainer from '../organisms/SkillsAboutContainer'
import BtnGeneric from '../../../../library/btns/BtnGeneric'

// Principal component
const Skills = ({ ability, arrow, btnlink, profileData, experiences }) => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), [])

  return (
    <ScrollAnimationWrapper className='skills' id='about'>
      <article className='container'>
        <motion.h2 variants={scrollAnimation}>Sobre mí</motion.h2>

        <SkillsAboutContainer
          ability={ability}
          arrow={arrow}
          profileData={profileData}
          experiences={experiences}
        />
        <BtnGeneric text={btnlink.text} url={btnlink.cvUrl} variant='shadow' />
      </article>
    </ScrollAnimationWrapper>
  )
}

Skills.propTypes = {
  ability: PropTypes.array.isRequired,
  arrow: PropTypes.string.isRequired,
  btnlink: PropTypes.object.isRequired,
  profileData: PropTypes.object.isRequired,
  experiences: PropTypes.array.isRequired
}

export default Skills
