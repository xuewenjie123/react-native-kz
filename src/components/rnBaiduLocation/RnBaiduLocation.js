'use strict';
import React, { Component, } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity, Picker, Modal, } from 'react-native';
import BaiduLocation from 'react-native-baidu-location';
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
var _navigator,_this,_state;

class RnBaiduLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationSign: "待机",
      locationParam: false,
      locationParamNum: 0,
      locationParamFalse: false,
      locationParamFalseNum: 0,
    }
  }
  componentDidMount(){
    console.log(BaiduLocation)
  }
  startLocation(){
    //开始定位
    BaiduLocation.startLocation();
    _this.setState({
      locationSign:"开始"
    })
    //定位刷新回调
    function didUpdateBMKUserLocation(param){
      console.log('didUpdateBMKUserLocation',param);
      _this.setState({
        locationParam:param,
        locationParamNum:_state.locationParamNum+1,
      })
    }
    BaiduLocation.didUpdateBMKUserLocation(didUpdateBMKUserLocation)
    //定位失败的回调
    function didFailToLocateUserWithError(param){
      console.log('didFailToLocateUserWithError',param);
      _this.setState({
        locationParamFalse:param,
        locationParamFalseNum:_state.locationParamFalseNum+1,
      })
    }
    BaiduLocation.didFailToLocateUserWithError(didFailToLocateUserWithError)
    //定位停止的回调
    function didStopLocatingUser(param){
      console.log('didStopLocatingUser',param);
      _this.setState({
        locationSign:"结束"
      })
    }
    BaiduLocation.didStopLocatingUser(didStopLocatingUser)
  }
  endLocation(){
    //停止定位
    BaiduLocation.stopLocation();
    _this.setState({
      locationSign:"正在终止"
    })
  }

  render() {
    _this = this;
    _state = _this.state;
    _navigator = _this.props.navigator;
    return (
      <View style={{width:width,height:height}}>
        <View style={{padding:10,}}>
          <Text style={{fontSize:12,color: '#333'}}>
            {"定位状态："}{_state.locationSign}
          </Text>
        </View>
        <View style={{padding:10,}}>
          <Text style={{fontSize:12,color: '#333'}}>
            {"定位参数："+_state.locationParam+"刷新次数："+_state.locationParamNum}
          </Text>
        </View>
        <View style={{padding:10,}}>
          <Text style={{fontSize:12,color: '#333'}}>
            {"定位失败："+_state.locationParamFalse+"刷新次数："+_state.locationParamFalseNum}
          </Text>
        </View>
        <TouchableOpacity onPress={()=>_this.startLocation()} style={{margin: 10,padding:10,borderWidth: 1,borderColor: '#ddd',borderStyle:'solid'}}>
          <Text style={{fontSize:12,color: '#333'}}>
            {"开始"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>_this.endLocation()} style={{margin: 10,padding:10,borderWidth: 1,borderColor: '#ddd',borderStyle:'solid'}}>
          <Text style={{fontSize:12,color: '#333'}}>
            {"结束"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
};

module.exports = RnBaiduLocation
