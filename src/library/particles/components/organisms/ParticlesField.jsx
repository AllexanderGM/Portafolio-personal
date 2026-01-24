import { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Particles as ParticlesCanvas } from '@tsparticles/react'

import useParticlesInit from '../../hooks/useParticlesInit'
import useParticlesPresets from '../../hooks/useParticlesPresets'

import './particlesField.scss'

const ParticlesField = ({ id = 'particles-field', className = '', quantity = 40, color = '#d5cdc0', preset = 'premium' }) => {
  const particlesInit = useParticlesInit()
  const selectedPreset = useParticlesPresets({ color, quantity, preset })

  const options = useMemo(
    () => ({
      fullScreen: false,
      fpsLimit: 30,
      detectRetina: true,
      ...selectedPreset
    }),
    [selectedPreset]
  )

  const rootClassName = ['particles-field', className].filter(Boolean).join(' ')

  return <ParticlesCanvas id={id} className={rootClassName} init={particlesInit} options={options} />
}

ParticlesField.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  quantity: PropTypes.number,
  color: PropTypes.string,
  preset: PropTypes.oneOf(['premium', 'twinkle', 'floating'])
}

export default ParticlesField
