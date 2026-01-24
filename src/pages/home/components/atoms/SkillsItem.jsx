import { useMemo } from 'react'
import { m } from 'framer-motion'
import PropTypes from 'prop-types'

import { getScrollAnimation } from '@library/animation'

import './skillsItem.scss'

const SkillsItem = ({ index, Icon, text }) => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), [])

  return (
    <m.article variants={scrollAnimation} custom={{ duration: index + 1 }} className='skills_item'>
      {Icon && <Icon size={24} strokeWidth={2} />}
      <span>{text}</span>
    </m.article>
  )
}

SkillsItem.propTypes = {
  index: PropTypes.number,
  Icon: PropTypes.elementType.isRequired,
  text: PropTypes.string.isRequired
}

export default SkillsItem
