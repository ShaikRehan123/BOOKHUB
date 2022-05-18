import {Component} from 'react'

import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import AllBooks from '../AllBooks'
import NavBar from '../NavBar'
import BookshelvesItems from '../BookshelvesItems'
import Footer from '../Footer'
import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Bookshelves extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    bookshelfData: [],
    bookshelfName: 'ALL',
    searchInput: '',
    hd: 'All',
    activeItem: bookshelvesList[0].id,
  }

  componentDidMount() {
    this.getBookshelvesData()
  }

  getBookshelvesData = async () => {
    const {bookshelfName, searchInput} = this.state
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/book-hub/books?shelf=${bookshelfName}&search=${searchInput}`
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
      const updatedBookshelvesData = data.books.map(eachBook => ({
        id: eachBook.id,
        title: eachBook.title,
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
        rating: eachBook.rating,
        readStatus: eachBook.read_status,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        bookshelfData: updatedBookshelvesData,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderFailureView = () => {
    const onClickRetry = () => {
      this.getBookshelvesData()
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

  renderBooksSuccessView = () => {
    const {bookshelfData, searchInput} = this.state
    const isSearchEmpty = bookshelfData.length === 0

    return (
      <>
        {isSearchEmpty ? (
          <div className="search-empty-div">
            <img
              src="https://res.cloudinary.com/usgheroop/image/upload/v1645542509/Books%20Hub%20Mini%20Proj/Asset_1_1_keeuaw.png"
              alt="no books"
              className="NoSearchImg"
            />
            <p className="no-search-para">{`Your search for ${searchInput} did not find any matches.`}</p>
          </div>
        ) : (
          <ul className="right-div-ul">
            {bookshelfData.map(each => (
              <AllBooks key={each.id} bookDetails={each} />
            ))}
          </ul>
        )}
      </>
    )
  }

  renderAllBooks = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderBooksSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  changeShelfValue = shelfValue => {
    this.setState(
      {
        bookshelfName: shelfValue,
      },
      this.getBookshelvesData,
    )
  }

  setActiveTab = activeId => {
    this.setState({
      activeItem: activeId,
    })
  }

  setLabel = selectedLabel => {
    this.setState({
      hd: selectedLabel,
    })
  }

  onClickSearch = () => {
    const {searchInput} = this.state
    this.setState({searchInput}, this.getBookshelvesData)
  }

  render() {
    const {searchInput, hd, activeItem} = this.state

    return (
      <>
        <NavBar />
        <div className="bookshelves-app-div">
          <div className="major-top-div">
            <div className="major-div">
              <div className="left-div">
                <h1 className="left-bar-hd">Bookshelves</h1>
                <ul className="left-bar-ul">
                  {bookshelvesList.map(eachItem => (
                    <BookshelvesItems
                      key={eachItem.id}
                      details={eachItem}
                      clickingItem={this.changeShelfValue}
                      isActive={activeItem === eachItem.id}
                      setActiveTab={this.setActiveTab}
                      setLabel={this.setLabel}
                    />
                  ))}
                </ul>
              </div>
              <div className="right-div">
                <div className="right-hd-div">
                  <h1 className="right-hd">{hd} Books</h1>
                  <div className="search-div">
                    <input
                      type="search"
                      className="search"
                      placeholder="search"
                      value={searchInput}
                      onChange={this.onChangeSearchInput}
                    />
                    <button
                      testid="searchButton"
                      type="button"
                      className="search-btn"
                      onClick={this.onClickSearch}
                    >
                      <BsSearch className="search-icon" />
                    </button>
                  </div>
                </div>
                <div className="renderAllBooks-div">
                  {this.renderAllBooks()}
                </div>
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Bookshelves

/* 
<div className="mobile-view-div">
            <div className="search-mb-div">
              <div className="search-div">
                <input
                  type="search"
                  className="search"
                  placeholder="search"
                  value={searchInput}
                  onChange={this.onChangeSearchInput}
                />
                <button
                  testid="searchButton"
                  type="button"
                  className="search-btn"
                  onClick={this.onClickSearch}
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
            </div>
            <div className="left-div">
              <h1 className="left-bar-hd">Bookshelves</h1>
              <ul className="left-bar-ul">
                {bookshelvesList.map(eachItem => (
                  <BookshelvesItems
                    key={eachItem.id}
                    details={eachItem}
                    clickingItem={this.changeShelfValue}
                    isActive={activeItem === eachItem.id}
                    setActiveTab={this.setActiveTab}
                    setLabel={this.setLabel}
                  />
                ))}
              </ul>
            </div>
            <div className="renderAllBooks-div">{this.renderAllBooks()}</div>
            <Footer />
          </div>
*/
