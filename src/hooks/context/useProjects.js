import { useContext } from 'react'
import { ProjectsContext } from '../../context/ProjectsContext'

/**
 * Hook personalizado para acceder al contexto de Projects
 *
 * Proporciona acceso a:
 * - Lista completa de proyectos (allProjects)
 * - Proyectos filtrados (filteredProjects)
 * - Categorías disponibles (categories)
 * - Métodos de filtrado (filterByCategory, searchProjects)
 * - Gestión de modal (openProjectModal, closeProjectModal, isModalOpen)
 * - Utilidades (getProjectById, getProjectsByTechnology, getStatistics)
 *
 * @returns {Object} Estado y métodos de proyectos
 * @throws {Error} Si se usa fuera del ProjectsProvider
 *
 * @example
 * ```jsx
 * import { useProjects } from '@hooks'
 *
 * function ProjectsList() {
 *   const {
 *     filteredProjects,
 *     filterByCategory,
 *     openProjectModal
 *   } = useProjects()
 *
 *   return (
 *     <div>
 *       <button onClick={() => filterByCategory('Web')}>
 *         Filtrar por Web
 *       </button>
 *       {filteredProjects.map(project => (
 *         <div key={project.id} onClick={() => openProjectModal(project.id)}>
 *           {project.title}
 *         </div>
 *       ))}
 *     </div>
 *   )
 * }
 * ```
 */
export const useProjects = () => {
  const context = useContext(ProjectsContext)

  if (!context) {
    throw new Error('useProjects debe usarse dentro de un ProjectsProvider')
  }

  return context
}

export default useProjects
