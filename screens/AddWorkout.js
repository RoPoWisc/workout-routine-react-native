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
                      <TouchableOpacity>
                        {/* <Icon
                          name='menu-outline'
                        /> */}
                        <Image style={styles.menuImage} source={require('../assets/logo1.png')}/>
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
                        <Button style={styles.button} status='danger' size='giant' accessoryLeft={AddIcon}/>
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
  textMain:{
    fontSize: 40,
    fontWeight: 'bold',
  },
  textSub: {
    fontSize: 30,
  },
  text: {
    fontSize: 20,
    alignSelf: 'flex-start',
    flex: 3,
    marginLeft: 20,
  },
  menuImage: {
    position: 'relative',
    borderRadius: 20,
    width: 80,
    height: 80,
    resizeMode: 'contain',
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