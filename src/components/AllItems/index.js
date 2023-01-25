import {BsDashSquare, BsPlusSquare} from 'react-icons/bs'
import {MdStarRate} from 'react-icons/md'
import {BiRupee} from 'react-icons/bi'

import './index.css'

const AllItems = props => {
  const {
    eachItem,
    eachtemIntoArray,
    empList,
    reduceFunction,
    onAddfunction,
  } = props
  const {imageUrl, name, rating, cost, id, count} = eachItem

  const filterData = empList.filter(eachObj => eachObj.id === id)

  const onIncrease = () => {
    onAddfunction(id, cost)
  }
  const onReduce = () => {
    reduceFunction(id)
  }

  const onAddbutton = () => {
    //   console.log(eachItem)
    localStorage.setItem('asdd', 'asadas')
    const obj = {
      ...eachItem,
    }

    eachtemIntoArray(obj, id)
  }

  return (
    <li testid="foodItem" className="each-item-li">
      <img className="each-image-element" src={imageUrl} alt={name} />
      <div>
        <h1 className="item-name-element">{name}</h1>
        <div className="star-rating">
          <BiRupee /> <p className="item-cost">{cost}</p>
        </div>
        <div className="star-rating">
          <MdStarRate className="star" />
          <p className="item-rating">{rating}</p>
        </div>
        {filterData.length > 0 && (
          <div className="add-container">
            <button
              onClick={onReduce}
              className="add-remove-button"
              type="button"
              testid="minus"
            >
              <BsDashSquare />
            </button>
            <span testid="active-count" className="add-element">
              {count}
            </span>

            <button
              onClick={onIncrease}
              className="add-remove-button"
              type="button"
              testid="plus"
            >
              <BsPlusSquare className="plus-minus-button" />
            </button>
          </div>
        )}
        {filterData.length === 0 && (
          <div>
            <button
              onClick={onAddbutton}
              className="item-add-button"
              type="button"
            >
              Add
            </button>
          </div>
        )}
      </div>
    </li>
  )
}
export default AllItems
