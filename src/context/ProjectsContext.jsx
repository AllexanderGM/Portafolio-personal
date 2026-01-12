import { createContext, useState, useMemo, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import projectsData from '../_data/projects.json'

// Crear contexto
export const ProjectsContext = createContext(null)

/**
 * Provider de Proyectos que maneja:
 * - Lista completa de proyectos
 * - Filtrado por categoría
 * - Proyecto seleccionado
 * - Modal de proyecto
 */
export const ProjectsProvider = ({ children }) => {
  // Datos de proyectos desde JSON
  const { projects: allProjects, categories, ...metadata } = projectsData

  // Estados
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [filteredProjects, setFilteredProjects] = useState(allProjects)
  const [selectedProject, setSelectedProject] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  /**
   * Obtiene un proyecto por ID
   * @param {number} id - ID del proyecto
   * @returns {Object|null} Proyecto encontrado
   */
  const getProjectById = useCallback(
    id => {
      return allProjects.find(project => project.id === id) || null
    },
    [allProjects]
  )

  /**
   * Filtra proyectos por categoría
   * @param {string} category - Categoría a filtrar
   */
  const filterByCategory = useCallback(
    category => {
      setSelectedCategory(category)

      if (category === 'Todos') {
        setFilteredProjects(allProjects)
      } else {
        const filtered = allProjects.filter(project => project.category.some(cat => cat.toLowerCase() === category.toLowerCase()))
        setFilteredProjects(filtered)
      }
    },
    [allProjects]
  )

  /**
   * Busca proyectos por término
   * @param {string} searchTerm - Término de búsqueda
   */
  const searchProjects = useCallback(
    searchTerm => {
      if (!searchTerm.trim()) {
        setFilteredProjects(allProjects)
        return
      }

      const term = searchTerm.toLowerCase()
      const searched = allProjects.filter(
        project =>
          project.title.toLowerCase().includes(term) ||
          project.text.toLowerCase().includes(term) ||
          project.category.some(cat => cat.toLowerCase().includes(term)) ||
          project.modal?.technologies?.some(tech => tech.toLowerCase().includes(term))
      )

      setFilteredProjects(searched)
    },
    [allProjects]
  )

  /**
   * Abre el modal con un proyecto específico
   * @param {number} projectId - ID del proyecto
   */
  const openProjectModal = useCallback(
    projectId => {
      const project = getProjectById(projectId)
      if (project) {
        setSelectedProject(project)
        setIsModalOpen(true)
      }
    },
    [getProjectById]
  )

  /**
   * Cierra el modal de proyecto
   */
  const closeProjectModal = useCallback(() => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProject(null), 300) // Delay para animación
  }, [])

  /**
   * Obtiene proyectos por tecnología
   * @param {string} technology - Tecnología a buscar
   * @returns {Array} Proyectos que usan esa tecnología
   */
  const getProjectsByTechnology = useCallback(
    technology => {
      return allProjects.filter(project => project.modal?.technologies?.some(tech => tech.toLowerCase() === technology.toLowerCase()))
    },
    [allProjects]
  )

  /**
   * Obtiene estadísticas de los proyectos
   * @returns {Object} Estadísticas
   */
  const getStatistics = useCallback(() => {
    const techCount = {}
    const categoryCount = {}

    allProjects.forEach(project => {
      // Contar tecnologías
      project.modal?.technologies?.forEach(tech => {
        techCount[tech] = (techCount[tech] || 0) + 1
      })

      // Contar categorías
      project.category.forEach(cat => {
        categoryCount[cat] = (categoryCount[cat] || 0) + 1
      })
    })

    return {
      totalProjects: allProjects.length,
      technologies: techCount,
      categories: categoryCount,
      mostUsedTech: Object.entries(techCount).sort((a, b) => b[1] - a[1])[0]
    }
  }, [allProjects])

  // Efecto para actualizar filtrados cuando cambia la categoría
  useEffect(() => {
    filterByCategory(selectedCategory)
  }, [selectedCategory, filterByCategory])

  // Valor del contexto con useMemo para optimización
  const value = useMemo(
    () => ({
      // Datos
      allProjects,
      filteredProjects,
      categories,
      metadata,

      // Estados
      selectedCategory,
      selectedProject,
      isModalOpen,

      // Métodos de filtrado y búsqueda
      filterByCategory,
      searchProjects,
      getProjectById,
      getProjectsByTechnology,

      // Métodos del modal
      openProjectModal,
      closeProjectModal,

      // Utilidades
      getStatistics,

      // Acceso directo por ID (para compatibilidad)
      projectById: id => getProjectById(id)
    }),
    [
      allProjects,
      filteredProjects,
      categories,
      metadata,
      selectedCategory,
      selectedProject,
      isModalOpen,
      filterByCategory,
      searchProjects,
      getProjectById,
      getProjectsByTechnology,
      openProjectModal,
      closeProjectModal,
      getStatistics
    ]
  )

  return <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>
}

ProjectsProvider.propTypes = {
  children: PropTypes.node.isRequired
}
