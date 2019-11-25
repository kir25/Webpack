import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import mainReducer from './reducers/index'

const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose

const loggerMiddleware = createLogger()

const configStore = initialState =>
    createStore(
        mainReducer,
        initialState,
        composeEnhancers(applyMiddleware(thunkMiddleware, loggerMiddleware))
    )

const store = configStore({})
export default store
