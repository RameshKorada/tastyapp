import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {MdStarRate} from 'react-icons/md'
import {BiRupee} from 'react-icons/bi'
import Header from '../Header'
import Loading from '../Loading'

import AllItems from '../AllItems'
import Footer from '../Footer'

import './index.css'

class RestaurantDetails extends Component {
  state = {
    restaurantProfile: {},
    allItemsList: [],
    empList: [],
    isloadingRes: true,
    countNumber: 1,
  }

  componentDidMount() {
    //   const {empList} = this.state
    this.restaurantItemsApi()

    const fromlocal = localStorage.getItem('cartData')

    if (fromlocal !== null) {
      //     console.log(empList, 'iam not called')
      const parsedData = JSON.parse(fromlocal)
      //    console.log(parsedData)
      this.setState({empList: parsedData})
    }
  }

  // api calling to particular restaurant

  restaurantItemsApi = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    //    console.log(id)
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const jsonRestaurantData = await fetch(url, options)

    //   console.log(jsonRestaurantData)
    if (jsonRestaurantData.ok === true) {
      const jsDataRestaurant = await jsonRestaurantData.json()
      //     console.log(jsDataRestaurant)
      const restaurantProfileo = {
        resImg: jsDataRestaurant.image_url,
        kindName: jsDataRestaurant.cuisine,
        location: jsDataRestaurant.location,
        rating: jsDataRestaurant.rating,
        reviewCount: jsDataRestaurant.reviews_count,
        costPerTwo: jsDataRestaurant.cost_for_two,
        resName: jsDataRestaurant.name,
      }

      //   this.restaurantDetailsView(restaurantProfile)

      const foodItems = jsDataRestaurant.food_items
      //   console.log(foodItems)
      const foodItemsList = foodItems.map(eachItem => ({
        id: eachItem.id,
        cost: eachItem.cost,
        foodType: eachItem.food_type,
        imageUrl: eachItem.image_url,
        name: eachItem.name,
        rating: eachItem.rating,
        count: 1,
      }))
      const gettingFromLocalSt = localStorage.getItem('fromapilist')
      const parsedData = JSON.parse(gettingFromLocalSt)

      if (gettingFromLocalSt === null) {
        localStorage.setItem('fromapilist', JSON.stringify(foodItemsList))

        this.setState({
          allItemsList: foodItemsList,
          restaurantProfile: restaurantProfileo,
          isloadingRes: false,
        })
      } else {
        this.setState({
          isloadingRes: false,
          restaurantProfile: restaurantProfileo,
          allItemsList: parsedData,
        })
      }
    }
  }

  reduceFunction = id => {
    const {empList, allItemsList} = this.state

    const gettingFromLocal = localStorage.getItem('cartData')
    const parsedData = JSON.parse(gettingFromLocal)
    const filterid = empList.filter(each => each.id === id)
    const filterDatanon = empList.filter(eachid => eachid.id !== id)
    //   console.log(filterDatanon)
    const idobj = filterid[0]
    const ccc = idobj.count

    idobj.count = ccc - 1

    //  console.log(idobj.count === 0)
    if (idobj.count === 0) {
      //   console.log('yes')
      const filterDatanonP = parsedData.filter(eachid => eachid.id !== id)
      //   console.log(filterDatanonP, 'filterDatap')
      localStorage.setItem('cartData', JSON.stringify(filterDatanonP))
      // this.setState({count: ccc})
      // console.log(filterDatanonP)
      this.setState({
        empList: filterDatanonP,
        countNumber: ccc,
      })
    } else {
      const updatedList = allItemsList.map(obj =>
        obj.id === id ? {...obj, count: obj.count - 1} : obj,
      )
      localStorage.setItem('fromapilist', JSON.stringify(updatedList))

      filterDatanon.push(idobj)
      localStorage.setItem('cartData', JSON.stringify(filterDatanon))
      this.setState({countNumber: ccc - 1, allItemsList: updatedList})
    }
  }

  onAddfunction = (id, cost) => {
    const {empList} = this.state
    const gettingFromLocal = localStorage.getItem('fromapilist')
    const parsedDataFromLocal = JSON.parse(gettingFromLocal)
    const updatedList = parsedDataFromLocal.map(obj =>
      obj.id === id ? {...obj, count: obj.count + 1} : obj,
    )
    localStorage.setItem('fromapilist', JSON.stringify(updatedList))

    const filterid = empList.filter(each => each.id === id)
    const filterDatanon = empList.filter(eachid => eachid.id !== id)
    const idobj = filterid[0]
    const ccc = idobj.count

    idobj.count = ccc + 1

    filterDatanon.push(idobj)
    //   console.log(filterid)
    const costFromlocal = idobj.cost
    idobj.cost = costFromlocal + cost
    localStorage.setItem('cartData', JSON.stringify(filterDatanon))
    this.setState({countNumber: ccc + 1, allItemsList: updatedList})
  }

  // each item into array
  eachtemIntoArray = obj => {
    // const {count} = this.state

    const fromLocal = localStorage.getItem('cartData')
    const countNumberObj = obj.count
    //   console.log(countNumberObj, 'aasda')

    if (fromLocal === null) {
      const l = []
      l.push(obj)

      localStorage.setItem('cartData', JSON.stringify(l))

      //   console.log(filter)

      this.setState(prevState => ({
        empList: [...prevState.empList, obj],
        countNumber: countNumberObj,
      }))
    } else {
      const fromLocalst = localStorage.getItem('cartData')
      const parsedList = JSON.parse(fromLocalst)

      parsedList.push(obj)
      localStorage.setItem('cartData', JSON.stringify(parsedList))
      this.setState({empList: parsedList, countNumber: countNumberObj})
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    const {
      isloadingRes,
      restaurantProfile,
      allItemsList,
      empList,
      countNumber,
    } = this.state

    return (
      <div>
        <Header />
        <div>
          {isloadingRes ? (
            <div
              testid="restaurant-details-loader"
              className="loading-container"
            >
              <Loading />
            </div>
          ) : (
            <div>
              <div className="restaurant-bg">
                <img
                  className="restaurant-image-banner"
                  src={restaurantProfile.resImg}
                  alt="restaurant"
                />
                <div>
                  <h1 className="rest-name">{restaurantProfile.resName}</h1>
                  <p className="rest-kindname">{restaurantProfile.kindName}</p>
                  <p className="rest-profile">{restaurantProfile.location}</p>
                  <div className="rating-cost-container">
                    <div>
                      <p className="cost-rating">
                        <MdStarRate className="star" />
                        {restaurantProfile.rating}
                      </p>
                      <p className="rating-cost">
                        {restaurantProfile.reviewCount}+ Ratings
                      </p>
                    </div>
                    <hr className="hr-line" />
                    <div className="cost-per-two">
                      <p className="cost-rating">
                        <BiRupee /> {restaurantProfile.costPerTwo}
                      </p>
                      <p className="rating-cost">Cost for two</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <ul className="ul-all-items-container">
                  {allItemsList.map(eachItem => (
                    <AllItems
                      key={eachItem.id}
                      eachItem={eachItem}
                      eachtemIntoArray={this.eachtemIntoArray}
                      empList={empList}
                      reduceFunction={this.reduceFunction}
                      onAddfunction={this.onAddfunction}
                      countNumber={countNumber}
                    />
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    )
  }
}

export default RestaurantDetails
