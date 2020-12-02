import React from 'react';
import { View, StyleSheet, Image, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchUserObj} from '../actions/user'
import {
  ApplicationProvider,
  Icon,
  IconRegistry,
  Layout,
  Text,
} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';

import { vw, vh} from 'react-native-expo-viewport-units'
const style = require('../styles/global');

let infoVar = []
let data = []

const Item = ({ item }) => (
            <>
              <Text style={styles.item}>{item.name}: {item.key}</Text>
            </>
);

export class PastWorkouts extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        info: [{name: "Test", key: "test"},{name: "Test 2 ", key: "test 2"}]
      }
    }

    componentDidMount = async () => {
      let url = 'https://workout-routine-builder-api.herokuapp.com/users/current'
      let bearer = 'Bearer ' + this.props.user.bearerToken;
      
      try {
        let response = await fetch(url , {
          method: 'POST',
          headers: {
              Accept: '/',
              'Content-Type': 'application/json',
              'Authorization': bearer
            },
            body: JSON.stringify({
              _id : this.props.user.userId
            })
          });
  
          let responseJson = await response.json();
          let workoutObj = responseJson['message']['personalWorkout']
          infoVar = []
          data = workoutObj
          workoutObj.forEach((obj,ind) => {
            infoVar.push({name: obj.routineName, key: obj.routineDay+ind})
          }) 
          this.setState({info: infoVar});

      } catch (e) {
        console.log(e)
      }
        
    }

    WorkoutList = (props) => {
      return(<FlatList
        data={props.info}
        //horizontal
        renderItem={({ item }) => (
          <>
            <Text style={styles.item}>{item.name}: {item.key}</Text>
          </>
        )}
      />)
    }

    



    render() {
      console.log(this.state.info)
      // const renderItem = ({ item }) => <Item title={item.title} />;
        return (
            <>
                <IconRegistry icons={EvaIconsPack}/>
                <ApplicationProvider {...eva} theme={eva.light}>
                  <Layout style={style.header}>
                    <Layout style={style.headerLeft}>
                      <Text style={style.textMain} category='s1'>
                        Past
                      </Text>
                      <Text style={style.textSub} appearance='hint'>
                        Workouts
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
                    <Layout style={styles.p_workouts}>
                    <FlatList
                      data={this.state.info}
                      
                      renderItem={({ item }) => (
                        <>
                          <Text style={styles.item}>{item.name}: {item.key}</Text>
                        </>
                      )}
                    /> 
                    </Layout>
                  </Layout>
                </ApplicationProvider>
            </>
        )
    }
}

const styles = StyleSheet.create({
  imagebkgnd: {
    flex: 1,
    alignSelf: 'stretch', 
    borderRadius: vw(10), 
    overflow: 'hidden', 
    justifyContent: 'flex-end', 
    alignItems: 'center',
		resizeMode: 'cover',
		opacity:.9,
	  },
  p_workouts: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#013A73',
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    marginTop: vh(0),
    marginHorizontal: vw(-2),
  },
  p_text: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
  item: {
    paddingVertical: vh(3),
    paddingHorizontal: vw(18),
    alignSelf: 'center',
    borderWidth: 2,
    borderRadius: 40,
    color:'white',
    marginBottom: vh(1),
		borderColor: 'white',
		fontSize: 24
	},
  textSub: {
    marginLeft: vw(2),
    textAlign: 'center',
    fontSize: vh(4.5),
  },
  likeButton: {
    marginVertical: 16,
  },
});
const mapDispatchToProps = dispatch => {
	return bindActionCreators({ fetchUserObj }, dispatch)
}

const mapStateToProps = state => {
	return {
		user: state.user
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PastWorkouts)