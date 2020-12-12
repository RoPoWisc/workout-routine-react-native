import React from 'react'
import { View, TextInput, ImageBackground, StyleSheet, TouchableOpacity, Text, Button, Image } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateEmail, updatePassword, updateName, fetchUserObj, fetchUserId, fetchBearerToken} from '../actions/user'
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units'
export class Signup extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
		  loading: false,
		}
		this.props.user.email = undefined;
		this.props.user.name = undefined;
		this.props.user.password = undefined;
	}
	handleSignUp = async () => {
		try{
			this.setState({loading: true});
			if(!this.props.user.name){
					throw "Name is Required!"
			}
			if(!this.props.user.email || !(this.props.user.email).includes('@') || !(this.props.user.email).includes('.')){
				throw "Email is Missing or is invalid!"
			}
			if(!this.props.user.password){
					throw "Password is Required!"
			}
			let response = await fetch('https://workout-routine-builder-api.herokuapp.com/users/create', {
			method: 'POST',
			headers: {
				Accept: '/',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name:this.props.user.name,
				email:this.props.user.email,
				password:this.props.user.password,
			})});
			let responseJson = await response.json();
				if(responseJson.accessToken) {
					this.props.fetchBearerToken(responseJson.accessToken);
					this.props.fetchUserId(responseJson.userid);
				}else{
				this.setState({loading: false});
				alert(responseJson.message);
			}
			if(this.props.user.userId !== undefined){
				this.props.navigation.navigate('DrawerNavigator')
			}
		}catch(e){
			this.setState({loading: false});
			alert(e);
		}

		
	}
	render() {
		return (
			<View style={styles.container}>
				<ImageBackground source={require('../assets/register.jpg')} style={styles.image}>
				</ImageBackground>
				<TouchableOpacity style={styles.positLogo} onPress={() => this.props.navigation.navigate('Login')}>
				<Image
					style={styles.tinyLogo}
					source={require('../assets/logo-wh.png')}
				/>
				</TouchableOpacity>
				<Text style={styles.text}>Let's</Text>
				<Text style={styles.subtext}>Start</Text>
				<TextInput
					style={styles.inpBx}
					onChangeText={name => this.props.updateName(name)}
					placeholder='Name'
					placeholderTextColor="#8BB8CE"
					autoCapitalize='none'
					accessibilityLabel="nameTextBoxRegister"
				/>
				<TextInput
					style={styles.inpBxTw}
					onChangeText={email => this.props.updateEmail(email)}
					placeholder='Email'
					placeholderTextColor="#8BB8CE"
					autoCapitalize='none'
					accessibilityLabel="createEmailTextBox"
				/>
				<TextInput
					style={styles.inpBxThr}
					onChangeText={password => this.props.updatePassword(password)}
					placeholder='Password'
					placeholderTextColor="#8BB8CE"
					secureTextEntry={true}
					accessibilityLabel="createPasswordTextBox"
				/>
				{(this.state.loading == false) ?
				<TouchableOpacity style={styles.button} onPress={this.handleSignUp} accessibilityLabel="createAccountButton">
					<Text style={styles.buttonText}>Create Account</Text>
				</TouchableOpacity>:
				<Text style={styles.buttonload}>Loading...</Text>}
				<TouchableOpacity style={styles.btnTw} onPress={() => this.props.navigation.navigate('Login')}>
					<Text style={styles.btnTxt}>Have an account? Login</Text>
				</TouchableOpacity>
			</View>
		)
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
	inpBx:{
		position: 'absolute',
		left: vw(4),
		top:vh(36),
        width:"80%",
        fontWeight: 'bold',
        backgroundColor:"#EFEFEF",
        color:"#032c8e",
        borderRadius:20,
        height: vh(6.5),
        marginBottom:20,
        justifyContent:"center",
        padding:vh(2),
	},
	inpBxTw:{
		position: 'absolute',
		left: vw(4),
		top:vh(44),
        width:"80%",
        fontWeight: 'bold',
        backgroundColor:"#EFEFEF",
        color:"#032c8e",
        borderRadius:20,
        height: vh(6.5),
        marginBottom:20,
        justifyContent:"center",
        padding:vh(2),
	},
	inpBxThr:{
		position: 'absolute',
		left: vw(4),
		top:vh(52),
        width:"80%",
        fontWeight: 'bold',
        backgroundColor:"#EFEFEF",
        color:"#032c8e",
        borderRadius:20,
        height: vh(6.5),
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
		top: vh(60),
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
		top: vh(68),
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
		fontSize: vw(4),
	},
	buttonload: {
		position: 'absolute',
		color: "white",
		top: vh(62),
		left: vw(7),
		width: "40%",
		borderRadius: 20,
		height: vh(7),
		alignItems: "center",
		justifyContent: "center",
	},
});

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ updateEmail, updatePassword, updateName, fetchUserObj, fetchUserId, fetchBearerToken }, dispatch)
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
