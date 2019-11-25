import { combineReducers } from 'redux'
import { postWithItem } from './postWithItem'
import { selectItem } from './selectItem'

const mainReducer = combineReducers({ selectItem, postWithItem })
export default mainReducer
