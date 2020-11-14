import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { } from '../actions/user'
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
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units'


const AddIcon = (props) => (
  <Icon {...props} name='plus-outline'/>
);

class Home extends React.Component {

    render() {
        return (
            <>
                <IconRegistry icons={EvaIconsPack}/>
                <ApplicationProvider {...eva} theme={eva.light}>
                  <Layout style={styles.header}>
                    <Layout style={styles.headerLeft}>
                      <Text style={styles.textMain} category='s1'>
                        Add
                      </Text>
                      <Text style={styles.textSub} appearance='hint'>
                        Workout
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
                    <Layout style={styles.workout}>
                      <Layout style={styles.headerLeft}>
                        <Text style={styles.textMain} category='s1'>
                          Prebuilt
                        </Text>
                        <Text style={styles.textSub} appearance='hint'>
                          Workout
                        </Text>
                      </Layout>
                      <Layout style={styles.headerRight}>
                        <Button style={styles.button} size='giant' accessoryLeft={AddIcon}/>
                    </Layout>
                    </Layout>
                    <Layout style={styles.workout}>
                      <Layout style={styles.headerLeft}>
                        <Text style={styles.textMain} category='s1'>
                          Custom
                        </Text>
                        <Text style={styles.textSub} appearance='hint'>
                          Workout
                        </Text>
                      </Layout>
                      <Layout style={styles.headerRight}>
                        <Button style={styles.button} status='danger' size='giant' accessoryLeft={AddIcon}
                          onPress={() => this.props.navigation.navigate('CustomWorkout')}
                        />
                    </Layout>
                    </Layout>
                  </Layout>
                </ApplicationProvider>
            </>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  header: {
    //borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    marginTop: 25,
    alignItems: 'center',
  },
  headerLeft: {
    //borderWidth: 1,
    flex: 3,
    alignItems: 'flex-start',
    marginBottom: 40,
    marginLeft: 20,
  },
  headerRight: {
    //borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    justifyContent: 'flex-end',
    marginRight: 5,
  },
  textMain: {
    marginLeft: vw(2),
    fontSize: vh(6.5),
    fontWeight: "bold",
  },
  textSub: {
    marginLeft: vw(2),
    textAlign: 'center',
    fontSize: vh(4.5),
  },
  text: {
    fontSize: 20,
    alignSelf: 'flex-start',
    flex: 3,
    marginLeft: 20,
  },
  optionButton: {
    marginTop: vh(1.2),
    marginRight: vw(2),
    height: vh(7),
    width: vw(14),
  },
  likeButton: {
    marginVertical: 16,
  },
  workout: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  button: {
    marginRight: 40,
    marginTop: 35,
    borderRadius: 30
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
    mapStateToProps
)(Home)