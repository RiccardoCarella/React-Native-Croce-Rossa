/* REACT */
import React, {PureComponent} from 'react';
import {Text, View, Dimensions, Platform, PixelRatio} from 'react-native';

/* COMPONENTS */
import Config from './components/Config';

/* LIBRARIES */
import FlexImage from 'react-native-flex-image';

/* Font scale */
const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 360;
function normalize(size) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

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
          }}>
          <FlexImage
            style={{flex: 0.8}}
            source={require('./img/logo-payload.png')}
          />
        </View>
        <View style={{flex: 2.5, padding: 10}}>
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
