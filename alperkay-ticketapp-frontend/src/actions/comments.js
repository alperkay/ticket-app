import * as request from 'superagent'
import {baseUrl} from '../constants'
import {logout} from './users'
import {isExpired} from '../jwt'

export const ADD_COMMENT = 'ADD_COMMENT'
export const UPDATE_COMMENTS = 'UPDATE_COMMENTS'

const addComment = comment => ({
  type: ADD_COMMENT,
  payload: comment
})

const updateComments = comments => ({
  type: UPDATE_COMMENTS,
  payload: comments
})

export const createComment = (comment) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .post(`${baseUrl}/comments`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(comment)
    .then(result => dispatch(addComment(result.body)))
    .catch(err => console.error(err))
}

export const getComments = () => (dispatch) => {

  request
    .get(`${baseUrl}/comments`)
    .then(result => dispatch(updateComments(result.body)))
    .catch(err => console.error(err))
}
