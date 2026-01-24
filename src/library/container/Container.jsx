import PropTypes from 'prop-types'

import useContainerClasses from './hooks/useContainerClasses'

import './container.scss'

/**
 * Container component that handles consistent spacing for the lateral navigation.
 *
 * @param {string} as - HTML element to render (default: 'div')
 * @param {string} className - Additional CSS classes
 * @param {boolean} fullWidth - If true, removes max-width constraint
 * @param {boolean} noPaddingX - If true, removes horizontal padding
 * @param {boolean} noPaddingY - If true, removes vertical padding
 * @param {string} size - Container size: 'default' (1200px), 'narrow' (900px), 'wide' (1400px)
 * @param {React.ReactNode} children - Content to render
 */
const Container = ({
  as: Element = 'div',
  className = '',
  fullWidth = false,
  noPaddingX = false,
  noPaddingY = false,
  size = 'default',
  children,
  ...props
}) => {
  const classes = useContainerClasses({
    className,
    fullWidth,
    noPaddingX,
    noPaddingY,
    size
  })

  return (
    <Element className={classes} {...props}>
      {children}
    </Element>
  )
}

Container.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  fullWidth: PropTypes.bool,
  noPaddingX: PropTypes.bool,
  noPaddingY: PropTypes.bool,
  size: PropTypes.oneOf(['default', 'narrow', 'wide']),
  children: PropTypes.node
}

export default Container
