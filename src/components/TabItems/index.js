import {Link} from 'react-router-dom'
import './index.css'

const TabItems = props => {
  const {routeDetails, setActiveRoute, isRouteActive} = props
  const {id, value, link} = routeDetails

  const homeClass = isRouteActive ? 'route-active' : ''

  const onClickRoute = () => {
    setActiveRoute(id)
  }

  return (
    <li className="route-li">
      <Link to={link} className="route-link">
        <button
          type="button"
          className={`route-btn ${homeClass}`}
          onClick={onClickRoute}
        >
          {value}
        </button>
      </Link>
    </li>
  )
}

export default TabItems
