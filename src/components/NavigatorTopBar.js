'use strict';
import React, { Component, } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, StatusBar, } from 'react-native';
import NaviMsgBar from './NaviMsgBar';
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
import color from './../constant/color';

class NavigatorTopBar extends Component {
  render() {
    var _props = this.props;
    var MsgProps = {
      navigator:_props.navigator
    }
    return (_props.visible)?(
      <View style={styles.bar}>
        <View style={styles.leftbar}>
          {_props.leftView?_props.leftView:null}
        </View>
        <View style={styles.titlebar}>
          <Text style={styles.title}>
            {_props.title}
          </Text>
        </View>
        <View style={styles.rightbar}>
          {_props.rightView?_props.rightView:(
            <NaviMsgBar {...MsgProps}/>
          )}
        </View>
      </View>
    ):(
      <View style={styles.nobar}>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  nobar: {
    flex: 0,
  },
  bar: {
    width: width,
    height: 45+StatusBar.currentHeight,
    paddingTop: StatusBar.currentHeight,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: color.main1C,
  },
  leftbar: {
    height: 45,
    flex: 1,
  },
  titlebar: {
    height: 45,
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: 18,
    color: color.white1C,
    textAlign: 'center',
  },
  rightbar: {
    height: 45,
    flex: 1,
  },
});

module.exports = NavigatorTopBar
