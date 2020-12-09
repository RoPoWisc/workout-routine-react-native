import { vw, vh} from 'react-native-expo-viewport-units'
const React = require('react-native');
const {StyleSheet} = React;
module.exports = StyleSheet.create({
    default: {
      backgroundColor: '#2E3A59',
    },
    container: {
      flex: 3,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: vw(2),
    },
    imagebkgnd: {
      flex: 1,
      alignSelf: 'stretch', 
      borderRadius: vw(10), 
      overflow: 'hidden', 
      justifyContent: 'flex-end', 
      alignItems: 'center',
          resizeMode: 'cover',
          opacity:.9,
        },
    header: {
      flex: 1,
      flexDirection: 'row',
      paddingTop: vh(2),
      alignItems: 'center',
    },
    headerLeft: {
      flex: 3,
      alignItems: 'flex-start',
      paddingBottom: vh(2),
      paddingLeft: vw(2),
    },
    headerRight: {
      flex: 1,
      flexDirection: 'row',
      alignSelf: 'flex-start',
      justifyContent: 'flex-end',
      paddingRight: vw(.5),
    },
    textMain: {
      paddingLeft: vw(2),
      fontSize: vh(6.5),
      fontWeight: "bold",
    },
    textIn: {
      fontSize: vh(4),
      backgroundColor:"#EFEFEF",
      color:"#032c8e",
      borderRadius:20,
      padding: vh(.5),
    },
    optionButton: {
      paddingTop: vh(1.2),
      paddingRight: vw(2),
      height: vh(7),
      width: vw(14),
    },
    carousel: {
      flex: 1,
      alignSelf: 'flex-start',
      paddingTop: vh(-3.3),
    },
    carouselTw: {
      flex: 1,
      alignSelf: 'flex-start',
      height: vh(30),
    },
    c_image: {
      height: vh(25),
      width: vw(43),
      paddingRight: vw(2),
      justifyContent: 'center',
      alignItems: 'center',
    },
    p_workouts: {
      flex: 1,
      alignItems: 'center',
      alignSelf: 'stretch',
      backgroundColor: '#013A73',
      borderTopEndRadius: 30,
      borderTopStartRadius: 30,
      paddingTop: vh(10),
      paddingHorizontal: vw(-2),
    },
    p_text: {
      fontSize: 30,
      color: 'white',
      fontWeight: 'bold',
    },
    item: {
      paddingVertical: vh(3),
      paddingHorizontal: vw(18),
      alignSelf: 'center',
      borderWidth: 2,
      borderRadius: 40,
          borderColor: 'black',
          backgroundColor: 'white',
          fontSize: 24
      },
    textSub: {
      paddingLeft: vw(2),
      textAlign: 'center',
      fontSize: vh(4.5),
    },
    likeButton: {
      paddingVertical: 16,
    },
    textPub: {
      borderColor: 'black',
      paddingLeft: vw(2),
      paddingBottom: vw(1),
      textAlign: 'left',
      fontSize: vh(2.5),
    },
    textPrv: {
      borderColor: 'black',
      paddingLeft: vw(2),
      paddingBottom: vw(1),
      textAlign: 'left',
      fontSize: vh(2.5),
    },
    textPrvErr: {
      borderColor: 'black',
      paddingLeft: vw(2),
      paddingBottom: vw(1),
      textAlign: 'left',
      fontSize: vh(2),
    },
  });