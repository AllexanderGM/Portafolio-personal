import { useEffect, useState } from 'react'
import { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

const useParticlesEngineReady = () => {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    initParticlesEngine(async engine => {
      await loadSlim(engine)
    }).then(() => setReady(true))
  }, [])

  return ready
}

export default useParticlesEngineReady
