import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <>
    <div className="notfound-div">
      <img
        src="https://res.cloudinary.com/usgheroop/image/upload/v1645455711/Books%20Hub%20Mini%20Proj/Group_7484_hjpsjd.png"
        alt="not found"
        className="notfound-img"
      />
      <h1 className="notfound-hd">Page Not Found</h1>
      <p className="notfound-para">
        we are sorry, the page you requested could not be found,
        <br /> Please go back to the homepage.
      </p>
      <Link to="/">
        <button type="button" className="logout-btn">
          Go Back to Home
        </button>
      </Link>
    </div>
  </>
)

export default NotFound
