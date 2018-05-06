'use strict';
import React, { Component, } from 'react';
import { Text, } from 'react-native';
var _this;

class TimeOutGo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: 10,
    }
  }
  timeUpNew (){
    if(_this.state.key == 0){
      _this.props.timeondeal()
    }else{
      _this.setState({key:_this.state.key-1})
    }
  }
  componentDidMount(){
    this._timego = setInterval(_this.timeUpNew,1000);
    _this.setState({key:this.props.showtime})
  }
  componentWillUnmount(){
    clearInterval(this._timego);
    this._timego = null;
  }
  render() {
    _this = this;
    return (
      <Text style={{fontSize:12,color:'#ffffff',textAlign:'center'}}>{this.state.key}</Text>
    );
  }

};

module.exports = TimeOutGo
