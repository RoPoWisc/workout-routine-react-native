import React from 'react'
import { View, ImageBackground, StyleSheet, TouchableOpacity, Text, Image } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateEmail, updatePassword, fetchUserObj } from '../actions/user'
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units'
let userUid;


class Login extends React.Component {

	componentDidMount = async () => {
		try {
			if(this.props.user.userServer !== undefined){
				this.props.navigation.navigate('Login')
			}
		} catch (e) {
			alert(e);
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<ImageBackground source={require('../assets/initScreen.jpg')} style={styles.image}>
				</ImageBackground>
				<Image
					style={styles.tinyLogo}
					source={require('../assets/logo-wh.png')}
				/>
				<Text style={styles.text}>Let's Build</Text>
				<Text style={styles.subtext}>A Workout</Text>
				<TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Login')}>
					<Text style={styles.buttonText}>Login</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.buttonRight} onPress={() => this.props.navigation.navigate('Signup')}>
					<Text style={styles.buttonText}>Register</Text>
				</TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	tinyLogo: {
		position: 'absolute',
		top: vh(5),
        width: 100,
        height: 100
    },
	container: {
		backgroundColor: 'black',
		flex: 1,
		flexDirection: 'column',
	  },
	image: {
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'center',
		opacity:.8,
	  },
	button: {
		position: 'absolute',
		bottom: vh(5),
		left: vw(2.5),
		width: "40%",
		backgroundColor: "#0466C8",
		borderRadius: 20,
		height: 55,
		alignItems: "center",
		justifyContent: "center",
	},
	buttonRight: {
		position: 'absolute',
		bottom: vh(5),
		right: vw(2.5),
		width: "40%",
		backgroundColor: "#0466C8",
		borderRadius: 20,
		height: 55,
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		position: 'absolute',
		top: vh(35),
		marginLeft:20,
		fontWeight: '800',
		fontSize: 75,
		color: '#FFFFFF',
	  },
	subtext: {
		position: 'absolute',
		top: vh(45),
		marginLeft:20,
		fontWeight: '400',
		fontSize: 44,
		lineHeight: 45,
		color: '#E1DDDD',
	  },
	buttonText: {
		color: "white"
	},
});

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ updateEmail, updatePassword, fetchUserObj }, dispatch)
}

const mapStateToProps = state => {
	return {
		user: state.user
	}
}

export default connect(
    mapStateToProps,
	mapDispatchToProps
)(Login)