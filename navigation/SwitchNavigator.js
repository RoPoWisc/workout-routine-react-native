import React from 'react'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import Login from '../screens/Login'
import Signup from '../screens/Register'
import Home from '../screens/Home'
import ForgotPassword from '../screens/ForgotPassword'
import initialScreen from '../screens/initial'
import Progress from '../screens/Progress'
import AddWorkout from '../screens/AddWorkout'

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
		Progress: {
			screen: Progress
		},
		AddWorkout: {
			screen: AddWorkout
		}
	},
	{
		initialRouteName: 'Initial'
	}
)

export default createAppContainer(SwitchNavigator)
