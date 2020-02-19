/* REACT */
import React, {PureComponent} from 'react';
import {Text, View} from 'react-native';

/* COMPONENTS */
import Config from './components/Config';

/* UTILS */
import {normalize} from './utils';

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
    return <View style={{flex: 1}}></View>;
  }
}
