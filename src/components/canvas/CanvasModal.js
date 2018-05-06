  'use strict';
  import React, { Component, } from 'react';
  import { View, WebView, PanResponder, } from 'react-native';
  import CanvasBox from './CanvasBox';
  var ctx,_this,_state,_props,_panResponder={};
  var locationX,locationY;
  function renderCanvas (canvas){
    window.get_this = this;
    window.get_canvas = canvas;
    window.ctx = canvas.getContext('2d');
    window.drawing = function(beginX,beginY,endX,endY) {
      window.ctx.beginPath();
      window.ctx.strokeStyle = window.get_this.colorValue;
      window.ctx.lineWidth = window.get_this.lineValue;
      window.ctx.lineJoin = "round";
      window.ctx.moveTo(beginX,beginY);
      window.ctx.lineTo(endX, endY);
      window.ctx.closePath();
      window.ctx.stroke();
    }
    window.clearArea = function() {
      window.ctx.setTransform(1, 0, 0, 1, 0, 0);
      window.ctx.clearRect(0, 0, window.ctx.canvas.width, window.ctx.canvas.height);
    }
    window.getArea = function() {
      window.postMessage(window.get_canvas.toDataURL("image/jpeg",.8));
    }
  }

  class CanvasModal extends Component {
    constructor(props) {
      super(props);
      this.state = {
        ctx : null,
        mousePressed : false,
        handleChanged : false,
        lineValue : 3,
        colorValue : '#333',
        beginX: 0,
        beginY: 0,
        endX: 0,
        endY: 0,
        dorw: false,
        action: false,
      }
    }
    componentWillMount() {
      _panResponder = PanResponder.create({
        // 要求成为响应者：
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
        onPanResponderGrant: (evt, gestureState) => {
          _this.mouseDownHandel(evt)
        },
        onPanResponderMove: (evt, gestureState) => {
          _this.mouseMoveHandel(evt)
        },
        onPanResponderTerminationRequest: (evt, gestureState) => true,
        onPanResponderRelease: (evt, gestureState) => {
          _this.mouseUpHandel(evt)
        },
        onPanResponderTerminate: (evt, gestureState) => {
          _this.mouseUpHandel(evt)
        },
        onShouldBlockNativeResponder: (evt, gestureState) => {
          return true;
        },
      });
    }
    componentWillReceiveProps(newProps){
      if(newProps.getFn){
        if(newProps.getFn == "clear"){
          _this.setState({
            action: "clear",
          })
          _props._this.setState({
            getFn: "",
          })
        }else if(newProps.getFn == "get"){
          _this.setState({
            action: "get",
          })
          _props._this.setState({
            getFn: "",
          })
        }
      }
    }
    mouseDownHandel(e){
      _this.setState({mousePressed:true,handleChanged: true});
      locationX = e.nativeEvent.pageX-e.nativeEvent.locationX;
      locationY = e.nativeEvent.pageY-e.nativeEvent.locationY;
      _this.drawing(e.nativeEvent.locationX, e.nativeEvent.locationY, false);
    }
    mouseMoveHandel(e){
      if(_state.mousePressed){
        _this.drawing(e.nativeEvent.pageX-locationX, e.nativeEvent.pageY-locationY, true);
      }
    }
    mouseUpHandel(){
      _this.setState({
        mousePressed : false,
        dorw: false,
      })
    }
    drawing(x,y,isDown) {
      if(isDown) {
        _this.setState({
          dorw: true,
          beginX : _state.endX,
          beginY : _state.endY,
          endX : x,
          endY : y,
        })
      }else{
        _this.setState({
          beginX : x,
          beginY : y,
          endX : x,
          endY : y,
        })
      }
    }
    getArea(e) {
      if(_state.handleChanged){
        _props._this.submitgetimg(e)
      }else{
        _props._this.submitgetfalse()
      }
    }
    render() {
      _this = this;
      _state = _this.state;
      _props = _this.props;
      var CanvasPram = {
        colorValue: _state.colorValue,
        lineValue: _state.lineValue,
      }
      var CanvasProps = {
        dorw: _state.dorw,
        fn: "window.drawing("+_state.beginX+","+_state.beginY+","+_state.endX+","+_state.endY+")",
        action: _state.action,
        actionFn: "window.clearArea()",
        _this:_this,
      }
      return (
        <View style={_props.style} {..._panResponder.panHandlers}>
          <CanvasBox
            context={CanvasPram}
            render={renderCanvas}
            style={_props.style}
            {...CanvasProps}
          />
        </View>
      )
    }
  }

  module.exports = CanvasModal
