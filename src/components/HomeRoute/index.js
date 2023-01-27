import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {
  BsArrowLeftSquare,
  BsArrowRightSquare,
  BsFilterLeft,
} from 'react-icons/bs'
import Header from '../Header'
import ReactSlick from '../ReactSlick'
import SelectOptions from '../SelectOptions'
import AllRestaurants from '../AllRestaurants'
import Loading from '../Loading'
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

class HomeRoute extends Component {
  state = {
    isloading: true,
    allRestaurantsList: [],
    page: 1,
    isloadingPage: true,
    sortByOptionsId: sortByOptions[1].value,
  }

  componentDidMount() {
    this.allrestaurantsApi()
  }

  // api calling to all restaurants

  allrestaurantsApi = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {sortByOptionsId, page} = this.state

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const limitValue = 9
    const offsetValue = (page - 1) * limitValue

    const url = `https://apis.ccbp.in/restaurants-list?offset=${offsetValue}&limit=${limitValue}&sort_by_rating=${sortByOptionsId}`

    const allRestaurantsJsonData = await fetch(url, options)
    const allRestaurantsJs = await allRestaurantsJsonData.json()
    //  this.gettingDataByApiCalling()

    if (allRestaurantsJsonData.ok === true) {
      const allRestaurants = allRestaurantsJs.restaurants.map(eachRes => ({
        id: eachRes.id,
        imageUrl: eachRes.image_url,
        resName: eachRes.name,
        userRating: eachRes.user_rating.rating,
        totalReview: eachRes.user_rating.total_reviews,
        kindName: eachRes.cuisine,
      }))
      this.setState({
        allRestaurantsList: allRestaurants,
        isloadingPage: false,
        isloading: false,
      })
    }
  }

  onRightClick = () => {
    const {page} = this.state

    if (page === 4) {
      this.setState({page: 4}, this.allrestaurantsApi)
    } else {
      this.setState(
        prevState => ({
          page: prevState.page + 1,
          isloadingPage: !prevState.isloadingPage,
        }),
        this.allrestaurantsApi,
      )
    }
  }

  onLeftClick = () => {
    const {page} = this.state

    if (page !== 1) {
      this.setState(
        prevState => ({
          page: prevState.page - 1,
          isloadingPage: !prevState.isloadingPage,
        }),
        this.allrestaurantsApi,
      )
    } else if (page === 1) {
      this.setState({page: 1}, this.allrestaurantsApi)
    }
  }

  onChangeOptions = event => {
    //  console.log(event.target.value)
    this.setState({sortByOptionsId: event.target.value}, this.allrestaurantsApi)
  }

  render() {
    const {
      isloading,
      allRestaurantsList,
      page,
      isloadingPage,
      sortByOptionsId,
    } = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <div className="home-container">
        <Header />

        <div className="home-bg-container">
          {isloading ? (
            <div
              testid="restaurants-offers-loader "
              className="loading-container"
            >
              <Loading />
            </div>
          ) : (
            <div className="home-section">
              <ReactSlick />
            </div>
          )}
          {isloading ? (
            <div
              testid="restaurants-list-loader "
              className="loading-container"
            >
              <Loading />
            </div>
          ) : (
            <div className="home-section">
              <div className="home-container-resta">
                <h1 className="pop-rest">Popular Restaurants</h1>
                <div className="selectfav-sort">
                  <p className="select-fav">
                    Select Your favourite restaurant special dish and make your
                    day happy...
                  </p>
                  <div className="sort-select">
                    <BsFilterLeft size={20} /> <p>Sort By</p>
                    <select
                      className="select-element"
                      onChange={this.onChangeOptions}
                      value={sortByOptionsId}
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
                <hr className="hr-line-home" />
                <div className="all-restaurants-names-container">
                  {isloadingPage ? (
                    <div
                      testid="restaurants-list-loader"
                      className="loading-container"
                    >
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
                    testid="pagination-left-button"
                  >
                    <BsArrowLeftSquare className="arrow-icons" />
                  </button>
                  <p className="para-pages" testid="active-page-number">
                    {page}
                  </p>
                  <span className="para-pages">of 4</span>
                  <button
                    type="button"
                    className="left-right-buttons"
                    onClick={this.onRightClick}
                    testid="pagination-right-button"
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

export default HomeRoute
