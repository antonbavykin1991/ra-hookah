import { combineReducers } from 'redux'
import hookahs from './hookahs'
import hookahList from './hookah-list'

const rootReducer = combineReducers({
  hookahs,
  hookahList
})

export default rootReducer