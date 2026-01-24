import PropTypes from 'prop-types'
import { m } from 'framer-motion'

/**
 * ScrollAnimationWrapper - Usa 'm' en lugar de 'motion' para funcionar con LazyMotion.
 * Esto reduce el bundle size de framer-motion significativamente.
 */
const ScrollAnimationWrapper = ({ children, className, ...props }) => (
  <m.section initial='offscreen' whileInView='onscreen' viewport={{ once: true, amount: 0.4 }} className={className} {...props}>
    {children}
  </m.section>
)

ScrollAnimationWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired
}

export default ScrollAnimationWrapper
