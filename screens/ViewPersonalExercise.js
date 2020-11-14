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
    Input
} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';

import { vw, vh} from 'react-native-expo-viewport-units'

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
            showDelete: false,
            addExercise: false,
            exercises: [
                {
                    "__v": 0,
                    "_id": "5faebda06b8ccd0017fd67b5",
                    "_owner": "5f9c475ae4e8080017dd41ca",
                    "name": "Squat",
                    "public": false,
                    "sets": [
                      {
                        "_id": "5faebda06b8ccd0017fd67b6",
                        "id": "3rojfkdj389sdfm",
                        "reps": 12,
                        "weight": 1,
                      },
                    ],
                    "totalVolume": "Barbell",
                  },
                  {
                    "__v": 0,
                    "_id": "5faece396b8ccd0017fd67bf",
                    "_owner": "5f9c475ae4e8080017dd41ca",
                    "name": "Bench Press",
                    "public": false,
                    "sets": [
                      {
                        "_id": "5faece396b8ccd0017fd67c0",
                        "id": "3rojfkdj389sdfm",
                        "reps": 33,
                        "weight": 100,
                      },
                    ],
                    "totalVolume": "Dumbbell",
                  },
            ]
        }
    }

    showDeleteExerciseHandler() {
        let newShowDelete = !this.state.showDelete

        this.setState({showDelete: newShowDelete})
    }

    componentDidMount = async () => {
        // item has name and key
        ////console.log(this.props);
        let bearer = 'Bearer ' + this.props.user.bearerToken;
        try {
            let response = await fetch('https://workout-routine-builder-api.herokuapp.com/exercises/private/' , {
            method: 'POST',
            headers: {
                Accept: '/',
                'Content-Type': 'application/json',
                'Authorization': bearer
            },
            body: JSON.stringify({
                _owner: this.props.user.userServer['_id']
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

    deleteExerciseHandler(exercise_id) {
        this.deleteExerciseRequest(exercise_id);
    }

    deleteExerciseRequest = async (exercise_id) => {
        //console.log(exercise_id);
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
                _owner: this.props.user.userServer['_id']
            })
            });
        
            let responseJson = await response.json();
            //console.log(responseJson)
            this.setState({exercises: responseJson.success})
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

        //console.log(name);
        //console.log(type);

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
                _owner: this.props.user.userServer['_id'],
                public: false,
                name: name,
                totalVolume: type,
                sets: []
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
                _owner: this.props.user.userServer['_id']
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

            return (
                <View style={{ alignItems: 'center', padding: 10, backgroundColor: '#DEDEDE', borderRadius: 10}}>
                    <Text category='h2' style={{color: '#266199'}}>Create New Exercise!</Text>
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

            return (
                <View style={exerciseStyles.exercise}>
                    <View style={{
                        justifyContent: 'space-between',
                        flexDirection: 'column',
                        borderBottomColor: '#002855',
                        borderBottomWidth: 1,
                    }}>
                        <View style={{flexDirection: 'row', justifyContent:'space-between', paddingRight: 10}}>
                            <Text category='p2' style={exerciseStyles.header}>{exercise_object.name}</Text>
                            {this.state.showDelete && <Button accessoryLeft={CloseIcon} onPress={() => this.deleteExerciseHandler(exercise_object.id)} size='small' style={{
                                width: 32, height: 32, position: 'absolute', right: 10, top: 5, backgroundColor: '#DB504A', borderColor: '#DB504A', borderRadius: 8}}/>}
                            
                        </View>
                        <Text category='p2' style={exerciseStyles.volume}>{exercise_object.totalVolume}</Text>
                    </View>
                </View>
            );
        };

        return (
            <ApplicationProvider {...eva} theme={eva.light}>
                <Layout style={styles.container}>
                    <View style={{flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between'}}>
                        <Text category='h1' style={{
                            fontWeight: '500',
                            marginLeft: 12
                        }}>Your Exercises</Text>
                        <TouchableOpacity
                            style={{marginRight: 12}}
                            onPress={() => this.props.navigation.openDrawer()}
                        >
                            <Image
                                style={styles.optionButton}
                                source={require('../assets/options.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    
                    <List
                        style={{
                            backgroundColor: 'white',
                            width: '100%',
                            marginLeft: 15,
                            alignSelf: 'center',
                            borderRadius: 5,
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
                        <Modal visible={this.state.addExercise} backdropStyle={styles.backdrop}>
                            <AddExercise/>
                        </Modal>
                    </View>
                </Layout>
                
            </ApplicationProvider>
        )
    }
}

const exerciseStyles = StyleSheet.create({
    exercise: {
        backgroundColor: '#E5E5E5',
        width: '93%',
        borderRadius: 10,
        padding: 5,
        margin: 5
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
        paddingTop: 30,
        //justifyContent: 'center',
        alignItems: 'center',
    },
    exercise: {
        backgroundColor: 'black',
        alignSelf: 'center'
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    optionButton: {
        marginTop: vh(1.2),
        //marginRight: vw(2),
        height: vh(7),
        width: vw(14),
    },
});

// const mapDispatchToProps = dispatch => {
// 	return bindActionCreators({ fetchUserObj }, dispatch)
// }

const mapStateToProps = state => {
	return {
		user: state.user
	}
}

export default connect(
	mapStateToProps,
	// mapDispatchToProps
)(ViewPersonalExercise)