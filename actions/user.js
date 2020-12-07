import moment from 'moment';
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from 'react';
// define types

export const UPDATE_EMAIL = 'UPDATE_EMAIL'
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD'
export const UPDATE_CONFIRM_PASSWORD = 'UPDATE_CONFIRM_PASSWORD'
export const UPDATE_NAME = 'UPDATE_NAME'
export const FETCH_USER_OBJ = 'FETCH_USER_OBJ';
export const BEARER_TOKEN = 'BEARER_TOKEN';
export const USER_ID = 'USER_ID';
export const CUSTOM_TOKEN = 'CUSTOM_TOKEN';
export const DARK_MODE = 'DARK_MODE';

// actions
const date = moment().format('YYYY-MM-DD hh:mm:ss')
export const updateEmail = email => {
	return {
		type: UPDATE_EMAIL,
		payload: email
	}
}

export const updatePassword = password => {
	return {
		type: UPDATE_PASSWORD,
		payload: password
	}
}

export const updateConfirmPassword = cfrmPassword => {
	return {
		type: UPDATE_CONFIRM_PASSWORD,
		payload: cfrmPassword
	}
}

export const updateName = name => {
	return {
		type: UPDATE_NAME,
		payload: name
	}
}

export const fetchUserObj = userServer => ({
	type: FETCH_USER_OBJ,
	payload: { userServer }
});

export const updateDarkMode = darkmode => ({
	type: DARK_MODE,
	payload: darkmode
});

export const fetchBearerToken = bearerToken => {
	return {
		type: BEARER_TOKEN,
		payload: bearerToken
	}
}
  
export const CustomToken = custToken => {
	return {
		type: CUSTOM_TOKEN,
		payload: custToken
	}
}

export const fetchUserId = userId => ({
	type: USER_ID,
	payload: userId
})