import React, { useState } from 'react';
import { View, ImageBackground, StyleSheet, TouchableOpacity, Image } from 'react-native'
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

var squat_array = [
    {weight: 225, reps: 8},
    {weight: 235, reps: 5}
]

var squat = {
    name: 'Squat',
    totalVolume: 'Total Volume',
    sets: squat_array
}

var legpress_array = [
    {weight: 405, reps: 10},
    {weight: 335, reps: 12},
    {weight: 300, reps: 14}
]

var legpress = {
    name: 'Leg Press',
    totalVolume: 'Total Volume',
    sets: legpress_array
}

var workout = {
    routineName: 'Workout A',
    routineDay: 'Leg Day',
    exerciseArray: [
        squat,
        legpress
    ]
}

const MenuIcon = (props) => (
    <Icon {...props} name='menu-outline'/>
);

const Checkbox = () => {
    const [checked, setChecked] = React.useState(false);

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
            <Text category='s1' style={exerciseStyles.weight}>{exercise_entry.weight}</Text>
            <Text category='s1' style={exerciseStyles.reps}>{exercise_entry.reps}</Text>
            <Checkbox style={{}}></Checkbox>
        </View>
    );
};

const Exercise = (exercise_object) => {

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
                    <ExerciseEntry weight={item.weight} reps={item.reps}></ExerciseEntry>
                )}
            />


        </View>
    );
};

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

    render() {
        return (
            <>
                <IconRegistry icons={EvaIconsPack}/>
                <ApplicationProvider {...eva} theme={eva.light}>
                  <Layout style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.topBar}>
                            <Text style={styles.text} category='h1'>
                                {workout.routineName}
                            </Text>
                            <Button style={styles.settingsButton} appearance='outline' accessoryLeft={MenuIcon}></Button>
                        </View>
                        <Text style={styles.name} category='h5'>
                            {workout.routineDay}
                        </Text>
                    </View>

                    <List
                        style={{
                            backgroundColor: '#FFFFFF',
                            width: '100%',
                            marginLeft: 15,
                            alignSelf: 'center'
                        }}
                        data={workout.exerciseArray}
                        renderItem={({ item }) => (
                            <Exercise 
                                name={item.name}
                                totalVolume={item.totalVolume}
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