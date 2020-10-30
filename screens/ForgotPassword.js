import React from 'react'
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity, Button, TextInput, Keyboard, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateEmail, fetchUserObj} from '../actions/user'

import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units'
class ForgotPassword extends React.Component {
    handleReset = async () => {
		try{
			if(this.props.user.email === undefined){
					throw "Email is Required!"
			}
			let response = await fetch('https://workout-routine-builder-api.herokuapp.com/users/forgotPassword/reset', {
			method: 'POST',
			headers: {
				Accept: '/',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email:this.props.user.email,
				password:this.props.user.password,
				fname:this.props.user.name,
				lname:this.props.user.name
			})});
			let responseJson = await response.json();
			//This saves to this.props.user.userServer
			//you can refer to data by using this.props.user.userServer
				//this.props.user.userServer.email
				//this.props.user.userServer.firstName
				//this.props.user.userServer.lastName
				//this.props.user.userServer.timestamp
			console.log(responseJson)
			if(responseJson.link !== undefined){
				this.props.navigation.navigate('PasswordReset', {link: this.props.fetchUserObj(responseJson.link)})
			}else{
				alert(responseJson.message);
			}
		}catch(e){
			alert(e);
		}
    }
    render() {
    return (
        <View style={styles.container}>
				<ImageBackground source={require('../assets/ForgotPwd.jpg')} style={styles.image}>
				</ImageBackground>
				<TouchableOpacity style={styles.positLogo} onPress={() => this.props.navigation.navigate('Login')}>
				<Image
					style={styles.tinyLogo}
					source={require('../assets/logo-wh.png')}
				/>
				</TouchableOpacity>
				<Text style={styles.text}>Let's</Text>
				<Text style={styles.subtext}>Get Back</Text>
				<TextInput
					style={styles.inpBx}
					value={this.props.user.email}
					onChangeText={email => this.props.updateEmail(email)}
					placeholder='Email'
					placeholderTextColor="#8BB8CE"
					autoCapitalize='none'
				/>
				<TouchableOpacity style={styles.button} onPress={this.handleReset}>
					<Text style={styles.buttonText}>Reset Password</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.btnTw} onPress={() => this.props.navigation.navigate('Login')}>
					<Text style={styles.btnTxt}>Remember your password? Login</Text>
				</TouchableOpacity>
			</View>
    );
    }
}

const styles = StyleSheet.create({
    positLogo: {
		position: 'absolute',
		top: vh(5),
	},
	tinyLogo: {
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
		left: vw(4),
		top:vh(48),
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
		top: vh(56),
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
		top: vh(64),
		left: vw(4),
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		position: 'absolute',
		top: vh(30),
		marginLeft:20,
		fontWeight: '800',
		fontSize: vw(17),
		color: '#FFFFFF',
	},
	subtext: {
		position: 'absolute',
		top: vh(39),
		marginLeft:20,
		fontWeight: '400',
		fontSize: vw(10),
		lineHeight: 45,
		color: '#E1DDDD',
	  },
	buttonText: {
		color: "white"
	},
	btnTxt: {
		color: "white",
		fontWeight: '300',
		fontSize: vw(6),
	},
})
const mapDispatchToProps = dispatch => {
	return bindActionCreators({ updateEmail, fetchUserObj }, dispatch)
}

const mapStateToProps = state => {
	return {
		user: state.user
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ForgotPassword)