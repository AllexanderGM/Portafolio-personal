import { Switch } from '@heroui/react'
import { useGeneral } from '@hooks'

const ThemeToggle = ({ size = 'md', className = '' }) => {
  const { toggleTheme, isDark } = useGeneral()

  return (
    <Switch
      isSelected={isDark}
      onValueChange={toggleTheme}
      size={size}
      color='primary'
      startContent={<ion-icon name='sunny' style={{ fontSize: '18px' }}></ion-icon>}
      endContent={<ion-icon name='moon' style={{ fontSize: '18px' }}></ion-icon>}
      aria-label='Toggle theme'
      classNames={{
        wrapper: 'group-data-[selected=true]:bg-primary',
        thumb: 'group-data-[selected=true]:bg-dark'
      }}
      className={className}
    />
  )
}

export default ThemeToggle
