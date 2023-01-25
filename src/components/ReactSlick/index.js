import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'

import Slides from '../Slides'

class ReactSlick extends Component {
  state = {
    offerListOfData: [],
  }

  componentDidMount() {
    this.gettingDataByApiCalling()
  }

  gettingDataByApiCalling = async () => {
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const jwtToken = Cookies.get('jwt_token')
    // console.log(jwtToken)
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const jsonData = await fetch(url, options)
    const jsData = await jsonData.json()

    if (jsonData.ok === true) {
      const offerData = jsData.offers.map(eachOffer => ({
        id: eachOffer.id,
        offerImageUrl: eachOffer.image_url,
      }))

      this.setState({offerListOfData: offerData})
    }
  }

  render() {
    const {offerListOfData} = this.state
    const settings = {
      dots: true,
      arrows: false,
    }

    return (
      <ul className="offers-ul">
        <Slider {...settings} className="container">
          {offerListOfData.map(eachOffer => (
            <Slides key={eachOffer.id} offerImage={eachOffer} />
          ))}
        </Slider>
      </ul>
    )
  }
}

export default ReactSlick
