import { useMemo } from 'react'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

import getScrollAnimation from '../../../../library/utils/GetScrollAnimation.jsx'

const Title = ({ title }) => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), [])

  return (
    <motion.article variants={scrollAnimation} className='title'>
      <h1>{title[0]}</h1>

      <span>
        {title[1]} <div className='separator' />
      </span>
    </motion.article>
  )
}

Title.propTypes = {
  title: PropTypes.array.isRequired
}

export default Title
