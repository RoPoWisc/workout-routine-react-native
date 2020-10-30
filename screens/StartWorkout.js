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

const MenuIcon = (props) => (
    <Icon {...props} name='menu-outline'/>
);

const CollapseIcon = (props) => (
    <Icon {...props} name='arrow-ios-upward-outline'/>
);

const ExpandIcon = (props) => (
    <Icon {...props} name='arrow-ios-downward-outline'/>
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

class StartWorkout extends React.Component {

    constructor(props) {
        super(props)
        this.addSetHandler = this.addSetHandler.bind(this);
        this.changeTextHandler = this.changeWeightHandler.bind(this);
        this.changeRepsHandler = this.changeRepsHandler.bind(this);
        this.getDate = this.getDate.bind(this);

        this.state = {
            workout: {
                routineName: 'Workout A',
                routineDay: 'Leg Day',
                exerciseArray: [
                    {
                        exercise_id: 'squat1',
                        name: 'Squat',
                        totalVolume: 'Total Volume',
                        show: true,
                        sets: [
                            {weight: 225, reps: 8, checked: false, id: '1'},
                            {weight: 235, reps: 5, checked: false, id: '2'}
                        ]
                    },
                    {
                        exercise_id: 'lpress1',
                        name: 'Leg Press',
                        totalVolume: 'Total Volume',
                        show: true,
                        sets: [
                            {weight: 405, reps: 10, checked: false, id: '3'},
                            {weight: 335, reps: 12, checked: true, id: '4'},
                            {weight: 300, reps: 14, checked: false, id: '5'}
                        ]
                    }
                ]
            }
        }
    }

    getDate() {
        var date = new Date();
        var time = (new Date(date)).getTime();
        return time;
    }

    loginHandler = async () => {
		try{
			if(this.props.user.email === undefined){
				throw "Email is Required!"
			}
			if(this.props.user.password === undefined){
				throw "Password is Required!"
			}
		let response = await fetch('https://workout-routine-builder-api.herokuapp.com/auth' , {
		method: 'POST',
		headers: {
			Accept: '/',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email:this.props.user.email,
			password:this.props.user.password
		})});
		let responseJson = await response.json();
		// console.log("The following is responseJson:\n")
		// console.log(JSON.stringify(responseJson))
		//This saves to this.props.user.userServer
		//you can refer to data by using this.props.user.userServer
			//this.props.user.userServer.email
			//this.props.user.userServer.firstName
			//this.props.user.userServer.lastName
			//this.props.user.userServer.timestamp
			console.log(JSON.stringify(responseJson))
			if(typeof responseJson.userObj != "undefined") {
				this.props.fetchUserObj(responseJson.userObj);
			}else{
				alert(responseJson.message);
			}
		//alert(this.props.user.userServer);
		if(this.props.user.userServer !== undefined){
			this.props.navigation.navigate('DrawerNavigator')
		}
		} catch (e) {
			alert(e);
		}
	}

    addSetHandler(exercise_object) {
        exercise_object.sets.push({weight: 'Weight', reps: 'Reps', checked: 'false', id: this.getDate()});

        let newArray = this.state.workout.exerciseArray.map(element => element.exercise_id == exercise_object.exercise_id ? {...element, sets: exercise_object.sets} : element);

        let state = {
            workout: {
                ...this.state.workout,
                exerciseArray: newArray,
            }
        }
        console.log(state);
        this.setState({workout: state.workout}, console.log(this.state.workout.exerciseArray));
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
                            workoutCopy.exerciseArray[i].sets[j] = {...workoutCopy.exerciseArray[i].sets[j], checked: !workoutCopy.exerciseArray[i].sets[j].checked}
                            setChecked(workoutCopy.exerciseArray[i].sets[j].checked);
                            break;
                        }
                        ++j;
                    }
                    break;
                }
                ++i;
            }
            this.setState({workout: workoutCopy}, () => console.log('updated state\n', workoutCopy));
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
            //console.log(exercise.exercise_id);
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

        this.setState({workout: newState});
    }

    changeRepsHandler(exercise_entry, text) {

        let newSetsArray;
        newState = {
            ...this.state.workout
        }

        //console.log(exercise_entry);

        let i = 0;
        for (var exercise of this.state.workout.exerciseArray) {
            if (exercise.exercise_id == exercise_entry.exercise_id) {
                //console.log(exercise);
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

        console.log('\n\n\n\n\n', newState);
        this.setState({workout: newState});
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
                    marginVertical: 3
                }}>
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
                            <Text category='s1' style={exerciseStyles.exerciseInfo}>Set Complete?</Text>
                        </View>
        
                        <List
                            style={{backgroundColor: '#E5E5E5'}}
                            data={exercise_object.sets}
                            renderItem={({ item }) => (
                                <ExerciseEntry weight={item.weight} reps={item.reps} checked={item.checked} id={item.id} exercise_id={exercise_object.exercise_id}></ExerciseEntry>
                            )}
                        />
                        <Button style={{marginVertical: 3}} appearance={'outline'} size={'small'} onPress={() => this.addSetHandler(exercise_object)}>Add Set</Button>
                    </View>}
                    <Button appearance='ghost' accessoryLeft={showList ? CollapseIcon : ExpandIcon} size='small' style={{margin: -8}} onPress={() => showElementHandler(exercise_object.exercise_id)}></Button>
                </View>
            );
        };

        return (
            <>
                <IconRegistry icons={EvaIconsPack}/>
                <ApplicationProvider {...eva} theme={eva.light}>
                  <Layout style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.topBar}>
                            <Text style={styles.text} category='h1'>
                                {this.state.workout.routineName}
                            </Text>
                            <Button style={styles.settingsButton} appearance='outline' accessoryLeft={MenuIcon}></Button>
                        </View>
                        <Text style={styles.name} category='h5'>
                            {this.state.workout.routineDay}
                        </Text>
                    </View>

                    <List
                        style={{
                            backgroundColor: '#FFFFFF',
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
                    />
                    <Button style={styles.button}>
                        End Workout
                    </Button>
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
  button: {
    margin: 20,
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
)(StartWorkout)