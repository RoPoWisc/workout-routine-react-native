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
        this.state = {
            workout: {
                routineName: 'Workout A',
                routineDay: 'Leg Day',
                exerciseArray: [
                    {
                        name: 'Squat',
                        totalVolume: 'Total Volume',
                        show: true,
                        sets: [
                            {weight: 225, reps: 8, checked: false},
                            {weight: 235, reps: 5, checked: false}
                        ]
                    },
                    {
                        name: 'Leg Press',
                        totalVolume: 'Total Volume',
                        show: true,
                        sets: [
                            {weight: 405, reps: 10, checked: false},
                            {weight: 335, reps: 12, checked: true},
                            {weight: 300, reps: 14, checked: false}
                        ]
                    }
                ]
            }
        }
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
    

    render() {
        
        const Checkbox = (props) => {
            const [checked, setChecked] = React.useState(props.checked);
            
            //console.log(this.state);
        
            return (
                <CheckBox
                checked={checked}
                onChange={nextChecked => setChecked(nextChecked)}
                style={{
                    width: 75,
                }}
                status='success'>
                </CheckBox>
            );
        };

        const ExerciseEntry = (exercise_entry) => {

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
                    <TextInput category='s1' style={exerciseStyles.weight}>{exercise_entry.weight}</TextInput>
                    <TextInput category='s1' style={exerciseStyles.reps}>{exercise_entry.reps}</TextInput>
                    <Checkbox checked={exercise_entry.checked}></Checkbox>
                </View>
            );
        };

        const Exercise = (exercise_object) => {

            const [showList, setShowList] = React.useState(true);

            //console.log(exercise_object);
            //console.log(this.state.workout.exerciseArray[1]);
            //console.log(this.compareExerciseObjects(exercise_object, this.state.workout.exerciseArray[1]));

            const showElementHandler = () => {
                let workoutCopy = this.state.workout;
                let i = 0;
                for (let exercise of this.state.workout.exerciseArray) {
                    if (this.compareExerciseObjects(exercise_object, exercise)) {
                        workoutCopy.exerciseArray[i] = {...workoutCopy.exerciseArray[i], show: !showList};
                        break;
                    }
                    ++i;
                }
                
                //console.log(this.state);
                console.log(showList);
                setShowList(!showList);
                //this.setState({workoutCopy})
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
                                <ExerciseEntry weight={item.weight} reps={item.reps} checked={item.checked}></ExerciseEntry>
                            )}
                        />
                    </View>}
                    <Button appearance='ghost' accessoryLeft={showList ? CollapseIcon : ExpandIcon} size='small' style={{margin: -8}} onPress={() => showElementHandler()}></Button>
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
                            alignSelf: 'center'
                        }}
                        data={this.state.workout.exerciseArray}
                        renderItem={({ item }) => (
                            
                            <Exercise 
                                name={item.name}
                                totalVolume={item.totalVolume}
                                show={item.show}
                                sets={item.sets}>

                            </Exercise>
                        )}
                    />
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