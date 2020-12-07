import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { StackedAreaChart, YAxis, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { } from '../actions/user'
import {
  ApplicationProvider,
  Icon,
  IconRegistry,
  Layout,
  Text,
} from '@ui-kitten/components';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units'
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
const style = require('../styles/global');
let inx = -1;
export class Progress extends React.Component {
    render() {
      const data = [
        {
            month: new Date(2015, 0, 1),
            apples: 38,
            bananas: 19,
            cherries: 9,
            dates: 4,
        },
        {
            month: new Date(2015, 1, 1),
            apples: 15,
            bananas: 5,
            cherries: 2,
            dates: 1,
        },
        {
            month: new Date(2015, 2, 1),
            apples: 6,
            bananas: 9,
            cherries: 36,
            dates: 40,
        },
        {
            month: new Date(2015, 3, 1),
            apples: 33,
            bananas: 4,
            cherries: 6,
            dates: 4,
        },
    ]

    const colors = [
        'rgba(98, 153, 209, 1)',
        'rgba(98, 153, 209, 0.8)',
        'rgba(98, 153, 209, 0.6)',
        'rgba(98, 153, 209, 0.4)',
    ]
    const displColors = [
      {key:'rgba(98, 153, 209, 1)'},
      {key:'rgba(98, 153, 209, 0.8)'},
      {key:'rgba(98, 153, 209, 0.6)'},
      {key:'rgba(98, 153, 209, 0.4)'},
  ]
    const clr = (this.props.user['darkMode']) ?'white':'black';
    const keys = ['apples', 'bananas', 'cherries', 'dates']
        return (
            <>
                <IconRegistry icons={EvaIconsPack}/>
                <ApplicationProvider {...eva} theme={(this.props.user['darkMode']) ? eva.dark : eva.light}>
                  <Layout style={style.header}>
                    <Layout style={style.headerLeft}>
                      <Text style={style.textMain} category='s1'>
                        Your
                      </Text>
                      <Text style={style.textSub} appearance='hint'>
                        Progress
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
                    <Layout style={styles.bodyWeight}>
                      <Text style={styles.chartTitle}>
                        Most Recent Workout
                      </Text>
                    </Layout>
                    <Layout style={styles.chartLayout}>
                      <StackedAreaChart
                      style={styles.chart}
                      contentInset={{ top: 10, bottom: 10 }}
                      data={data}
                      keys={keys}
                      colors={colors}
                      curve={shape.curveNatural}
                      >
                      </StackedAreaChart>
                      <YAxis
                          style={{ position: 'absolute', color: 'black', top: 0, bottom: 0 }}
                          data={StackedAreaChart.extractDataPoints(data, keys)}
                          contentInset={{ top: 10, bottom: 10 }}
                          svg={{
                              fontSize: vh(0.9),
                              fill: clr,
                              stroke: clr,
                              strokeWidth: 0.1,
                              alignmentBaseline: 'baseline',
                              baselineShift: '3',
                          }}
                      />
                    </Layout>
                    <Layout style={styles.legend}>
                    <Text style={styles.legendTitle}>
                        Legend
                      </Text>
                      {colors.map((prop, key) => {
                        //defaultBox.backgroundColor = itm;
                        inx++;
                        return (
                          <View style={{flex: 1,flexDirection: 'row',alignSelf: 'flex-start',}}>
                          <View style={{marginBottom: vh(2),
                            width: vw(5),
                            height: vw(5),
                            backgroundColor: prop}}/>
                            <Text style={{paddingLeft:vw(4)}}>{keys[inx]}</Text>
                          </View>
                        );
                      })}
                    </Layout>
                  </Layout>
                </ApplicationProvider>
            </>
        )
    }
}

const styles = StyleSheet.create({
  bodyWeight: {
    paddingLeft: vw(2),
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  chartTitle: {
    fontSize: vh(3.5),
  },
  legendTitle:{
    paddingBottom: vh(2),
    fontSize: vh(2.5),
  },
  chartLayout: {
    paddingLeft: vw(3),
    paddingRight: vw(2),
    position: 'absolute',
		top: vh(10),
  },
  legend: {
    position: 'absolute',
    top: vh(30),
    left: vw(4)
  },
  legendBox:{
    marginBottom: vh(2),
    width: vw(5),
    height: vw(5),
    backgroundColor: 'rgba(1, 58, 115, 1)'
  },
  chart: {
    height: vh(15), 
    width: vw(85)
  },
  graphBack: {
    backgroundColor: '#C4C4C4',
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