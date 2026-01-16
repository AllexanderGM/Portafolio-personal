import { heroui } from '@heroui/theme'
import {
  baseFontSize,
  breakpoints,
  fontFamily,
  fontScale,
  fontWeights,
  iconScale,
  palette
} from './src/styles/tokens.js'

const toRem = (px) => `${px / baseFontSize}rem`

const fontSize = {
  xxxs: toRem(fontScale.xxxs),
  xxs: toRem(fontScale.xxs),
  xs: toRem(fontScale.xs),
  sm: toRem(fontScale.sm),
  base: toRem(fontScale.md),
  lg: toRem(fontScale.lg),
  xl: toRem(fontScale.xl),
  '2xl': toRem(fontScale.xxl),
  '3xl': toRem(fontScale.xxxl),
  '4xl': toRem(fontScale.xxxxl)
}

const spacing = {
  'icon-xs': toRem(iconScale.xs),
  'icon-sm': toRem(iconScale.sm),
  'icon-md': toRem(iconScale.md),
  'icon-lg': toRem(iconScale.lg),
  'icon-xl': toRem(iconScale.xl),
  'icon-xxl': toRem(iconScale.xxl)
}

const screens = Object.fromEntries(
  Object.entries(breakpoints).map(([key, value]) => [key, `${value}px`])
)

const gradientPairs = {
  'primary-gradient': [palette.primary[50], palette.primary[300]],
  'primary-gradient-dark': [palette.primary[400], palette.primary[900]],
  'primary-gradient-light': [palette.primary[100], palette.primary[200]],
  'primary-gradient-hover': [palette.primary[200], palette.primary[300]],
  'secondary-gradient': [palette.secondary[50], palette.secondary[300]],
  'secondary-gradient-dark': [palette.secondary[400], palette.secondary[900]],
  'secondary-gradient-light': [palette.secondary[100], palette.secondary[600]],
  'secondary-gradient-hover': [palette.secondary[600], palette.secondary[300]],
  'dark-gradient': [palette.dark[50], palette.dark[300]],
  'dark-gradient-dark': [palette.dark[800], palette.dark[950]],
  'dark-gradient-light': [palette.dark[100], palette.dark[900]],
  'dark-gradient-hover': [palette.dark[200], palette.dark[300]],
  'light-gradient': [palette.light[50], palette.light[300]],
  'light-gradient-dark': [palette.light[400], palette.light[900]],
  'light-gradient-light': [palette.light[100], palette.light[50]],
  'light-gradient-hover': [palette.light[100], palette.light[200]],
  'contrast-gradient': [palette.contrast[50], palette.contrast[300]],
  'contrast-gradient-dark': [palette.contrast[400], palette.contrast[900]],
  'contrast-gradient-light': [palette.contrast[100], palette.contrast[300]],
  'contrast-gradient-hover': [palette.contrast[200], palette.contrast[300]]
}

const radialGradient = (from, to) => `radial-gradient(circle, ${from}, ${to})`

const backgroundImage = Object.fromEntries(
  Object.entries(gradientPairs).map(([name, [from, to]]) => [
    name,
    radialGradient(from, to)
  ])
)

const heroScaleKeys = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900']

const pickScale = (scale) =>
  Object.fromEntries(heroScaleKeys.map((key) => [key, scale[key]]))

const heroColor = (scale, overrides) => ({
  ...pickScale(scale),
  DEFAULT: overrides?.DEFAULT ?? scale.DEFAULT ?? scale[500],
  foreground: overrides?.foreground
})

const heroThemes = {
  light: {
    colors: {
      primary: heroColor(palette.primary, {
        DEFAULT: palette.primary.DEFAULT,
        foreground: palette.primary[950]
      }),
      secondary: heroColor(palette.secondary, {
        DEFAULT: palette.secondary.DEFAULT,
        foreground: palette.light.DEFAULT
      }),
      success: {
        DEFAULT: palette.success.DEFAULT,
        foreground: palette.light.DEFAULT
      },
      warning: {
        DEFAULT: palette.warning.DEFAULT,
        foreground: '#000000'
      },
      danger: {
        DEFAULT: palette.danger.DEFAULT,
        foreground: palette.light.DEFAULT
      },
      content1: {
        DEFAULT: palette.light[100],
        foreground: palette.dark.DEFAULT
      },
      content2: {
        DEFAULT: palette.light[200],
        foreground: palette.dark.DEFAULT
      },
      content3: {
        DEFAULT: palette.light[300],
        foreground: palette.dark.DEFAULT
      },
      content4: {
        DEFAULT: palette.light[400],
        foreground: palette.dark.DEFAULT
      },
      background: palette.light.DEFAULT,
      foreground: palette.dark.DEFAULT
    }
  },
  dark: {
    colors: {
      primary: heroColor(palette.primary, {
        DEFAULT: palette.primary[200],
        foreground: palette.dark[950]
      }),
      secondary: heroColor(palette.secondary, {
        DEFAULT: palette.secondary[500],
        foreground: palette.secondary[50]
      }),
      success: {
        DEFAULT: palette.success[500],
        foreground: '#000000'
      },
      warning: {
        DEFAULT: palette.warning.DEFAULT,
        foreground: '#000000'
      },
      danger: {
        DEFAULT: palette.danger[400],
        foreground: '#000000'
      },
      content1: {
        DEFAULT: palette.dark[900],
        foreground: palette.light.DEFAULT
      },
      content2: {
        DEFAULT: palette.dark[800],
        foreground: palette.light.DEFAULT
      },
      content3: {
        DEFAULT: palette.dark[700],
        foreground: palette.light.DEFAULT
      },
      content4: {
        DEFAULT: palette.dark[600],
        foreground: palette.light.DEFAULT
      },
      background: palette.dark.DEFAULT,
      foreground: palette.light.DEFAULT
    }
  }
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily,
      fontSize,
      fontWeight: fontWeights,
      colors: palette,
      backgroundImage,
      boxShadow: {
        custom: '0 0.25rem 1.875rem rgba(34, 37, 42, 0.85)',
        'custom-hover': '0 0.375rem 1.25rem rgba(34, 37, 42, 0.21)'
      },
      screens,
      transitionDuration: {
        DEFAULT: '300ms',
        custom: '300ms'
      },
      borderRadius: {
        'heroui-large': 'var(--heroui-radius-large)',
        'heroui-medium': 'var(--heroui-radius-medium)',
        'heroui-small': 'var(--heroui-radius-small)'
      },
      spacing
    }
  },
  darkMode: 'class',
  plugins: [
    heroui({
      themes: heroThemes
    })
  ]
}
