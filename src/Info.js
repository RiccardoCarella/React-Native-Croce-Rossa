/* REACT */
import React, {PureComponent} from 'react';
import {Text, View, Linking, TouchableOpacity} from 'react-native';

/* COMPONENTS */
import Config from './components/Config';

/* UTILS */
import {normalize} from './components/utils';

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
        <View
          style={{
            flex: 2.5,
            padding: 10,
            justifyContent: 'flex-start',
            marginTop: normalize(30),
          }}>
          <Text
            style={{
              color: '#000',
              fontSize: normalize(20),
              textAlign: 'center',
            }}>
            {this.state.config.description}
          </Text>
          <TouchableOpacity
            style={{
              marginTop: 10,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#DDDDDD',
              padding: 10,
              flexDirection: 'row',
              backgroundColor: '#c00',
              borderRadius: 8,
            }}
            onPress={() => Linking.openURL(`${this.state.config.website}`)}>
            <Text style={{color: '#fff', fontSize: normalize(20)}}>
              Vai al sito
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
