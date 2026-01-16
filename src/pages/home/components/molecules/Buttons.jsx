import { useMemo } from 'react'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

import getScrollAnimation from '@library/utils/GetScrollAnimation'
import BtnGeneric from '@library/btns/BtnGeneric'

const Buttons = ({ btns }) => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), [])

  const listButtons = btns.map((item, index) => {
    const isFirst = index === 0

    const buttonConfig = isFirst ? { variant: 'solid', color: 'primary' } : { variant: 'ghost', color: 'primary' }

    return <BtnGeneric key={index} text={item.text} route={item.url} Icon={item.Icon} size='md' {...buttonConfig} />
  })

  return (
    <motion.article variants={scrollAnimation} custom={{ duration: 3 }} className='buttons'>
      {listButtons}
    </motion.article>
  )
}

Buttons.propTypes = {
  btns: PropTypes.array.isRequired
}

export default Buttons
