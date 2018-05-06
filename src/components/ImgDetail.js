'use strict';
import React, { Component, } from 'react';
import { StyleSheet, View, Image, TouchableWithoutFeedback, Modal, } from 'react-native';
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
var _navigator;


class ImgDetail extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var props = this.props;
    var modalProps = {
      animationType: 'fade',
      transparent: true,
      visible: props.visible,
      onRequestClose:()=>{},
    }
    return (
      <Modal {...modalProps} >
        <View style={{position: 'absolute', width: width, height: height, backgroundColor: "#000", opacity: .7,}}>
        </View>
        <TouchableWithoutFeedback style={{flex: 1,justifyContent: 'center',alignItems: 'center',}}
          onPress={() => props.onClose()}>
          <Image resizeMode="contain" style={{width: width, height: height,}} source={{uri: props.imgUrl}}></Image>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
};

module.exports = ImgDetail
