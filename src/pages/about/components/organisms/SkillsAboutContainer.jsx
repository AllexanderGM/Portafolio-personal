// Dependences
import { useMemo } from 'react'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Image from '../../../../library/image/Image.jsx'
import getScrollAnimation from '../../../../library/utils/GetScrollAnimation.jsx'

// Components
import SkillsItem from '../atoms/SkillsItem'
import CodeTerminal from '../molecules/CodeTerminal'
import ExperienceTimeline from '../molecules/ExperienceTimeline'

// Principal component
const SkillsAboutContainer = ({ ability, arrow, profileData, experiences }) => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), [])

  // Lista de componentes de habilidades blandas
  const componentSkills = ability.map((item, index) => {
    return <SkillsItem key={index} index={index} Icon={item.Icon} text={item.text} />
  })

  return (
    <article className='text'>
      {/* Terminal con toda la información técnica */}
      <motion.div className='terminal-section' variants={scrollAnimation} custom={{ duration: 1 }}>
        <CodeTerminal profileData={profileData} />
      </motion.div>

      {/* Timeline + Soft Skills */}
      <motion.div className='experience-skills-section' variants={scrollAnimation} custom={{ duration: 1.5 }}>
        <div className='timeline-container'>
          <h3>Experiencia Profesional</h3>
          <ExperienceTimeline experiences={experiences} />
        </div>

        <div className='skills-container'>
          <h3>Habilidades Blandas</h3>
          <article className='skills_items'>{componentSkills}</article>

          <motion.article variants={scrollAnimation} custom={{ duration: 2 }} className='contact-link'>
            <Link to='/contact' className='clickable'>
              Contáctame <img src={arrow} alt='contact img' />
            </Link>
          </motion.article>
        </div>
      </motion.div>
    </article>
  )
}

SkillsAboutContainer.propTypes = {
  ability: PropTypes.array.isRequired,
  arrow: PropTypes.string.isRequired,
  profileData: PropTypes.object.isRequired,
  experiences: PropTypes.array.isRequired
}

export default SkillsAboutContainer
