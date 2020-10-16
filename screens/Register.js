import React from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Button, Image } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateEmail, updatePassword, updateName, updateConfirmPassword, fetchUserObj} from '../actions/user'

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
			if(this.props.user.cfrmPassword === undefined){
					throw "Confirm Password is Required!"
			}
			if(this.props.user.cfrmPassword !== this.props.user.password){
					throw "Passwords do not match!"
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
			<Image
		        style={styles.tinyLogo}
		        source={require('../assets/logo1.png')}
		      />
				<TextInput
					style={styles.inputBox}
					value={this.props.user.name}
					onChangeText={name => this.props.updateName(name)}
					placeholder='Name'
					placeholderTextColor="#8BB8CE"
					autoCapitalize='none'
				/>
				<TextInput
					style={styles.inputBox}
					value={this.props.user.email}
					onChangeText={email => this.props.updateEmail(email)}
					placeholder='Email'
					placeholderTextColor="#8BB8CE"
					autoCapitalize='none'
				/>
				<TextInput
					style={styles.inputBox}
					value={this.props.user.cfrmPassword}
					onChangeText={cfrmPassword => this.props.updateConfirmPassword(cfrmPassword)}
					placeholder='Password'
					placeholderTextColor="#8BB8CE"
					secureTextEntry={true}
				/>
				<TextInput
					style={styles.inputBox}
					value={this.props.user.password}
					onChangeText={password => this.props.updatePassword(password)}
					placeholder='Confirm Password'
					placeholderTextColor="#8BB8CE"
					secureTextEntry={true}
				/>
				<TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
					<Text style={styles.buttonText}>Signup</Text>
				</TouchableOpacity>
				<Button
					title="Do you have an account? Login"
					onPress={() => this.props.navigation.navigate('Login')}
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tinyLogo: {
        marginBottom: 20,
        width: 200,
        height: 200
    },
    inputBox:{
        width:"80%",
        fontWeight: 'bold',
        backgroundColor:"#EFEFEF",
        color:"#032c8e",
        borderRadius:20,
        height:55,
        marginBottom:20,
        justifyContent:"center",
        padding:20
    },
    inputText:{
        height:55,
        color:"black"
    },
    forgot:{
        color:"white",
        fontSize:11
    },
    button:{
        width:"80%",
        backgroundColor:"#032c8e",
        borderRadius:20,
        height:55,
        alignItems:"center",
        justifyContent:"center",
        marginTop:10,
        marginBottom:10
    },
    buttonText:{
        color:"white"
    }
});

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ updateEmail, updatePassword, updateName, updateConfirmPassword, fetchUserObj }, dispatch)
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
