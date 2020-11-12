import React from 'react'
import { Text, View, StyleSheet,  TouchableOpacity,  TextInput,  Image } from 'react-native';

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
                //console.log(responseJson)
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
            <View style = {styles.container}>
                <View style = {styles.header}>
                    <Image
                        style = {styles.logo}
                        source = {require('../assets/logo1.png')}
                    />
                </View>
                <View style = {styles.body}>
                    <Text style= {styles.reset}>Reset Password</Text>
                    <TextInput
					    style={styles.input}
					    //value={this.props.user.email}
					    onChangeText={password => this.props.updatePassword(password)}
					    placeholder='New Password'
					    placeholderTextColor="#8BB8CE"
                        autoCapitalize='none'
                        textAlign= 'center'

				    />
                    <TextInput
					    style={styles.input}
					    //value={this.props.user.email}
					    onChangeText={cfrmPassword => this.props.updateConfirmPassword(cfrmPassword)}
					    placeholder='Re-type Password'
					    placeholderTextColor="#8BB8CE"
                        autoCapitalize='none'
                        textAlign= 'center'

				    />
                    <TouchableOpacity style={styles.button} onPress={this.handleReset}>
					    <Text style={styles.buttonText}>Reset Password</Text>
				    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    body: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        height: 150,
        width: 150,
    },
    reset: {
        color: 'black',
        fontSize: 40,
        alignItems: 'center',
        marginBottom: 40,
    },
    input: {
        width: "70%",
        height: vh(8.5),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#013A73',
        color: 'white',
        fontSize: 20,
        borderRadius: 20,
        margin: 5,
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