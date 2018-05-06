'use strict';
import React, { Component, } from 'react';
import { View, WebView, } from 'react-native';

class CanvasBox extends Component {
  webview = null
  constructor(props) {
    super(props);
  }
  componentWillMount() {
  }
  componentWillReceiveProps(newProps){
    if(newProps.dorw){
      this.postMessage(newProps.fn)
    }
    if(newProps.action){
      if(newProps.action == "clear"){
        this.clearArea()
        this.props._this.setState({
          action: false,
        })
      }else if(newProps.action == "get"){
        this.getArea()
        this.props._this.setState({
          action: false,
        })
      }
    }
  }
  clearArea() {
    this.webview.postMessage('window.clearArea()');
  }
  getArea() {
    this.webview.postMessage('window.getArea()');
  }
  postMessage = (jsStr) => {
    if (this.webview) {
      this.webview.postMessage(jsStr);
      //this.webview.postMessage('window.postMessage("Title："+window.drawing);');
    }
  }
  onMessage = e => {
    this.props._this.getArea(e.nativeEvent.data)
    //console.log(e.nativeEvent.data);
  }

  render() {
    var contextString = JSON.stringify(this.props.context);
    var renderString = this.props.render.toString();


    let html = '<style>*{margin:0;padding:0;}canvas{position:relative;height:100%;width:100%;transform:translateZ(0);}</style><canvas></canvas><script>var canvas=document.querySelector("canvas");('+renderString+').call('+contextString+',canvas);</script>'
    return (
      <View style={this.props.style}>
        <WebView
          ref={webview => { this.webview = webview; }}
          javaScriptEnabled={true}
          automaticallyAdjustContentInsets={false}
          contentInset={{top: 0, right: 0, bottom: 0, left: 0}}
          source={{html:html}}
          opaque={false}
          underlayColor={'transparent'}
          style={[this.props.style,]}
          injectedJavaScript="document.addEventListener('message', function(e) {eval(e.data);});"
          onMessage={(e)=>this.onMessage(e)}
        />
      </View>
    )
  }
}

module.exports = CanvasBox
