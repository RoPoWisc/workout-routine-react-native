import React from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Button, Image, Keyboard, ImageBackground } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateEmail, updatePassword, updateName, fetchUserObj, fetchBearerToken, fetchUserId } from '../actions/user'
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units'

let userUid;

export class Login extends React.Component {

	componentDidMount = async () => {
		try {
			if(this.props.user.userId !== undefined){
				this.loginHandler;
			}
		} catch (e) {
			alert(e);
		}
	}
	
	loginHandler = async () => {
		try{
			if(this.props.user.email === undefined){
				throw "Email is Required!"
			}
			if(this.props.user.password === undefined){
				throw "Password is Required!"
			}
		let response = await fetch('https://workout-routine-builder-api.herokuapp.com/auth' , {
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

		console.log(JSON.stringify(responseJson))
		//This saves to this.props.user.userServer
		//you can refer to data by using this.props.user.userServer
			//this.props.user.userServer.email
			//this.props.user.userServer.firstName
			//this.props.user.userServer.lastName
			//this.props.user.userServer.timestamp
			//console.log(JSON.stringify(responseJson))
			if(typeof responseJson.userObj != "undefined") {
				// this.props.fetchUserObj(responseJson.userObj);
				this.props.fetchBearerToken(responseJson.accessToken);
				this.props.fetchUserId(responseJson.userid);
				console.log('\n', this.props.fetchBearerToken, '\n');
			 }else{
			 	console.log('undefined userObj');
			 	alert(responseJson.message);
			 }
		//alert(this.props.user.userServer);
		if(this.props.user.userId !== undefined){
			this.props.navigation.navigate('DrawerNavigator')
		}
		} catch (e) {
			console.log('undefined error');
			alert(e);
		}
	}
	render() {
		/*
		const loginHandler = async () => {
			Keyboard.dismiss();
			let response = await fetch('https://workout-routine-builder-api.herokuapp.com/auth' , {
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
			if(this.props.user.userId!== undefined){
				this.props.navigation.navigate('Home')
			}
		}
*/
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
					onChangeText={email => this.props.updateEmail(email)}
					placeholder='Email'
					placeholderTextColor="#8BB8CE"
					autoCapitalize='none'
				/>
				<TextInput
					style={styles.inpBxTw}
					onChangeText={password => this.props.updatePassword(password)}
					placeholder='Password'
					placeholderTextColor="#8BB8CE"
					autoCapitalize='none'
					secureTextEntry={true}
				/>
				<TouchableOpacity style={styles.button} onPress={this.loginHandler}>
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
		top: vh(23),
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
		top: vh(86),
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
	return bindActionCreators({ updateEmail, updatePassword, updateName, fetchUserObj, fetchBearerToken, fetchUserId }, dispatch)
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