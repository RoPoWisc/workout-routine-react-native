import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Button, Image, Dimensions, Platform } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { } from '../actions/user'

const { height, width} = Dimensions.get('window');

class Home extends React.Component {

    render() {
        const user = this.props.user.userServer;
        return (
            <View style={styles.container}>
                <View style={styles.page}>
                    <View style={styles.header}>
                        <Image
                            style={styles.tinyLogo}
                            source={require('../assets/logo1.png')}
                        />
                        <View style={styles.profile}>
                            <TouchableOpacity style={styles.button} onPress={()=>{alert("send to profile")}}>
                               
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.body}>
                        <Text style={styles.textStyle}>Hive list goes here</Text>
                        <Text style={styles.textStyle}>{user.firstName} {user.email}</Text>
                        <Text style={styles.textStyle}>height: {height}</Text>
                        <Text style={styles.textStyle}>Width: {width}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    page: {
        flex:1,
        backgroundColor: '#ecf5fd',
        marginTop: 24,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 24
    },
    textStyle: {
        fontSize: 36,
        textAlign: 'center',
        fontWeight: '100',
        marginBottom: 24
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'gray'
    },
    body: {
        flex: 4,
        backgroundColor: 'green'
    },
    tinyLogo: {
        position: 'relative',
        width: 200,
        height: 100
    },
    profile: {
        flex: 1,
        alignItems: 'flex-end'
    },
    button: {
        backgroundColor: '#1C00ff00',
        borderRadius: 20,
        padding: 50,
        marginRight: 15,
        marginTop: 10,
        shadowColor: '#303838',
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        shadowOpacity: 0.35,
    },
    profilePic: {
        flex: 1,
        position: 'absolute',
        width: 180,
        height: 80,
        top: 10,
        right: -40,
        marginRight: 0,
        resizeMode: 'contain'
    },
    profileBorder: {
        flex: 1,
        position: 'absolute',
        top: 0,
        right: -50,
        width: 200,
        height: 100,
        marginRight: 0,
        resizeMode: 'contain'
    },
});

const mapDispatchToProps = dispatch => {
	return bindActionCreators({}, dispatch)
}

const mapStateToProps = state => {
	return {
		user: state.user
	}
}

export default connect(
    mapStateToProps,
	mapDispatchToProps
)(Home)