import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

// components
import Project from './organims/Project'
import CategoriesComponent from './CategoriesComponent'

// Resourses
import data from '../_data/projects.json'

const ProjectsContainerFilter = ({ categoryText }) => {
  // Estado para selecionar cateogiras
  const [selectCategory, setSelectCategory] = useState(true)
  // Estado para la categoria seleccionada
  const [itemSelect, setItemSelect] = useState('Todos')
  // Estado para actualizar los proyectos
  const [stateProjects, setStateProjects] = useState()

  // Mapeo de categorias
  const Categories = data.categories.map((item, index) => {
    return (
      <CategoriesComponent
        key={index}
        id={item}
        category={item}
        componentClass={selectCategory && itemSelect === item ? 'btn_active' : 'btn_desactive'}
        selectCategory={selectCategory}
        setSelectCategory={setSelectCategory}
        itemSelect={itemSelect}
        setItemSelect={setItemSelect}
      />
    )
  })

  // Filtro de proyectos con diferentes categorias
  const FilterProjects = data.projects.filter(item => {
    const categoryFilter = item.category.split(' ')[0].toLocaleLowerCase()
    const itemFilter = itemSelect.toLocaleLowerCase()

    return categoryFilter === itemFilter
  })

  // proyectos filtrados
  const Projects = FilterProjects.map((item, index) => {
    return (
      <Project
        key={index}
        img={item.img}
        title={item.title}
        category={item.category}
        date={item.date}
        text={item.text}
        author={item.author}
        location={item.location}
        link={item.link}
        repo={item.repo}
      />
    )
  })

  // Proyectos completos
  const AllProjects = data.projects.map((item, index) => {
    return (
      <Project
        key={index}
        img={item.img}
        title={item.title}
        category={item.category}
        date={item.date}
        text={item.text}
        author={item.author}
        location={item.location}
        link={item.link}
        repo={item.repo}
      />
    )
  })

  // Siclo de vida del componente
  useEffect(() => {
    data.categories.forEach(item => {
      if (itemSelect === item) {
        setStateProjects(Projects)
      } else if (itemSelect === 'Todos') {
        setStateProjects(AllProjects)
      }
    })
  }, [itemSelect, Projects, AllProjects])

  return (
    <section className='container_filter'>
      <article className='filtrer'>
        <h2>{categoryText}</h2>
        <ul>{Categories}</ul>
      </article>

      <article className='projects_container'>{stateProjects}</article>
    </section>
  )
}

ProjectsContainerFilter.propTypes = {
  categoryText: PropTypes.string.isRequired
}

export default ProjectsContainerFilter
