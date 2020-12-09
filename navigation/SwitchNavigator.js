import React from 'react'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import Login from '../screens/Login'
import Signup from '../screens/Register'
import Home from '../screens/Home'
import ForgotPassword from '../screens/ForgotPassword'
import PasswordReset from '../screens/PasswordReset'
import Initial from '../screens/initial'
import Workout from '../screens/Workout'
import Settings from '../screens/Settings'
import { createDrawerNavigator } from 'react-navigation-drawer'
import SideBar from '../components/SideBar'
import Progress from '../screens/Progress'
import CustomWorkout from '../screens/CustomWorkout'
import ViewPersonalExercise from '../screens/ViewPersonalExercise'
import PastWorkouts from '../screens/PastWorkouts'

import {
	Logout
  } from '../screens'

const DrawerRouteConfig = {
	Home: {
		screen: Home,
		navigationOptions: {
			title: "Home",
			name: ""
		}
	},
	Progress: {
		screen: Progress,
		navigationOptions: {
			title: "Your Progress",
		}
	},
	ViewPersonalExercise: {
		screen: ViewPersonalExercise,
		navigationOptions: {
			title: 'View Exercises'
		}
	},
	PastWorkouts: {
		screen: PastWorkouts,
		navigationOptions: {
			title: 'Past Workouts',
		},
	},
	AddWorkout: {
		screen: CustomWorkout,
		navigationOptions: {
			title: 'Add Workouts',
		}
	},
	Settings: {
		screen: Settings,
		navigationOptions: {
			title: 'Settings',
		},
	},
	
	// Logout: {
	// 	screen: Login,
	// 	navigationOptions: {
	// 		title: 'Log Out',
	// 	}
	// },
};
const DrawerNavigator = createDrawerNavigator(DrawerRouteConfig,
  {
	contentComponent: props => <SideBar {...props} />,
	  drawerPosition: 'right',
	  contentOptions: {
		  itemsContainerStyle: {
              alignItems: 'center',
		  },
		  labelStyle: {
			  color: 'white',
			  fontSize: 30,
		  }
	  }
  },
  );
  //

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
			screen: Initial
		},
		Workout: {
			screen: Workout
		},
		Settings: {
			screen: Settings
		},
		DrawerNavigator,
		Progress: {
			screen: Progress
		},
		PasswordReset: {
			screen: PasswordReset
		},
		CustomWorkout: {
			screen: CustomWorkout
		},
		ViewPersonalExercise: {
			screen: ViewPersonalExercise
		},
		PastWorkouts: {
			screen: PastWorkouts
		}
	},
	{
		initialRouteName: 'Initial'
	},
)

export default createAppContainer(SwitchNavigator)