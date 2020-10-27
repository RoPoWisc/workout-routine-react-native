import React from 'react'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import Login from '../screens/Login'
import Signup from '../screens/Register'
import Home from '../screens/Home'
import ForgotPassword from '../screens/ForgotPassword'
import initialScreen from '../screens/initial'
import Settings from '../screens/Settings'
import { createDrawerNavigator } from 'react-navigation-drawer'
import SideBar from '../components/SideBar'
import Progress from '../screens/Progress'
import AddWorkout from '../screens/AddWorkout'

import {
	EditWorkout,
	Logout
  } from '../screens'

const DrawerRouteConfig = {
	Home: {
		screen: Home,
		navigationOptions: {
			title: "Home",
		}
	},
	Progress: {
		screen: Progress,
		navigationOptions: {
			title: "Your Progress",
		}
	},
	AddWorkout: {
		screen: AddWorkout,
		navigationOptions: {
			title: 'Add Workouts',
		}
	},
	EditWorkout: {
		screen: EditWorkout,
		navigationOptions: {
			title: 'Edit Workouts',
		}
	},
	Settings: {
		screen: Settings,
		navigationOptions: {
			title: 'Settings',
		},
	},
	Logout: {
		screen: Logout,
		navigationOptions: {
			title: 'Log Out',
		}
	}
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
			  fontSize: 20,
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
			screen: initialScreen
		},
		Settings: {
			screen: Settings
		},
		DrawerNavigator,
		Progress: {
			screen: Progress
		},
		AddWorkout: {
			screen: AddWorkout
		}
	},
	{
		initialRouteName: 'Initial'
	},
)

export default createAppContainer(SwitchNavigator)
