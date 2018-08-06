import {createStore, applyMiddleware, compose} from 'redux'
import ReduxThunk from 'redux-thunk'
import reducers from './reducers'
import {storeJwt, socketIo} from './middleware'
import SocketIO from './socketio'

const socket = new SocketIO()

const devTools = window.devToolsExtension ? window.devToolsExtension() : f => f

const enhancer = compose(
	applyMiddleware(ReduxThunk, storeJwt, socketIo(socket)),
	devTools
)

const store = createStore(reducers, enhancer)

const initialCurrentUser = store.getState().currentUser
if (initialCurrentUser) {
  socket.connect(store.dispatch, initialCurrentUser.jwt)
}

export default store