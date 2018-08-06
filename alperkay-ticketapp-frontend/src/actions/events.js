import * as request from 'superagent'
import {baseUrl} from '../constants'
import {logout} from './users'
import {isExpired} from '../jwt'

export const ADD_EVENT = 'ADD_EVENT'
export const UPDATE_EVENTS = 'UPDATE_EVENTS'

const addEvent = event => ({
  type: ADD_EVENT,
  payload: event
})

const updateEvents = events => ({
  type: UPDATE_EVENTS,
  payload: events
})

export const createEvent = (event) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .post(`${baseUrl}/Events`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(event)
    .then(result => dispatch(addEvent(result.body)))
    .catch(err => console.error(err))
}

export const getEvents = () => (dispatch) => {

  request
    .get(`${baseUrl}/events`)
    .then(result => dispatch(updateEvents(result.body)))
    .catch(err => console.error(err))
}