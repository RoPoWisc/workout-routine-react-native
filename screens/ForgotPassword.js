import React from 'react'
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity, Button, TextInput, Keyboard, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateEmail, fetchUserObj} from '../actions/user'

import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units'
export class ForgotPassword extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
		  loading: false,
		}
		this.props.user.email = undefined;
	}
    handleReset = async () => {
		try{
			this.setState({loading:true});
			if(!this.props.user.email){
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
			})});
			let responseJson = await response.json();
			if(responseJson.link !== undefined){
				this.props.navigation.navigate('PasswordReset', {link: this.props.fetchUserObj(responseJson.link)})
			}else{
				this.setState({loading:false});
				alert(responseJson.message);
			}
		}catch(e){
			alert(e);
			this.setState({loading:false});
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
					onChangeText={email => this.props.updateEmail(email)}
					placeholder='Email'
					placeholderTextColor="#8BB8CE"
					autoCapitalize='none'
				/>
				{(this.state.loading == false) ?
				<TouchableOpacity style={styles.button} onPress={this.handleReset}>
					<Text style={styles.buttonText}>Reset Password</Text>
				</TouchableOpacity>: 
				<Text style={styles.buttonload}>Loading...</Text>}
				<TouchableOpacity style={styles.btnTw} onPress={() => this.props.navigation.navigate('Login')}>
					<Text style={styles.btnTxt}>Remember your password? Login</Text>
				</TouchableOpacity>
			</View>
    );
    }
}

const styles = StyleSheet.create({
	buttonload: {
		position: 'absolute',
		color: "white",
		top: vh(46),
		left: vw(7),
		width: "40%",
		borderRadius: 20,
		height: vh(7),
		alignItems: "center",
		justifyContent: "center",
	},
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
		top:vh(36),
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
		top: vh(44),
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
		top: vh(52),
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
		top: vh(28),
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
		fontSize: vw(4),
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