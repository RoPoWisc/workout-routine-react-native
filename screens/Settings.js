import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateEmail, updatePassword, fetchUserObj } from '../actions/user'
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
  Text,
  Toggle,
  Button
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
  };

  render() {
    const logoutHandler = async () => {
      this.props.fetchUserObj(undefined);
      this.props.updateEmail("");
      this.props.updatePassword("");
      this.props.navigation.navigate('Login')
    };

    return (
      <>
        <IconRegistry icons={EvaIconsPack}/>
                <ApplicationProvider {...eva} theme={eva.light}>
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
            <Layout style={styles.inputFlds}>
            <Toggle>
              Dark Mode
            </Toggle>
              <Button style={styles.logout} onPress={logoutHandler}>
                <Text>Logout</Text>
              </Button>
            </Layout>
          </Layout>
        </ApplicationProvider>
      </>
    )
  }
}

const styles = StyleSheet.create({
  inputFlds: {
    flex: 1
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
	return bindActionCreators({ updateEmail, updatePassword, fetchUserObj }, dispatch)
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