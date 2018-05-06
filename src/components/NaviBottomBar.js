'use strict';
import React, { Component, } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, } from 'react-native';
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
import color from './../constant/color';

var _navigator;

class NaviBottomBar extends Component {
  _onPushRouterFade(id,params){
    if(id){
      _navigator.resetTo({
        title:id,
        id:id,
        params:params,
        moveScene: "Fade",
      });
    }
  }
  render() {
    _navigator = this.props._navigator;
    return (
      <View style={styles.bar}>
        <View style={styles.indexbar}>
          <TouchableOpacity
            style={styles.indexTouch}
            underlayColor='transparent'
            onPress={() => {this._onPushRouterFade("Home")}}>
            <View style={styles.inner}>
              <Image style={{width: 23, height: 23,}} source={this.props.order == "home"?require('./../images/46a31.png'):require('./../images/46a3.png')}></Image>
              <Text style={{ fontSize: 11, textAlign: 'center', color: this.props.order == "home"?color.main1C:color.black2C }}>首页</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.indexbar}>
          <TouchableOpacity
            style={styles.indexTouch}
            underlayColor='transparent'
            onPress={() => {this._onPushRouterFade("Workbench")}}>
            <View style={styles.inner}>
              <Image style={{width: 23, height: 23,}} source={this.props.order == "Workbench"?require('./../images/46a41.png'):require('./../images/46a4.png')}></Image>
              <Text style={{ fontSize: 11, textAlign: 'center', color: this.props.order == "Workbench"?color.main1C:color.black2C }}>工作台</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.indexbar}>
          <TouchableOpacity
            style={styles.indexTouch}
            underlayColor='transparent'
            onPress={() => {this._onPushRouterFade("Mine")}}>
            <View style={styles.inner}>
              <Image style={{width: 23, height: 23,}} source={this.props.order == "Mine"?require('./../images/46a51.png'):require('./../images/46a5.png')}></Image>
              <Text style={{ fontSize: 11, textAlign: 'center', color: this.props.order == "Mine"?color.main1C:color.black2C }}>我</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  bar: {
    width: width,
    height: 49,
    flexDirection: 'row',
    backgroundColor: color.white2C,
    borderTopWidth: 1,
    borderColor: color.line2C,
  },
  indexbar: {
    height: 49,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  indexTouch: {
  },
  inner: {
    marginTop: 3,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

module.exports = NaviBottomBar
