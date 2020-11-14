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


let infoVar = []
let data = []

const images = [
  {name: require('../assets/home.jpg'), key: 'Workout 1'},
  {name: require('../assets/home1.jpg'), key: 'Workout 2'},
  {name: require('../assets/curls.jpg'), key: 'Workout 3'}
];


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
                  <Layout style={styles.header}>
                    <Layout style={styles.headerLeft}>
                      <Text style={styles.textMain} category='s1'>
                        Previous
                      </Text>
                      <Text style={styles.textSub} appearance='hint'>
                        Workouts
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
                    <Layout style={styles.p_workouts}>
                    <FlatList
                      data={this.state.info}
                      
                      renderItem={({ item }) => (
                        <>
                          <Text style={styles.item}>{item.name}: {item.key}</Text>
                        </>
                      )}
                    /> 
                    {/* <FlatList
                        data={infoVar}
                        horizontal
						            renderItem={({ item }) => (
							            <>
                            <TouchableOpacity style={styles.c_image} onPress={() => this.onPressWorkoutButton(item.key)}>
                              <Layout style={styles.c_image}>
                                <ImageBackground
                                  style={styles.imagebkgnd}
                                  source={item.name}>
                                  <Text style={styles.p_text}>{item.key}</Text>
                                </ImageBackground>
                              </Layout>
                            </TouchableOpacity>
							            </>
						            )}
					            /> */}
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
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: vw(2),
  },
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
  header: {
    flex: 1,
    flexDirection: 'row',
    marginTop: vh(2),
    alignItems: 'center',
  },
  headerLeft: {
    flex: 3,
    alignItems: 'flex-start',
    marginBottom: vh(2),
    marginLeft: vw(2),
  },
  headerRight: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    justifyContent: 'flex-end',
    marginRight: vw(.5),
  },
  textMain: {
    marginLeft: vw(2),
    fontSize: vh(6.5),
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
    marginTop: vh(-3.3),
  },
  c_image: {
    height: vh(35),
    width: vw(53),
    marginBottom: vh(1.5),
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
		borderColor: 'black',
		backgroundColor: 'white',
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