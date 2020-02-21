/* REACT */
import React, {PureComponent} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

/* UTILS */
import {normalize} from './components/utils';

/* LIBRARIES */
import TrackPlayer, {Capability, Event, State} from 'react-native-track-player';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMI from 'react-native-vector-icons/MaterialIcons';

export default class Home extends PureComponent {
  constructor(props) {
    super(props);
    let data = props.route.params;
    this.state = {
      buffering: false,
      downloaded: false,
      playing: false,
      artwork: null,
      data: data,
    };
  }
  //   getSong() {
  //     /* Fetch the radio API to get the current playing song */
  //     // fetch(`http://audio1.meway.tv:8009/statistics?json=1`)
  //     fetch(`${this.state.config.streamingURL}`)
  //       .then(response => response.json())
  //       .then(responseJson => {
  //         /* Get the artist and title and split them into an array */
  //         let song = responseJson.icestats.source[0].title
  //           .replace(/(.*)\s.*/gm, '$1')
  //           .split(' - ');
  //         /* Change the array into an object */
  //         song = {
  //           artist: song[0],
  //           title: song[1],
  //         };
  //         /* Fetch the iTunes API to get more parameters of the current song */
  //         fetch(
  //           `https://itunes.apple.com/search?term=${song.artist}-${song.title}`,
  //         )
  //           .then(response => response.json())
  //           .then(responseJson => {
  //             /* Get the artwork of the song */
  //             if (responseJson.results.length > 0) {
  //               artwork = responseJson.results[0].artworkUrl100;
  //               artwork = artwork.replace('100x100', '700x700');
  //               song.artwork = artwork;
  //             } else {
  //               song.artwork = null;
  //             }

  //             /* Update the state */
  //             this.setState({
  //               title: song.title,
  //               artist: song.artist,
  //               artwork: song.artwork,
  //             });
  //             /* Update the player */
  //             TrackPlayer.updateMetadataForTrack('crocerossa', song);
  //           })
  //           .catch(error => console.warn(error));
  //       })
  //       .catch(error => console.log(error));
  //   }

  //   componentDidMount() {
  //     Config.init();
  //     let config = Config.getAll();
  //     this.setState({config: config}, () => {
  //       this.getSong();
  //     });

  //     /* Set the interval every 5s */
  //     this.interval = setInterval(() => {
  //       this.getSong();
  //     }, 5000);

  //     /* Event listener for buffering */
  //     TrackPlayer.addEventListener('playback-state', playerState => {
  //       /* If buffering or connecting change the state */
  //       if (playerState.state == 6 || playerState.state == 8) {
  //         this.setState({buffering: true});
  //       } else {
  //         this.setState({buffering: false});
  //       }
  //     });
  //     TrackPlayer.addEventListener(Event.RemotePlay, () => {
  //       TrackPlayer.play();
  //       this.setState({
  //         playing: true,
  //       });
  //     });

  //     TrackPlayer.addEventListener(Event.RemoteStop, () => {
  //       TrackPlayer.stop();
  //       this.setState({
  //         playing: false,
  //       });
  //     });

  //     TrackPlayer.addEventListener(Event.RemoteDuck, ({permanent, paused}) => {
  //       if (permanent === true || paused === true) {
  //         TrackPlayer.stop();
  //         this.setState({
  //           playing: false,
  //         });
  //       }
  //     });
  //   }

  //   componentWillUnmount() {
  //     /* As soon as the components gets unloaded the interval will get cleared */
  //     clearInterval(this.interval);
  //   }
  download() {
    this.setState(() => ({downloaded: true}));
  }

  removeDownload() {
    this.setState(() => ({downloaded: false}));
  }

  playMusic() {
    this.setState({
      playing: true,
    });
    TrackPlayer.play();
  }

  pushMusic() {
    this.setState({
      playing: false,
    });
    TrackPlayer.pause();
  }

  render() {
    // if (this.state.data === null) {
    //   return null;
    // }
    return (
      <View style={styles.fullContainer}>
        {/* ARTWORK */}

        <View style={styles.artworkContainer}>
          <Image
            resizeMode="contain"
            style={{
              flex: 0.7,
              width: null,
              height: null,
            }}
            source={
              this.state.artwork === null
                ? require('./img/logo.png')
                : {
                    uri: this.state.artwork,
                  }
            }
          />
        </View>

        {/* INFO */}

        <View style={styles.infoContainer}>
          <View>
            <Text
              style={{
                fontSize: normalize(18),
                fontWeight: '300',
                fontFamily: 'Roboto',
              }}>
              {this.state.buffering ? '' : this.state.data.title}
            </Text>
            <Text
              style={{
                fontSize: normalize(16),
                fontWeight: '100',
                fontFamily: 'Roboto',
                color: 'grey',
              }}>
              {this.state.buffering ? '' : this.state.data.date}
            </Text>
          </View>
          <View style={{justifyContent: 'center'}}>
            <IconMCI
              name={this.state.downloaded === true ? 'check' : 'download'}
              style={{
                fontSize: normalize(30),
                color: this.state.downloaded === true ? '#c00' : 'black',
              }}
              onPress={() => {
                this.state.downloaded === true
                  ? this.removeDownload()
                  : this.download();
                console.warn(this.state.downloaded);
              }}
            />
          </View>
        </View>

        {/* PLAYER */}

        <View style={styles.playerContainer}>
          <IconMI name="replay-10" style={{fontSize: normalize(35)}} />
          {this.state.buffering ? (
            <ActivityIndicator size="large" color="#c00" />
          ) : (
            <IconFA
              // name={this.state.playing === true ? 'pause' : 'play'}
              name={
                this.state.playing === true ? 'pause-circle' : 'play-circle'
              }
              style={{
                fontSize: normalize(80),
                marginBottom: 30,
                color: '#c00',
              }}
              onPress={() => {
                this.state.playing === true
                  ? this.pushMusic()
                  : this.playMusic();
              }}></IconFA>
          )}
          <IconMI name="forward-10" style={{fontSize: normalize(35)}} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    margin: 30,
    marginBottom: 60,
  },
  artworkContainer: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  playerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
