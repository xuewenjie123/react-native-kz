'use strict';
import React, { Component, } from 'react';
import { StyleSheet, View, Image, TouchableNativeFeedback, } from 'react-native';
import Swiper from 'react-native-swiper';
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
var _navigator,_this,_state,_props;


class ComplaintDealModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      repairModal: false,
      menu: [],
    }
  }
  renderImg(){
    var imglist =  _props.imglist.map((d,index)=>(
      <TouchableOpacity key={index} style={[styles.slide,{}]} underlayColor='transparent'
        onPress={() => {}}>
        <Image style={_props.imgstyle} source={d}></Image>
      </TouchableOpacity>
    ))
    return imglist
  }
  render() {
    _this = this;
    _state = _this.state;
    _props = _this.props;
    _navigator = _this.props.navigator;
    let SwiperProps = {
      showsPagination: true,
      autoplay: true,
    }
    return (
      <View style={styles.image}>
        <Swiper horizontal={false} loop={true} showsButtons={true} style={styles.wrapper} {...SwiperProps}>
          {_props.imglist.map((d,index)=>(
            <TouchableNativeFeedback key={index} style={[styles.slide,{}]} underlayColor='transparent'
              onPress={() => {}}>
              <Image style={_props.imgstyle} source={d}></Image>
            </TouchableNativeFeedback>
          ))}
        </Swiper>
      </View>
    );
  }

};

const styles = StyleSheet.create({
  slide: {
    width:width,
    height:351*width/750,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width:width,
    height:351*width/750,
  },
  wrapper: {
  },
});

module.exports = ComplaintDealModal
