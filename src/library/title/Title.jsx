import { useMemo } from 'react'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

import getScrollAnimation from '@library/utils/GetScrollAnimation'

import './title.scss'

const Title = ({ title, text1, textSpan, text2 }) => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), [])

  return (
    <section className='title'>
      <motion.h1 variants={scrollAnimation} custom={{ duration: 1 }}>
        {title}
      </motion.h1>

      <motion.div className='separator' variants={scrollAnimation} custom={{ duration: 2 }}></motion.div>

      <motion.p variants={scrollAnimation} custom={{ duration: 3 }}>
        {text1} <span>{textSpan}</span> {text2}
      </motion.p>
    </section>
  )
}

Title.propTypes = {
  title: PropTypes.string.isRequired,
  text1: PropTypes.string.isRequired,
  textSpan: PropTypes.string.isRequired,
  text2: PropTypes.string.isRequired
}

export default Title
