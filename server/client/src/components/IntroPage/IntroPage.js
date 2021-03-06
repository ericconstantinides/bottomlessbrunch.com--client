import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actions from '../../actions'

import SiteHeader from '../common/SiteHeader'

class IntroPage extends Component {
  handleRegionsModalClick = () => {
    this.props.showUiRegionsModal()
  }
  componentDidMount () {
    this.props.addUiAppClass(['App--IntroPage'])
  }
  componentWillUnmount () {
    this.props.removeUiAppClass(['App--IntroPage'])
  }
  handleRegionSelect = _id => event => {
    // go to the region's coords (and then coords will set the slug)
    this.props.setMainMapByRegion(
      this.props.regions[_id],
      this.props.mainMap.coords,
      this.props.ui.drawer
    )
    this.props.hideUiRegionsModal()
  }
  render () {
    return (
      <div className='IntroPage'>
        <SiteHeader
          handleRegionSelect={this.handleRegionSelect}
        />
        <div className='Splash'>
          <video
            className='Splash__video'
            autoPlay
            loop
            id='video-background'
            muted
            playsInline
          >
            <source
              src='/images/bg__bartender-making-cocktails.mp4'
              type='video/mp4'
            />
          </video>
          <div className='Splash__inner'>
            <h1 className='Splash__title'>I'm thirsty for brunch in...</h1>
            <div
              className='button--orange-black'
              onClick={this.handleRegionsModalClick}
            >
              Choose Region...
            </div>
          </div>
          <div className='Splash__footer'>
            <span className='Splash__footer-link'>About</span>
            <a  className='Splash__footer-link Splash__footer-link--email' href="mailto:eric+bb@ericconstantinides.com?subject=Contact from BottomlessBrunch.com">Contact</a>
          </div>
        </div>
        <div className='IntroPage__about'>
          <img
            className='IntroPage__orange'
            src='/images/bottomless-brunch-orange.png'
            alt='Bottomless Brunch Orange'
          />
          <div className='playout has-image-right has-image-width-60p has-body-width-60p'>
            <div className='playout__image-container'>
              <img
                src='/images/photo__tray-of-mimosas.jpg'
                alt='Tray Of Bottomless Mimosas'
              />
            </div>
            <div className='playout__body'>
              <h2 className='IntroPage__title playout__title u-mb-0'>
                What's Bottomless Brunch?
              </h2>
              <div className='u-mt-1 u-kill-last-margin'>
                <p>
                  Bottomless Brunch, as you've probably guessed, is your guide to bottomless drinking. Becky and I have scoured the country looking for the all the spots for unlimited drinks and bottomless refreshment. Whether you're looking for a Sunday Funday or want a Boozy Brunch, Bottomless Brunch is your go-to guide for all things brunch.
                </p>
              </div>
            </div>
          </div>
          <div className='playout has-image-left has-image-width-75p has-body-width-40p'>
            <div className='playout__image-container'>
              <img
                src='/images/photo__Eric-and-Becky-Looking-At-Each-Other.jpg'
                alt='Cheers With Bottomless Mimosas'
              />
            </div>
            <div className='playout__body'>
              <h2 className='IntroPage__title playout__title u-mb-0'>
                Who's Bottomless Brunch?
              </h2>
              <div className='u-mt-1 u-kill-last-margin'>
                <p>
                  Bottomless Brunch is the brainchild of Eric and Becky. It started as a small list of places that we wanted to go to and it blossomed from there.
                </p>
              </div>
            </div>
          </div>
          <p className='site-container IntroPage__footer'>
            Copyright {new Date().getFullYear()} Eric Constantinides
          </p>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ regions, ui, mainMap }) {
  return { regions, ui, mainMap }
}

export default connect(mapStateToProps, actions)(IntroPage)
