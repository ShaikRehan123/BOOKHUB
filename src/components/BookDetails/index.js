import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFillStarFill} from 'react-icons/bs'

import NavBar from '../NavBar'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class BookDetails extends Component {
  state = {
    selectedBookData: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getSelectedBookData()
  }

  convertedSelectedData = each => ({
    id: each.id,
    aboutAuthor: each.about_author,
    aboutBook: each.about_book,
    authorName: each.author_name,
    coverPic: each.cover_pic,
    rating: each.rating,
    status: each.read_status,
    title: each.title,
  })

  getSelectedBookData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedData = this.convertedSelectedData(data.book_details)

      this.setState({
        apiStatus: apiStatusConstants.success,
        selectedBookData: updatedData,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderFailureView = () => {
    const onClickRetry = () => {
      this.getSelectedBookData()
    }

    return (
      <div className="slick-failure-div">
        <img
          src="https://res.cloudinary.com/usgheroop/image/upload/v1645455585/Books%20Hub%20Mini%20Proj/Group_7522_nbsa7i.png"
          alt="failure view"
          className="home-failure-img"
        />
        <p className="home-failure-para">
          Something went wrong. Please try again
        </p>
        <button type="button" onClick={onClickRetry} className="logout-btn">
          Try Again
        </button>
      </div>
    )
  }

  renderLoadingView = () => (
    <div testid="loader" className="slick-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderSuccessBookData = () => {
    const {selectedBookData} = this.state
    const {
      title,
      coverPic,
      rating,
      status,
      authorName,
      aboutAuthor,
      aboutBook,
    } = selectedBookData

    return (
      <div className="book-details-inner-card">
        <div className="book-details-img-card">
          <img src={coverPic} alt={title} className="allBooksPic img-size" />
          <div className="book-details-content-div">
            <h1 className="book-details-title">{title}</h1>
            <p className="book-details-author">{authorName}</p>
            <div className="book-details-rating-div">
              <p className="book-details-rating">Avg Rating</p>
              <BsFillStarFill className="book-details-star star" />
              <p className="book-details-rating-value">{rating}</p>
            </div>
            <p className="book-details-status">
              Status:<span className="book-details-span">{status}</span>
            </p>
          </div>
        </div>
        <hr className="hr hr-mb" />
        <div className="data-div">
          <h1 className="about-author">About Author</h1>
          <p className="about-author-para">{aboutAuthor}</p>
          <h1 className="about-author">About Book</h1>
          <p className="about-author-para">{aboutBook}</p>
        </div>
      </div>
    )
  }

  renderSelectedBookData = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessBookData()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <NavBar />
        <div className="book-details-div">
          <div className="content-div">
            <div className="book-details-card">
              {this.renderSelectedBookData()}
            </div>
          </div>
          <Footer />
        </div>
      </>
    )
  }
}
export default BookDetails

/*
    const {selectedBookData} = this.state
    const {
      title,
      coverPic,
      rating,
      status,
      authorName,
      aboutAuthor,
      aboutBook,
    } = selectedBookData

          <div className="mb-content-div">
            <div className="mb-top-div">
              <img
                src={coverPic}
                alt={title}
                className="allBooksPic img-size img-mb-size"
              />
              <div className="allBooks-content-div align-mb">
                <h1 className="allBooks-title">{title}</h1>
                <p className="allBooks-author">{authorName}</p>
                <div className="allBooks-rating-div">
                  <p className="allBooks-rating">Avg Rating</p>
                  <BsFillStarFill className="star" />
                  <p className="allBooks-rating-value">{rating}</p>
                </div>
                <p className="allBooks-status">
                  Status: <span className="span">{status}</span>
                </p>
              </div>
            </div>
            <hr className="hr-mb" />
            <div className="data-div">
              <h1 className="about-author">About Author</h1>
              <p className="about-author-para">{aboutAuthor}</p>
              <h1 className="about-author">About Book</h1>
              <p className="about-author-para">{aboutBook}</p>
            </div>
          </div>
*/
