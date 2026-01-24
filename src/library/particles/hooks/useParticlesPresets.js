import { useMemo } from 'react'

const useParticlesPresets = ({ color, quantity, preset }) => {
  const presets = useMemo(
    () => ({
      // Efecto premium: micro-movimiento + twinkle + breathing
      premium: {
        particles: {
          color: { value: color },
          number: {
            value: quantity,
            density: { enable: true, area: 1200 }
          },
          shape: { type: 'circle' },
          opacity: {
            value: { min: 0.1, max: 0.5 },
            animation: {
              enable: true,
              speed: 0.4,
              startValue: 'random',
              sync: false
            }
          },
          size: {
            value: { min: 1.5, max: 4 },
            animation: {
              enable: true,
              speed: 0.8,
              startValue: 'random',
              sync: false
            }
          },
          move: {
            enable: true,
            speed: 0.08,
            direction: 'none',
            random: true,
            straight: false,
            outModes: { default: 'bounce' },
            drift: 0
          },
          links: { enable: false },
          wobble: {
            enable: true,
            distance: 3,
            speed: { min: -0.5, max: 0.5 }
          }
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: 'bubble' },
            resize: true
          },
          modes: {
            bubble: {
              distance: 100,
              size: 6,
              duration: 0.4,
              opacity: 0.7
            }
          }
        },
        responsive: [
          {
            maxWidth: 768,
            options: {
              particles: {
                number: { value: Math.floor(quantity * 0.4) },
                size: { value: { min: 1, max: 3 } },
                move: { speed: 0.05 }
              },
              interactivity: {
                events: { onHover: { enable: false } }
              }
            }
          }
        ]
      },

      // Efecto twinkle: solo parpadeo, sin movimiento
      twinkle: {
        particles: {
          color: { value: color },
          number: {
            value: quantity,
            density: { enable: true, area: 1000 }
          },
          shape: { type: 'circle' },
          opacity: {
            value: { min: 0, max: 0.6 },
            animation: {
              enable: true,
              speed: 0.3,
              startValue: 'random',
              sync: false
            }
          },
          size: {
            value: { min: 1, max: 3 }
          },
          move: { enable: false },
          links: { enable: false }
        },
        interactivity: {
          events: { resize: true }
        },
        responsive: [
          {
            maxWidth: 768,
            options: {
              particles: {
                number: { value: Math.floor(quantity * 0.5) }
              }
            }
          }
        ]
      },

      // Efecto floating: movimiento muy sutil
      floating: {
        particles: {
          color: { value: color },
          number: {
            value: quantity,
            density: { enable: true, area: 1000 }
          },
          shape: { type: 'circle' },
          opacity: {
            value: { min: 0.2, max: 0.5 }
          },
          size: {
            value: { min: 2, max: 4 }
          },
          move: {
            enable: true,
            speed: 0.1,
            direction: 'top',
            random: true,
            straight: false,
            outModes: { default: 'out' }
          },
          links: { enable: false }
        },
        interactivity: {
          events: { resize: true }
        },
        responsive: [
          {
            maxWidth: 768,
            options: {
              particles: {
                number: { value: Math.floor(quantity * 0.5) },
                move: { speed: 0.05 }
              }
            }
          }
        ]
      }
    }),
    [color, quantity]
  )

  return presets[preset] || presets.premium
}

export default useParticlesPresets
