import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { connect } from 'react-redux'

import Slider from 'react-slick'
import { getVenueBySlug, movePointer } from '../../lib/myHelpers'

import { SLIDER_SETTINGS } from '../../config'
import * as actions from '../../actions'
import VenueSliderItem from './VenueSliderItem'

class VenueSlider extends Component {
  constructor (props) {
    super()
    this.state = {
      sliderReady: false
    }
  }
  componentDidMount () {
    this.props.removeUiAppClass(['App--MapPage'])
    this.props.addUiAppClass(['App--VenueSlider'])
    this.getSliderReady(this.props)
  }
  componentWillReceiveProps (nextProps) {
    this.getSliderReady(nextProps)
  }
  componentWillUnmount () {
    // unset the venueUI:
    this.props.unsetUiRegionVenues()
    this.props.unsetUiVenue()
    this.props.removeUiAppClass(['App--VenueSlider'])
    this.props.addUiAppClass(['App--MapPage'])
  }
  getSliderReady = props => {
    // check if the slider has been set already and if we have visibleVenuesArr
    if (!this.state.sliderReady && !_.isEmpty(props.mainMap.visibleVenuesArr)) {
      // ok, now do we have a sliderPosition?
      if (props.ui.sliderPosition !== false) {
        this.setState({ sliderReady: true })
      } else {
        // get the positon from the slug (no history because we're already here)
        const venue = getVenueBySlug(
          props.venues,
          props.region.slug + '/' + props.match.params.venueSlug
        )
        props.fetchVenueDetail(venue._id, 'full')
        props.setUiSliderPosition(
          venue._id,
          props.mainMap.visibleVenuesArr,
          props.venues
        )
      }
    }
  }
  handleSliderBeforeChange = (prevIndex, index) => {}

  handleSliderChange = sliderPos => {
    const {
      mainMap: { visibleVenuesArr: visVenues },
      venues,
      history
    } = this.props
    this.props.mainMap.visibleVenuesArr.forEach((venueId, index) => {
      if (index === sliderPos) {
        this.props.setUiSliderPosition(venueId, visVenues, venues, history)
      }
    })
  }
  handleShare = service => event => {
    console.log(service)
  }
  render () {
    if (!this.state.sliderReady) {
      return <div>Loading...</div>
    }
    const { visibleVenuesArr: visVenues } = this.props.mainMap
    const { sliderPosition } = this.props.ui
    const prevPointer = movePointer(visVenues, sliderPosition, 'prev')
    const nextPointer = movePointer(visVenues, sliderPosition, 'next')
    const sliderItems = visVenues.map((venueId, index) => {
      const venue = this.props.venues[venueId]
      return (
        <VenueSliderItem
          key={venue._id}
          venueId={venue._id}
          slideNum={index}
          history={this.props.history}
          regionSlug={this.props.region.slug}
          isActive={venue._id === visVenues[sliderPosition]}
          isPrev={venue._id === visVenues[prevPointer]}
          isNext={venue._id === visVenues[nextPointer]}
          index={index}
        />
      )
    })
    return (
      <div className='VenueSlider'>
        <Link to={`/${this.props.region.slug}`} className='VenueSlider__close'>
          <div className='VenueSlider__inner-close' />
        </Link>
        <Slider
          {...SLIDER_SETTINGS}
          initialSlide={this.props.ui.sliderPosition}
          ref='slickSlider'
          afterChange={this.handleSliderChange}
          beforeChange={this.handleSliderBeforeChange}
        >
          {sliderItems}
        </Slider>
      </div>
    )
  }
}

function mapStateToProps ({ venues, regions, ui, mainMap }) {
  return { venues, regions, ui, mainMap }
}

export default connect(mapStateToProps, actions)(VenueSlider)
