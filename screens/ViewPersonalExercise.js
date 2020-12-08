import React, {  } from 'react';
import { View,  StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native'
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
    CheckBox,
    List,
    ListItem,
    Divider,
    Modal,
    Input,
    Card,
    Spinner
} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

import { vw, vh} from 'react-native-expo-viewport-units'
import {lightColors, darkColors} from '../themes/colorThemes';
const style = require('../styles/global');
const CloseIcon = (props) => (
    <Icon {...props} name='close-square-outline'/>
);

export class ViewPersonalExercise extends React.Component {

    constructor(props) {
        super(props);
        this.showDeleteExerciseHandler = this.showDeleteExerciseHandler.bind(this);
        this.deleteExerciseHandler = this.deleteExerciseHandler.bind(this);
        this.showAddExerciseHandler = this.showAddExerciseHandler.bind(this);
        this.addExerciseHandler = this.addExerciseHandler.bind(this);

        this.state = {
            loading: false,
            showDelete: false,
            addExercise: false,
            exercises: [
                {
                }
            ],
            colors: (this.props.user['darkMode']) ? darkColors : lightColors,
        }
    }

    showDeleteExerciseHandler() {
        let newShowDelete = !this.state.showDelete

        this.setState({showDelete: newShowDelete})
    }

    componentDidMount = async () => {
        // item has name and key
        console.log('mounting component...');
        console.log(this.props.user);

        if (typeof this.props.user.bearerToken === 'undefined') {
            console.log('bearer token undefined');
        }

        //console.log(this.props.user.bearerToken);

        let bearer = 'Bearer ' + this.props.user.bearerToken;
        try {
            let response = await fetch('https://workout-routine-builder-api.herokuapp.com/exercises/private' , {
            method: 'POST',
            headers: {
                Accept: '*/*',
                'Content-Type': 'application/json',
                'Authorization': bearer
            },
            body: JSON.stringify({
                _owner: this.props.user.userId
            })
            });
        
            let responseJson = await response.json();

            console.log('received response');
            console.log(responseJson)
            this.setState({exercises: responseJson.success})
            //this.props.navigation.navigate('Workout', { workoutData: responseJson} )
        } catch (error) {
            console.log("ERROR");
            console.log(error);
        }
    }

    deleteExerciseHandler(exercise_id) {
        this.deleteExerciseRequest(exercise_id);
    }

    deleteExerciseRequest = async (exercise_id) => {
        //console.log(exercise_id);
        this.setState({loading: true});
        let bearer = 'Bearer ' + this.props.user.bearerToken;
        try {
            let response = await fetch('https://workout-routine-builder-api.herokuapp.com/exercises/remove/' , {
            method: 'POST',
            headers: {
                Accept: '/',
                'Content-Type': 'application/json',
                'Authorization': bearer
            },
            body: JSON.stringify({
                _id: exercise_id
            })
            });
        
            let responseJson = await response.json();
            //console.log(responseJson)
            //this.props.navigation.navigate('Workout', { workoutData: responseJson} )
        } catch (error) {
            //console.log(error);
        }

        try {
            let response = await fetch('https://workout-routine-builder-api.herokuapp.com/exercises/private/' , {
            method: 'POST',
            headers: {
                Accept: '/',
                'Content-Type': 'application/json',
                'Authorization': bearer
            },
            body: JSON.stringify({
                _owner: this.props.user.userId
            })
            });
        
            let responseJson = await response.json();
            //console.log(responseJson)
            this.setState({loading: false, exercises: responseJson.success})
            //this.props.navigation.navigate('Workout', { workoutData: responseJson} )
        } catch (error) {
            //console.log(error);
        }
    }

    showAddExerciseHandler() {
        let newShowExercise = !this.state.addExercise;

        this.setState({addExercise: newShowExercise})
    }

    addExerciseHandler(name, type) {
        this.showAddExerciseHandler();

        this.addExerciseRequest(name, type);
    }

    addExerciseRequest = async (name, type) => {

        console.log(name);
        console.log(type);
        console.log('saving new exercise...');

        if (name == '') {
            alert('Exercise must have a name!');
            return;
        } else if (type == '') {
            alert('Exercise must have a type!');
            return;
        }

        this.setState({loading: true});
        let bearer = 'Bearer ' + this.props.user.bearerToken;
        try {
            let response = await fetch('https://workout-routine-builder-api.herokuapp.com/exercises/create/' , {
            method: 'POST',
            headers: {
                Accept: '/',
                'Content-Type': 'application/json',
                'Authorization': bearer
            },
            body: JSON.stringify({
                _owner: this.props.user.userId,
                public: false,
                name: name,
                totalVolume: type,
                sets: []
            })
            });
        
            let responseJson = await response.json();
            this.setState({loading: false});
            //console.log(responseJson)
            //this.props.navigation.navigate('Workout', { workoutData: responseJson} )
        } catch (error) {
            console.log(error);
        }

        try {
            let response = await fetch('https://workout-routine-builder-api.herokuapp.com/exercises/private/' , {
            method: 'POST',
            headers: {
                Accept: '/',
                'Content-Type': 'application/json',
                'Authorization': bearer
            },
            body: JSON.stringify({
                _owner: this.props.user.userId
            })
            });
        
            let responseJson = await response.json();
            ////console.log(responseJson)
            this.setState({exercises: responseJson.success})
            //this.props.navigation.navigate('Workout', { workoutData: responseJson} )
        } catch (error) {
            //console.log(error);
        }
    }

    render() {
        const AddExercise = () => {

            const [name, setName] = React.useState('');
            const [type, setType] = React.useState('');

            const backgroundColor = (this.props.user['darkMode']) ? '#58688F' : '#DEDEDE';
            const textColor = (this.props.user['darkMode']) ? 'white' : '#266199';
            return (
                <View style={{ alignItems: 'center', padding: 10, backgroundColor: backgroundColor, borderRadius: 10}}>
                    <Text category='h2' style={{color: textColor}}>Create New Exercise!</Text>
                    <Input 
                        placeholder='Exercise Name'
                        value={name}
                        onChangeText={nextName => setName(nextName)}
                    />
                    <Input 
                        placeholder='Exercise Type (Barbell, Dumbbell, Machine)'
                        value={type}
                        onChangeText={nextType => setType(nextType)}
                    />
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Button style={{width: '40%', margin: 5, backgroundColor: '#013A73', borderColor: '#013A73'}} onPress={() => this.showAddExerciseHandler()}>Cancel</Button>
                        <Button style={{width: '40%',  margin: 5, backgroundColor: '#013A73', borderColor: '#013A73'}} onPress={() => this.addExerciseHandler(name, type)}>Finish</Button>
                    </View>
                    
                </View>
                
            )
        }

        const Exercise2 = (exercise_object) => {
            const clr = (this.props.user['darkMode']) ?'white':'black';
            const backgroundColor = (this.props.user['darkMode']) ? '#58688F' : '#E5E5E5';
            return (
                <View style={[exerciseStyles.exercise, {backgroundColor: backgroundColor}]}>
                    <View style={{
                        justifyContent: 'space-between',
                        flexDirection: 'column',
                        borderBottomColor: clr,
                        borderBottomWidth: 2,
                        backgroundColor: backgroundColor,
                    }}>
                        <View style={{flexDirection: 'row', justifyContent:'space-between', paddingRight: 10}}>
                            <Text category='p2' style={exerciseStyles.header}>{exercise_object.name}</Text>
                            {this.state.showDelete && <Button accessoryLeft={CloseIcon} onPress={() => this.deleteExerciseHandler(exercise_object.id)} size='small' style={{
                                width: 32, height: 32, position: 'absolute', right: 10, top: 5, backgroundColor: '#DB504A', borderColor: '#DB504A'}}/>}
                            
                        </View>
                        <Text category='p2' style={exerciseStyles.volume}>{exercise_object.totalVolume}</Text>
                    </View>
                </View>
            );
        };

        const addExerciseBackground = (this.props.user['darkMode']) ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.5)';

        return (
            
            <ApplicationProvider {...eva} theme={(this.props.user['darkMode']) ? eva.dark : eva.light}>
                  <Layout style={style.header}>
                    <Layout style={style.headerLeft}>
                      <Text style={style.textMain} category='s1'>
                        Your
                      </Text>
                      <Text style={style.textSub} appearance='hint'>
                        Exercises
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
                    <List
                        style={{
                            width: '93%',
                            alignSelf: 'center',
                            borderRadius: 10,
                            
                        }}
                        data={this.state.exercises}
                        ItemSeparatorComponent={Divider}
                        renderItem={({ item }) => (
                            <Exercise2 name={item.name} totalVolume={item.totalVolume} id={item['_id']}></Exercise2>
                        )}
                    />
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Button style={{width: '40%', margin: 10, backgroundColor: '#DB504A', borderColor: '#DB504A'}} onPress={() => this.showDeleteExerciseHandler()}>Delete Exercise</Button>
                        <Button style={{width: '40%', margin: 10, backgroundColor: '#013A73', borderColor: '#013A73'}} onPress={() => this.showAddExerciseHandler()}>Add Exercise</Button>
                        <Modal visible={this.state.addExercise} backdropStyle={{backgroundColor: addExerciseBackground}}>
                            <AddExercise/>
                        </Modal>
                    </View>
                </Layout>
                <Modal visible={this.state.loading}>
                  <Card disabled={true}>
                    <Spinner/>
                  </Card>
                </Modal>
            </ApplicationProvider>
            
        )
    }
}

const exerciseStyles = StyleSheet.create({
    exercise: {
        width: '100%',
        borderRadius: 10,
        padding: 5,
        marginBottom: 3,
        marginTop: 3
    },
    header: {
        fontSize: 28,
        fontWeight: '500'
    },
    volume: {
        fontSize: 24,
        paddingLeft: 10,
        fontWeight: '300'
    },
    exerciseInfo: {
        fontSize: 20
    },
    weight: {
        fontSize: 20,
        paddingLeft: 10,
    },
    reps: {
        position: 'absolute',
        top: '12%',
        fontSize: 20,
        left: '38%'
    }
});

const styles = StyleSheet.create({
    list: {
        maxHeight: 180
    },
    container: {
        flex: 1,
        //justifyContent: 'center',
        alignItems: 'center',
    },
    exercise: {
        backgroundColor: 'black',
        alignSelf: 'center'
    },
    backdrop: {
        
    },
    optionButton: {
        marginTop: vh(1.2),
        //marginRight: vw(2),
        height: vh(7),
        width: vw(14),
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
	// mapDispatchToProps
)(ViewPersonalExercise)