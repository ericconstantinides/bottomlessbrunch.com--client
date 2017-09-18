import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import ReactGA from 'react-ga'
import * as actions from '../actions'
import Home from './Home'
import VenuePage from './VenuePage'
import { googleGa } from '../config'

ReactGA.initialize(googleGa)

/**
 * @return {null}
 */
function Analytics (props) {
  ReactGA.set({ page: props.location.pathname + props.location.search })
  ReactGA.pageview(props.location.pathname + props.location.search)
  return null
}

class App extends Component {
  constructor (props) {
    super(props)
    this.state = { cursorPos: { x: 0, y: 0 } }
  }
  handleMouseMove (event) {
    this.setState({ cursorPos: { x: event.clientX, y: event.clientY } })
  }
  componentWillMount () {
    // get the regions and the venues
    this.props.fetchRegions()
    this.props.fetchVenues()
  }
  render () {
    // const openVenue = this.props.venues.filter(venue => venue.open)[0]
    // const openVenueRendered = openVenue ? <VenuePage {...openVenue} /> : ''
    // const venueSlugs = this.props.venues.map(venue => {
    //   return (
    //     <Route
    //       path={`/${venue.regionSlug}/${venue.slug}`}
    //       key={`/${venue.regionSlug}/${venue.slug}`}
    //       render={props => {
    //         return <VenuePage {...props} location={this.props.location} />
    //       }}
    //     />
    //   )
    // })
    return (
      <div
        className='App'
      >
        {/* onMouseMove={this.handleMouseMove.bind(this)} */}
        {/* <Route path='/' component={Analytics} />
        <Switch>
          {venueSlugs}
          <Route path='/' component={Home} />
        </Switch> */}
        {/* {openVenueRendered} */}
        <Home />
        {/* <Home cursorPos={this.state.cursorPos} /> */}
      </div>
    )
  }
}

function mapStateToProps ({ venues }) {
  return { venues }
}

export default connect(mapStateToProps, actions)(App)