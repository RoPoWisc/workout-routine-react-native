import React, { useState } from 'react';
import { View, ImageBackground, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native'
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
    List
} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import { set } from 'react-native-reanimated';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units'

const MenuIcon = (props) => (
    <Icon {...props} name='menu-outline' />
);

const CollapseIcon = (props) => (
    <Icon {...props} name='arrow-ios-upward-outline' />
);

const ExpandIcon = (props) => (
    <Icon {...props} name='arrow-ios-downward-outline' />
);

const RemoveIcon = (props) => (
    <Icon {...props}  name='close-circle-outline' />
  );

const exerciseStyles = StyleSheet.create({
    exercise: {
        backgroundColor: '#E5E5E5',
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

class AddExercise extends React.Component {

    constructor(props) {
        super(props)
        this.addSetHandler = this.addSetHandler.bind(this);
        this.changeTextHandler = this.changeWeightHandler.bind(this);
        this.changeRepsHandler = this.changeRepsHandler.bind(this);
        this.getDate = this.getDate.bind(this);
        this.removeSetHandler = this.removeSetHandler.bind(this);
        this.changeRoutineNameHandler = this.changeRoutineNameHandler.bind(this);
        this.changeRoutineDayHandler = this.changeRoutineDayHandler.bind(this);

        // this.state = {
        //     workout: {
        //         routineName: this.props.navigation.state.params.workoutData.routineName,
        //         routineDay: this.props.navigation.state.params.workoutData.routineDay,
        //         exerciseArray: this.props.navigation.state.params.workoutData.exerciseArray
        //     }
        // }
    }

    componentDidMount = async () => {

        let url = 'https://workout-routine-builder-api.herokuapp.com/exercises/public/'
        let bearer = 'Bearer ' + this.props.user.bearerToken;

        try {
            let response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    Accept: '/',
                    'Content-Type': 'application/json',
                    'Authorization': bearer
                },
            });
            let responseJson = await response.json();
            console.log(responseJson);
        } catch (e) {
            alert(e);
        }
        
        
        

        //this.props.navigation.navigate('DrawerNavigator')
    }

    getDate() {
        var date = new Date();
        var time = (new Date(date)).getTime();
        return time;
    }

    endWorkoutHandler = async () => {
        let bodyJSON = JSON.stringify({
            'routineName': this.state.workout.routineName,
                    'routineDay': this.state.workout.routineDay,
                    'exerciseArray': this.state.workout.exerciseArray
        });

        let url = 'https://workout-routine-builder-api.herokuapp.com/users/' + this.props.user.userServer['_id'] + '/add/workout'
        let bearer = 'Bearer ' + this.props.user.bearerToken;

        try {
            let response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    Accept: '/',
                    'Content-Type': 'application/json',
                    'Authorization': bearer
                },
                body: bodyJSON
            });
        } catch (e) {
            alert(e);
        }

        this.props.navigation.navigate('DrawerNavigator')
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

    Check = (props) => {
        const [checked, setChecked] = React.useState(props.checked);

        // TODO: Change loops to use hashmap to improve checkbox performance

        const isCheckedHandler = () => {
            let workoutCopy = this.state.workout;
            let i = 0;
            let j = 0;
            for (let exercise of this.state.workout.exerciseArray) {
                if (props.exercise_id == exercise.exercise_id) {
                    for (let entry of exercise.sets) {
                        if (entry.id == props.id) {
                            workoutCopy.exerciseArray[i].sets[j] = { ...workoutCopy.exerciseArray[i].sets[j], checked: !workoutCopy.exerciseArray[i].sets[j].checked }
                            setChecked(workoutCopy.exerciseArray[i].sets[j].checked);
                            break;
                        }
                        ++j;
                    }
                    break;
                }
                ++i;
            }
            this.setState({ workout: workoutCopy }, () => {}//console.log('updated state\n', workoutCopy)
            );
        };

        return (
            <CheckBox
                checked={checked}
                onChange={nextChecked => isCheckedHandler()}
                style={{
                    width: 75,
                }}
                status='success'>
            </CheckBox>
        );
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
        let newState = {
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

    removeSetHandler(exercise_entry, exercise_id) {
        // console.log(exercise_id);
        // console.log(exercise_entry);
        let newState = {
            ...this.state.workout
        }

        let i = 0;
        for (var exercise of this.state.workout.exerciseArray) {
            if (exercise.exercise_id == exercise_entry.exercise_id) {
                let newSetsArray = [...exercise.sets];
                let j = 0;
                console.log(exercise.sets);
                for (var set of exercise.sets) {
                    if (set.id == exercise_entry.id) {
                        break;
                    }
                    ++j;
                }
                newSetsArray.splice(j, 1);
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

        //console.log(newState);

        this.setState({ workout: newState });
    }

    changeRoutineNameHandler(name) {
        let newState = {
            ...this.state.workout
        }
        newState.routineName = name;

        console.log(name);

        this.setState({workout: newState})
    }

    changeRoutineDayHandler(day) {
        let newState = {
            ...this.state.workout
        }
        newState.routineDay = day;

        this.setState({workout: newState})
    }

    render() {

        const ExerciseEntry = (exercise_entry, exercise_id) => {
            const [weightText, setWeight] = React.useState('Weight');
            const [repText, setRep] = React.useState('Reps');

            return (
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: '#0466C880',
                    borderRadius: 8,
                    paddingTop: 3,
                    paddingBottom: 3,
                    marginVertical: 3,
                    paddingRight: 10
                }}>
                    <TextInput category='s1' style={exerciseStyles.weight} onChangeText={text => setWeight(text)} onSubmitEditing={() => this.changeWeightHandler(exercise_entry, weightText)} >{exercise_entry.weight}</TextInput>
                    <TextInput category='s1' style={exerciseStyles.reps} onChangeText={text => setRep(text)} onSubmitEditing={() => this.changeRepsHandler(exercise_entry, repText)}>{exercise_entry.reps}</TextInput>
                    <TouchableOpacity onPress={() => this.removeSetHandler(exercise_entry, exercise_entry.exercise_id)}>
                        <Icon style={{width: 25, height: 25}} fill='#DB504A' name='close-circle-outline' />
                    </TouchableOpacity>
                    
                </View>
            );
        };

        const Exercise = (exercise_object) => {

            const [showList, setShowList] = React.useState(true);

            const showElementHandler = () => {
                setShowList(!showList);
            };

            return (
                <View style={exerciseStyles.exercise}>
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
                            <Text category='s1' style={exerciseStyles.exerciseInfo}>Reps</Text>
                            <Text category='s1' style={exerciseStyles.exerciseInfo}>Remove Set</Text>
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
                <IconRegistry icons={EvaIconsPack} />
                <ApplicationProvider {...eva} theme={eva.light}>
                    <Layout style={styles.container}>
                        
                    </Layout>
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
    button2: {
        margin: 10,
        width: '80%',
        //backgroundColor: '#DB3020',
        borderRadius: 8  
    },
    button: {
        margin: 20,
        marginTop: 10,
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
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    name: {
        color: 'gray',
        fontSize: 28,
        fontWeight: 'bold'
    },
    settingsButton: {
        //alignSelf: 'flex-end',
        margin: 2
    },
    text: {
        //textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold'
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
)(AddExercise)