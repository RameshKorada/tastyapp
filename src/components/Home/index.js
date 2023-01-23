import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import {BsArrowLeftSquare, BsArrowRightSquare} from 'react-icons/bs'

import Header from '../Header'
import SelectOptions from '../SelectOptions'
import AllRestaurants from '../AllRestaurants'
import Loading from '../Loading'
import Slides from '../Slides'
import Footer from '../Footer'
import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class Home extends Component {
  state = {
    isloading: true,
    offerListOfData: [],
    search: '',
    allRestaurantsList: [],
    LIMIT: 9,
    offset: 0,
    page: 1,
    isloadingPage: false,
    sortByOptionsId: sortByOptions[1].value,
  }

  componentDidMount() {
    this.gettingDataByApiCalling()
    this.allrestaurantsApi()
  }

  // api calling to all restaurants

  allrestaurantsApi = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {LIMIT, offset, sortByOptionsId, search} = this.state

    const url = `https://apis.ccbp.in/restaurants-list?search=${search}&offset=${offset}&limit=${LIMIT}&sort_by_rating=${sortByOptionsId}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const allRestaurantsJsonData = await fetch(url, options)
    const allRestaurantsJs = await allRestaurantsJsonData.json()

    if (allRestaurantsJsonData.ok === true) {
      const allRestaurants = allRestaurantsJs.restaurants.map(eachRes => ({
        id: eachRes.id,
        imageUrl: eachRes.image_url,
        resName: eachRes.name,
        userRating: eachRes.user_rating.rating,
        totalReview: eachRes.user_rating.total_reviews,
      }))
      this.setState({allRestaurantsList: allRestaurants, isloadingPage: false})
    }
  }

  // api calling offers
  gettingDataByApiCalling = async () => {
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const jsonData = await fetch(url, options)
    const jsData = await jsonData.json()

    if (jsonData.ok === true) {
      const offerData = jsData.offers.map(eachOffer => ({
        id: eachOffer.id,
        offerImageUrl: eachOffer.image_url,
      }))

      this.setState({isloading: false, offerListOfData: offerData})
    }
  }

  onRightClick = () => {
    const add = 9
    this.setState(
      prevState => ({
        offset: prevState.offset + add,
        page: prevState.page + 1,
        isloadingPage: !prevState.isloadingPage,
      }),
      this.allrestaurantsApi,
    )
  }

  onLeftClick = () => {
    const {offset, page} = this.state
    const add = 9
    if (offset !== 0 && page !== 1) {
      this.setState(
        prevState => ({
          offset: prevState.offset - add,
          page: prevState.page - 1,
          isloadingPage: !prevState.isloadingPage,
        }),
        this.allrestaurantsApi,
      )
    } else if (page === 1) {
      this.setState({page: 1, offset: 9})
    } else {
      this.setState({offset: 9})
    }
  }

  onChangeOptions = event => {
    console.log(event.target.value)
    this.setState({sortByOptionsId: event.target.value}, this.allrestaurantsApi)
  }

  render() {
    const {
      isloading,
      offerListOfData,
      allRestaurantsList,
      offset,
      page,
      isloadingPage,
    } = this.state
    console.log(offset)
    const settings = {
      dots: true,
    }
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <div className="home-container">
        <Header />
        <div className="home-bg-container">
          {isloading ? (
            <div className="loading-container">
              <Loading />
            </div>
          ) : (
            <div className="home-section">
              <ul className="offers-ul">
                <Slider {...settings} className="container">
                  {offerListOfData.map(eachOffer => (
                    <Slides key={eachOffer.id} offerImage={eachOffer} />
                  ))}
                </Slider>
              </ul>
              <div>
                <h1 className="pop-rest">Popular Restaurants</h1>
                <div className="selectfav-sort">
                  <p>
                    Select Your favourite restaurant special dish and make your
                    day happy...
                  </p>
                  <div className="sort-select">
                    <p>Sort By</p>
                    <select
                      className="select-element"
                      onChange={this.onChangeOptions}
                    >
                      {sortByOptions.map(eachOption => (
                        <SelectOptions
                          key={eachOption.id}
                          optionsValues={eachOption}
                          onChangeOptions={this.onChangeOptions}
                        />
                      ))}
                    </select>
                  </div>
                </div>
                <hr />
                <div className="all-restaurants-names-container">
                  {isloadingPage ? (
                    <div className="loading-container">
                      <Loading />
                    </div>
                  ) : (
                    <div>
                      <ul className="ul-all-restaurants">
                        {allRestaurantsList.map(eachList => (
                          <AllRestaurants
                            allRestauratnsList={eachList}
                            key={eachList.id}
                          />
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="left-right-arrow">
                  <button
                    type="button"
                    className="left-right-buttons"
                    onClick={this.onLeftClick}
                  >
                    <BsArrowLeftSquare className="arrow-icons" />
                  </button>
                  <p className="para-pages">{page} of 20</p>
                  <button
                    type="button"
                    className="left-right-buttons"
                    onClick={this.onRightClick}
                  >
                    <BsArrowRightSquare className="arrow-icons" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home
