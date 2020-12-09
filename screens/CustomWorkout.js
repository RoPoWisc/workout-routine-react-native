import React, { useState } from 'react';
import { View, ImageBackground, StyleSheet, TouchableOpacity, Image, TextInput, Picker } from 'react-native'
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
    Select,
    Modal,
    Card,
    Spinner
} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import { set } from 'react-native-reanimated';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units'
import {lightColors, darkColors} from '../themes/colorThemes';
const style = require('../styles/global');

// const exerciseList = [
//     {_id: 1, name: 'Exercise 1', sets: [], show: true, totalVolume: 'Total Volume'},
//     {_id: 2, name: 'Exercise 2', sets: [], show: true, totalVolume: 'Total Volume'},
//     {_id: 3, name: 'Exercise 3', sets: [], show: true, totalVolume: 'Total Volume'},
//     {_id: 4, name: 'Exercise 4', sets: [], show: true, totalVolume: 'Total Volume'},
//     {_id: 5, name: 'Exercise 5', sets: [], show: true, totalVolume: 'Total Volume'},
//     {_id: 6, name: 'Exercise 6', sets: [], show: true, totalVolume: 'Total Volume'},
//     {_id: 7, name: 'Exercise 7', sets: [], show: true, totalVolume: 'Total Volume'},
//     {_id: 8, name: 'Exercise 8', sets: [], show: true, totalVolume: 'Total Volume'},
//     {_id: 9, name: 'Exercise 9', sets: [], show: true, totalVolume: 'Total Volume'},
//     {_id: 10, name: 'Exercise 10', sets: [], show: true, totalVolume: 'Total Volume'},
//     {_id: 11, name: 'Exercise 11', sets: [], show: true, totalVolume: 'Total Volume'},
//     {_id: 12, name: 'Exercise 12', sets: [], show: true, totalVolume: 'Total Volume'},
// ]

const renderOption = (title, key) => (
    <SelectItem title={title} key={key} />
 );


const CollapseIcon = (props) => (
    <Icon {...props} name='arrow-ios-upward-outline' />
);

const ExpandIcon = (props) => (
    <Icon {...props} name='arrow-ios-downward-outline' />
);

const exerciseStyles = StyleSheet.create({
    exercise: {
        backgroundColor: 'blue',
        width: '93%',
        borderRadius: 10,
        padding: 5,
        margin: 5
    },
    header: {
        fontSize: 30
    },
    exerciseInfo: {
        fontSize: 20
    },
    exerciseReps: {
        fontSize: 20,
        position: 'absolute',
        top: '12%',
        left: '38%'
    },
    weight: {
        fontSize: 20,
        paddingLeft: 10
    },
    reps: {
        position: 'absolute',
        top: '12%',
        fontSize: 20,
        left: '38%'
    }
});

class CustomWorkout extends React.Component {

    constructor(props) {
        super(props)
        this.addSetHandler = this.addSetHandler.bind(this);
        this.changeTextHandler = this.changeWeightHandler.bind(this);
        this.changeRepsHandler = this.changeRepsHandler.bind(this);
        this.viewExerciseHandler = this.viewExerciseHandler.bind(this);
        this.addExerciseHandler = this.addExerciseHandler.bind(this);
        this.saveWorkoutHandler = this.saveWorkoutHandler.bind(this);
        this.getDate = this.getDate.bind(this);

        // //console.log(JSON.stringify(this.props.navigation.state.params.workoutData))

        this.state = {
            loading: false,
            showExercises: false,
            workout: {
                exercise_id: this.getDate(),
                completed: '',
                exerciseArray: [
                    //{_id: this.getDate(), name: 'Exercise Name', sets: [], show: true, totalVolume: 'Total Volume'},
                ],
                routineDay: 'Custom Workout',
                routineName: 'Workout Name',
            },
            exercises: [],
            //colors: (this.props.user['darkMode']) ? darkColors : lightColors,
        }
    }

    componentDidMount = async () => {
        let temp = [];
        let bearer = 'Bearer ' + this.props.user.bearerToken;
        let response = await fetch('https://workout-routine-builder-api.herokuapp.com/exercises/public', {
            method: 'POST',
            headers: {
                Accept: '/',
                'Content-Type': 'application/json',
                'Authorization': bearer
            },
            body: JSON.stringify({
                test: 'ggg'
            })
        });
        let responseJson = await response.json();
        console.log("Public");
        console.log(responseJson.success);
        if(responseJson.success !== undefined) {
            let exerciseList = responseJson.success;
            exerciseList.forEach(element => {
                temp.push(
                    {
                        exercise_id: element._id,
                        name: element.name,
                        totalVolume: element.totalVolume,
                        show: false,
                        sets: element.sets,
                    }
                )
            })
            this.setState({
                exercises: temp,
            })
        }

        response = await fetch('https://workout-routine-builder-api.herokuapp.com/exercises/private', {
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
        responseJson = await response.json();
        console.log("Private");
        console.log(responseJson.success);
        if(responseJson.success !== undefined) {
            let exerciseList = responseJson.success;
            exerciseList.forEach(element => {
                temp.push(
                    {
                        exercise_id: element._id,
                        name: element.name,
                        totalVolume: element.totalVolume,
                        show: false,
                        sets: element.sets,
                    }
                )
            })
            this.setState({
                exercises: temp
            })
        }
        // this.setState({
        //     colors: (this.props.user['darkMode']) ? darkColors : lightColors,
        // })
        //console.log(this.state.colors)
        ////console.log(this.state.exercises)
    }

    getDate() {
        var date = new Date();
        var time = (new Date(date)).getTime();
        return time;
    }

    addSetHandler(exercise_object) {
        exercise_object.sets.push({weight: 0, reps: 0, checked: 'false', id: this.getDate()});

        let newArray = this.state.workout.exerciseArray.map(element => element.exercise_id == exercise_object.exercise_id ? { ...element, sets: exercise_object.sets } : element);
        let state = {
            workout: {
                ...this.state.workout,
                exerciseArray: newArray,
            }
        }
        this.setState({ workout: state.workout }, //console.log(this.state.workout.exerciseArray)
        );
    }
    addExerciseHandler(exercise) {

        let newArray = this.state.workout.exerciseArray;
        newArray.push(exercise);
        
        let state = {
            workout: {
                ...this.state.workout,
                exerciseArray: newArray,
            }
        }
        this.setState({ 
            workout: state.workout,
            showExercises: false
        });
    }

    saveWorkoutHandler = async() =>{
        this.setState({loading: true})
        let bodyJSON = JSON.stringify({
                '_owner': this.props.user.userId,
                'public': false,
                'routineName': this.state.workout.routineName,
                'routineDay': this.state.workout.routineDay,
                'exerciseArray': this.state.workout.exerciseArray
        });

        let url = 'https://workout-routine-builder-api.herokuapp.com/workouts/create'
        let bearer = 'Bearer ' + this.props.user.bearerToken;

        try {
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    Accept: '/',
                    'Content-Type': 'application/json',
                    'Authorization': bearer
                },
                body: bodyJSON
            });
            let responseJson = await response.json();
            ////console.log(responseJson.message, responseJson.success);
            if(responseJson.success !== undefined)
            {
                this.setState({loading: false})
                this.props.navigation.navigate('Home', {update: true});
                // this.props.navigation.navigate('Workout', { workoutData: responseJson} )
                // alert('Workout saved!');
            }
            else
            {
                alert('Workout not Saved')
            }
            this.setState({loading: false})
        } catch (e) {
            alert(e);
        }

        //this.props.navigation.navigate('DrawerNavigator');
    }

    viewExerciseHandler() {
        this.setState({
            showExercises: true
        })
    }

    updateName(newName) {

        let newWorkout = this.state.workout
        // //console.log(newWorkout)
        newWorkout.routineName = newName;

        this.setState({
            workout: newWorkout
        })
    }

    compareExerciseObjects(obj1, obj2) {
        if (obj1.name != obj2.name || obj1.totalVolume != obj2.totalVolume || obj1.show != obj2.show) {
            return false;
        }

        const keys = Object.keys(obj1);
        for (let key of keys) {
            if (obj1[key] != obj2[key]) {
                return false;
            }
        }

        return true;
    }

    changeWeightHandler(exercise_entry, text) {

        let newSetsArray;
        let newState = {
            ...this.state.workout
        }

        let i = 0;
        for (var exercise of this.state.workout.exerciseArray) {
            if (exercise.exercise_id == exercise_entry.exercise_id) {
                newSetsArray = exercise.sets.map(set => set.id == exercise_entry.id ? {
                    weight: text, reps: set.reps, checked: set.checked, id: set.id
                } : set);
                newState.exerciseArray[i] = {
                    ...this.state.workout.exerciseArray[i],
                    sets: newSetsArray
                }
            } else {
                newState.exerciseArray[i] = {
                    ...this.state.workout.exerciseArray[i]
                }
            }
            ++i;
        }

        this.setState({ workout: newState });
    }

    changeRepsHandler(exercise_entry, text) {

        let newSetsArray;
        newState = {
            ...this.state.workout
        }

        let i = 0;
        for (var exercise of this.state.workout.exerciseArray) {
            if (exercise.exercise_id == exercise_entry.exercise_id) {
                newSetsArray = exercise.sets.map(set => set.id == exercise_entry.id ? {
                    weight: set.weight, reps: text, checked: set.checked, id: set.id
                } : set);
                newState.exerciseArray[i] = {
                    ...this.state.workout.exerciseArray[i],
                    sets: newSetsArray
                }
            } else {
                newState.exerciseArray[i] = {
                    ...this.state.workout.exerciseArray[i]
                }
            }
            ++i;
        }
      
        this.setState({workout: newState});
    }

    render() {

        const colors = (this.props.user['darkMode']) ? darkColors : lightColors
        const ExerciseEntry = (exercise_entry, exercise_id) => {
            const [weightText, setWeight] = React.useState('Weight');
            const [repText, setRep] = React.useState('Reps')

            return (
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: '#0466C880',
                    borderRadius: 8,
                    paddingTop: 3,
                    paddingBottom: 3,
                    marginVertical: 3
                }}>
                    <TextInput category='s1' style={exerciseStyles.weight} onChangeText={text => setWeight(text)} onSubmitEditing={() => this.changeWeightHandler(exercise_entry, weightText)} >{exercise_entry.weight}</TextInput>
                    <TextInput category='s1' style={exerciseStyles.reps} onChangeText={text => setRep(text)} onSubmitEditing={() => this.changeRepsHandler(exercise_entry, repText)}>{exercise_entry.reps}</TextInput>
                    {/* <this.Check checked={exercise_entry.checked} id={exercise_entry.id} exercise_id={exercise_entry.exercise_id}></this.Check> */}
                </View>
            );
        };

        const Exercise = (exercise_object) => {

            const [showList, setShowList] = React.useState(true);

            const showElementHandler = () => {
                setShowList(!showList);
            };

            return (
                <View style={{
                    backgroundColor: colors.exercise,
                    width: '93%',
                    borderRadius: 10,
                    padding: 5,
                    margin: 5
                }}>
                    <View style={{
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        borderBottomColor: '#002855',
                        borderBottomWidth: 1,
                    }}>
                        <Text category='s1' style={exerciseStyles.header}>{exercise_object.name}</Text>
                        <Text category='s1' style={exerciseStyles.header}>{exercise_object.totalVolume}</Text>
                    </View>

                    { showList && <View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                            <Text category='s1' style={exerciseStyles.exerciseInfo}>Weight</Text>
                            <Text category='s1' style={exerciseStyles.exerciseReps}>Reps</Text>
                            {/* <Text category='s1' style={exerciseStyles.exerciseInfo}>Set Complete?</Text> */}
                        </View>

                        <List
                            style={{ backgroundColor: '#E5E5E5' }}
                            data={exercise_object.sets}
                            renderItem={({ item }) => (
                                <ExerciseEntry weight={item.weight} reps={item.reps} checked={item.checked} id={item.id} exercise_id={exercise_object.exercise_id}></ExerciseEntry>
                            )}
                        />
                        <Button style={{ marginVertical: 3 }} appearance={'outline'} size={'small'} onPress={() => this.addSetHandler(exercise_object)}>Add Set</Button>
                    </View>}
                    <Button appearance='ghost' accessoryLeft={showList ? CollapseIcon : ExpandIcon} size='small' style={{ margin: -8 }} onPress={() => showElementHandler(exercise_object.exercise_id)}></Button>
                </View>
            );
        };

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
                    {!this.state.showExercises &&
                    <TextInput 
                        style={style.textIn}
                        category='h1'
                        //value={}
                        onChangeText={text => this.updateName(text)}
                        placeholder='Enter Name'
                    />}
                    {!this.state.showExercises &&
                    <List
                        style={{
                            backgroundColor: colors.background,
                            width: '100%',
                            marginLeft: 15,
                            alignSelf: 'center',
                            borderRadius: 5
                        }}
                        data={this.state.workout.exerciseArray}
                        renderItem={({ item }) => (
                            
                            <Exercise 
                                name={item.name}
                                totalVolume={item.totalVolume}
                                show={item.show}
                                sets={item.sets}
                                exercise_id={item.exercise_id}>

                            </Exercise>
                        )}
                    />}
                    {!this.state.showExercises &&
                        <Button style={{
                            marginTop: 20,
                            marginBottom: 20,
                            width: '80%',
                            backgroundColor: colors.button,
                            borderColor: colors.button,
                            borderRadius: 8
                        }} onPress={() => this.viewExerciseHandler()}>
                            Add Exercise
                        </Button>}
                    {this.state.showExercises &&
                        <Text style={{
                            alignSelf: 'center',
                            fontSize: vh(4),
                            backgroundColor:"#EFEFEF",
                            color:"#032c8e",
                            borderRadius:20,
                            padding: vh(.5),
                            marginBottom: 10,
                        }}>Available Exercises</Text>
                    }
                    {this.state.showExercises &&
                        <List
                            style={{
                                backgroundColor: colors.background,
                                width: '100%',
                                marginLeft: 15,
                                alignSelf: 'center',
                                borderRadius: 5
                            }}
                            data={this.state.exercises}
                            renderItem={({ item }) => (
                                <>
                                    <TouchableOpacity style={{
                                        alignSelf: 'center',
                                        backgroundColor: colors.exercise,
                                        width: '80%',
                                        borderRadius: 10,
                                        padding: 5,
                                        margin: 5
                                    }} onPress={() => this.addExerciseHandler(item)}>
                                        <Text style={styles.item}>{item.name}</Text>
                                    </TouchableOpacity>
                                </>
                            )}
                        />}
                    {!this.state.showExercises &&
                    <Button style={styles.button2} onPress={() => this.saveWorkoutHandler()}>
                        Save Workout
                    </Button>}
                    </Layout>
                    <Modal visible={this.state.loading}>
                        <Card disabled={true}>
                            <Spinner/>
                        </Card>
                    </Modal>
                </ApplicationProvider>
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        //justifyContent: 'center',
        alignItems: 'center',
    },
    button1: {
        marginTop: 20,
        marginBottom: 20,
        width: '80%',
        backgroundColor: 'rgba(0, 40, 85, 0.8)',
        borderColor: 'rgba(0, 40, 85, 0.8)',
        borderRadius: 8
    },
    button2: {
        marginBottom: 20,
        width: '80%',
        backgroundColor: '#DB504A',
        borderColor: '#DB504A',
        borderRadius: 8
    },
    header: {
        padding: 10,
        paddingLeft: 15,
        alignSelf: "flex-start",
        width: '100%'
    },
    headerLeft: {
        flex: 3,
        alignItems: 'flex-start',
        marginBottom: vh(2),
        marginLeft: vw(2)
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    name: {
        color: 'gray'
    },
    settingsButton: {
        //alignSelf: 'flex-end',
        margin: 2
    },
    text: {
        marginLeft: vw(2),
        fontSize: vh(5.5),
        fontWeight: "bold",
    },
    textSub: {
        marginLeft: vw(2),
        textAlign: 'center',
        fontSize: vh(4),
    },
    likeButton: {
        marginVertical: 16,
    },
    optionButton: {
        marginTop: vh(1.2),
        marginRight: vw(2),
        height: vh(7),
        width: vw(14),
    },
    item: {
        fontSize: 24,
        alignSelf: 'center',
    },
    exercise: {
        alignSelf: 'center',
        backgroundColor: '#E5E5E5',
        width: '80%',
        borderRadius: 10,
        padding: 5,
        margin: 5
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
)(CustomWorkout)