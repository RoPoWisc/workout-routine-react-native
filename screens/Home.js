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
  Card, 
  Modal, 
  Spinner
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

const infoPub = [];

const infoPriv = [];

const images = [
  {name: require('../assets/home.jpg'), key: 'Workout 1'},
  {name: require('../assets/home1.jpg'), key: 'Workout 2'},
  {name: require('../assets/curls.jpg'), key: 'Workout 3'}
];

export class Home extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        loading: true,
        infoPub: [],
        infoPriv: [],
      }
      this.onPressWorkoutButton = this.onPressWorkoutButton.bind(this)
    }
    componentDidMount = async () => {
      try {
        let bearer = 'Bearer ' + this.props.user.bearerToken;
        //populate exercises
        let response = await fetch('https://workout-routine-builder-api.herokuapp.com/workouts/all' , {
        method: 'POST',
        headers: {
            Accept: '/',
            'Content-Type': 'application/json',
            'Authorization': bearer
          },
          body: JSON.stringify({
            _owner: this.props.user.userId,
            limit: 10
          })
        });

        let responseJson = await response.json();
        console.log(responseJson)
        responseJson.forEach((e,inx) => {
          if(e.public)
            infoPub.push({name: e.routineName, key:e.routineName+inx});
          else 
            infoPriv.push({name: e.routineName, key:e.routineName+inx});
          this.setState({infoPub: infoPub, infoPriv: infoPriv, loading:false});
        });
        //console.log(infoPub)
      } catch (e) {
        alert(e);
      }
    }
    onPressWorkoutButton = async (routineNameVar) => {
      // item has name and key

      let bearer = 'Bearer ' + this.props.user.bearerToken;

      let response = await fetch('https://workout-routine-builder-api.herokuapp.com/workouts/prebuilt' , {
        method: 'POST',
       headers: {
          Accept: '/',
          'Content-Type': 'application/json',
          'Authorization': bearer
        },
        body: JSON.stringify({
          routineName: routineNameVar
        })
      });

        let responseJson = await response.json();
        responseJson.routineName = routineNameVar
        responseJson.routineDay = "Pre-built Workout"
        ////console.log(responseJson)
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
                        Personal
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
                    <Layout style={styles.carousel}>
                    <Text style={styles.textPub} appearance='hint'>
                        Public
                      </Text>
                      {console.log(this.state.infoPub.length)}
                      <FlatList
                        data={this.state.infoPub}
                        horizontal
						            renderItem={({ item }) => (
							            <>
                            <TouchableOpacity onPress={() => this.onPressWorkoutButton(item.key)}>
                              <Layout style={styles.c_image}>
                                <ImageBackground
                                  style={styles.imagebkgnd}
                                  source={require('../assets/home.jpg')}>
                                  <Text style={styles.p_text}>{item.name}</Text>
                                </ImageBackground>
                              </Layout>
                            </TouchableOpacity>
							            </>
						            )}
					            />
                    </Layout>
                    <Layout style={styles.carouselTw}>
                    <Text style={styles.textPrv} appearance='hint'>
                        Custom
                      </Text>
                      {console.log(this.state.infoPriv.length)}
                      {(this.state.infoPriv.length > 0) ?
                      <FlatList
                      data={this.state.infoPriv}
                      horizontal
                      renderItem={({ item }) => (
                        <>
                          <TouchableOpacity onPress={() => this.onPressWorkoutButton(item.key)}>
                            <Layout style={styles.c_image}>
                              <ImageBackground
                                style={styles.imagebkgnd}
                                source={require('../assets/home1.jpg')}>
                                <Text style={styles.p_text}>{item.name}</Text>
                              </ImageBackground>
                            </Layout>
                          </TouchableOpacity>
                        </>
                      )}
                    />:<Text style={styles.textPrvErr}>Looks like you don't have any custom workouts</Text>}
                    </Layout>
                  </Layout>
                </ApplicationProvider>
                <Modal visible={this.state.loading}>
                  <Card disabled={true}>
                    <Spinner/>
                  </Card>
                </Modal>
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
    marginTop: vh(-3.3),
    height: vh(30),
  },
  carouselTw: {
    flex: 1,
    alignSelf: 'flex-start',
    height: vh(30),
    marginTop: vh(1),
  },
  c_image: {
    height: vh(25),
    width: vw(43),
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
    marginTop: vh(10),
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
  textPub: {
    borderColor: 'black',
    marginLeft: vw(2),
    marginBottom: vw(1),
    textAlign: 'left',
    fontSize: vh(2.5),
  },
  textPrv: {
    borderColor: 'black',
    marginLeft: vw(2),
    marginBottom: vw(1),
    textAlign: 'left',
    fontSize: vh(2.5),
  },
  textPrvErr: {
    borderColor: 'black',
    marginLeft: vw(2),
    marginBottom: vw(1),
    textAlign: 'left',
    fontSize: vh(2),
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
)(Home)
