/* REACT */
import React, {Component} from 'react';
import {View, Text, StatusBar, Dimensions} from 'react-native';

/* COMPONENTS */
import Config from './components/Config';

/* UTILS */
import {normalize} from './utils';

/* STORAGE */
import AsyncStorage from '@react-native-community/async-storage';

/* REACT NAVIGATOR */
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

/* VECTOR ICONS */
import Icon from 'react-native-vector-icons/Feather';

/* PAGES */
import Home from './Home';
import Info from './Info';

const {width, height} = Dimensions.get('window');
const Stack = createStackNavigator();
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
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#c00',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
          }}>
          <Stack.Screen
            name="Home"
            component={Home}
            options={({navigation}) => ({
              headerTitle: 'Frequenza Croce Rossa',
              headerRight: () => (
                <Icon
                  name="info"
                  style={{
                    color: '#fff',
                    fontSize: normalize(30),
                    marginRight: 15,
                  }}
                  onPress={() => {
                    navigation.navigate('Info');
                  }}></Icon>
              ),
            })}
          />
          <Stack.Screen name="Info" component={Info} />
        </Stack.Navigator>
      </NavigationContainer>
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
