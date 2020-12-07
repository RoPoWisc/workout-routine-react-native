import React from 'react';
import { StyleSheet, TouchableOpacity, Image, View } from 'react-native';
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
import { vw, vh } from 'react-native-expo-viewport-units'
const style = require('../styles/global');

const AddIcon = (props) => (
  <Icon {...props} name='plus-outline'/>
);

export class AddWork extends React.Component {

    render() {
        return (
            <>
                <IconRegistry icons={EvaIconsPack}/>
                <ApplicationProvider {...eva} theme={(this.props.user['darkMode']) ? eva.dark : eva.light}>
                  <Layout style={style.header}>
                    <Layout style={style.headerLeft}>
                      <Text style={style.textMain} category='s1'>
                        Add
                      </Text>
                      <Text style={style.textSub} appearance='hint'>
                        Workout
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
  text: {
    fontSize: 20,
    alignSelf: 'flex-start',
    flex: 3,
    marginLeft: 20,
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
)(AddWork)