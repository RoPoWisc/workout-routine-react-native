import React from 'react'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import Login from '../screens/Login'
import Signup from '../screens/Register'
import Home from '../screens/Home'
import ForgotPassword from '../screens/ForgotPassword'
import initialScreen from '../screens/initial'
import StartWorkout from '../screens/StartWorkout'

const SwitchNavigator = createSwitchNavigator(
	{
		Login: {
			screen: Login
		},
		Signup: {
			screen: Signup
		},
		ForgotPwd: {
			screen: ForgotPassword
		},
		Home: {
			screen: Home
		},
		Initial: {
			screen: initialScreen
		},
		StartWorkout: {
			screen: StartWorkout
		}
	},
	{
		initialRouteName: 'StartWorkout'
	}
)

export default createAppContainer(SwitchNavigator)
