/* REACT */
import React, {PureComponent} from 'react';
import {AsyncStorage} from 'react-native';

let _config = {};

const Config = {
  //   init: function() {
  //     config = JSON.parse();
  //   },
  init: function() {
    try {
      let stringConfig = AsyncStorage.getItem('config');
      config = JSON.parse(stringConfig);
    } catch (e) {
      config = require('../../config-app.json');
    }
    _config = config;
    return config;
  },
  get: function(key) {
    return _config[key];
  },
  getAll: function() {
    return _config;
  },
};

export default Config;
