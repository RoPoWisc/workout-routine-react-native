import React, {  } from 'react';
import { View,  StyleSheet, TextInput } from 'react-native'
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
    Modal,
    Spinner,
    Card
} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';

import { vw, vh} from 'react-native-expo-viewport-units'

const MenuIcon = (props) => (
    <Icon {...props} name='menu-outline' />
);

const CollapseIcon = (props) => (
    <Icon {...props} name='arrow-ios-upward-outline' />
);

const ExpandIcon = (props) => (
    <Icon {...props} name='arrow-ios-downward-outline' />
);

export class Workout extends React.Component {

    constructor(props) {
        super(props)
        this.addSetHandler = this.addSetHandler.bind(this);
        this.changeTextHandler = this.changeWeightHandler.bind(this);
        this.changeRepsHandler = this.changeRepsHandler.bind(this);
        this.getDate = this.getDate.bind(this);
        this.getBackgroundStyles = this.getBackgroundStyles.bind(this);

        //console.log(JSON.stringify(this.props.navigation.state.params.workoutData))

        this.state = {
            loading: false,
            workout: {
                routineName: this.props.navigation.state.params.workoutData.routineName,
                routineDay: this.props.navigation.state.params.workoutData.routineDay,
                exerciseArray: this.props.navigation.state.params.workoutData.exerciseArray
            }
        }

        console.log(this.state);
    }

    getBackgroundStyles() {
        if (this.props.user['darkMode']) {
            return {backgroundColor: '#58688F'}
        } else {
            return {backgroundColor: '#E5E5E5'}
        }
    }

    getAddSetStatus() {
        if (this.props.user['darkMode']) {
            return 'control';
        }
    }

    getEntryStyle() {
        if (this.props.user['darkMode']) {
            return {
                backgroundColor: '#8A9DC7',
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderRadius: 8,
                paddingTop: 3,
                paddingBottom: 3,
                marginVertical: 3
            }
        } else {
            return {
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: '#0466C880',
                borderRadius: 8,
                paddingTop: 3,
                paddingBottom: 3,
                marginVertical: 3
            }
        }
    }

    componentDidMount = async () => {
        
    }

    getDate() {
        var date = new Date();
        var time = (new Date(date)).getTime();
        return time;
    }

    endWorkoutHandler = async () => {
        await new Promise(resolve => this.setState({ loading: true }, () => resolve()))
        let bodyJSON = JSON.stringify({
            'routineName': this.state.workout.routineName,
                    'routineDay': this.state.workout.routineDay,
                    'exerciseArray': this.state.workout.exerciseArray
        });

        let url = 'https://workout-routine-builder-api.herokuapp.com/users/' + this.props.user.userId + '/add/workout'
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
    
    cancelWorkout = async () =>{
        this.setState({loading: true});
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
        this.setState({ workout: state.workout }, ////console.log(this.state.workout.exerciseArray)
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
            this.setState({ workout: workoutCopy }, () => {}////console.log('updated state\n', workoutCopy)
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

        const ExerciseEntry = (exercise_entry, exercise_id) => {
            const [weightText, setWeight] = React.useState('Weight');
            const [repText, setRep] = React.useState('Reps');

            return (
                <View style={[{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: '#0466C880',
                    borderRadius: 8,
                    paddingTop: 3,
                    paddingBottom: 3,
                    marginVertical: 3
                }], this.getEntryStyle()}>
                    <TextInput category='s1' style={exerciseStyles.weight} onChangeText={text => setWeight(text)} onSubmitEditing={() => this.changeWeightHandler(exercise_entry, weightText)} >{exercise_entry.weight}</TextInput>
                    <TextInput category='s1' style={exerciseStyles.reps} onChangeText={text => setRep(text)} onSubmitEditing={() => this.changeRepsHandler(exercise_entry, repText)}>{exercise_entry.reps}</TextInput>
                    <this.Check checked={exercise_entry.checked} id={exercise_entry.id} exercise_id={exercise_entry.exercise_id}></this.Check>
                </View>
            );
        };

        const Exercise = (exercise_object) => {

            const [showList, setShowList] = React.useState(true);

            const showElementHandler = () => {
                setShowList(!showList);
            };

            return (
                <View style={[exerciseStyles.exercise, this.getBackgroundStyles()]}>
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
                            <Text category='s1' style={exerciseStyles.exerciseInfo}>Set Complete?</Text>
                        </View>

                        <List
                            style={this.getBackgroundStyles()}
                            data={exercise_object.sets}
                            renderItem={({ item }) => (
                                <ExerciseEntry weight={item.weight} reps={item.reps} checked={item.checked} id={item.id} exercise_id={exercise_object.exercise_id}></ExerciseEntry>
                            )}
                        />
                        <Button style={[{marginVertical: 3}]} status={this.getAddSetStatus()} appearance={'outline'} size={'small'} onPress={() => this.addSetHandler(exercise_object)}>Add Set</Button>
                    </View>}
                    <Button appearance='ghost' accessoryLeft={showList ? CollapseIcon : ExpandIcon} status={this.getAddSetStatus()} size='small' style={{ margin: -8 }} onPress={() => showElementHandler(exercise_object.exercise_id)}></Button>
                </View>
            );
        };

        return (
            <>
                <IconRegistry icons={EvaIconsPack} />
                <ApplicationProvider {...eva} theme={(this.props.user['darkMode']) ? eva.dark : eva.light}>
                    <Layout style={styles.container}>
                        <View style={styles.header}>
                            <View style={styles.topBar}>
                                <Text style={styles.text} category='h1'>
                                    {this.state.workout.routineName}
                                </Text>
                            </View>
                            <Text style={styles.name} category='h5'>
                                {this.state.workout.routineDay}
                            </Text>
                        </View>
                    <List
                        style={{
                            width: '93%',
                            alignSelf: 'center',
                            borderRadius: 10,
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
                    />
                    <Layout style={{flexDirection: 'row', height:vh(5),marginTop:vh(2),marginBottom:vh(2)}}>
                    <Button style={styles.button} onPress={() => this.endWorkoutHandler()}>
                        End Workout
                    </Button>
                    <Button style={styles.button} onPress={()=>this.cancelWorkout()}>
                        Cancel
                    </Button>
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
        flex: 1,
        paddingTop: 30,
        //justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: vw(40),
        marginLeft: vw(2),
        marginRight: vw(2),
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
        color: 'gray'
    },
    settingsButton: {
        //alignSelf: 'flex-end',
        margin: 2
    },
    text: {
        //textAlign: 'center',
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
const exerciseStyles = StyleSheet.create({
    exercise: {
        backgroundColor: 'rgba(98, 153, 209, 1)',
        width: '100%',
        borderRadius: 10,
        alignSelf: 'center',
        padding: 5,
        marginBottom:vh(2)
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
)(Workout)