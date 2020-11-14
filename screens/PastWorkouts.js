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
/**
 * Use any valid `name` property from eva icons (e.g `github`, or `heart-outline`)
 * https://akveo.github.io/eva-icons
 */
const HeartIcon = (props) => (
  <Icon {...props} name='heart'/>
);

const info = [
	{name: 'Workout 1', key: '\nLegz4Dayz'},
	{name: 'Workout 2', key: '\nChest Day'},
	{name: 'Workout 3', key: '\nBulk'},
	{name: 'Workout 4', key: '\nCut'},
	{name: 'Workout 5', key: '\nSuperset'},
	{name: 'Workout 6', key: '\nHIIT'},
	{name: 'Workout 7', key: '\nCore 24/7'},
	{name: 'Workout 8', key: '\nCardio'},
];

const images = [
  {name: require('../assets/home.jpg'), key: 'Workout 1'},
  {name: require('../assets/home1.jpg'), key: 'Workout 2'},
  {name: require('../assets/curls.jpg'), key: 'Workout 3'}
];

export class PastWorkouts extends React.Component {
    componentDidMount = async () => {
      try {
        //console.log(this.props.user);
      } catch (e) {
        alert(e);
      }
    }
    constructor(props) {
      super(props)
      this.onPressWorkoutButton = this.onPressWorkoutButton.bind(this)
    }
    onPressWorkoutButton = async (routineNameVar) => {
      // item has name and key

      let bearer = 'Bearer ' + this.props.user.bearerToken;

      let response = await fetch('https://workout-routine-builder-api.herokuapp.com/workouts/prebuilt' , {
        method: 'POST',
       headers: {
          Accept: '/',
          'Content-Type': 'application/json'
          // 'Authorization': bearer
        },
        body: JSON.stringify({
          routineName: routineNameVar
        })
      });

        let responseJson = await response.json();
        responseJson.routineName = routineNameVar
        responseJson.routineDay = "Pre-built Workout"
        //console.log(responseJson)
        this.props.navigation.navigate('Workout', { workoutData: responseJson} )
    }
    render() {
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
                        data={info}
                        //horizontal
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