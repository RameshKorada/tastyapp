import {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import CartItem from '../CartItem'

import NoOrdersContainer from '../NoOrdersContainer'
import Footer from '../Footer'

import './index.css'

class Cart extends Component {
  state = {cartList: [], totalcost: 0}

  componentDidMount() {
    this.fromlocalstorage()
  }

  fromlocalstorage = () => {
    //   const {cartList} = this.state
    const jsonData = localStorage.getItem('cartData')
    const parsedData = JSON.parse(jsonData)
    if (jsonData !== null) {
      const totalitemcost = parsedData.map(eachitem => eachitem.cost)
      console.log(totalitemcost, 'total cost')
      if (totalitemcost.length > 0) {
        const sum = totalitemcost.reduce((result, number) => result + number)

        console.log(sum)

        this.setState({cartList: parsedData, totalcost: sum})
      } else {
        this.setState({cartList: parsedData})
      }
    }
  }

  removieList = () => {
    localStorage.removeItem('cartData')
    localStorage.removeItem('fromapilist')
  }

  render() {
    const {cartList, totalcost} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div className="cart-element">
        <Header />
        {cartList.length > 0 ? (
          <div className="cart-element">
            <div className="cart-bg-container">
              <div>
                <ul className="cart-ul">
                  <li>Item</li>
                  <li className="quantity-element">Quantity</li>
                  <li>Price</li>
                </ul>
              </div>

              <div>
                <ul className="ul-cart-item-container">
                  {cartList.map(eachItem => (
                    <CartItem
                      eachItem={eachItem}
                      key={eachItem.id}
                      fromlocalstorage={this.fromlocalstorage}
                    />
                  ))}
                </ul>
              </div>
              <hr className="hr-line-dotted" />
              <ul className="place-total-container">
                <li>
                  <h1 className="order-total">Order Total : </h1>
                </li>
                <li className="place-order-cotainer">
                  <p className="order-total" testid="total-price">
                    ???{totalcost}.00
                  </p>
                  <Link to="/paymentsuccessed">
                    <button
                      className="place-order-button"
                      type="button"
                      onClick={this.removieList}
                    >
                      Place Order
                    </button>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="foot-cart">
              <Footer />
            </div>
          </div>
        ) : (
          <div className="no-orders-container">
            <NoOrdersContainer />
          </div>
        )}
      </div>
    )
  }
}

export default Cart
