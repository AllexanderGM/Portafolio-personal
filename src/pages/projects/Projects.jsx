import { useState, useMemo, useCallback } from 'react'
import { m } from 'framer-motion'
import { Button, ButtonGroup } from '@heroui/button'
import { Chip } from '@heroui/chip'
import { Pagination } from '@heroui/pagination'
import { Select, SelectItem } from '@heroui/select'
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
  const [activeTech, setActiveTech] = useState(null)
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

    const matchesStack = (projectStack) => {
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

    // Filtrar por tecnología
    if (activeTech) {
      result = result.filter(item =>
        item.technologies?.includes(activeTech)
      )
    }

    return result
  }, [activeStack, activeTech, projects])

  // Calcular paginación
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE)
  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredProjects.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredProjects, currentPage])

  // Reset página cuando cambian los filtros
  const handleStackChange = useCallback((stack) => {
    setActiveStack(stack)
    setCurrentPage(1)
  }, [])

  const handleTechChange = useCallback((keys) => {
    const selectedKey = Array.from(keys)[0] || null
    setActiveTech(selectedKey)
    setCurrentPage(1)
  }, [])

  const clearAllFilters = useCallback(() => {
    setActiveStack('Todos')
    setActiveTech(null)
    setCurrentPage(1)
  }, [])

  const hasActiveFilters = activeStack !== 'Todos' || activeTech

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
            <m.span className='projects-eyebrow' variants={scrollAnimation}>Mi trabajo</m.span>
            <m.h1 className='projects-title' variants={scrollAnimation}>Proyectos</m.h1>
            <m.p className='projects-description' variants={scrollAnimation}>
              Cada proyecto ha sido una oportunidad para <span className='highlight'>crecer profesionalmente</span> y explorar diferentes tecnologías.
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
                  onPress={() => handleStackChange(stack)}
                >
                  {stack}
                </Button>
              ))}
            </ButtonGroup>

            {/* Divider */}
            <div className='filter-divider' />

            {/* Technology Select */}
            <Select
              placeholder='Tecnología'
              size='sm'
              variant='bordered'
              className='filter-select'
              selectedKeys={activeTech ? [activeTech] : []}
              onSelectionChange={handleTechChange}
              aria-label='Filtrar por tecnología'
            >
              {allTechnologies.map((tech) => (
                <SelectItem key={tech}>
                  {tech}
                </SelectItem>
              ))}
            </Select>

            {/* Clear filters */}
            {hasActiveFilters && (
              <Button
                variant='light'
                size='sm'
                className='filter-clear'
                onPress={clearAllFilters}
                startContent={<X size={14} />}
              >
                Limpiar
              </Button>
            )}
          </div>

          {/* Active filters tags */}
          {hasActiveFilters && (
            <div className='active-filters'>
              <span className='active-filters-label'>Filtros activos:</span>
              {activeStack !== 'Todos' && (
                <Chip
                  size='sm'
                  variant='flat'
                  color='primary'
                  onClose={() => handleStackChange('Todos')}
                >
                  {activeStack}
                </Chip>
              )}
              {activeTech && (
                <Chip
                  size='sm'
                  variant='flat'
                  color='primary'
                  onClose={() => setActiveTech(null)}
                >
                  {activeTech}
                </Chip>
              )}
            </div>
          )}

          {/* Contador de resultados */}
          <div className='projects-count'>
            <span>
              {filteredProjects.length} proyecto{filteredProjects.length !== 1 ? 's' : ''}
              {activeStack !== 'Todos' && <span className='count-filter'> en {activeStack}</span>}
              {activeTech && <span className='count-filter'> con {activeTech}</span>}
            </span>
          </div>

          {/* Grid de proyectos */}
          <div className='projects-grid'>
            {paginatedProjects.map((item) => (
              <Project key={item.id} projectData={item} />
            ))}
          </div>

          {/* Paginación */}
          {totalPages > 1 && (
            <div className='projects-pagination'>
              <Pagination
                total={totalPages}
                page={currentPage}
                onChange={setCurrentPage}
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
