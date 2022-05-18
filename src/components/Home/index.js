import {Component} from 'react'

import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import NavBar from '../NavBar'
import Footer from '../Footer'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 860,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
}

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    slickData: [],
  }

  componentDidMount() {
    this.getSlickData()
    this.loaderId = setInterval(this.renderLoadingView, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.loaderId)
  }

  getSlickData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.books.map(each => ({
        id: each.id,
        title: each.title,
        authorName: each.author_name,
        coverPic: each.cover_pic,
      }))

      this.setState({
        apiStatus: apiStatusConstants.success,
        slickData: updatedData,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderSuccessView = () => {
    const {slickData} = this.state

    return (
      <Slider {...settings}>
        {slickData.map(eachBook => {
          const {id, title, coverPic, authorName} = eachBook
          return (
            <Link to={`/books/${id}`} className="slick-btn" key={id}>
              <li className="slick-book-div">
                <img className="book-img" src={coverPic} alt="Book Cover pic" />
                <h1 className="title">{title}</h1>
                <p className="author">{authorName}</p>
              </li>
            </Link>
          )
        })}
      </Slider>
    )
  }

  renderFailureView = () => {
    const onClickRetry = () => {
      this.getSlickData()
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

  renderSlider = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
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
        <div className="home-app-div">
          <div className="home-content-div">
            <h1 className="home-hd">Find Your Next Favorite Books?</h1>
            <p className="home-para">
              You are in the right place. Tell us what titles or genres you have
              enjoyed in the past, and we will give you surprisingly insightful
              recommendations.
            </p>
            <Link to="/shelf" className="slick-btn-sm">
              <button type="button" className="findBooks-btn">
                Find Books
              </button>
            </Link>
            <div className="slick-card-div">
              <div className="slick-hd-div">
                <h1 className="slick-hd">Top Rated Books</h1>
                <Link to="/shelf" className="slick-btn">
                  <button type="button" className="logout-btn">
                    Find Books
                  </button>
                </Link>
              </div>
              <div className="slick-container">{this.renderSlider()}</div>
            </div>
          </div>
          <Footer />
        </div>
      </>
    )
  }
}

export default Home
