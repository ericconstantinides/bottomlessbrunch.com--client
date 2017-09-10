import {
  VENUES_FETCH,
  VENUE_SHOWINFO,
  VENUE_HIDEINFO,
  VENUE_OPEN
} from './types'
import venuesJson from '../content/venues.json'

export function fetchVenues () {
  return {
    type: VENUES_FETCH,
    payload: { data: venuesJson }
  }
}

export function showInfoVenue (id, direction) {
  if (direction === 'on') {
    return {
      type: VENUE_SHOWINFO,
      payload: {id}
    }
  }
  return {
    type: VENUE_HIDEINFO,
    payload: {id}
  }
}

export function openVenue (id) {
  return {
    type: VENUE_OPEN,
    payload: {id}
  }
}
