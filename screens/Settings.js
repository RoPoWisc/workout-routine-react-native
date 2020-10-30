import React from 'react';
import { View, StyleSheet, Image, FlatList, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateEmail, updatePassword, fetchUserObj } from '../actions/user'
import {
  ApplicationProvider,
  Button,
  Icon,
  IconRegistry,
  Layout,
  Text,
} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import { initialWindowMetrics } from 'react-native-safe-area-context';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units'

/**
 * Use any valid `name` property from eva icons (e.g `github`, or `heart-outline`)
 * https://akveo.github.io/eva-icons
 */

class Settings extends React.Component {
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
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
          <Layout style={styles.header}>
            <Layout style={styles.headerLeft}>
              <Text style={styles.textMain} category='s1'>
                Settings
                    </Text>
            </Layout>
            <Layout style={styles.headerRight}>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => this.props.navigation.openDrawer()}
              >
                <Image
                  style={styles.optionButton}
                  source={require('../assets/options.png')}
                />
              </TouchableOpacity>
            </Layout>
          </Layout>
          <Layout style={styles.container}>
            <TouchableOpacity style={styles.logout} onPress={logoutHandler}>
              <Text>Logout</Text>
            </TouchableOpacity>
          </Layout>
        </ApplicationProvider>
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 25,
    alignItems: 'center',
  },
  headerLeft: {
    flex: 3,
    alignItems: 'flex-start',
    marginBottom: 40,
    marginLeft: 20,
  },
  headerRight: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    justifyContent: 'flex-end',
    marginRight: 5,
  },
  textMain: {
    fontSize: 40,
    fontWeight: "bold",
  },
  optionButton: {
    marginTop: vh(1.2),
    marginRight: vw(2),
    height: vh(7),
    width: vw(14),
  },
  carousel: {
    flex: 1,
    marginTop: -20,
  },
  c_image: {
    height: 260,
    width: 210,
    borderWidth: 5,
    borderRadius: 40,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  p_workouts: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#013A73',
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    marginHorizontal: -20,
  },
  p_text: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
  item: {
    paddingVertical: 30,
    paddingHorizontal: 80,
    alignSelf: 'center',
    borderWidth: 2,
    borderRadius: 40,
    borderColor: 'black',
    backgroundColor: 'white',
    fontSize: 24
  },
  text: {
    textAlign: 'center',
    fontSize: 30,
  },
  likeButton: {
    marginVertical: 16,
  },
  logout: {
		padding: 10,
		borderRadius: 15,
		backgroundColor: '#0573E1',
		marginRight: 10,
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