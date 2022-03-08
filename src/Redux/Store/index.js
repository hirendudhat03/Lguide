import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../Reducer/index';
import logger from 'redux-logger'

// import { composeWithDevTools } from 'remote-redux-devtools'

// const composeEnhancers = composeWithDevTools({
//     realtime: true,
//     name: 'Your Instance Name',
//     hostname: 'localhost',
//     port: 8082 // the port your remotedev server is running at
//   })

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
)

export default store;