// ========================================
// HOOKS - EXPORTACIONES CENTRALIZADAS
// ========================================

// Hooks de contextos
export { useGeneral } from './context/useGeneral.js'
export { useProjects } from './context/useProjects.js'
export { useToast } from './context/useToast.js'
export { useSEO, SEO } from './context/useSEO.js'
export { useLoading } from './context/useLoading.js'
export { useError, ErrorBoundary } from './context/useError.js'

// Hooks utilitarios
export { useScrollTo } from './utils/useScrollTo.js'
export { useIntersectionObserver } from './utils/useIntersectionObserver.js'
export { useLocalStorage } from './utils/useLocalStorage.js'
export { useWindowSize } from './utils/useWindowSize.js'
export { useIsMobile } from './utils/useIsMobile.js'
export { useCopyToClipboard } from './utils/useCopyToClipboard.js'

// ========================================
// EXPORTACIONES POR CATEGORÍA
// ========================================

export * as ContextHooks from './context/index.js'
export * as UtilsHooks from './utils/index.js'
