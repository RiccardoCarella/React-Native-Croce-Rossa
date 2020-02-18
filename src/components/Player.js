/* REACT */
import React, {PureComponent} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Share,
} from 'react-native';
/* COMPONENTS */
import Config from './Config';

/* UTILS */
import {normalize} from '../utils';

/* LIBRARIES */
import TrackPlayer, {Capability, Event, State} from 'react-native-track-player';
import Icon from 'react-native-vector-icons/FontAwesome';

// Creates the player
TrackPlayer.setupPlayer().then(async () => {
  await TrackPlayer.updateOptions({
    stopWithApp: true,
    capabilities: [
      // TrackPlayer.CAPABILITY_PLAY,
      // TrackPlayer.CAPABILITY_PAUSE,
      Capability.Play,
      Capability.Stop,
    ],
    compactCapabilities: [Capability.Play, Capability.Stop],
  });

  // Adds a track to the queue
  await TrackPlayer.add({
    id: 'crocerossa',
    url: 'http://94.23.66.114:8066/live',
    title: 'Track Title',
    artist: 'Track Artist',
    artwork: require('../img/logo.png'),
  });
});

export default class Player extends PureComponent {
  constructor(props) {
    super(props);
    /* Check if the player is playing */
    let isPlaying = TrackPlayer.getState().then(state => {
      isPlaying = state === 3 ? true : false;
      this.setState({playing: isPlaying});
    });
    this.state = {
      buffering: false,
      playing: isPlaying,
      artist: '',
      title: '',
      artwork: null,
      config: null,
    };
  }

  getSong() {
    /* Fetch the radio API to get the current playing song */
    // fetch(`http://audio1.meway.tv:8009/statistics?json=1`)
    fetch(`${this.state.config.streamingURL}`)
      .then(response => response.json())
      .then(responseJson => {
        /* Get the artist and title and split them into an array */
        let song = responseJson.icestats.source[0].title
          .replace(/(.*)\s.*/gm, '$1')
          .split(' - ');
        /* Change the array into an object */
        song = {
          artist: song[0],
          title: song[1],
        };
        /* Fetch the iTunes API to get more parameters of the current song */
        fetch(
          `https://itunes.apple.com/search?term=${song.artist}-${song.title}`,
        )
          .then(response => response.json())
          .then(responseJson => {
            /* Get the artwork of the song */
            if (responseJson.results.length > 0) {
              artwork = responseJson.results[0].artworkUrl100;
              artwork = artwork.replace('100x100', '700x700');
              song.artwork = artwork;
            } else {
              song.artwork = null;
            }

            /* Update the state */
            this.setState({
              title: song.title,
              artist: song.artist,
              artwork: song.artwork,
            });
            /* Update the player */
            TrackPlayer.updateMetadataForTrack('crocerossa', song);
          })
          .catch(error => console.warn(error));
      })
      .catch(error => console.log(error));
  }

  componentDidMount() {
    Config.init();
    let config = Config.getAll();
    this.setState({config: config}, () => {
      this.getSong();
    });

    /* Set the interval every 5s */
    this.interval = setInterval(() => {
      this.getSong();
    }, 5000);

    /* Event listener for buffering */
    TrackPlayer.addEventListener('playback-state', playerState => {
      /* If buffering or connecting change the state */
      if (playerState.state == 6 || playerState.state == 8) {
        this.setState({buffering: true});
      } else {
        this.setState({buffering: false});
      }
    });
    TrackPlayer.addEventListener(Event.RemotePlay, () => {
      TrackPlayer.play();
      this.setState({
        playing: true,
      });
    });

    TrackPlayer.addEventListener(Event.RemoteStop, () => {
      TrackPlayer.stop();
      this.setState({
        playing: false,
      });
    });

    TrackPlayer.addEventListener(Event.RemoteDuck, ({permanent, paused}) => {
      if (permanent === true || paused === true) {
        TrackPlayer.stop();
        this.setState({
          playing: false,
        });
      }
    });
  }

  componentWillUnmount() {
    /* As soon as the components gets unloaded the interval will get cleared */
    clearInterval(this.interval);
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
    TrackPlayer.stop();
  }

  render() {
    if (this.state.config === null) {
      return null;
    }
    return (
      <View style={styles.fullContainer}>
        <View style={styles.artworkContainer}>
          <Image
            resizeMode="contain"
            style={styles.artwork}
            source={
              this.state.artwork === null
                ? require('../img/logo.png')
                : {
                    uri: this.state.artwork,
                  }
            }
          />
        </View>
        <View style={styles.infoContainer}>
          {this.state.buffering ? (
            <ActivityIndicator size="large" color="#d3d3d3" />
          ) : (
            <Icon
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
              }}></Icon>
          )}
          <Text style={styles.title}>
            {this.state.buffering ? '' : this.state.title}
          </Text>
          <Text style={styles.artist}>
            {this.state.buffering ? '' : this.state.artist}
          </Text>
        </View>
        <View
          style={{
            flex: 0.4,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#DDDDDD',
              padding: 10,
              flexDirection: 'row',
              backgroundColor: '#c00',
              borderRadius: 8,
            }}>
            <Icon
              name="share-alt"
              style={{color: '#fff', marginRight: 10, fontSize: normalize(20)}}
            />
            <Text style={{color: '#fff', fontSize: normalize(20)}}>
              Condividi
            </Text>
          </TouchableOpacity>
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
    marginBottom: 60,
  },
  artworkContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  artwork: {
    flex: 0.5,
    width: null,
    height: null,
  },
  title: {
    fontSize: normalize(24),
    fontWeight: '300',
    fontFamily: 'Roboto',
    paddingLeft: 15,
    paddingRight: 15,
    textAlign: 'center',
  },
  artist: {
    fontSize: normalize(20),
    fontWeight: '100',
    fontFamily: 'Roboto',
    color: 'grey',
    paddingLeft: 15,
    paddingRight: 15,
    textAlign: 'center',
  },
});
