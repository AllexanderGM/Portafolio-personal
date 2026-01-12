import PropTypes from 'prop-types'

const CategoriesComponent = ({ id, category, itemSelect, setItemSelect }) => {
  const handlerCategory = event => {
    setItemSelect(parseInt(event.target.value))
  }

  return (
    <li>
      <button onClick={handlerCategory} className={id === itemSelect ? 'btn_active' : 'btn_desactive'} value={id}>
        {category}
      </button>
    </li>
  )
}

CategoriesComponent.propTypes = {
  id: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  itemSelect: PropTypes.number.isRequired,
  setItemSelect: PropTypes.func.isRequired
}

export default CategoriesComponent
