import './index.css'

const SelectOptions = props => {
  const {optionsValues} = props
  const {displayText, value} = optionsValues
  // const selectOpt = selected ? 'Lowest' : 'Highest'

  return (
    <option className="select" value={value} selected>
      {displayText}
    </option>
  )
}

export default SelectOptions
