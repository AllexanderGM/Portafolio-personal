import { useState, useEffect, useMemo, useCallback, useRef, memo } from 'react'
import PropTypes from 'prop-types'
import { Globe, Github, Eye } from 'lucide-react'
import { Button } from '@heroui/button'
import { Chip } from '@heroui/chip'

import GrabZone from '../atoms/GrabZone'

import ModalProject from '../../../../library/modalProject/ModalProject'

const Project = memo(({ projectData }) => {
  const [modalShow, setModalShow] = useState(false)
  const [cursorGrabbed, setCursorGrabbed] = useState(false)
  const resetCursorTimeoutRef = useRef(null)
  const gameOver = false

  const hasImage = Boolean(projectData.img)
  const img = useMemo(() => {
    if (!hasImage) return null
    return new URL(`../../../../assets/proyects/${projectData.img}`, import.meta.url).href
  }, [hasImage, projectData.img])

  // Mostrar máximo 4 tecnologías en la tarjeta
  const technologies = useMemo(() => projectData.modal?.technologies?.slice(0, 4) || [], [projectData.modal?.technologies])
  const hasMoreTech = useMemo(() => (projectData.modal?.technologies?.length || 0) > 4, [projectData.modal?.technologies])

  // Verificar si el proyecto está en construcción (sin link)
  const linkMissing = useMemo(() => !projectData.link || projectData.link.length < 1, [projectData.link])
  const isUnderConstruction = useMemo(() => projectData.isUnderConstruction ?? linkMissing, [projectData.isUnderConstruction, linkMissing])

  const handleCursorGrabbed = useCallback(() => {
    setCursorGrabbed(true)
    if (resetCursorTimeoutRef.current) {
      clearTimeout(resetCursorTimeoutRef.current)
    }
    resetCursorTimeoutRef.current = setTimeout(() => {
      setCursorGrabbed(false)
      resetCursorTimeoutRef.current = null
    }, 3000)
  }, [])

  useEffect(() => {
    return () => {
      if (resetCursorTimeoutRef.current) {
        clearTimeout(resetCursorTimeoutRef.current)
      }
    }
  }, [])

  // Ocultar cursor globalmente cuando es atrapado
  useEffect(() => {
    if (cursorGrabbed) {
      document.body.style.cursor = 'none'
    } else {
      document.body.style.cursor = ''
    }
    return () => {
      document.body.style.cursor = ''
    }
  }, [cursorGrabbed])

  return (
    <>
      <article className='project-card'>
        {/* Imagen */}
        {hasImage &&
          (isUnderConstruction ? (
            // Contenedor con GrabZone para proyectos en construcción
            <div className='project-game-container'>
              <figure className='project-image'>
                <img src={img} alt={projectData.title} loading='lazy' />
              </figure>
              <div className='grab-zone-wrapper'>
                <GrabZone
                  onCursorGrabbed={handleCursorGrabbed}
                  cursorGrabbed={cursorGrabbed}
                  gameOver={gameOver}
                />
              </div>
            </div>
          ) : (
            // Imagen normal con overlay
            <figure className='project-image'>
              <img src={img} alt={projectData.title} loading='lazy' />
              <div className='project-image-overlay'>
                <Button
                  className='overlay-btn'
                  variant='flat'
                  size='sm'
                  onPress={() => setModalShow(true)}
                >
                  <Eye size={18} />
                  Ver detalles
                </Button>
              </div>
            </figure>
          ))}

        {/* Contenido */}
        <div className='project-content'>
          {/* Header: Stack + Fecha */}
          <div className='project-header'>
            <Chip size='sm' variant='flat' color='primary' radius='sm'>
              {projectData.stack}
            </Chip>
            <span className='project-date'>{projectData.date}</span>
          </div>

          {/* Título */}
          <h3 className='project-title'>{projectData.title}</h3>

          {/* Descripción */}
          <p className='project-description'>{projectData.text}</p>

          {/* Tecnologías */}
          {technologies.length > 0 && (
            <div className='project-technologies'>
              {technologies.map((tech, idx) => (
                <Chip key={idx} size='sm' variant='bordered' radius='sm'>
                  {tech}
                </Chip>
              ))}
              {hasMoreTech && (
                <Chip size='sm' variant='flat' color='primary' radius='sm'>
                  +{projectData.modal.technologies.length - 4}
                </Chip>
              )}
            </div>
          )}

          {/* Acciones */}
          <div className='project-actions'>
            <div className='project-links'>
              {projectData.link && (
                <a
                  href={projectData.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='action-btn'
                  title='Ver sitio web'
                >
                  <Globe size={16} />
                </a>
              )}
              {projectData.repo && (
                <a
                  href={projectData.repo}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='action-btn'
                  title='Ver repositorio'
                >
                  <Github size={16} />
                </a>
              )}
            </div>

            {isUnderConstruction ? (
              <Chip size='sm' variant='dot' color='warning'>
                En construcción
              </Chip>
            ) : (
              <Button
                className='action-btn-main'
                variant='bordered'
                size='sm'
                onPress={() => setModalShow(true)}
              >
                Ver detalles
              </Button>
            )}
          </div>
        </div>
      </article>

      {/* Modal - Solo se renderiza cuando está abierto */}
      {modalShow && (
        <ModalProject
          modalShow={modalShow}
          setModalShow={setModalShow}
          id={projectData.id}
        />
      )}
    </>
  )
})

Project.displayName = 'Project'

Project.propTypes = {
  projectData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    img: PropTypes.string,
    title: PropTypes.string.isRequired,
    stack: PropTypes.string.isRequired,
    technologies: PropTypes.arrayOf(PropTypes.string),
    context: PropTypes.string,
    date: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    author: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      role: PropTypes.string
    })),
    location: PropTypes.string,
    link: PropTypes.string,
    isUnderConstruction: PropTypes.bool,
    repo: PropTypes.string,
    modal: PropTypes.shape({
      images: PropTypes.array,
      technologies: PropTypes.arrayOf(PropTypes.string),
      achievements: PropTypes.arrayOf(PropTypes.string)
    })
  }).isRequired,
}

export default Project
