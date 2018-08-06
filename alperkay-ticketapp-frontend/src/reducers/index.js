import events from './events'
import tickets from './tickets'
import login from './login'
import currentUser from './currentUser'
import signup from './signup'
import users from './users'
import comments from './comments'
import { combineReducers } from 'redux';

export default combineReducers({
  events,
  tickets,
  users,
  login,
  currentUser,
  signup,
  comments
})