// Dependences
import { useState } from 'react'
import PropTypes from 'prop-types'

// Components
import GrabZone from '../atoms/GrabZone'
import ModalProject from '../../../../library/modalProject/ModalProject'

// Hooks
import { useProjects } from '@hooks'

const Project = ({ id }) => {
  const [cursorGrabbed, setCursorGrabbed] = useState(false)
  const [modalShow, setModalShow] = useState(false)
  const gameOver = false

  const { getProjectById } = useProjects()
  const projectData = getProjectById(id)

  const screenStyle = cursorGrabbed ? { cursor: 'none' } : {}
  const img = new URL(`../../../../assets/proyects/${projectData.img}`, import.meta.url).href

  const formattedCategories = projectData.category.map((item, index) => {
    return index !== projectData.category.length - 1 ? `${item} - ` : item
  })

  const handleCursorGrabbed = () => {
    setCursorGrabbed(true)
    setTimeout(() => {
      setCursorGrabbed(false)
    }, 1500)
  }

  return (
    <article className='projects_link' style={screenStyle} id={`id_${id}`}>
      {projectData.link.length < 1 ? (
        <div className='container_game'>
          <figure className='projects_img'>
            <img src={img} alt='image project' />
          </figure>

          <div className='grab-zone-wrapper'>
            <GrabZone onCursorGrabbed={handleCursorGrabbed} cursorGrabbed={cursorGrabbed} gameOver={gameOver} />
          </div>
        </div>
      ) : (
        <figure className='projects_img'>
          <img src={img} alt='image project' />
        </figure>
      )}

      <article className='projects_data'>
        <article>
          {formattedCategories.map((item, index) => {
            return (
              <span key={index} className='projects_category'>
                {item}
              </span>
            )
          })}
        </article>

        {projectData.link ? (
          <a href={projectData.link} className='projects_title' target='_blank'>
            {projectData.title}
          </a>
        ) : (
          <span className='projects_title'>{projectData.title}</span>
        )}

        <span className='projects_date'> {projectData.date} </span>
        <p className='projects_text'>{projectData.text}</p>
        <p className='projects_location'>{projectData.location}</p>
      </article>

      <article className='container_btns'>
        {projectData.link ? (
          <a href={projectData.link} target='_blank'>
            <ion-icon name='earth'></ion-icon>
          </a>
        ) : (
          <span className='upss'>Aún está en construcción</span>
        )}

        {projectData.repo ? (
          <a href={projectData.repo} target='_blank'>
            <ion-icon name='logo-github'></ion-icon>
          </a>
        ) : (
          false
        )}
      </article>

      <ModalProject modalShow={modalShow} id={id} />
    </article>
  )
}

Project.propTypes = {
  id: PropTypes.number.isRequired
}

export default Project
