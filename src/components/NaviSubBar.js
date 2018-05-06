'use strict';
import React, { Component, } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
import color from './../constant/color';

class NaviSubBar extends Component {
  render() {
    return (
      <View style={styles.bar1}>
      <View style={styles.bar2}>
      <View style={styles.bar3}>
        <TouchableOpacity
          style={styles.indexTouch}
          underlayColor='transparent'
          onPress={() => {this.props.leftAction()}}>
          <View style={styles.indexbar}>
            <View style={styles.innerother}>
            </View>
            <View style={styles.inner}>
              <Text style={{ fontSize: 15, textAlign: 'center', color: this.props.order == "1st"?color.main1C:color.black2C }}>未完成</Text>
            </View>
            <View style={styles.innerother}>
              <View style={this.props.order == "1st"?styles.innerotherBottom:{}}>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.indexTouch}
          underlayColor='transparent'
          onPress={() => {this.props.centerAction()}}>
          <View style={styles.indexbar}>
            <View style={styles.innerother}>
            </View>
            <View style={styles.inner}>
              <Text style={{ fontSize: 15, textAlign: 'center', color: this.props.order == "2st"?color.main1C:color.black2C }}>处理中</Text>
            </View>
            <View style={styles.innerother}>
              <View style={this.props.order == "2st"?styles.innerotherBottom:{}}>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.indexTouch}
          underlayColor='transparent'
          onPress={() => {this.props.rightAction()}}>
          <View style={styles.indexbar}>
            <View style={styles.innerother}>
            </View>
            <View style={styles.inner}>
              <Text style={{ fontSize: 15, textAlign: 'center', color: this.props.order == "3st"?color.main1C:color.black2C }}>已完成</Text>
            </View>
            <View style={styles.innerother}>
              <View style={this.props.order == "3st"?styles.innerotherBottom:{}}>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      </View>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  bar1: {
    width: width,
    height: 48,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: color.line2C,
  },
  bar2: {
    flex: 1,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: color.line1C,
  },
  bar3: {
    width: width+1,
    height: 46,
    flexDirection: 'row',
    backgroundColor: color.white2C,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: color.line3C,
  },
  indexbar: {
    flex: 1,
    justifyContent: 'center',
  },
  indexTouch: {
    flex: 1,
  },
  inner: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderStyle: 'solid',
    borderColor: color.line3C,
    flexDirection: 'column',
  },
  innerother: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerotherBottom: {
    flex: 1,
    width: 44,
    borderBottomWidth: 3,
    borderStyle: 'solid',
    borderColor: color.main1C,
  },
});

module.exports = NaviSubBar
