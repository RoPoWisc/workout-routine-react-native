import React from 'react'
import { Text, View, StyleSheet,  TouchableOpacity,  TextInput,  Image } from 'react-native';
import {
    ApplicationProvider,
    Input
  } from '@ui-kitten/components';
  import * as eva from '@eva-design/eva';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateEmail, fetchUserObj, updatePassword, updateConfirmPassword} from '../actions/user'
import { vw, vh } from 'react-native-expo-viewport-units'

export class PasswordReset extends React.Component {

    handleReset = async () => {
		try{
			if(this.props.user.password === undefined){
					throw "New Password is Required!"
            }
            if (this.props.user.password === this.props.user.cfrmPassword)
            {
                let response = await fetch(link.payload.userServer, 
                {
                    method: 'POST',
                    headers: 
                    {
                        Accept: '/',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        //email:this.props.user.email,
                        password:this.props.user.password,
                        //cfrmPassword:this.props.user.cfrmPassword,
                        //fname:this.props.user.name,
                        //lname:this.props.user.name
                    })
                });
                let responseJson = await response.json();
                ////console.log(responseJson)
                if (responseJson.success !== undefined)
                {
                    alert(responseJson.success)
                    this.props.navigation.navigate('Login')
                }
                else
                {
                    alert(responseJson.message);
                }
            }
            else
            {
                alert('Passwords do not match!')
            }
		}catch(e){
			alert(e);
		}
    }
    
    constructor(props) {
        super(props)
        link = props.navigation.state.params.link
    }
    
    render() {
        return(
            <>
            <ApplicationProvider {...eva} theme={eva.light}>
            <View style = {styles.container}>
                <View style = {styles.positLogo}>
                    <Image
                        style = {styles.tinyLogo}
                        source = {require('../assets/logo1.png')}
                    />
                </View>
                <View style = {styles.body}>
                    <Text style={styles.text}>Reset</Text>
                    <Text style={styles.subtext}>Password</Text>
                    <Input
					    style={styles.inpBx}
					    label='Password'
					    onChangeText={password => this.props.updatePassword(password)}
                        placeholder='New Password'
                        caption='Should contain at least 9 characters'
                        textAlign= 'left'

				    />
                    <Input
					    style={styles.inpBxTw}
					    label='Confirm Password'
					    onChangeText={cfrmPassword => this.props.updateConfirmPassword(cfrmPassword)}
                        placeholder='Re-type Password'
                        caption='Must match above'
                        textAlign= 'left'

				    />
                    <TouchableOpacity style={styles.button} onPress={this.handleReset}>
					    <Text style={styles.buttonText}>Reset Password</Text>
				    </TouchableOpacity>
                </View>
            </View>
            </ApplicationProvider>
            </>
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
		backgroundColor: 'rgba(0,0,0,0.01)',
		flex: 1,
		flexDirection: 'column',
	  },
	text: {
		position: 'absolute',
		top: vh(20),
		marginLeft:20,
		fontWeight: '800',
		fontSize: vw(17),
		color: 'black',
	},
	subtext: {
		position: 'absolute',
		top: vh(28),
		marginLeft:20,
		fontWeight: '400',
		fontSize: vw(10),
		lineHeight: 45,
		color: 'rgba(0,0,0,0.2)',
	  },
	inpBx:{
		position: 'absolute',
		top:vh(36),
        width:"80%",
        fontWeight: 'bold',
        backgroundColor:"#EFEFEF",
        color:"#032c8e",
        borderRadius:20,
        height: vh(6.5),
        marginBottom:20,
        padding:vh(2),
	},
	inpBxTw:{
		position: 'absolute',
		top:vh(48),
        width:"80%",
        fontWeight: 'bold',
        backgroundColor:"#EFEFEF",
        color:"#032c8e",
        borderRadius:20,
        height: vh(6.5),
        marginBottom:20,
        padding:vh(2),
    },
    button: {
		position: 'absolute',
		top: vh(62),
		left: vw(4),
		width: "40%",
		backgroundColor: "#0466C8",
		borderRadius: 20,
		height: vh(7),
		alignItems: "center",
		justifyContent: "center",
	},
    buttonText: {
		color: "white"
	},
})

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ updateEmail, fetchUserObj, updateConfirmPassword, updatePassword }, dispatch)
}

const mapStateToProps = state => {
	return {
		user: state.user
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PasswordReset)