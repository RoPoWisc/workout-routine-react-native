import { combineReducers } from 'redux'
import { UPDATE_EMAIL, UPDATE_PASSWORD, UPDATE_NAME, UPDATE_CONFIRM_PASSWORD, FETCH_USER_OBJ, BEARER_TOKEN, USER_ID, DARK_MODE } from '../actions/user'

const user = (state = {}, action) => {
	switch (action.type) {
		case UPDATE_NAME:
			return { ...state, name: action.payload }
		case UPDATE_EMAIL:
			return { ...state, email: action.payload }
		case UPDATE_PASSWORD:
			return { ...state, password: action.payload }
		case UPDATE_CONFIRM_PASSWORD:
			return { ...state, cfrmPassword: action.payload }
		case FETCH_USER_OBJ:
			return {...state, userServer: action.payload.userServer}
		case BEARER_TOKEN:
			return {...state, bearerToken: action.payload}
		case USER_ID:
			return {...state, userId: action.payload}
		case DARK_MODE:
			return {...state, darkMode: action.payload}
		default:
			return state
	}
}

const rootReducer = combineReducers({
	user
})

export default rootReducer
