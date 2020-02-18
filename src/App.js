/* REACT */
import React, {Component} from 'react';
import {View, Text, StatusBar, Dimensions} from 'react-native';

/* COMPONENTS */
import Config from './components/Config';

/* STORAGE */
import AsyncStorage from '@react-native-community/async-storage';

/* PAGES */
import Home from './Home';

const {width, height} = Dimensions.get('window');

export default class extends Component {
  componentDidMount() {
    /********* TODO ************/
    /* Hides the splash screen after at least 1s */
    // setTimeout(() => {
    //   RNBootSplash.hide({duration: 250});
    // }, 1000);

    /* Fetch the config file */
    fetch(
      'http://www.meway.it/app_xml/Radio/FrequenzaCroceRossa/config-app.json',
    )
      .then(response => response.json())
      .then(responseJson => {
        let config = JSON.stringify(responseJson);
        this.storeData(config);
      })
      .catch(error => console.warn(error));
  }
  storeData = async config => {
    try {
      await AsyncStorage.setItem('config', config);
      /* TODO: INSERIRE INIT CONFIG */
      Config.init();
    } catch (e) {
      // saving error
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.slide}>
          <Home />
        </View>
      </View>
    );
  }
}

const styles = {
  slide: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
  },
};
