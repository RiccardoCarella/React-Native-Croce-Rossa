/* REACT */
import React, {PureComponent} from 'react';
import {Text, View, Dimensions, Platform, PixelRatio} from 'react-native';

/* COMPONENTS */
import Config from './components/Config';

/* UTILS */
import {normalize} from './utils';

/* LIBRARIES */
import FlexImage from 'react-native-flex-image';

export default class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      config: null,
    };
  }

  componentDidMount() {
    Config.init();
    let config = Config.getAll();
    this.setState({config: config});
  }

  render() {
    if (this.state.config === null) {
      return null;
    }
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View
          style={{
            flex: 2,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}>
          <FlexImage
            style={{flex: 0.8}}
            source={require('./img/logo-payload.png')}
          />
        </View>
        <View style={{flex: 2.5, padding: 10, justifyContent: 'center'}}>
          <Text
            style={{
              color: '#000',
              fontSize: normalize(20),
              textAlign: 'center',
            }}>
            {this.state.config.description}
          </Text>
        </View>
      </View>
    );
  }
}
