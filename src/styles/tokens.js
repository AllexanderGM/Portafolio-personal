export const baseFontSize = 16

export const transition = '0.3s'

export const breakpoints = {
  sm: 640,
  md: 800,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
}

export const fontFamily = {
  centra: ['Centra', 'sans-serif'],
  sans: ['Centra', 'sans-serif']
}

export const fontWeights = {
  light: 300,
  regular: 400,
  medium: 500,
  bold: 700
}

export const fontScale = {
  xxxs: 8,
  xxs: 10,
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 22,
  xxl: 26,
  xxxl: 32,
  xxxxl: 46
}

export const iconScale = {
  xxxs: 8,
  xxs: 10,
  xs: 12,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
  xxl: 64
}

export const palette = {
  primary: {
    50: '#f8f6f4',
    100: '#eeece6',
    200: '#d5cdc0',
    300: '#c7bbaa',
    400: '#af9d88',
    500: '#9f8770',
    600: '#927864',
    700: '#7a6254',
    800: '#645148',
    900: '#52443c',
    950: '#2b231f',
    DEFAULT: '#d5cdc0',
    light: '#e3dbd0',
    accent: '#c4b6a8',
    hover: '#c4b6a8',
    dark: '#999086'
  },
  secondary: {
    50: '#f6f8f9',
    100: '#ebeff3',
    200: '#d3dce4',
    300: '#adbecc',
    400: '#819baf',
    500: '#617e96',
    600: '#4e677e',
    700: '#3f5365',
    800: '#374755',
    900: '#313d49',
    950: '#212830',
    DEFAULT: '#4e677e',
    light: '#a4b2bc',
    hover: '#778b99',
    dark: '#3d454d'
  },
  light: {
    50: '#ffffff',
    100: '#efefef',
    200: '#dcdcdc',
    300: '#bdbdbd',
    400: '#989898',
    500: '#7c7c7c',
    600: '#656565',
    700: '#525252',
    800: '#464646',
    900: '#3d3d3d',
    950: '#292929',
    DEFAULT: '#ffffff'
  },
  dark: {
    50: '#f4f6f7',
    100: '#e3e6ea',
    200: '#cbd1d6',
    300: '#a6b0ba',
    400: '#7a8796',
    500: '#5f6c7b',
    600: '#515b69',
    700: '#464d58',
    800: '#3e424c',
    900: '#2f3238',
    950: '#22252a',
    DEFAULT: '#2f3238'
  },
  contrast: {
    50: '#f6f7f8',
    100: '#ebecee',
    200: '#dbdde2',
    300: '#c1c5cc',
    400: '#a5aab5',
    500: '#8f94a2',
    600: '#7e8292',
    700: '#717484',
    800: '#5f616e',
    900: '#4f5059',
    950: '#323339',
    DEFAULT: '#c1c5cc'
  },
  success: {
    50: '#ebfef4',
    100: '#d0fbe3',
    200: '#a4f6cc',
    300: '#6aebb1',
    400: '#2fd891',
    500: '#0abf79',
    600: '#00a86b',
    700: '#007c52',
    800: '#036242',
    900: '#045038',
    950: '#012d21',
    DEFAULT: '#00a86b'
  },
  warning: {
    50: '#fffeea',
    100: '#fffac5',
    200: '#fff685',
    300: '#ffeb46',
    400: '#ffdb1b',
    500: '#fcb900',
    600: '#e29000',
    700: '#bb6602',
    800: '#984e08',
    900: '#7c400b',
    950: '#482100',
    DEFAULT: '#fcb900'
  },
  danger: {
    50: '#fff1f1',
    100: '#ffdfdf',
    200: '#ffc5c6',
    300: '#ff9d9e',
    400: '#ff6466',
    500: '#ff4d4f',
    600: '#ed1517',
    700: '#c80d0f',
    800: '#a50f11',
    900: '#881415',
    950: '#4b0405',
    DEFAULT: '#ff4d4f'
  }
}

export const scssColorAliases = {
  primaryLight: palette.primary.light,
  primary: palette.primary.DEFAULT,
  primaryAccent: palette.primary.accent,
  primaryHover: palette.primary.hover,
  primaryDark: palette.primary.dark,
  primaryTrasparent: 'rgba(153, 144, 134, 0.438)',
  lightsecondary: palette.secondary.light,
  secondary: palette.secondary.DEFAULT,
  secondaryHover: palette.secondary.hover,
  darksecondary: palette.secondary.dark
}

export const colorTransparents = {
  'primary-color-transparent': '#d5cdc0a2',
  'secondary-color-transparent': '#212830a2',
  'light-color-transparent': '#292929a2',
  'dark-color-transparent': '#22252ada',
  'dark-color-transparent-low': '#22252a36',
  'contrast-color-transparent': '#323339a2',
  'success-color-transparent': '#012d21a2',
  'warning-color-transparent': '#482100a2',
  'danger-color-transparent': '#4b0405a2'
}
