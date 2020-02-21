/* REACT */
import React, {PureComponent} from 'react';
import {Text, View, ScrollView} from 'react-native';

/* UTILS */
import {normalize} from './components/utils';

export default class Home extends PureComponent {
  constructor(props) {
    super(props);
    let data = props.route.params;
    this.state = {
      data: data,
      config: null,
    };
  }

  componentDidMount() {
    // Config.init();
    // let config = Config.getAll();
    // this.setState({config: config});
    /***** FETCH DATA FROM PODCAST JSON AND SAVE IT IN STATE, THEN PASS IT TO PodcastBox COMPONENT ******/
  }

  render() {
    // if (this.state.config === null) {
    //   return null;
    // }
    return (
      <View style={{flex: 1}}>
        <Text>{this.state.data.title}</Text>
      </View>
    );
  }
}
