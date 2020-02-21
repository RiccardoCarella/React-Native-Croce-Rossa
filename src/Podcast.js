/* REACT */
import React, {PureComponent} from 'react';
import {Text, View, ScrollView, Button} from 'react-native';

/* COMPONENTS */
import Config from './components/Config';
import PodcastBox from './components/PodcastBox';

/* UTILS */
import {normalize} from './components/utils';

export default class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
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
        <ScrollView style={{marginTop: 10}}>
          {/* <PodcastBox data={data} /> */}
          <PodcastBox navigation={this.props.navigation} />
        </ScrollView>
      </View>
    );
  }
}
