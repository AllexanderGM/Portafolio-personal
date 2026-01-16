import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Switch, Card, CardBody, Chip, Divider, Modal, ModalContent, ModalBody, Tooltip } from '@heroui/react'
import {
  Accessibility,
  RotateCcw,
  Type,
  Minus,
  Plus,
  Contrast,
  Palette,
  Link2,
  Moon,
  X,
  SlidersHorizontal
} from 'lucide-react'
import { useGeneral } from '@hooks'
import ThemeToggle from '@library/nav/components/atoms/ThemeToggle'

import './accessibility.scss'

const FONT_SCALE_STEPS = [0.9, 1, 1.1, 1.2]

// Componente reutilizable para opciones de configuración
const AccessibilityOption = ({ icon: Icon, label, color, children }) => (
  <Card className='accessibility_option' shadow='none'>
    <CardBody className='accessibility_option_body'>
      <div className='accessibility_option_label'>
        <div className={`accessibility_option_icon accessibility_option_icon--${color}`}>
          <Icon size={16} strokeWidth={2.2} />
        </div>
        <span className='accessibility_option_text'>{label}</span>
      </div>
      <div className='accessibility_option_control'>{children}</div>
    </CardBody>
  </Card>
)

AccessibilityOption.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

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
    resetAccessibility
  } = useGeneral()

  const [isOpen, setIsOpen] = useState(() => {
    const saved = localStorage.getItem('portfolio-a11y-open')
    return saved === null ? false : saved === 'true'
  })
  useEffect(() => {
    localStorage.setItem('portfolio-a11y-open', String(isOpen))
  }, [isOpen])

  const minScale = FONT_SCALE_STEPS[0]
  const maxScale = FONT_SCALE_STEPS.at(-1)
  const fontPercent = Math.round(fontScale * 100)

  return (
    <aside className={`nav_accessibility ${isOpen ? 'is-open' : ''}`} aria-label='Barra de accesibilidad'>
      <Tooltip
        content='Ajustes de accesibilidad'
        placement='right'
        showArrow
        delay={120}
        closeDelay={80}
        classNames={{
          base: 'accessibility_tooltip',
          content: 'accessibility_tooltip_content',
          arrow: 'accessibility_tooltip_arrow'
        }}>
        <Button
          isIconOnly
          radius='full'
          variant='flat'
          className='accessibility_trigger clickable'
          onPress={() => setIsOpen(prev => !prev)}
          aria-expanded={isOpen}
          aria-controls='accessibility-modal'
          aria-haspopup='dialog'
          aria-label='Alternar ajustes de accesibilidad'>
          <SlidersHorizontal size={20} strokeWidth={2.2} className='accessibility_trigger_icon' />
        </Button>
      </Tooltip>

      <Modal
        id='accessibility-modal'
        aria-label='Accesibilidad'
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        placement='bottom-center'
        backdrop='blur'
        scrollBehavior='inside'
        shouldBlockScroll
        hideCloseButton
        classNames={{
          wrapper: 'accessibility_modal_wrapper',
          backdrop: 'accessibility_modal_backdrop',
          base: 'accessibility_modal'
        }}>
        <ModalContent>
          {onClose => (
            <ModalBody className='accessibility_panel'>
              {/* Header */}
              <div className='accessibility_panel_header'>
                <div className='accessibility_panel_title'>
                  <Chip
                    startContent={<Accessibility size={14} strokeWidth={2.5} />}
                    variant='flat'
                    color='primary'
                    size='sm'
                    className='accessibility_panel_chip'>
                    Accesibilidad
                  </Chip>
                </div>
                <div className='accessibility_panel_actions'>
                  <Button
                    size='sm'
                    variant='light'
                    color='default'
                    isIconOnly
                    className='clickable'
                    onPress={resetAccessibility}
                    aria-label='Restablecer ajustes de accesibilidad'>
                    <RotateCcw size={16} />
                  </Button>
                  <Button
                    size='sm'
                    variant='light'
                    color='default'
                    isIconOnly
                    className='clickable'
                    onPress={onClose}
                    aria-label='Cerrar ajustes de accesibilidad'>
                    <X size={16} />
                  </Button>
                </div>
              </div>

              <Divider className='accessibility_divider' />

              {/* Content */}
              <div className='accessibility_panel_content'>
                {/* Tema */}
                <AccessibilityOption icon={Moon} label='Tema' color='primary'>
                  <ThemeToggle size='md' className='clickable' />
                </AccessibilityOption>

                {/* Tamaño de texto */}
                <AccessibilityOption icon={Type} label='Tamaño de texto' color='secondary'>
                  <div className='accessibility_font_controls'>
                    <Button
                      size='sm'
                      variant='bordered'
                      className='clickable accessibility_font_btn'
                      onPress={decreaseFontScale}
                      isDisabled={fontScale <= minScale}
                      isIconOnly
                      aria-label='Disminuir tamaño de texto'>
                      <Minus size={14} />
                    </Button>
                    <span className='accessibility_font_value' aria-live='polite'>
                      {fontPercent}%
                    </span>
                    <Button
                      size='sm'
                      variant='bordered'
                      className='clickable accessibility_font_btn'
                      onPress={increaseFontScale}
                      isDisabled={fontScale >= maxScale}
                      isIconOnly
                      aria-label='Aumentar tamaño de texto'>
                      <Plus size={14} />
                    </Button>
                  </div>
                </AccessibilityOption>

                {/* Contraste */}
                <Card className='accessibility_option accessibility_option--stack' shadow='none'>
                  <CardBody className='accessibility_option_body accessibility_option_body--column'>
                    <div className='accessibility_option_label'>
                      <div className='accessibility_option_icon accessibility_option_icon--warning'>
                        <Contrast size={16} strokeWidth={2.2} />
                      </div>
                      <span className='accessibility_option_text'>Contraste</span>
                    </div>
                    <div className='accessibility_contrast_buttons'>
                      <Button
                        size='sm'
                        variant={contrastMode === 'low' ? 'solid' : 'bordered'}
                        color={contrastMode === 'low' ? 'warning' : 'default'}
                        className='clickable accessibility_contrast_btn'
                        onPress={() => setContrastMode('low')}
                        aria-pressed={contrastMode === 'low'}>
                        Bajo
                      </Button>
                      <Button
                        size='sm'
                        variant={contrastMode === 'normal' ? 'solid' : 'bordered'}
                        color={contrastMode === 'normal' ? 'warning' : 'default'}
                        className='clickable accessibility_contrast_btn'
                        onPress={() => setContrastMode('normal')}
                        aria-pressed={contrastMode === 'normal'}>
                        Normal
                      </Button>
                      <Button
                        size='sm'
                        variant={contrastMode === 'high' ? 'solid' : 'bordered'}
                        color={contrastMode === 'high' ? 'warning' : 'default'}
                        className='clickable accessibility_contrast_btn'
                        onPress={() => setContrastMode('high')}
                        aria-pressed={contrastMode === 'high'}>
                        Alto
                      </Button>
                    </div>
                  </CardBody>
                </Card>

                {/* Escala de grises */}
                <AccessibilityOption icon={Palette} label='Escala de grises' color='success'>
                  <Switch
                    isSelected={grayscaleMode}
                    onValueChange={toggleGrayscaleMode}
                    size='sm'
                    color='success'
                    aria-label='Activar escala de grises'
                  />
                </AccessibilityOption>

                {/* Resaltar enlaces */}
                <AccessibilityOption icon={Link2} label='Resaltar enlaces' color='danger'>
                  <Switch
                    isSelected={underlineLinks}
                    onValueChange={toggleUnderlineLinks}
                    size='sm'
                    color='danger'
                    aria-label='Subrayar enlaces'
                  />
                </AccessibilityOption>

              </div>
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </aside>
  )
}

export default AccessibilityBar
