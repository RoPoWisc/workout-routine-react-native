import React from 'react'
import { View, TextInput, ImageBackground, StyleSheet, TouchableOpacity, Text, Button, Image } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateEmail, updatePassword, updateName, fetchUserObj} from '../actions/user'
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units'
class Signup extends React.Component {
	handleSignUp = async () => {
		try{
			if(this.props.user.name === undefined){
					throw "Name is Required!"
			}
			if(this.props.user.email === undefined){
					throw "Email is Required!"
			}
			if(this.props.user.password === undefined){
					throw "Password is Required!"
			}
			let response = await fetch('https://workout-routine-builder-api.herokuapp.com/signupphoneAPI', {
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
			if(responseJson.message.email !== undefined){
				this.props.fetchUserObj(responseJson.message);
			}else{
				alert(responseJson.message);
			}
			//console.log(this.props.user.userServer);
			if(this.props.user.userServer !== undefined){
				this.props.navigation.navigate('Home')
			}
		}catch(e){
			alert(e);
		}

		
	}
	render() {
		return (
			<View style={styles.container}>
				<ImageBackground source={require('../assets/register.jpg')} style={styles.image}>
				</ImageBackground>
				<Image
					style={styles.tinyLogo}
					source={require('../assets/logo-wh.png')}
				/>
				<Text style={styles.text}>Let's</Text>
				<Text style={styles.subtext}>Start</Text>
				<TextInput
					style={styles.inpBx}
					value={this.props.user.name}
					onChangeText={name => this.props.updateName(name)}
					placeholder='Name'
					placeholderTextColor="#8BB8CE"
					autoCapitalize='none'
				/>
				<TextInput
					style={styles.inpBxTw}
					value={this.props.user.email}
					onChangeText={email => this.props.updateEmail(email)}
					placeholder='Email'
					placeholderTextColor="#8BB8CE"
					autoCapitalize='none'
				/>
				<TextInput
					style={styles.inpBxThr}
					value={this.props.user.password}
					onChangeText={password => this.props.updatePassword(password)}
					placeholder='Password'
					placeholderTextColor="#8BB8CE"
					secureTextEntry={true}
				/>
				<TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
					<Text style={styles.buttonText}>Create Account</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.btnTw} onPress={() => this.props.navigation.navigate('Login')}>
					<Text style={styles.btnTxt}>Have an account? Login</Text>
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
		left: vw(4),
		top:vh(37),
        width:"80%",
        fontWeight: 'bold',
        backgroundColor:"#EFEFEF",
        color:"#032c8e",
        borderRadius:20,
        height:vh(6),
        marginBottom:20,
        justifyContent:"center",
        padding:vh(2),
	},
	inpBxTw:{
		position: 'absolute',
		left: vw(4),
		top:vh(45),
        width:"80%",
        fontWeight: 'bold',
        backgroundColor:"#EFEFEF",
        color:"#032c8e",
        borderRadius:20,
        height:vh(6),
        marginBottom:20,
        justifyContent:"center",
        padding:vh(2),
	},
	inpBxThr:{
		position: 'absolute',
		left: vw(4),
		top:vh(53),
        width:"80%",
        fontWeight: 'bold',
        backgroundColor:"#EFEFEF",
        color:"#032c8e",
        borderRadius:20,
        height:vh(6),
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
		height: 55,
		alignItems: "center",
		justifyContent: "center",
	},
	btnTw: {
		position: 'absolute',
		top: vh(69),
		left: vw(4),
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		position: 'absolute',
		top: vh(20),
		marginLeft:20,
		fontWeight: '800',
		fontSize: vw(17),
		color: '#FFFFFF',
	},
	subtext: {
		position: 'absolute',
		top: vh(30),
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
});

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ updateEmail, updatePassword, updateName, fetchUserObj }, dispatch)
}

const mapStateToProps = state => {
	return {
		user: state.user
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Signup)
