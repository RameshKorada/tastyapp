import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
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

    countNumber: 1,
  }

  componentDidMount() {
    const {empList} = this.state
    this.restaurantItemsApi()

    const fromlocal = localStorage.getItem('onAdd')

    if (fromlocal !== null) {
      console.log(empList, 'iam not called')
      const parsedData = JSON.parse(fromlocal)
      console.log(parsedData)
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
      console.log(jsDataRestaurant)
      const restaurantProfile = {
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
      }))
      this.setState({
        isloading: false,
        restaurantProfile,
        allItemsList: foodItemsList,
      })
    }
  }

  reduceFunction = id => {
    const {empList} = this.state
    const gettingFromLocal = localStorage.getItem('onAdd')
    const parsedData = JSON.parse(gettingFromLocal)
    const filterid = empList.filter(each => each.id === id)
    const filterDatanon = empList.filter(eachid => eachid.id !== id)
    console.log(filterDatanon)
    const idobj = filterid[0]
    const ccc = idobj.count

    idobj.count = ccc - 1

    //  console.log(idobj.count === 0)
    if (idobj.count === 0) {
      console.log('yes')
      const filterDatanonP = parsedData.filter(eachid => eachid.id !== id)
      console.log(filterDatanonP, 'filterDatap')
      localStorage.setItem('onAdd', JSON.stringify(filterDatanonP))
      // this.setState({count: ccc})
      // console.log(filterDatanonP)
      this.setState({empList: filterDatanonP, countNumber: ccc})
    } else {
      filterDatanon.push(idobj)
      localStorage.setItem('onAdd', JSON.stringify(filterDatanon))

      this.setState({countNumber: ccc - 1})
    }
  }

  onAddfunction = (id, cost) => {
    const {empList} = this.state
    //  const gettingFromLocal = localStorage.getItem('onAdd')
    //  const parsedData = JSON.parse(gettingFromLocal)
    const filterid = empList.filter(each => each.id === id)
    const filterDatanon = empList.filter(eachid => eachid.id !== id)
    console.log(filterDatanon)
    const idobj = filterid[0]
    const ccc = idobj.count

    idobj.count = ccc + 1

    filterDatanon.push(idobj)
    console.log(filterid)
    const costFromlocal = idobj.cost
    idobj.cost = costFromlocal + cost
    localStorage.setItem('onAdd', JSON.stringify(filterDatanon))
    this.setState({countNumber: ccc + 1})
  }

  // each item into array
  eachtemIntoArray = obj => {
    // const {count} = this.state

    const fromLocal = localStorage.getItem('onAdd')
    const countNumberObj = obj.count
    console.log(countNumberObj, 'aasda')
    if (fromLocal === null) {
      const l = []
      l.push(obj)

      localStorage.setItem('onAdd', JSON.stringify(l))

      //   console.log(filter)

      this.setState(prevState => ({
        empList: [...prevState.empList, obj],
        countNumber: countNumberObj,
      }))
    } else {
      const fromLocalst = localStorage.getItem('onAdd')
      //  console.log(JSON.parse(fromLocalst))
      const parsedList = JSON.parse(fromLocalst)
      // const fil = parsedList.filter(eachid => eachid.id !== id)
      //   console.log(fil)
      // console.log(id)
      parsedList.push(obj)
      localStorage.setItem('onAdd', JSON.stringify(parsedList))
      this.setState({empList: parsedList, countNumber: countNumberObj})
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    const {
      isloading,
      restaurantProfile,
      allItemsList,
      empList,
      countNumber,
    } = this.state

    console.log(countNumber, 'count number is')

    return (
      <div>
        <Header />
        <div>
          {isloading ? (
            <div className="loading-container">
              <Loading />
            </div>
          ) : (
            <div>
              <div className="restaurant-bg">
                <img
                  className="restaurant-image-banner"
                  src={restaurantProfile.resImg}
                  alt="restaurant logo"
                />
                <div>
                  <h1 className="rest-name">{restaurantProfile.resName}</h1>
                  <p className="rest-kindname">{restaurantProfile.kindName}</p>
                  <p className="rest-profile">{restaurantProfile.location}</p>
                  <div className="rating-cost-container">
                    <div>
                      <p className="cost-rating">{restaurantProfile.rating}</p>
                      <p className="rating-cost">
                        {restaurantProfile.reviewCount}+ratings
                      </p>
                    </div>
                    <hr className="hr-line" />
                    <div className="cost-per-two">
                      <p className="cost-rating">
                        {restaurantProfile.costPerTwo}
                      </p>
                      <p className="rating-cost">cost for two</p>
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
