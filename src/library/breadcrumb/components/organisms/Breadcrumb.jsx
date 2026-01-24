import { Container } from '@library/container'
import BreadcrumbList from '../molecules/BreadcrumbList'
import useBreadcrumbItems from '../../hooks/useBreadcrumbItems'

import './breadcrumb.scss'

const Breadcrumb = () => {
  const items = useBreadcrumbItems()

  return (
    <nav className='breadcrumb' aria-label='Miga de pan'>
      <Container noPaddingY>
        <BreadcrumbList items={items} />
      </Container>
    </nav>
  )
}

export default Breadcrumb
