import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Loading from '../Loading'

import Slides from '../Slides'

class ReactSlick extends Component {
  state = {
    offerListOfData: [],
    offerLoading: false,
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

      this.setState({offerListOfData: offerData, offerLoading: true})
    }
  }

  render() {
    const {offerListOfData, offerLoading} = this.state
    const settings = {
      dots: true,
      arrows: false,
    }

    return (
      <div>
        {offerLoading ? (
          <ul className="offers-ul">
            <Slider {...settings} className="container">
              {offerListOfData.map(eachOffer => (
                <Slides key={eachOffer.id} offerImage={eachOffer} />
              ))}
            </Slider>
          </ul>
        ) : (
          <div className="offer-loading" testid="restaurants-offers-loader">
            <Loading />
          </div>
        )}
      </div>
    )
  }
}

export default ReactSlick
