import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {BiRupee} from 'react-icons/bi'

import './index.css'

const CartItem = props => {
  const {eachItem, fromlocalstorage} = props
  const {name, cost, imageUrl, count, id} = eachItem

  const decreaseItems = () => {
    const fromlocal = localStorage.getItem('onAdd')
    const parsedData = JSON.parse(fromlocal)
    console.log(id)
    if (count === 1) {
      const filterData = parsedData.filter(eachOne => eachOne.id !== id)
      console.log(filterData)
      localStorage.setItem('onAdd', JSON.stringify(filterData))
      fromlocalstorage()
    } else {
      const costValue = cost / count
      console.log(costValue, 'cost value is')
      const filterData = parsedData.map(eachOne =>
        eachOne.id === id
          ? {
              ...eachOne,
              count: eachOne.count - 1,
              cost: eachOne.cost - costValue,
            }
          : eachOne,
      )
      const gettingFromLocal = localStorage.getItem('fromapilist')
      const parsedDataFromLocal = JSON.parse(gettingFromLocal)
      const updatedList = parsedDataFromLocal.map(obj =>
        obj.id === id ? {...obj, count: obj.count - 1} : obj,
      )
      localStorage.setItem('fromapilist', JSON.stringify(updatedList))
      localStorage.setItem('onAdd', JSON.stringify(filterData))

      fromlocalstorage()
    }
  }

  const increaseItems = () => {
    const fromlocal = localStorage.getItem('onAdd')
    const parsedData = JSON.parse(fromlocal)
    console.log(id)
    const costValue = cost / count

    const filterData = parsedData.map(eachOne =>
      eachOne.id === id
        ? {...eachOne, count: eachOne.count + 1, cost: eachOne.cost + costValue}
        : eachOne,
    )
    const gettingFromLocal = localStorage.getItem('fromapilist')
    const parsedDataFromLocal = JSON.parse(gettingFromLocal)
    const updatedList = parsedDataFromLocal.map(obj =>
      obj.id === id ? {...obj, count: obj.count + 1} : obj,
    )
    localStorage.setItem('fromapilist', JSON.stringify(updatedList))
    localStorage.setItem('onAdd', JSON.stringify(filterData))

    fromlocalstorage()
  }
  return (
    <li testid="cartItem">
      <div className="cart-item-list ">
        <div className="cart-name-container" testid="cartItem">
          <img className="cart-image" src={imageUrl} alt={name} />
          <h1 className="item-name">{name}</h1>
        </div>
        <div className="add-container">
          <button
            className="add-remove-button"
            type="button"
            onClick={decreaseItems}
          >
            <BsDashSquare />
          </button>
          <p className="add-element">{count}</p>
          <button
            className="add-remove-button"
            type="button"
            onClick={increaseItems}
          >
            <BsPlusSquare className="plus-minus-button" />
          </button>
        </div>
        <div className="cost-rupee">
          <BiRupee />
          <p className="cost-element">{cost}</p>
        </div>
      </div>
      <div className="cart-item-list-mini ">
        <img className="cart-image" src={imageUrl} alt={name} />

        <div className="add-container-mini">
          <p className="item-name-mini">{name}</p>
          <div className="count-container-mini">
            <button
              className="add-remove-button"
              type="button"
              onClick={decreaseItems}
            >
              <BsDashSquare />
            </button>
            <span className="add-element">{count}</span>
            <button
              className="add-remove-button"
              type="button"
              onClick={increaseItems}
            >
              <BsPlusSquare className="plus-minus-button" />
            </button>
          </div>
          <div className="cost-rupee-mini">
            <BiRupee className="rate" />
            <p className="cost-element-mini">{cost}</p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default CartItem
