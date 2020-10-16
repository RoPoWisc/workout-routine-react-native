import moment from 'moment';
// define types

export const UPDATE_EMAIL = 'UPDATE_EMAIL'
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD'
export const UPDATE_CONFIRM_PASSWORD = 'UPDATE_CONFIRM_PASSWORD'
export const UPDATE_NAME = 'UPDATE_NAME'
export const FETCH_USER_OBJ = 'FETCH_USER_OBJ';

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
  
