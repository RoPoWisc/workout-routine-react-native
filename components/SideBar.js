import React from 'react'
import { View, Text, StyleSheet, ScrollView, ImageBackground, Image, TouchableOpacity } from 'react-native'
import {DrawerNavigatorItems} from 'react-navigation-drawer'

export default Sidebar = props => (
    <View style={styles.container}>
      <View style={styles.name_container}>
        <Text style={styles.name_text}>Hey There!</Text>
      </View>
      <View style={styles.nav_contaniner}>
        <ScrollView>
          <DrawerNavigatorItems {...props} />
        </ScrollView>
        <TouchableOpacity
            style={styles.logo}
            //onPress={() => this.props.navigation.closeDrawer()}
            >
                <Image
                    style={styles.logo}
                    source={require('../assets/logo-wh.png')}
                />
        </TouchableOpacity>
      </View>
    </View>
)

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  name_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#013A73',
  },
  nav_contaniner: {
    backgroundColor: '#002B55',
    flex: 3,
  },
  name_text: {
      fontWeight: 'bold',
      fontSize: 40,
      color: 'white',
  },
  logo: {
      height: 80,
      width: 80,
      alignSelf: 'flex-end',
  }
})