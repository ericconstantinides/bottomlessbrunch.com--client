import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import * as actions from '../../../actions'


const AdminVenue = ({ _id, name, position, zoom, handleDelete }) => {
  return (
    <div className='AdminVenue'>
      <hr />
      <h2>{name}</h2>
      <p>lat: {position.lat}</p>
      <p>lng: {position.lng}</p>
      <Link
        to={`/admin/venues/${_id}/edit`}
        className='btn btn-sm btn-primary'
      >
        Edit
      </Link>
      <button
        onClick={handleDelete(_id, name)}
        className='btn btn-sm btn-danger'
      >
        Delete
      </button>
    </div>
  )
}

class ListVenues extends Component {
  handleDelete = (_id, name) => event => {
    if (window.confirm(`Are you sure you want to delete "${name}"`)) {
      this.props.deleteVenue(_id, this.props.history)
    }
  }
  render () {
    return (
      <div className='AdminVenues container'>
        <Link to='/admin/venues/add' className='btn btn-sm btn-primary'>
          Add Venue
        </Link>
        {_.map(this.props.venues, region => (
          <AdminVenue
            key={region._id}
            {...region}
            handleDelete={this.handleDelete}
          />
        ))}
      </div>
    )
  }
}

function mapStateToProps ({ venues }) {
  return { venues }
}

export default connect(mapStateToProps, actions)(ListVenues)