import React from 'react';
import { StyleSheet } from 'react-native';
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
const MenuIcon = (props) => (
  <Icon {...props} name='menu-outline'/>
);

class Home extends React.Component {

    render() {
        return (
            <>
                <IconRegistry icons={EvaIconsPack}/>
                <ApplicationProvider {...eva} theme={eva.light}>
                  <Layout style={styles.container}>
                    <Text style={styles.text} category='h1'>
                      Welcome to UI Kitten 😻
                    </Text>
                    <Text style={styles.text} category='s1'>
                      Start with editing App.js to configure your App
                    </Text>
                    <Text style={styles.text} appearance='hint'>
                      For example, try changing theme to Dark by using eva.dark
                    </Text>
                    <Button style={styles.likeButton} accessoryLeft={MenuIcon}>
                      LIKE
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
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