import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { LineChart, XAxis, YAxis, Grid } from 'react-native-svg-charts'
import { } from '../actions/user'
import {
  ApplicationProvider,
  Button,
  Icon,
  IconRegistry,
  Layout,
  Menu,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import { isRequired } from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedColorPropType';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units'

/**
 * Use any valid `name` property from eva icons (e.g `github`, or `heart-outline`)
 * https:akveo.github.io/eva-icons
 */
 const MenuIcon = (props) => (
   <React.Fragment>
     <Icon {...props} name='menu-outline'/>
   </React.Fragment>
 );

 const TopText = () => (
   <React.Fragment>
     <View style={styles.headerRow}>
       <Text style={styles.text} category = 'h1'>Your</Text>
     </View>
     <View style={styles.headerRow}>
     <Text style={styles.text} category = 's1'>Progress</Text>
     </View>
   </React.Fragment>
 )

 const data = [
   { date: new Date}
 ]

export class Progress extends React.Component {

    render() {
        const verticalContentInset = { top: 10, bottom: 10 }
        const axesSvg = { fontSize: 10, fill: 'grey' };
        
        return (
            <>
                <IconRegistry icons={EvaIconsPack}/>
                <ApplicationProvider {...eva} theme={eva.light}>
                  <Layout style={styles.header}>
                    <Layout style={styles.headerLeft}>
                      <Text style={styles.textMain} category='s1'>
                        Your
                      </Text>
                      <Text style={styles.textSub} appearance='hint'>
                        Progress
                      </Text>
                    </Layout>
                    <Layout style={styles.headerRight}>
                    <TouchableOpacity
                        style={styles.optionButton}
                        onPress={() => this.props.navigation.openDrawer()}
                        >
                          <Image
                            style={styles.optionButton}
                            source={require('../assets/options.png')}
                          />
                        </TouchableOpacity>
                    </Layout>
                    {/* <Button style={styles.likeButton} accessoryLeft={MenuIcon}>
                      LIKE
                    </Button> */}
                  </Layout>
                  <Layout style={styles.container}>
                    <Layout style={styles.bodyWeight}>
                      <Text style={styles.text}>
                        Body Weight
                      </Text>
                    </Layout>
                    <Layout style={{ height: 200, padding: 20, flexDirection: 'row' }}>
                      <YAxis
                        data={data}
                        style={{marginBottom: 30}}
                        contentInset={verticalContentInset}
                        svg={axesSvg}
                        numberOfTicks={10}
                        formatLabel={(value) => `${value}ºC`}
                      />
                      <Layout style={{ flex: 1, marginLeft: 10 }}>
                        <LineChart
                          style={{ flex: 1 }}
                          data={data}
                          svg={{ stroke: 'rgb(134, 65, 244)' }}
                          contentInset={verticalContentInset}
                        >
                          <Grid />
                        </LineChart>
                        <XAxis
                          style={{marginHorizontal: -10, height: 30}}
                          data={data}
                          formatLabel={(value, index) => index}
                          contentInset={{ left: 10, right: 10 }}
                          svg={axesSvg}
                        />
                      </Layout>
                    </Layout>
                  </Layout>
                </ApplicationProvider>
            </>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    //borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    marginTop: 25,
    alignItems: 'center',
  },
  headerLeft: {
    //borderWidth: 1,
    flex: 3,
    alignItems: 'flex-start',
    marginBottom: 40,
    marginLeft: 20,
  },
  headerRight: {
    //borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    justifyContent: 'flex-end',
    marginRight: 5,
  },
  textMain:{
    fontSize: 40,
    fontWeight: 'bold',
  },
  textSub: {
    fontSize: 30,
  },
  text: {
    fontSize: 20,
    alignSelf: 'flex-start',
    flex: 3,
    marginLeft: 20,
  },
  optionButton: {
    marginTop: vh(1.2),
    marginRight: vw(2),
    height: vh(7),
    width: vw(14),
  },
  bodyWeight: {
    //borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  graphBack: {
    backgroundColor: '#C4C4C4',
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
)(Progress)