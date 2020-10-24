import React from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Button, Image, Keyboard, ImageBackground } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateEmail, updatePassword, fetchUserObj } from '../actions/user'
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units'
import { FontAwesome } from '@expo/vector-icons';

let userUid;

class Login extends React.Component {

	componentDidMount = async () => {
		try {
			if(this.props.user.userServer !== undefined){
				this.props.navigation.navigate('Home')
			}
		} catch (e) {
			alert(e);
		}
	}

	render() {
		const loginHandler = async () => {
			Keyboard.dismiss();
			let response = await fetch('https://workout-routine-builder-api.herokuapp.com/loginphoneAPI', {
			method: 'POST',
			headers: {
				Accept: '/',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email:this.props.user.email,
				password:this.props.user.password
			})});
			let responseJson = await response.json();
			//This saves to this.props.user.userServer
			//you can refer to data by using this.props.user.userServer
				//this.props.user.userServer.email
				//this.props.user.userServer.firstName
				//this.props.user.userServer.lastName
				//this.props.user.userServer.timestamp
			if(responseJson.message.email !== undefined){	
				this.props.fetchUserObj(responseJson.message);
			}else{
				alert(responseJson.message);
			}
			//alert(this.props.user.userServer);
			if(this.props.user.userServer == undefined){
				this.props.navigation.navigate('Home')
			}
		}

		return (
			<View style={styles.container}>
				<ImageBackground source={require('../assets/loginbackground.jpeg')} style={styles.image}>
				</ImageBackground>
				<Image
					style={styles.tinyLogo}
					source={require('../assets/logo-wh.png')}
				/>
				<Text style={styles.text}>Let's</Text>
				<Text style={styles.subtext}>Continue</Text>
				<TextInput
					style={styles.inpBx}
					value={this.props.user.email}
					placeholder='Email'
					placeholderTextColor="#8BB8CE"
					autoCapitalize='none'
				/>
				<TextInput
					style={styles.inpBxTw}
					value={this.props.user.password}
					placeholder='Password'
					placeholderTextColor="#8BB8CE"
					autoCapitalize='none'
				/>
				<TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
					<Text style={styles.buttonText}>Login</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.btnTw} onPress={() => this.props.navigation.navigate('Signup')}>
					<Text style={styles.btnTxt}>Don't have an account yet? Sign up</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.forgotTw} onPress={() => this.props.navigation.navigate('ForgotPwd')}>
					<Text style={styles.btnTxt}>Forgot Password?</Text>
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
		opacity:.7,
	  },
	text: {
		position: 'absolute',
		top: vh(25),
		marginLeft:20,
		fontWeight: '800',
		fontSize: vw(17),
		color: '#FFFFFF',
	},
	subtext: {
		position: 'absolute',
		top: vh(35),
		marginLeft:20,
		fontWeight: '400',
		fontSize: vw(10),
		lineHeight: 45,
		color: '#E1DDDD',
	  },
	inpBx:{
		position: 'absolute',
		left: vw(4),
		top:vh(45),
        width:"80%",
        fontWeight: 'bold',
        backgroundColor:"#EFEFEF",
        color:"#032c8e",
        borderRadius:20,
        height:vh(6.5),
        marginBottom:20,
        justifyContent:"center",
        padding:vh(2),
	},
	inpBxTw:{
		position: 'absolute',
		left: vw(4),
		top:vh(53),
        width:"80%",
        fontWeight: 'bold',
        backgroundColor:"#EFEFEF",
        color:"#032c8e",
        borderRadius:20,
        height:vh(6.5),
        marginBottom:20,
        justifyContent:"center",
        padding:vh(2),
	},
    inputText:{
        height:55,
        color:"black"
    },
	button: {
		position: 'absolute',
		top: vh(61),
		left: vw(4),
		width: "40%",
		backgroundColor: "#0466C8",
		borderRadius: 20,
		height: vh(7),
		alignItems: "center",
		justifyContent: "center",
	},
	btnTw: {
		position: 'absolute',
		top: vh(70),
		left: vw(4),
		alignItems: "center",
		justifyContent: "center",
	},
	forgotTw: {
		position: 'absolute',
		top: vh(76),
		left: vw(4),
		alignItems: "center",
		justifyContent: "center",
	},
	buttonText: {
		color: "white"
	},
	btnTxt: {
		color: "white",
		fontWeight: '300',
		fontSize: vw(6),
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