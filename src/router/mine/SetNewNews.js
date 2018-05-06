'use strict';
import React, { Component, } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity, Picker, } from 'react-native';
import NavigatorTopBar from './../../components/NavigatorTopBar';
var { getNewset } = require('../../service/mine');
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
var _navigator;


class SetNewNews extends Component {

  constructor(props) {
    super(props);
    this.state = {
      getNewset: false,
    }
  }
  componentDidMount(){
    function updata(response){
      if(response){
        _this.setState({getNewset: true});
      }else{
        _this.setState({getNewset: true});
      }
    }
    getNewset({},updata);
  }

  render() {
    _navigator = this.props.navigator;
    let NavigatorTopBarProps = {
      visible: true,
      title: "设置",
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
            <View style={styles.input}>
              <Text style={{fontSize:15,color:'#333333',marginLeft:15,}}>接受新消息通知</Text>
              <Image style={{width:36,height:20,}} source={require('../../images/button1.png')}></Image>
            </View>

            <View style={styles.text}>
              <Text style={{fontSize:12,color:'#999999'}}>
              开启接受新消息通知功能后，您将会接受到所有的消息通知，若需关闭此功能，请在 “设置” - “新消息提醒” 中关闭。
              </Text>
            </View>
        </View>
      </View>
    );
  }

};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection:'column',
  },

  title: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2486f4',
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 45,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop : 10,
    paddingRight: 10,
  },
  button: {
    width: 36,
    height: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop : 10,
    borderRadius : 9,
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft:15,
    paddingRight:15,
    marginTop:10,
  },

});

module.exports = SetNewNews
