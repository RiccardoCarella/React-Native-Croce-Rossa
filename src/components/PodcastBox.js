/* REACT */
import React, {PureComponent} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
/* LIBRARIES */
import FlexImage from 'react-native-flex-image';
/* VECTOR ICONS */
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

/* UTILS */
import {normalize} from './utils';

export default class PodcastBox extends PureComponent {
  onDowload() {
    alert('Download!');
  }
  render() {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('PodcastSingle', {
            image: null,
            title: 'TITLE PODCAST',
            date: '21/02/2020',
          })
        }
        style={styles.boxContainer}>
        <View style={styles.dataContainer}>
          <FlexImage
            style={styles.dataImage}
            source={require('../img/logo-payload.png')}
          />
          <Text style={styles.dataText}>
            Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem
            {/* Utilizzare props */}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Icon
            name="download"
            style={styles.buttonIcon}
            onPress={() => {
              this.onDowload();
            }}></Icon>
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  boxContainer: {
    backgroundColor: 'white',
    margin: 10,
    marginTop: 0,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 10,
  },
  dataContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  dataText: {flex: 3, textAlignVertical: 'center'},
  dataImage: {flex: 1},
  buttonIcon: {
    color: '#c00',
    fontSize: normalize(40),
    marginRight: 15,
  },
});
