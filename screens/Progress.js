import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ProgressCircle } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { } from '../actions/user'
import {
  ApplicationProvider,
  Icon,
  IconRegistry,
  Layout,
  Text,
  Card, 
  Modal, 
  Spinner
} from '@ui-kitten/components';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units'
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
const style = require('../styles/global');
const datesAreOnSameMonth = (first, second) =>
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth()
const datesAreOnSameDay = (first, second) =>
    datesAreOnSameMonth(first,second) &&
    first.getDate() === second.getDate();
const now = new Date();
export class Progress extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        data: {},
        loading: true
      }
    }
    componentDidMount = async () => {
      try {
        let bearer = 'Bearer ' + this.props.user.bearerToken;
        //populate exercises
        let response = await fetch('https://workout-routine-builder-api.herokuapp.com/users/stats' , {
        method: 'POST',
        headers: {
            Accept: '/',
            'Content-Type': 'application/json',
            'Authorization': bearer
          },
          body: JSON.stringify({
            _owner: this.props.user.userId,
          })
        });
        let data = {month:0,daily:0};
        let responseJson = await response.json();
        responseJson = responseJson.success;
        responseJson[0]["completed"].forEach((itm)=>{
          data.month = datesAreOnSameMonth(now,new Date(itm))?data.month+1:data.month;
          data.daily = datesAreOnSameDay(now,new Date(itm))?data.daily+1:data.daily;
        });
        this.setState({data:data, loading:false});
      } catch (e) {
        alert(e);
      }
    }
    render() {
    const clr = (this.props.user['darkMode']) ?'white':'black';
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
                        Monthly Workout Goal
                      </Text>
                    </Layout>
                    {(this.state.loading) ? 
                  <Modal visible={this.state.loading}>
                    <Card disabled={true}>
                      <Spinner/>
                    </Card>
                  </Modal>:
                    <Layout style={styles.chartLayout}>
                      <ProgressCircle
                          style={ styles.chart }
                          progress={ this.state.data.month/30 }
                          progressColor={'rgba(98, 153, 209, 1)'}
                          startAngle={ -Math.PI * 0.8 }
                          endAngle={ Math.PI * 0.8 }
                      >
                      </ProgressCircle>
                      <Text style={styles.chartInner}>{this.state.data.month}</Text>
                    </Layout>
                    }
                    <Layout style={styles.bodyWeight}>
                      <Text style={styles.chartDailyTitle}>
                        Daily Workout Goal
                      </Text>
                    </Layout>
                    {(this.state.loading) ? 
                    <Modal visible={this.state.loading}>
                      <Card disabled={true}>
                        <Spinner/>
                      </Card>
                    </Modal>:                    
                    <Layout style={styles.chartDailyLayout}>
                      <ProgressCircle
                          style={ styles.chart }
                          progress={ this.state.data.daily }
                          progressColor={'rgba(98, 153, 209, 1)'}
                          startAngle={ -Math.PI * 0.8 }
                          endAngle={ Math.PI * 0.8 }
                      >
                      </ProgressCircle>
                      <Text style={styles.chartDailyInner}>{this.state.data.daily}</Text>
                    </Layout>
                  }
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
    width:vw(100),
    left: vw(10)
  },
  chartLayout: {
    paddingLeft: vw(3),
    paddingRight: vw(2),
    position: 'absolute',
		top: vh(10),
  },
  chartDailyTitle: {
    fontSize: vh(3.5),
    width:vw(100),
    left: vw(15)
  },
  chartDailyLayout: {
    position: 'absolute',
    top: vh(45),
  },
  chart: {
    height: vh(15), 
    width: vw(85)
  },
  chartInner: {
    fontSize: vh(3.5),
    position:'absolute',
    marginLeft:vw(43),
    marginTop:vh(10)
  },
  chartDailyInner: {
    fontSize: vh(3.5),
    position:'absolute',
    marginLeft:vw(41),
    marginTop:vh(10)
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