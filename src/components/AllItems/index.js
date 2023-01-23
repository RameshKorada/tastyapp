import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'

import './index.css'

/*  {onAdd ? (
                    <div className="add-container">
                      <BsPlusSquare />
                      <span className="add-element">1</span>
                      <BsDashSquare />
                    </div>
                  ) : (  */

const AllItems = props => {
  const {
    eachItem,
    eachtemIntoArray,
    empList,
    reduceFunction,
    onAddfunction,
    countNumber,
  } = props
  const {imageUrl, name, rating, cost, id} = eachItem
  console.log(countNumber)

  // const fromLocalStorage = localStorage.getItem('onAdd')

  // const parsedLocal = JSON.parse(fromLocalStorage)

  const filterData = empList.filter(eachObj => eachObj.id === id)

  const onIncrease = () => {
    onAddfunction(id, cost)
  }
  const onReduce = () => {
    reduceFunction(id)
  }

  const onAddbutton = () => {
    //   console.log(eachItem)
    const obj = {
      ...eachItem,
      count: 1,
    }

    eachtemIntoArray(obj, id)
  } // console.log(filterData) // console.log(filterData.length, 'length')

  /* if (filterData.length !== 0) {
    //  console.log('no data')
    const filterobj = filterData[0]
    const filterNumber = filterobj.count
    console.log(filterNumber)
    someFunction(filterNumber)
  }
  */ return (
    <li className="each-item-li">
      <img className="each-image-element" src={imageUrl} alt={name} />
      <div>
        <h1 className="item-name-element">{name}</h1>
        <p className="item-cost">{cost}</p>
        <p className="item-rating">{rating}</p>

        {filterData.length > 0 && (
          <div className="add-container">
            <button
              onClick={onReduce}
              className="add-remove-button"
              type="button"
            >
              <BsDashSquare />
            </button>

            <span className="add-element">{countNumber}</span>
            <button
              onClick={onIncrease}
              className="add-remove-button"
              type="button"
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
