'use strict';
import React, { Component, } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, AsyncStorage, ToastAndroid, StatusBar, ScrollView } from 'react-native';
let Dimensions = require('Dimensions');
let { width, height } = Dimensions.get('window');
let _navigator,_this;

var { login, } = require('../service/login');

class Login extends Component {

  constructor(props) {
    super(props);
    this.state={
      name: '',
      pass: '',
    }
  }
  componentDidMount(){
  }
  _onPushRouter(id){
    if(id){
      _navigator.resetTo({
        title:id,
        id:id,
      });
    }
  }
  loginAction(){
    var resultFu = function(response){
      console.log(response)
      if(response.success){
        global.sendSocketMsg("init",{userId: response.data.id})
        //跳转到首页 并清除路由信息 并保存登录信息
        AsyncStorage.setItem("main",JSON.stringify(response.data),()=>{
          _this._onPushRouter("Home")
        });
      }else{
        //声明消息 不做操作
        ToastAndroid.show(response.errorMsg, ToastAndroid.SHORT);
      }
    }
    if(!_this.state.name){
      ToastAndroid.show('请输入用户名', ToastAndroid.SHORT);
      return false;
    }else if(!_this.state.pass){
      ToastAndroid.show('请输入密码', ToastAndroid.SHORT);
      return false;
    }else{
      login({username: _this.state.name, password: _this.state.pass},resultFu);
      return false;
    }
  }

  render() {
    _this = this;
    _navigator = _this.props.navigator;
    return (
      <View style={styles.main}>
        <StatusBar hidden />
        <View style={styles.scrollView}>
          <View style={styles.cont}>
            <View style={styles.logo}>
              <Image style={{width:100,height:120,marginTop:40,}} source={require('../images/logo.png')}></Image>
            </View>
            <View style={styles.input}>
              <TextInput underlineColorAndroid="transparent" placeholder='手机号/用户名' style={{color:'#666666',fontSize:15,borderWidth:0,paddingLeft: 20}}
                onChangeText={(text)=>{_this.setState({name:text})}} value={_this.state.name}
                maxLength={24}/>
            </View>
            <View style={styles.input}>
              <TextInput underlineColorAndroid="transparent" placeholder='密&nbsp;&nbsp;&nbsp;码'  style={{color:'#666666',fontSize:15,borderWidth:0,paddingLeft: 20}}
                onChangeText={(text)=>{_this.setState({pass:text})}} value={_this.state.pass}
                maxLength={24} secureTextEntry/>
            </View>
            <TouchableOpacity style={styles.login}
              underlayColor='transparent' onPress={()=>{_this.loginAction()}}>
              <Text style={{fontSize:18,color:'#FFFFFF',textAlign:'center'}}>登&nbsp;&nbsp;录</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.foot}>
             <Text style={{fontSize:12,color:'#999999',textAlign:'center'}}>
             内部系统，如果您没有系统账号，请和管理员联系祝您工作愉快！</Text>
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
    alignItems: 'center',
    width:width,
    height:height,
    backgroundColor: '#fafafa',
  },
  scrollView: {
    flex: 1,
    flexDirection:'column',
    alignItems: 'center',
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  foot: {
    width: 240,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:80,
    marginBottom:20,
  },
  cont: {
    flex: 1,
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: width-40,
    height: 44,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop:10,
    borderRadius:25,
    justifyContent: 'center',
  },
  login: {
    width: width-40,
    height: 44,
    backgroundColor: '#2486f4',
    borderWidth: 1,
    borderColor: '#2486f4',
    marginTop:20,
    borderRadius:25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

module.exports = Login
