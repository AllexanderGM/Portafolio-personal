import { useState, useMemo, useCallback, useRef } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { Button, ButtonGroup } from '@heroui/button'
import { Chip } from '@heroui/chip'
import { Pagination } from '@heroui/pagination'
import { Autocomplete, AutocompleteItem } from '@heroui/autocomplete'
import { X } from 'lucide-react'

import './projects.scss'

import { ScrollAnimationWrapper, getScrollAnimation } from '@library/animation'
import { SEO } from '@context/SEOContext'
import { Container } from '@library/container'

import Project from './components/organisms/Project.jsx'

import { ProjectsProvider } from '../../context/ProjectsContext.jsx'
import data from '../../_data/projects.json'
import seoData from '../../_data/seo.json'
import { ToTopButton } from '@library/buttons'

const ITEMS_PER_PAGE = 6
const EXCLUDED_TECHS = ['Backend', 'Frontend', 'Fullstack', 'Diseño']
const PROJECTS_BREADCRUMBS = [
  { name: 'Inicio', url: 'https://alexandergm.com/' },
  { name: 'Proyectos', url: 'https://alexandergm.com/project' }
]

const Projects = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), [])
  const [activeStack, setActiveStack] = useState('Todos')
  const [activeTechs, setActiveTechs] = useState([])
  const [techInputValue, setTechInputValue] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const { stackFilters, projects } = data

  // Extraer tecnologías con conteo, ordenadas por frecuencia
  const allTechnologies = useMemo(() => {
    const techCount = {}
    projects.forEach(project => {
      project.technologies?.forEach(tech => {
        if (!EXCLUDED_TECHS.includes(tech)) {
          techCount[tech] = (techCount[tech] || 0) + 1
        }
      })
    })
    // Ordenar por frecuencia
    return Object.entries(techCount)
      .sort((a, b) => b[1] - a[1])
      .map(([tech]) => tech)
  }, [projects])

  // Filtrar proyectos
  const filteredProjects = useMemo(() => {
    let result = projects

    const matchesStack = projectStack => {
      if (activeStack === 'Todos') return true
      if (activeStack === 'Frontend' || activeStack === 'Backend') {
        return projectStack === activeStack || projectStack === 'Fullstack'
      }
      return projectStack === activeStack
    }

    // Filtrar por stack
    if (activeStack !== 'Todos') {
      result = result.filter(item => matchesStack(item.stack))
    }

    // Filtrar por tecnologías (coincide con al menos una)
    if (activeTechs.length > 0) {
      result = result.filter(item => activeTechs.some(tech => item.technologies?.includes(tech)))
    }

    return result
  }, [activeStack, activeTechs, projects])

  // Calcular paginación
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE)
  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredProjects.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredProjects, currentPage])

  // Reset página cuando cambian los filtros
  const handleStackChange = useCallback(stack => {
    setActiveStack(stack)
    setCurrentPage(1)
  }, [])

  const handleTechChange = useCallback(key => {
    if (!key) return
    setActiveTechs(prev => (prev.includes(key) ? prev : [...prev, key]))
    setTechInputValue('')
    setCurrentPage(1)
  }, [])

  const removeTech = useCallback(tech => {
    setActiveTechs(prev => prev.filter(t => t !== tech))
    setCurrentPage(1)
  }, [])

  const clearAllFilters = useCallback(() => {
    setActiveStack('Todos')
    setActiveTechs([])
    setTechInputValue('')
    setCurrentPage(1)
  }, [])

  const projectsGridRef = useRef(null)

  const handlePageChange = useCallback(page => {
    setCurrentPage(page)
    projectsGridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const hasActiveFilters = activeStack !== 'Todos' || activeTechs.length > 0

  return (
    <ProjectsProvider>
      <SEO
        title={seoData.projects.title}
        description={seoData.projects.description}
        keywords={seoData.projects.keywords}
        image={seoData.projects.ogImage}
        imageAlt={seoData.projects.ogImageAlt}
        canonical={seoData.projects.canonical}
        structuredData={seoData.projects.structuredData}
        url={seoData.projects.canonical}
        type='website'
        breadcrumbs={PROJECTS_BREADCRUMBS}
      />
      <ToTopButton />

      <main className='projects-page'>
        <Container as='section' className='projects-section'>
          {/* Header */}
          <ScrollAnimationWrapper className='projects-header'>
            <m.span className='projects-eyebrow' variants={scrollAnimation}>
              Mi trabajo
            </m.span>
            <m.h1 className='projects-title' variants={scrollAnimation}>
              Proyectos
            </m.h1>
            <m.p className='projects-description' variants={scrollAnimation}>
              Cada proyecto ha sido una oportunidad para <span className='highlight'>crecer profesionalmente</span> y explorar diferentes
              tecnologías.
            </m.p>
          </ScrollAnimationWrapper>

          {/* Filter Bar */}
          <div className='filter-bar'>
            {/* Stack Tabs - ButtonGroup */}
            <ButtonGroup variant='flat' size='sm' className='filter-button-group'>
              {stackFilters.map((stack, index) => (
                <Button
                  key={index}
                  color={activeStack === stack ? 'primary' : 'default'}
                  variant={activeStack === stack ? 'solid' : 'flat'}
                  onPress={() => handleStackChange(stack)}>
                  {stack}
                </Button>
              ))}
            </ButtonGroup>

            {/* Divider */}
            <div className='filter-divider' />

            {/* Technology Autocomplete */}
            <Autocomplete
              placeholder='Tecnología'
              size='sm'
              variant='bordered'
              className='filter-select'
              inputValue={techInputValue}
              onInputChange={setTechInputValue}
              selectedKey={null}
              onSelectionChange={handleTechChange}
              aria-label='Filtrar por tecnología'
              isClearable={false}>
              {allTechnologies
                .filter(tech => !activeTechs.includes(tech))
                .map(tech => (
                  <AutocompleteItem key={tech}>{tech}</AutocompleteItem>
                ))}
            </Autocomplete>

            {/* Active filters tags - inline */}
            {hasActiveFilters && (
              <>
                <div className='filter-divider' />
                <div className='active-filters'>
                  {activeStack !== 'Todos' && (
                    <Chip size='sm' variant='flat' color='primary' onClose={() => handleStackChange('Todos')}>
                      {activeStack}
                    </Chip>
                  )}
                  {activeTechs.map(tech => (
                    <Chip key={tech} size='sm' variant='flat' color='primary' onClose={() => removeTech(tech)}>
                      {tech}
                    </Chip>
                  ))}
                </div>
              </>
            )}

            {/* Clear filters */}
            {hasActiveFilters && (
              <Button variant='light' size='sm' className='filter-clear' onPress={clearAllFilters} startContent={<X size={14} />}>
                Limpiar
              </Button>
            )}
          </div>

          {/* Contador de resultados */}
          <div className='projects-count'>
            <span>
              {filteredProjects.length} proyecto{filteredProjects.length !== 1 ? 's' : ''}
              {activeStack !== 'Todos' && <span className='count-filter'> en {activeStack}</span>}
              {activeTechs.length > 0 && <span className='count-filter'> con {activeTechs.join(', ')}</span>}
            </span>
          </div>

          {/* Grid de proyectos */}
          <div ref={projectsGridRef} className='projects-grid'>
            <AnimatePresence mode='popLayout'>
              {paginatedProjects.map((item, index) => (
                <m.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    type: 'spring',
                    duration: 0.4,
                    delay: index * 0.05
                  }}>
                  <Project projectData={item} />
                </m.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Paginación */}
          {totalPages > 1 && (
            <div className='projects-pagination'>
              <Pagination
                total={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color='primary'
                variant='flat'
                showControls
                size='lg'
              />
            </div>
          )}
        </Container>
      </main>
    </ProjectsProvider>
  )
}

export default Projects
