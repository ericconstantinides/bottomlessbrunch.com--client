// this is a dummy component whose only purpose is to set the region
// Why? Because I don't want the map to leave the dom once loaded
// could it be done better? yes.
import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actions from '../actions'

class Region extends Component {
  componentDidMount = () => {
    this.props.setMainMapByRegion(this.props.region, this.props.mainMap.coords)
  }
  render = () => <div className='Region' style={{display: 'none'}} />
}

export default connect(null, actions)(Region)
