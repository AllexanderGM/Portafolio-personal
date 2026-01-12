// Dependences
import { useMemo } from 'react'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

import getScrollAnimation from '../../../../library/utils/GetScrollAnimation.jsx'

const SkillsItem = ({ index, Icon, text }) => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), [])

  return (
    <motion.article variants={scrollAnimation} custom={{ duration: index + 1 }} className='skills_item'>
      {Icon && <Icon size={24} strokeWidth={2} />}
      <span>{text}</span>
    </motion.article>
  )
}

SkillsItem.propTypes = {
  index: PropTypes.number,
  Icon: PropTypes.elementType.isRequired,
  text: PropTypes.string.isRequired
}

export default SkillsItem
