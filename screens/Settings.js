import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateEmail, updatePassword, fetchUserObj, updateDarkMode } from '../actions/user'
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
  Text,
  Toggle,
  Button,
  Input
} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import { vw, vh } from 'react-native-expo-viewport-units'
const style = require('../styles/global');

/**
 * Use any valid `name` property from eva icons (e.g `github`, or `heart-outline`)
 * https://akveo.github.io/eva-icons
 */

export class Settings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      darkmode: this.props.user['darkMode']
    }
  };
  render() {
    const logoutHandler = async () => {
      this.props.fetchUserObj(undefined);
      this.props.updateEmail(undefined);
      this.props.updatePassword(undefined);
      this.props.navigation.navigate('Login')
    };

    const onActiveCheckedChange = (isChecked) => {
      this.props.updateDarkMode(!this.state.darkmode)
      this.setState({darkmode:!this.state.darkmode})
    };

    return (
      <>
        <IconRegistry icons={EvaIconsPack}/>
                <ApplicationProvider {...eva} theme={(this.props.user['darkMode']) ? eva.dark : eva.light}>
                  <Layout style={style.header}>
                    <Layout style={style.headerLeft}>
                      <Text style={style.textMain} category='s1'>
                        Settings
                      </Text>
                    </Layout>
                    <Layout style={style.headerRight}>
                      <TouchableOpacity
                        style={style.optionButton}
                        onPress={() => this.props.navigation.openDrawer()}
                        >
                          <Image
                            style={style.optionButton}
                            source={require('../assets/options.png')}
                          />
                        </TouchableOpacity>
                    </Layout>
                  </Layout>
          <Layout style={style.container}>
            <Layout style={styles.goals}>
              <Input
                style={{paddingBottom:vh(2)}}
                label='Monthly Goal'
                placeholder='30'
                disabled
              />
              <Input
                label='Daily Goal'
                placeholder='1'
                disabled
              />
              </Layout>
            <Layout style={styles.inputFlds}>
              <Toggle
                checked={this.state.darkmode}
                onChange={onActiveCheckedChange}>
                Dark Mode
              </Toggle>
              <Button style={styles.logout} onPress={logoutHandler}>
                <Text style={{color:'white'}}>Logout</Text>
              </Button>
            </Layout>
          </Layout>
        </ApplicationProvider>
      </>
    )
  }
}

const styles = StyleSheet.create({
  goals:{
    width:vw(70),
    marginBottom:vh(5),
    marginLeft:vw(-5)
  },
  inputFlds: {
    flex: 1,
    height: vh(10)
  },
  logout: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:20,
    backgroundColor: '#0573E1',
    marginTop: vh(4),
		marginRight: vw(10),
	},
});
const mapDispatchToProps = dispatch => {
	return bindActionCreators({ updateEmail, updatePassword, fetchUserObj, updateDarkMode }, dispatch)
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings)