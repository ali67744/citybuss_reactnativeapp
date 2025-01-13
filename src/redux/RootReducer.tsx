import { combineReducers } from 'redux';

import UserDataReducer from './UserDataReducer'
import LanguageReducer from './LanguageReducer'













export default combineReducers({
    UserDataReducer: UserDataReducer,
    LanguageReducer: LanguageReducer,
})