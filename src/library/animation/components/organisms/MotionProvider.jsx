import PropTypes from 'prop-types'
import { LazyMotion, domAnimation } from 'framer-motion'

/**
 * MotionProvider - Envuelve la app con LazyMotion para reducir el bundle size.
 * Usa domAnimation (más ligero) en lugar de domMax.
 *
 * Beneficios:
 * - Reduce ~50% del tamaño de framer-motion
 * - Carga las features de animación bajo demanda
 */
const MotionProvider = ({ children }) => (
  <LazyMotion features={domAnimation} strict>
    {children}
  </LazyMotion>
)

MotionProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default MotionProvider
