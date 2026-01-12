import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import {
  baseFontSize,
  transition,
  breakpoints,
  fontFamily,
  fontScale,
  fontWeights,
  iconScale,
  palette,
  scssColorAliases,
  colorTransparents
} from '../src/styles/tokens.js'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const stylesDir = path.join(rootDir, 'src', 'styles')

const header = '// Generated from src/styles/tokens.js. Do not edit directly.\n\n'

const toRem = (px) => `${px / baseFontSize}rem`

const writeScss = (filename, lines) => {
  writeFileSync(path.join(stylesDir, filename), `${header}${lines.join('\n')}\n`)
}

const fontFamilyStack = (fontFamily.sans ?? fontFamily.centra).map((name) => {
  const genericFamilies = new Set([
    'serif',
    'sans-serif',
    'monospace',
    'cursive',
    'fantasy',
    'system-ui'
  ])

  if (genericFamilies.has(name)) {
    return name
  }

  return `'${name}'`
})

writeScss('_tokens.vars.scss', [
  `$base-font-size: ${baseFontSize}px;`,
  `$transition: ${transition};`,
  `$brack_point: ${breakpoints.md}px;`
])

const iconKeys = ['xxxs', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl']
const fontKeys = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl', 'xxxxl']

const fontLines = [
  ...iconKeys.map((key) => `$icon-size-${key}: ${toRem(iconScale[key])};`),
  ...fontKeys.map((key) => `$font-size-${key}: ${toRem(fontScale[key])};`),
  ...Object.entries(fontWeights).map(
    ([key, value]) => `$font-weight-${key}: ${value};`
  ),
  `$font-family: ${fontFamilyStack.join(', ')};`
]

writeScss('_tokens.fonts.scss', fontLines)

const colorLines = []

for (const [family, scale] of Object.entries(palette)) {
  const prefix = `${family}-color`
  const defaultValue = scale.DEFAULT ?? scale[500]

  colorLines.push(`$${prefix}: ${defaultValue};`)

  for (const [key, value] of Object.entries(scale)) {
    if (!/^\d+$/.test(key)) {
      continue
    }

    colorLines.push(`$${prefix}-${key}: ${value};`)
  }
}

for (const [name, value] of Object.entries(colorTransparents)) {
  colorLines.push(`$${name}: ${value};`)
}

for (const [name, value] of Object.entries(scssColorAliases)) {
  colorLines.push(`$${name}: ${value};`)
}

writeScss('_tokens.colors.scss', colorLines)
