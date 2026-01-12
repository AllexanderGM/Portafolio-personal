import { useMemo } from 'react'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

import getScrollAnimation from '@library/utils/GetScrollAnimation'
import BtnGeneric from '@library/btns/BtnGeneric'

const Buttons = ({ btns }) => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), [])

  const listButtons = btns.map((item, index) => {
    const isFirst = index === 0

    // Configuración para cada botón según HeroUI
    const buttonConfig = isFirst
      ? {
          variant: 'solid',
          color: 'default',
          className:
            '!bg-portfolio-primary-300 !border-portfolio-primary-700 !text-portfolio-dark hover:!bg-portfolio-primary-400 hover:!border-portfolio-primary !shadow-lg !min-w-[140px] md:!min-w-[160px]'
        }
      : {
          variant: 'bordered',
          color: 'default',
          className:
            '!bg-portfolio-dark-950/85 !border-portfolio-dark-700 !text-portfolio-primary hover:!bg-portfolio-primary-400 hover:!text-portfolio-primary-950 !backdrop-blur-md !min-w-[140px] md:!min-w-[160px]'
        }

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
