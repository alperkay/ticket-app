import * as request from 'superagent'
import {baseUrl} from '../constants'
import {logout} from './users'
import {isExpired} from '../jwt'

export const ADD_TICKET = 'ADD_TICKET'
export const UPDATE_TICKET = 'UPDATE_TICKET'
export const UPDATE_TICKETS = 'UPDATE_TICKETS'
export const UPDATE_TICKET_SUCCESS = 'UPDATE_TICKET_SUCCESS'

const addTicket = ticket => ({
  type: ADD_TICKET,
  payload: ticket
})

const updateTickets = tickets => ({
  type: UPDATE_TICKETS,
  payload: tickets
})

const updateTicketSuccess = () => ({
  type: UPDATE_TICKET_SUCCESS
})

export const createTicket = (ticket) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .post(`${baseUrl}/tickets`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(ticket)
    .then(result => dispatch(addTicket(result.body)))
    .catch(err => console.error(err))
}

export const getTickets = () => (dispatch) => {

  request
    .get(`${baseUrl}/tickets`)
    .then(result => dispatch(updateTickets(result.body)))
    .catch(err => console.error(err))
}

export const updateTicket = (ticketId, updates) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .patch(`${baseUrl}/tickets/${ticketId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(updates)
    .then(_ => dispatch(updateTicketSuccess()))
    .catch(err => console.error(err))
}