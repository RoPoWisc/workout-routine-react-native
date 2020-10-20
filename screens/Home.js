import React from 'react';
import { StyleSheet, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native';
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
} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';

/**
 * Use any valid `name` property from eva icons (e.g `github`, or `heart-outline`)
 * https://akveo.github.io/eva-icons
 */
const HeartIcon = (props) => (
  <Icon {...props} name='heart'/>
);

const info = [
	{name: 'Workout 1', key: '\nLegz4Dayz'},
	{name: 'Workout 2', key: '\nChest Day'},
	{name: 'Workout 3', key: '\nBulk'},
	{name: 'Workout 4', key: '\nCut'},
	{name: 'Workout 5', key: '\nSuperset'},
	{name: 'Workout 6', key: '\nHIIT'},
	{name: 'Workout 7', key: '\nCore 24/7'},
	{name: 'Workout 8', key: '\nCardio'},
];

class Home extends React.Component {

    render() {
        return (
            <>
                <IconRegistry icons={EvaIconsPack}/>
                <ApplicationProvider {...eva} theme={eva.light}>
                  <Layout style={styles.header}>
                    <Layout style={styles.headerLeft}>
                      <Text style={styles.textMain} category='s1'>
                        Personal
                      </Text>
                      <Text style={styles.text} appearance='hint'>
                        Workouts
                      </Text>
                    </Layout>
                    <Layout style={styles.headerRight}>
                      <Image
                        style={styles.optionButton}
                        source={require('../assets/logo1.png')}
                      />
                    </Layout>
                  </Layout>
                  <Layout style={styles.container}>
                    <FlatList
                      data={info}
                      //horizontal
						          renderItem={({ item }) => (
							          <>
								          <Text style={styles.item}>{item.name}: {item.key}</Text>
							          </>
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
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 25,
    alignItems: 'center',
  },
  headerLeft: {
    flex: 3,
    alignItems: 'flex-start',
    marginBottom: 40,
    marginLeft: 20,
  },
  headerRight: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    justifyContent: 'flex-end',
    marginRight: 5,
  },
  textMain: {
    fontSize: 40,
    fontWeight: "bold",
  },
  optionButton: {
    height: 75,
    width: 75,
  },
  carousel: {
    flex: 1,

  },
  item: {
    paddingVertical: 30,
    paddingHorizontal: 80,
    alignSelf: 'center',
    borderWidth: 2,
    borderRadius: 40,
		borderColor: 'black',
		backgroundColor: 'white',
		fontSize: 24
	},
  text: {
    textAlign: 'center',
    fontSize: 30,
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
)(Home)