import { useEffect, useState } from 'react'
import { Button, Switch } from '@heroui/react'
import { Accessibility, Eye, EyeOff, RotateCcw, Type, Minus, Plus, Contrast, Palette, Link2, Zap, ZapOff } from 'lucide-react'
import { useGeneral } from '@hooks'
import ThemeToggle from '@library/nav/components/atoms/ThemeToggle'

const FONT_SCALE_STEPS = [0.9, 1, 1.1, 1.2]

const AccessibilityBar = () => {
  const {
    fontScale,
    increaseFontScale,
    decreaseFontScale,
    contrastMode,
    setContrastMode,
    grayscaleMode,
    toggleGrayscaleMode,
    underlineLinks,
    toggleUnderlineLinks,
    reduceMotion,
    toggleReduceMotion,
    resetAccessibility
  } = useGeneral()

  const [isOpen, setIsOpen] = useState(() => {
    const saved = localStorage.getItem('portfolio-a11y-open')
    return saved === null ? true : saved === 'true'
  })

  useEffect(() => {
    localStorage.setItem('portfolio-a11y-open', String(isOpen))
  }, [isOpen])

  const minScale = FONT_SCALE_STEPS[0]
  const maxScale = FONT_SCALE_STEPS.at(-1)
  const fontPercent = Math.round(fontScale * 100)

  const containerClasses = [
    'fixed z-[900] transition-all duration-300 ease-in-out',
    'flex flex-col rounded-2xl border shadow-xl backdrop-blur-md',
    'bg-light-50/95 text-dark border-primary-200/50',
    'dark:bg-dark-900/95 dark:text-light dark:border-primary-700/30',
    // Posicionamiento responsive
    'top-4 left-1/2 -translate-x-1/2',
    'min-[800px]:top-20 min-[800px]:right-6 min-[800px]:left-auto min-[800px]:translate-x-0',
    // Tamaño según estado
    isOpen
      ? 'w-[calc(100%-2rem)] max-w-sm !p-6 gap-5 min-[800px]:w-[360px]'
      : 'w-auto !px-5 !py-4 gap-0 hover:shadow-2xl hover:scale-[1.02]'
  ].join(' ')

  return (
    <aside className={containerClasses} aria-label='Barra de accesibilidad'>
      {/* Header */}
      <div className='flex items-center justify-between gap-3'>
        <div className='flex items-center gap-2.5'>
          <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/40'>
            <Accessibility className='h-4 w-4 text-primary-700 dark:text-primary-400' strokeWidth={2.5} />
          </div>
          <span className='text-sm font-bold uppercase tracking-wider text-dark-900 dark:text-light-100'>Accesibilidad</span>
        </div>

        <div className='flex items-center gap-2'>
          <Button
            size='sm'
            variant='flat'
            color='primary'
            className='clickable min-w-unit-20'
            onPress={() => setIsOpen(prev => !prev)}
            aria-expanded={isOpen}
            aria-controls='accessibility-panel'
            startContent={isOpen ? <EyeOff className='h-3.5 w-3.5' /> : <Eye className='h-3.5 w-3.5' />}>
            <span className='text-xs font-semibold uppercase tracking-wide'>{isOpen ? 'Ocultar' : 'Mostrar'}</span>
          </Button>

          {isOpen && (
            <Button
              size='sm'
              variant='light'
              color='default'
              isIconOnly
              className='clickable'
              onPress={resetAccessibility}
              aria-label='Restablecer ajustes de accesibilidad'>
              <RotateCcw className='h-4 w-4' />
            </Button>
          )}
        </div>
      </div>

      {/* Panel de controles */}
      <div
        id='accessibility-panel'
        className={`transition-all duration-300 ${isOpen ? 'flex flex-col gap-4 opacity-100' : 'hidden opacity-0'}`}
        aria-hidden={!isOpen}>
        {/* Tema */}
        <div className='flex items-center justify-between gap-3 rounded-xl bg-light-100/50 p-4! dark:bg-dark-800/50'>
          <div className='flex items-center gap-2.5'>
            <div className='flex h-7 w-7 items-center justify-center rounded-md bg-primary-50 dark:bg-primary-900/30'>
              <Type className='h-4 w-4 text-primary-600 dark:text-primary-400' />
            </div>
            <span className='text-sm font-medium text-dark-700 dark:text-light-300'>Tema</span>
          </div>
          <ThemeToggle size='md' className='clickable' />
        </div>

        {/* Tamaño de texto */}
        <div className='flex items-center justify-between gap-3 rounded-xl bg-light-100/50 p-4! dark:bg-dark-800/50'>
          <div className='flex items-center gap-2.5'>
            <div className='flex h-7 w-7 items-center justify-center rounded-md bg-secondary-50 dark:bg-secondary-900/30'>
              <Type className='h-4 w-4 text-secondary-600 dark:text-secondary-400' />
            </div>
            <span className='text-sm font-medium text-dark-700 dark:text-light-300'>Texto</span>
          </div>
          <div className='flex items-center gap-2'>
            <Button
              size='sm'
              variant='bordered'
              color='secondary'
              className='clickable min-w-unit-10'
              onPress={decreaseFontScale}
              isDisabled={fontScale <= minScale}
              isIconOnly
              aria-label='Disminuir tamaño de texto'>
              <Minus className='h-3.5 w-3.5' />
            </Button>
            <span className='min-w-14 text-center text-sm font-bold text-secondary-600 dark:text-secondary-400' aria-live='polite'>
              {fontPercent}%
            </span>
            <Button
              size='sm'
              variant='bordered'
              color='secondary'
              className='clickable min-w-unit-10'
              onPress={increaseFontScale}
              isDisabled={fontScale >= maxScale}
              isIconOnly
              aria-label='Aumentar tamaño de texto'>
              <Plus className='h-3.5 w-3.5' />
            </Button>
          </div>
        </div>

        {/* Contraste */}
        <div className='rounded-xl bg-light-100/50 p-4! dark:bg-dark-800/50'>
          <div className='mb-3.5 flex items-center gap-2.5'>
            <div className='flex h-7 w-7 items-center justify-center rounded-md bg-warning-50 dark:bg-warning-900/30'>
              <Contrast className='h-4 w-4 text-warning-600 dark:text-warning-400' />
            </div>
            <span className='text-sm font-medium text-dark-700 dark:text-light-300'>Contraste</span>
          </div>
          <div className='flex flex-wrap gap-2'>
            <Button
              size='sm'
              variant={contrastMode === 'low' ? 'solid' : 'bordered'}
              color={contrastMode === 'low' ? 'warning' : 'default'}
              className='clickable flex-1'
              onPress={() => setContrastMode('low')}
              aria-pressed={contrastMode === 'low'}>
              <span className='text-xs font-semibold'>Bajo</span>
            </Button>
            <Button
              size='sm'
              variant={contrastMode === 'normal' ? 'solid' : 'bordered'}
              color={contrastMode === 'normal' ? 'warning' : 'default'}
              className='clickable flex-1'
              onPress={() => setContrastMode('normal')}
              aria-pressed={contrastMode === 'normal'}>
              <span className='text-xs font-semibold'>Normal</span>
            </Button>
            <Button
              size='sm'
              variant={contrastMode === 'high' ? 'solid' : 'bordered'}
              color={contrastMode === 'high' ? 'warning' : 'default'}
              className='clickable flex-1'
              onPress={() => setContrastMode('high')}
              aria-pressed={contrastMode === 'high'}>
              <span className='text-xs font-semibold'>Alto</span>
            </Button>
          </div>
        </div>

        {/* Escala de grises */}
        <div className='flex items-center justify-between gap-3 rounded-xl bg-light-100/50 p-4! dark:bg-dark-800/50'>
          <div className='flex items-center gap-2.5'>
            <div className='flex h-7 w-7 items-center justify-center rounded-md bg-success-50 dark:bg-success-900/30'>
              <Palette className='h-4 w-4 text-success-600 dark:text-success-400' />
            </div>
            <span className='text-sm font-medium text-dark-700 dark:text-light-300'>Escala de grises</span>
          </div>
          <Switch
            isSelected={grayscaleMode}
            onValueChange={toggleGrayscaleMode}
            size='sm'
            color='success'
            aria-label='Activar escala de grises'
            className='clickable'
          />
        </div>

        {/* Resaltar enlaces */}
        <div className='flex items-center justify-between gap-3 rounded-xl bg-light-100/50 p-4! dark:bg-dark-800/50'>
          <div className='flex items-center gap-2.5'>
            <div className='flex h-7 w-7 items-center justify-center rounded-md bg-danger-50 dark:bg-danger-900/30'>
              <Link2 className='h-4 w-4 text-danger-600 dark:text-danger-400' />
            </div>
            <span className='text-sm font-medium text-dark-700 dark:text-light-300'>Resaltar enlaces</span>
          </div>
          <Switch
            isSelected={underlineLinks}
            onValueChange={toggleUnderlineLinks}
            size='sm'
            color='danger'
            aria-label='Subrayar enlaces'
            className='clickable'
          />
        </div>

        {/* Reducir movimiento */}
        <div className='flex items-center justify-between gap-3 rounded-xl bg-light-100/50 p-4! dark:bg-dark-800/50'>
          <div className='flex items-center gap-2.5'>
            <div className='flex h-7 w-7 items-center justify-center rounded-md bg-primary-50 dark:bg-primary-900/30'>
              {reduceMotion ? (
                <ZapOff className='h-4 w-4 text-primary-600 dark:text-primary-400' />
              ) : (
                <Zap className='h-4 w-4 text-primary-600 dark:text-primary-400' />
              )}
            </div>
            <span className='text-sm font-medium text-dark-700 dark:text-light-300'>Reducir movimiento</span>
          </div>
          <Switch
            isSelected={reduceMotion}
            onValueChange={toggleReduceMotion}
            size='sm'
            color='primary'
            aria-label='Reducir movimiento'
            className='clickable'
          />
        </div>
      </div>
    </aside>
  )
}

export default AccessibilityBar
