import React from 'react'
import { View, ImageBackground, StyleSheet, TouchableOpacity, Text, Image } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateEmail, updatePassword, fetchUserObj } from '../actions/user'
import { vw, vh} from 'react-native-expo-viewport-units'
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';


function cacheImages(images) {
	return images.map(image => {
	  if (typeof image === 'string') {
		return Image.prefetch(image);
	  } else {
		return Asset.fromModule(image).downloadAsync();
	  }
	});
  }
  
export class Initial extends React.Component {
	state = {
		isReady: false,
	  };
	  
	  async _loadAssetsAsync() {
		const imageAssets = cacheImages([
		  require('../assets/home.jpg'),
		  require('../assets/home1.jpg'),
		  require('../assets/curls.jpg'),
		  require('../assets/initScreen.jpg'),
		  require('../assets/logo-wh.png'),
		  require('../assets/register.jpg'),
		  require('../assets/logo1.png'),
		  require('../assets/loginbackground.jpeg'),
		  require('../assets/ForgotPwd.jpg')
		]);
		
		await Promise.all([...imageAssets]);
	  }
	
	componentDidMount = async () => {
		try {
			if(this.props.user.userId !== undefined){
				this.props.navigation.navigate('Home')
			}
		} catch (e) {
			alert(e);
		}
	}

	render() {
		if (!this.state.isReady) {
			return (
			  <AppLoading
				startAsync={this._loadAssetsAsync}
				onFinish={() => this.setState({ isReady: true })}
				onError={console.warn}
			  />
			);
		  }
		return (
			<View style={styles.container}>
				<ImageBackground source={require('../assets/initScreen.jpg')} style={styles.image}>
				</ImageBackground>
				<Image
					style={styles.tinyLogo}
					source={require('../assets/logo-wh.png')}
				/>
				<Text style={styles.text}>Let's Build</Text>
				<Text style={styles.subtext}>A Workout</Text>
				<TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Login')}>
					<Text style={styles.buttonText}>Login</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.buttonRight} onPress={() => this.props.navigation.navigate('Signup')}>
					<Text style={styles.buttonText}>Register</Text>
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
	button: {
		position: 'absolute',
		bottom: vh(5),
		left: vw(2.5),
		width: "40%",
		backgroundColor: "#0466C8",
		borderRadius: 20,
		height: vh(7),
		alignItems: "center",
		justifyContent: "center",
	},
	buttonRight: {
		position: 'absolute',
		bottom: vh(5),
		right: vw(2.5),
		width: "40%",
		backgroundColor: "#0466C8",
		borderRadius: 20,
		height: vh(7),
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		position: 'absolute',
		top: vh(35),
		marginLeft:20,
		fontWeight: '800',
		fontSize: vw(17),
		color: '#FFFFFF',
	  },
	subtext: {
		position: 'absolute',
		top: vh(45),
		marginLeft:20,
		fontWeight: '400',
		fontSize: vw(10),
		lineHeight: 45,
		color: '#E1DDDD',
	  },
	buttonText: {
		color: "white"
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
)(Initial)