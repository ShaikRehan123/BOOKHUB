import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'
import './index.css'

const AllBooks = props => {
  const {bookDetails} = props
  const {id, title, rating, coverPic, authorName, readStatus} = bookDetails

  return (
    <li className="right-li">
      <Link to={`/books/${id}`} className="allBooks-link">
        <div className="allBooks-div">
          <img src={coverPic} alt={title} className="allBooksPic" />
          <div className="allBooks-content-div">
            <h1 className="allBooks-title">{title}</h1>
            <p className="allBooks-author">{authorName}</p>
            <div className="allBooks-rating-div">
              <p className="allBooks-rating">Avg Rating</p>
              <BsFillStarFill className="star" />
              <p className="allBooks-rating-value">{rating}</p>
            </div>
            <p className="allBooks-status">
              Status <span className="span">{readStatus}</span>
            </p>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default AllBooks
