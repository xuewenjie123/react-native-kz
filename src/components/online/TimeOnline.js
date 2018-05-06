'use strict';
import React, { Component, } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity, Picker, Modal, } from 'react-native';
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
var _this;


class TimeOnline extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: 1,
    }
  }
  timeUpNew (){
    _this.setState({key:_this.state.key+1})
  }
  componentWillReceiveProps(newProps){
    if(newProps.open && !this.props.open){
      if(!this._timego)this._timego = setInterval(_this.timeUpNew,500);
    }else if(!newProps.open && this.props.open){
      clearInterval(this._timego);
      this._timego = null;
    }
  }
  componentWillUnmount(){
    if(this._timego = null){
      clearInterval(this._timego);
      this._timego = null;
    }
  }
  render() {
    _this = this;
    var allmS = this.props.open?(new Date().getTime() + this.props.time - this.props.metatime):this.props.time;
    var als = allmS/1000;
    var h = parseInt(als/(60 * 60));
    var m = parseInt((als%(60 * 60))/60);
    var s = parseInt(als%60);
    return (
      <Text style={{fontSize:24,color:'#333333',textAlign:'left',padding:0,margin:0}}>{this.state.key?(h+":"+m+":"+s):null}</Text>
    );
  }

};

const styles = StyleSheet.create({
});

module.exports = TimeOnline
