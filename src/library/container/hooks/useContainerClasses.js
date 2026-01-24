import { useMemo } from 'react'

const SIZE_CLASS_MAP = {
  default: '',
  narrow: 'container-wrapper--narrow',
  wide: 'container-wrapper--wide'
}

const useContainerClasses = ({ className, fullWidth, noPaddingX, noPaddingY, size }) => {
  return useMemo(() => {
    const sizeClass = SIZE_CLASS_MAP[size] || SIZE_CLASS_MAP.default

    return [
      'container-wrapper',
      sizeClass,
      fullWidth && 'container-wrapper--full-width',
      noPaddingX && 'container-wrapper--no-padding-x',
      noPaddingY && 'container-wrapper--no-padding-y',
      className
    ]
      .filter(Boolean)
      .join(' ')
  }, [className, fullWidth, noPaddingX, noPaddingY, size])
}

export default useContainerClasses
