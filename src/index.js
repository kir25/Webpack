import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './components/store'
import App from './components/container/App'
import '@babel/polyfill'
import './index.css'

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
