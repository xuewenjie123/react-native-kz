'use strict';
import React, { Component, } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity, AsyncStorage, } from 'react-native';
var { logout, } = require('../../service/login');
import NavigatorTopBar from './../../components/NavigatorTopBar';
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
var _navigator,_this;

class Setting extends Component {

  constructor(props) {
   super(props);
  }
  _onPushRouter(id,params){
    if(id){
      _navigator.push({
        title:id,
        id:id,
        params:params,
      });
    }
  }
  _resetToRouter(id){
    if(id){
      _navigator.resetTo({
        title:id,
        id:id,
      });
    }
  }
  logoutAction(){
    AsyncStorage.getItem("main",(error,text)=>{
      if(text === null ){
        _this._resetToRouter("Login")
      }else{
        //删除数据
        AsyncStorage.removeItem("main",()=>{
          _this._resetToRouter("Login")
        });
      }
    });
  }

  render() {
    _this = this;
    _navigator = _this.props.navigator;
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
              <TouchableOpacity style={styles.one}
                underlayColor='transparent'
                onPress={() => {_this._onPushRouter("PersonalData",{})}}>
                 <Text style={{fontSize:15,borderWidth:0,marginLeft: 15}}>个人资料</Text>
              </TouchableOpacity>
              <View style={styles.line}>
              </View>
              <TouchableOpacity style={styles.one}
                underlayColor='transparent'
                onPress={() => {_this._onPushRouter("Password",{})}}>
                 <Text style={{fontSize:15,borderWidth:0,marginLeft: 15}}>修改密码</Text>
              </TouchableOpacity>
            </View>
            {/*<View style={styles.input}>
              <TouchableOpacity style={styles.one}
                underlayColor='transparent'
                onPress={() => {_this._onPushRouter("SetNewNews",{})}}>
                 <Text style={{fontSize:15,borderWidth:0,marginLeft: 15}}>新消息通知</Text>
              </TouchableOpacity>
              <View style={styles.line}>
              </View>
              <View style={styles.one}>
                 <Text style={{fontSize:15,borderWidth:0,marginLeft: 15}}>清理缓存</Text>
              </View>
            </View>
            <View style={styles.button}>
              <Text style={{fontSize:15,borderWidth:0,marginLeft: 15}}>关于易科住</Text>
            </View>*/}
            <TouchableOpacity style={styles.submit}
              underlayColor='transparent' onPress={()=>{_this.logoutAction()}}>
              <Text style={{fontSize:18,color:'#FFFFFF',textAlign:'center'}}>退出登录</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: '#fafafa',
  },
  title: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2486f4',
  },
  one:{
    height:45,
    justifyContent: 'center',
  },
  input: {
    justifyContent: 'center',
    height: 90,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop : 10,
  },
  button: {
    justifyContent: 'center',
    height: 45,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop : 10,
  },

  line: {
    borderBottomWidth:1,
    borderBottomColor: '#ddd',
    borderStyle: 'solid',
  },

  submit: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: width-20,
    height: 45,
    backgroundColor: '#f53f6a',
    borderWidth: 1,
    borderColor: '#f53f6a',
    marginTop:20,
    borderRadius : 8,
  },
});

module.exports = Setting
