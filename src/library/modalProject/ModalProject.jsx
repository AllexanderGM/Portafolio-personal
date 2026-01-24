import PropTypes from 'prop-types'
import { Globe, Github, Users, Trophy, Calendar, MapPin, Briefcase } from 'lucide-react'
import { Button } from '@heroui/button'
import { Chip } from '@heroui/chip'
import { Divider } from '@heroui/divider'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/modal'

import Carousel from '@library/carousel'
import { useProjects } from '@hooks'

import './modalProject.scss'

const ModalProject = ({ modalShow, setModalShow, id }) => {
  const { getProjectById } = useProjects()
  const projectData = getProjectById(id)

  const handleClose = () => setModalShow(false)

  // Filtrar achievements vacíos
  const achievements = projectData?.modal?.achievements?.filter(item => item?.trim()) || []
  const hasLinks = projectData?.link || projectData?.repo

  return (
    <Modal
      size='4xl'
      isOpen={modalShow}
      onClose={handleClose}
      placement='center'
      scrollBehavior='inside'
      backdrop='blur'
      classNames={{
        wrapper: 'modal-wrapper',
        backdrop: 'modal-backdrop',
        base: 'modal-base',
        header: 'modal-header',
        body: 'modal-body',
        footer: 'modal-footer',
        closeButton: 'modal-close-btn'
      }}>
      <ModalContent>
        {onClose => (
          <>
            {/* Header */}
            <ModalHeader>
              <div className='header-content'>
                <h2 className='header-title'>{projectData?.title}</h2>
              </div>
            </ModalHeader>

            {/* Body */}
            <ModalBody>
              {/* Carousel */}
              {projectData?.modal?.images && (
                <div className='modal-carousel'>
                  <Carousel images={projectData.modal.images} />
                </div>
              )}

              {/* Description */}
              {projectData?.text && <p className='modal-description'>{projectData.text}</p>}

              {/* Technologies */}
              {projectData?.modal?.technologies?.length > 0 && (
                <div className='modal-section'>
                  <div className='tech-list'>
                    {projectData.modal.technologies.map((tech, index) => (
                      <Chip key={index} size='sm' variant='flat' radius='sm'>
                        {tech}
                      </Chip>
                    ))}
                  </div>
                </div>
              )}

              <Divider className='modal-divider' />

              {/* Info Grid */}
              <div className='modal-info-grid'>
                {/* Meta info */}
                <div className='info-column'>
                  <div className='info-items'>
                    {projectData?.date && (
                      <div className='info-item'>
                        <Calendar size={16} />
                        <span>{projectData.date}</span>
                      </div>
                    )}
                    {projectData?.location && (
                      <div className='info-item'>
                        <MapPin size={16} />
                        <span>{projectData.location}</span>
                      </div>
                    )}
                  </div>

                  {/* Authors */}
                  {projectData?.author?.length > 0 && (
                    <div className='info-block'>
                      <h4 className='info-label'>
                        <Users size={14} />
                        Equipo
                      </h4>
                      <div className='author-list'>
                        {projectData.author.map((author, index) => (
                          <div key={index} className='author-card'>
                            <span className='author-name'>{author.name}</span>
                            <span className='author-role'>{author.role}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Achievements */}
                {achievements.length > 0 && (
                  <div className='info-column info-column--achievements'>
                    <h4 className='info-label'>
                      <Trophy size={14} />
                      Logros y retos
                    </h4>
                    <ul className='achievements-list'>
                      {achievements.map((achievement, index) => (
                        <li key={index} className='achievement-item'>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </ModalBody>

            {/* Footer */}
            <ModalFooter>
              {hasLinks ? (
                <div className='footer-links'>
                  {projectData?.link && (
                    <Button
                      as='a'
                      href={projectData.link}
                      target='_blank'
                      rel='noopener noreferrer'
                      color='primary'
                      variant='solid'
                      startContent={<Globe size={16} />}>
                      Ver sitio web
                    </Button>
                  )}
                  {projectData?.repo && (
                    <Button
                      as='a'
                      href={projectData.repo}
                      target='_blank'
                      rel='noopener noreferrer'
                      variant='bordered'
                      startContent={<Github size={16} />}>
                      Repositorio
                    </Button>
                  )}
                </div>
              ) : (
                <Chip variant='dot' color='warning' size='sm'>
                  Proyecto privado o en desarrollo
                </Chip>
              )}
              <Button variant='light' onPress={onClose}>
                Cerrar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

ModalProject.propTypes = {
  modalShow: PropTypes.bool.isRequired,
  setModalShow: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired
}

export default ModalProject
