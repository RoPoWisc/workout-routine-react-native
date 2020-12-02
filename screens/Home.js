import React from 'react';
import { View, styleheet, Image, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
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
const style = require('../styles/global');
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
        this.setState({infoPub: [], infoPriv: [], loading:false});
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
                  <Layout style={style.header}>
                    <Layout style={style.headerLeft}>
                      <Text style={style.textMain} category='s1'>
                        Personal
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
                    <Layout style={style.carousel}>
                    <Text style={style.textPub} appearance='hint'>
                        Public
                      </Text>
                      {console.log(this.state.infoPub.length)}
                      {(this.state.infoPub.length > 0) ?
                      <FlatList
                        data={this.state.infoPub}
                        horizontal
						            renderItem={({ item }) => (
							            <>
                            <TouchableOpacity onPress={() => this.onPressWorkoutButton(item.key)}>
                              <Layout style={style.c_image}>
                                <ImageBackground
                                  style={style.imagebkgnd}
                                  source={require('../assets/home.jpg')}>
                                  <Text style={style.p_text}>{item.name}</Text>
                                </ImageBackground>
                              </Layout>
                            </TouchableOpacity>
							            </>
						            )}
                      />:<Text style={style.textPrvErr}>Might need to wait a bit for public workouts</Text>}
                    </Layout>
                    <Layout style={style.carouselTw}>
                    <Text style={style.textPrv} appearance='hint'>
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
                            <Layout style={style.c_image}>
                              <ImageBackground
                                style={style.imagebkgnd}
                                source={require('../assets/home1.jpg')}>
                                <Text style={style.p_text}>{item.name}</Text>
                              </ImageBackground>
                            </Layout>
                          </TouchableOpacity>
                        </>
                      )}
                    />:<Text style={style.textPrvErr}>Looks like you don't have any custom workouts or its loading :)</Text>}
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
