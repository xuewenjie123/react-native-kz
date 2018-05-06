'use strict';
import React, { Component, } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator, } from 'react-native';
var { getUserGps, } = require('../../service/map');
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
import NavigatorTopBar from './../../components/NavigatorTopBar';
import color from './../../constant/color';
var _navigator,_this,_state,_props;

import {
  MapView,
  MapTypes,
  Geolocation,
  MapModule,
} from '@zzzkk2009/react-native-baidu-map'

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      center: null,
      marker: [],
      zoom: 15,
      showLoading: true,
    }
  }
  componentDidMount(){
    // this.setState({
    //   center: {latitude: 39.9915, longitude: 116.3883},
    //   marker: [{latitude: 39.9915, longitude: 116.3883, title: ''}],
    //   showLoading: false,
    // })
    getUserGps(_props.mapId+"",(d)=>this.getAdInfoResult(d,true));
  }
  getAdInfoResult(result,sign){
    if(result.success && result.data){
      if(sign){
        _this.setState({
          center: {latitude: result.data.latitude, longitude: result.data.longitude},
          marker: [{latitude: result.data.latitude, longitude: result.data.longitude, title: ''}],
          showLoading: false,
        })
      }else{
        _this.setState({
          marker: [{latitude: result.data.latitude, longitude: result.data.longitude, title: ''}],
          showLoading: false,
        })
      }
      _this.timeout = setTimeout(()=>getUserGps(_props.mapId+"",_this.getAdInfoResult),5000)
    }else{
    }
  }
  componentWillUnmount(){
    _this.timeout && clearTimeout(_this.timeout);
  }

  render() {
    _this = this;
    _state = _this.state;
    _props = _this.props;
    _navigator = _this.props.navigator;
    let NavigatorTopBarProps = {
      visible: true,
      title: "地图",
      leftView: (
        <TouchableOpacity style={{flex: 1}}
          underlayColor='transparent'
          onPress={() => {_navigator.pop()}}>
          <View style={{flex: 1, paddingLeft: 10,flexDirection: 'row',alignItems: 'center',}}>
            <Image style={{width: 23, height: 23,}} source={require('../../images/46a2.png')}></Image>
          </View>
        </TouchableOpacity>
      ),
      rightView: (
        <TouchableOpacity  style={{flex: 1}}
          onPress={() => {}}>
        </TouchableOpacity>
      ),
    }
    return (
      <View style={{flex: 1}}>
        <NavigatorTopBar {...NavigatorTopBarProps}/>
        <View style={styles.main}>
          <MapView
            style={styles.map}
            center={_state.center}
            markers={_state.marker}
            zoom={_state.zoom}
          />
        </View>
        {this.renderLoading()}
      </View>
    );
  }
  renderLoading() {
    if(this.state.showLoading) {
      return (
        <View style={styles.loadingWarp}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator
              animating={true}
              size="small"
              color={'#C8C8C8'}
            />
            <Text style={styles.loadingText}>{'定位中...'}</Text>
          </View>
        </View>
      )
    }
  }
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: color.white2C,
    flexDirection: 'column',
    padding: 0,
  },
  map: {
    width: width,
    height: height-48,
  },
  loadingWarp: {
    position: 'absolute',
    top:48,
    bottom:0,
    left:0,
    right:0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 3
  },
  loadingText: {
    color: 'white'
  },
});

module.exports = Home
