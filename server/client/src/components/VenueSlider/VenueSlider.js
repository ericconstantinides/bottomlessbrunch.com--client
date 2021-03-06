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
      sliderReady: false,
      fetchedGData: {}
    }
  }
  componentDidMount () {
    this.props.removeUiAppClass(['App--MapPage'])
    this.props.addUiAppClass(['App--VenueSlider'])
    // this.getVenueSliderReady(this.props)
    // this.handleGooglePlacesData(this.props)
  }
  componentWillReceiveProps (nextProps) {
    this.getVenueSliderReady(nextProps)
    this.handleGooglePlacesData(nextProps)
  }
  componentWillUnmount () {
    this.props.unsetUiVenueSliderPosition()
    this.props.removeUiAppClass(['App--VenueSlider'])
    this.props.addUiAppClass(['App--MapPage'])
  }
  getVenueSliderReady = props => {
    // check if the slider has been set already and if we have activeVenues
    if (!this.state.sliderReady && !_.isEmpty(props.mainMap.activeVenues)) {
      // ok, now do we have a sliderPosition?
      if (props.ui.sliderPosition !== false) {
        this.setState({ sliderReady: true })
      } else {
        // get the positon from the slug (no history because we're already here)
        const venue = getVenueBySlug(
          props.venues,
          props.region.slug + '/' + props.match.params.venueSlug
        )
        props.setUiVenueSliderPosition(
          venue._id,
          props.mainMap.activeVenues.filter(({ filtered, visible }) => visible && !filtered),
          props.venues
        )
      }
    }
  }
  handleGooglePlacesData = props => {
    if (
      props.ui.siteDataReady &&
      props.ui.sliderPosition !== false &&
      props.mainMap.activeVenues.filter(({ filtered, visible }) => visible && !filtered)
    ) {
      const {
        ui: { sliderPosition: current },
        venues,
        mainMap: { activeVenues }
      } = props
      const visVenues = activeVenues.filter(({ filtered, visible }) => visible && !filtered)
      const prev = movePointer(visVenues, current, 'prev')
      const next = movePointer(visVenues, current, 'next')
      // let staggeredNum = 0
      ;[
        visVenues[current],
        visVenues[next],
        visVenues[prev]
      ].forEach(({_id: venueId}) => {
        if (!this.state.fetchedGData[venueId]) {
          let fetchedGData = this.state.fetchedGData
          fetchedGData[venueId] = venueId
          this.setState({ fetchedGData })
          if (venues[venueId] && venues[venueId].fetchedLevel !== 'full') {
            props.fetchVenueDetail(
              venueId,
              'full',
              props.fetchGooglePlacesVenueDetail
            )
          } else {
            props.fetchGooglePlacesVenueDetail(venues[venueId])
          }
          // setTimeout(() => {
          // }, (staggeredNum * 350));
          // staggeredNum++
        }
      })
    }
  }
  handleSliderChange = sliderPos => {
    const {
      mainMap: { activeVenues },
      venues,
      history,
      setUiVenueSliderPosition
    } = this.props
    const visVenues = activeVenues.filter(({ filtered, visible }) => visible && !filtered)
    setUiVenueSliderPosition(visVenues[sliderPos]._id, visVenues, venues, history)
  }
  handleShare = service => event => {
    console.log(service)
  }
  render () {
    if (!this.state.sliderReady) {
      return <div>Loading...</div>
    }
    const { activeVenues } = this.props.mainMap
    const visVenues = activeVenues.filter(({ filtered, visible }) => visible && !filtered)
    const { sliderPosition } = this.props.ui
    const prevPointer = movePointer(visVenues, sliderPosition, 'prev')
    const nextPointer = movePointer(visVenues, sliderPosition, 'next')
    const sliderItems = visVenues
      .map(({_id: venueId}, index) => {
      const venue = this.props.venues[venueId]
      return (
        <VenueSliderItem
          key={venue._id}
          venueId={venue._id}
          slideNum={index}
          sliderPosition={sliderPosition}
          history={this.props.history}
          regionSlug={this.props.region.slug}
          isActive={venue._id === visVenues[sliderPosition]}
          isPrev={venue._id === visVenues[prevPointer]}
          isNext={venue._id === visVenues[nextPointer]}
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
        >
          {/* beforeChange={this.handleSliderBeforeChange} */}
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
