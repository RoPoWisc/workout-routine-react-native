import React from 'react';
import { View, styleheet, Image, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { useIsFocused, NavigationEvents } from 'react-navigation';
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
const images = [
  {name: require('../assets/home.jpg'), key: 'Workout 1'},
  {name: require('../assets/home1.jpg'), key: 'Workout 2'},
  {name: require('../assets/curls.jpg'), key: 'Workout 3'}
];

function isFocused() {
  const isFocused = useIsFocused();

  console.log(isFocused);
}

export class Home extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
        update: false,
        loading: true,
        infoPub: [],
        infoPriv: [],
      }
      this.onPressWorkoutButton = this.onPressWorkoutButton.bind(this);
      this.update = this.update.bind(this);
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
        console.log(responseJson);
        let infoPub = [];
        let infoPriv = [];
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

    

    update = async () => {
      // console.log('called update');
      if (this.props.navigation.getParam('update', false)) {
        // console.log('updating...');
        // await new Promise(resolve => this.setState({ loading: true }, () => resolve()))

        // this.setState({loading: true});

        // request new workout data
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
          let infoPub = [];
          let infoPriv = [];
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
        // this.setState({loading: false});
      }
    }

    componentWillUnmount = async () => {
      console.log('unmounted component');
    }

    onPressWorkoutButton = async (routineNameVar,type) => {
      // item has name and key
      this.setState({loading: true});
      
      console.log(routineNameVar);
      let bearer = 'Bearer ' + this.props.user.bearerToken;
      console.log(bearer);
      routineNameVar = routineNameVar.slice(0,-1);
      console.log(routineNameVar);
      let response = await fetch('https://workout-routine-builder-api.herokuapp.com/workouts/prebuilt' , {
        method: 'POST',
       headers: {
          Accept: '/',
          'Content-Type': 'application/json',
          'Authorization': bearer
        },
        body: JSON.stringify({
          routineName: routineNameVar,
          _owner: this.props.user.userId
        })
      });

        let responseJson = await response.json();
        responseJson.routineName = routineNameVar
        responseJson.routineDay = type+" Workout"
        this.props.navigation.navigate('Workout', { workoutData: responseJson} )
    }

    render() {

        

        return (
            <>
                <NavigationEvents
                  onDidFocus={() => this.update()} // 
                />
                <IconRegistry icons={EvaIconsPack}/>
                <ApplicationProvider {...eva} theme={(this.props.user['darkMode']) ? eva.dark : eva.light}>
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
                      {(this.state.infoPub.length > 0) ?
                      <FlatList
                        data={this.state.infoPub}
                        horizontal
						            renderItem={({ item }) => (
							            <>
                            <TouchableOpacity onPress={() => this.onPressWorkoutButton(item.key,'Public')}>
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
                      {(this.state.infoPriv.length > 0) ?
                      <FlatList
                      data={this.state.infoPriv}
                      horizontal
                      renderItem={({ item }) => (
                        <>
                          <TouchableOpacity onPress={() => this.onPressWorkoutButton(item.key,'Pre-built')}>
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
                    />:<Text style={style.textPrvErr}>Looks like you don't have any custom workouts or it's loading :)</Text>}
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
