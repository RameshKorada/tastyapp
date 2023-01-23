import './index.css'

const SelectOptions = props => {
  const {optionsValues} = props
  const {displayText, value} = optionsValues
  // const selectOpt = selected ? 'Lowest' : 'Highest'

  return (
    <option value={value} selected>
      {displayText}
    </option>
  )
}

export default SelectOptions
