import { useCallback } from 'react'
import { loadSlim } from '@tsparticles/slim'

const useParticlesInit = () => {
  return useCallback(async engine => {
    await loadSlim(engine)
  }, [])
}

export default useParticlesInit
