/* REACT */
import React, {PureComponent} from 'react';
import {Text, View, AsyncStorage} from 'react-native';

/* LIBRARIES */
import FlexImage from 'react-native-flex-image';

/* COMPONENTS */
import Config from './Config';

export default class Logo extends PureComponent {
  constructor() {
    super();
    this.state = {
      configLogo: null,
    };
  }

  componentDidMount() {
    Config.init();
    let configLogo = Config.get('logo');
    this.setState({configLogo: configLogo});
  }
  render() {
    /* If the config is not loaded yet, the component will not be displayed */
    if (this.state.configLogo === null) {
      return null;
    }
    return (
      <View
        style={{
          paddingTop: 30,
          paddingBottom: 30,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <FlexImage style={{flex: 0.3}} source={require('../img/logo.png')} />
      </View>
    );
  }
}
