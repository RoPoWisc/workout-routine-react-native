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
			if(this.props.user.userServer !== undefined){
				this.props.navigation.navigate('Home')
			}
		}

		return (
			<View style={styles.container}>
				<ImageBackground source={require('../assets/loginbackground.jpeg')} style={styles.image}>
				</ImageBackground>
				<Image
					style={styles.tinyLogo}
					source={require('../assets/logo1.png')}
				/>
				<TextInput
					style={styles.inpBx}
					value={this.props.user.email}
					onChangeText={name => this.props.updateEmail(email)}
					placeholder='Email'
					placeholderTextColor="#8BB8CE"
					autoCapitalize='none'
				/>
				<TextInput
					style={styles.inpBxTw}
					value={this.props.user.password}
					onChangeText={email => this.props.updatePassword(password)}
					placeholder='Password'
					placeholderTextColor="#8BB8CE"
					autoCapitalize='none'
				/>
				<TouchableOpacity style={styles.button} onPress={loginHandler}>
					<Text style={styles.buttonText}>Login</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.btnTw} onPress={() => this.props.navigation.navigate('Signup')}>
					<Text style={styles.btnTxt}>Don't have an account yet? Sign up</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.forgotTw} onPress={() => this.props.navigation.navigate('ForgotPwd')}>
					<Text style={styles.forgotText}>Forgot Password?</Text>
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
	inpBx:{
		position: 'absolute',
		left: vw(10),
		top:vh(35),
        width:"80%",
        fontWeight: 'bold',
        backgroundColor:"#EFEFEF",
        color:"#032c8e",
        borderRadius:20,
        height:vh(8),
        marginBottom:20,
        justifyContent:"center",
        padding:vh(2),
	},
	inpBxTw:{
		position: 'absolute',
		left: vw(10),
		top:vh(45),
        width:"80%",
        fontWeight: 'bold',
        backgroundColor:"#EFEFEF",
        color:"#032c8e",
        borderRadius:20,
        height:vh(8),
        marginBottom:20,
        justifyContent:"center",
        padding:vh(2),
	},
	inputBox: {
		width: "80%",
		fontWeight: 'bold',
		backgroundColor: "#EFEFEF",
		color: "#032c8e",
		borderRadius: 20,
		height: 55,
		marginBottom: 20,
		justifyContent: "center",
		padding: 20
	},
	inputText: {
		height: 55,
		color: "black"
	},
	forgot: {
		color: "white",
		fontSize: 11
	},
	button: {
		position: 'absolute',
		top: vh(55),
		left: vw(28),
		width: "40%",
		backgroundColor: "#0466C8",
		borderRadius: 20,
		height: 45,
		alignItems: "center",
		justifyContent: "center",
	},
	buttonText: {
		color: "white"
	},
	forgotText: {
		fontSize: 15,
		color: 'white',
		margin: 15,
	}, 
	btnTxt: {
		color: "white",
		fontWeight: '300',
		fontSize: vw(6),
	},
	btnTw: {
		position: 'absolute',
		top: vh(78),
		left: vw(4),
		alignItems: "center",
		justifyContent: "center",
	},
	forgotTw: {
		position: 'absolute',
		top: vh(90),
		left: vw(26),
		alignItems: "center",
		justifyContent: "center",
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