import './index.css'

const Slides = props => {
  const {offerImage} = props
  const {offerImageUrl} = offerImage
  return (
    <li>
      <img className="offer-image" src={offerImageUrl} alt="offer" />
    </li>
  )
}
export default Slides
