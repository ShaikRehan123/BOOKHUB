import './index.css'

const BookshelvesItems = props => {
  const {details, clickingItem, isActive, setActiveTab, setLabel} = props
  const {id, label, value} = details

  const onClickItem = () => {
    clickingItem(value)
    setActiveTab(id)
    setLabel(label)
  }

  const activeClass = isActive ? 'left-item-active' : 'left-item-normal'

  return (
    <>
      <li className="left-bar-li">
        <button
          type="button"
          onClick={onClickItem}
          className={`left-items ${activeClass}`}
        >
          {label}
        </button>
      </li>
    </>
  )
}

export default BookshelvesItems
