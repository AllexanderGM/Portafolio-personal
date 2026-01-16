import { Switch } from '@heroui/react'
import PropTypes from 'prop-types'
import { Sun, Moon } from 'lucide-react'
import { useGeneral } from '@hooks'

const ThemeToggle = ({ size = 'md', className = '' }) => {
  const { toggleTheme, isDark } = useGeneral()

  return (
    <Switch
      isSelected={isDark}
      onValueChange={toggleTheme}
      size={size}
      color='primary'
      thumbIcon={({ isSelected }) => (isSelected ? <Moon size={12} /> : <Sun size={12} />)}
      aria-label='Toggle theme'
      className={className}
    />
  )
}

ThemeToggle.propTypes = {
  size: PropTypes.string,
  className: PropTypes.string
}

export default ThemeToggle
