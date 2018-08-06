import {UPDATE_EVENTS, ADD_EVENT} from '../actions/events'
import {USER_LOGOUT} from '../actions/users'

export default (state = null, {type,payload}) => {
  switch (type) {
    case USER_LOGOUT:
      return null
    case UPDATE_EVENTS:
      return payload.reduce((events, event) => {
        events[event.id] = event
        return events
      }, {})
    case ADD_EVENT:
      return {
        ...state,
        [payload.id]: payload
      }  
    default:
      return state
  }
}