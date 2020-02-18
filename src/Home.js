/* REACT */
import React, {PureComponent} from 'react';
import {Text, View} from 'react-native';
/* COMPONENTS */
import Logo from './components/Logo';
import Player from './components/Player';

export default class Home extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        {/* <Logo /> */}
        <Player />
      </View>
    );
  }
}
