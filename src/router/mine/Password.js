'use strict';
import React, { Component, } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, AsyncStorage, ToastAndroid } from 'react-native';
import NavigatorTopBar from './../../components/NavigatorTopBar';
import PasswordFail from './../../components/password/PasswordFail';
import PasswordSuccess from './../../components/password/PasswordSuccess';
var { editpassword, } = require('../../service/login');
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
var _navigator,_this;

class Password extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newpass: '',
      oldpass: '',
      repass: '',
      modalVisible: false,
      modalVisible2: false,
    }
  }
  componentDidMount(){
    AsyncStorage.getItem("main",(error,text)=>{
      if(!error){
        var data = JSON.parse(text)
        console.log(data)
        _this.setState({userId: data.id})
      }else{
        console.log(error)
      }
    });
  }
  resetpassAction(){
    function resultFu(result){
      if(result.success){
        _this.setState({modalVisible2: true,})
      }else{
        _this.setState({modalVisible: true,})
      }
    }
    if(!_this.state.oldpass){
      ToastAndroid.show('请输入旧密码', ToastAndroid.SHORT);
      return false;
    }else if(!_this.state.newpass){
      ToastAndroid.show('请输入新密码', ToastAndroid.SHORT);
      return false;
    }else if(!_this.state.repass){
      ToastAndroid.show('请输入确认密码', ToastAndroid.SHORT);
      return false;
    }else if(_this.state.repass != _this.state.newpass){
      ToastAndroid.show('确认密码错误', ToastAndroid.SHORT);
      return false;
    }else{
      editpassword({
        userId: _this.state.userId,
        opassowrd: _this.state.oldpass,
        newpassword: _this.state.newpass,
        renewpassword: _this.state.repass,
      },resultFu)
    }
  }
  render() {
    _this = this;
    _navigator = this.props.navigator;
    let NavigatorTopBarProps = {
      visible: true,
      title: "修改密码",
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
    let PasswordFailProps = {
      visible: this.state.modalVisible,
      onClose: function(){
        _this.setState({
          modalVisible: false,
          oldpass: undefined,
          newpass: undefined,
          repass: undefined,
        })
      },
    };
    let PasswordSuccessProps = {
      visible: this.state.modalVisible2,
      onClose: function(){
        _this.setState({modalVisible2: false,})
        _navigator.pop()
      },
    };
    return (
      <View style={{flex: 1}}>
        <NavigatorTopBar {...NavigatorTopBarProps}/>
        <View style={styles.main}>
          <View style={styles.input}>
            <View style={styles.one}>
              <TextInput underlineColorAndroid = "transparent" placeholder='旧密码' style={{color:'#333333',fontSize:15,padding:0,margin:0,lineHeight:15}}
                onChangeText={(text) => {_this.setState({oldpass:text})}} value={_this.state.oldpass} maxLength={24} secureTextEntry/>
            </View>
            <View style={styles.line}></View>
            <View style={styles.one}>
              <TextInput underlineColorAndroid = "transparent" placeholder='新密码'  style={{color:'#333333',fontSize:15,padding:0,margin:0,lineHeight:15}}
                onChangeText={(text) => {_this.setState({newpass:text})}} value={_this.state.newpass} maxLength={24} secureTextEntry/>
            </View>
            <View style={styles.line}></View>
            <View style={styles.one}>
              <TextInput underlineColorAndroid = "transparent" placeholder='确认密码'  style={{color:'#333333',fontSize:15,padding:0,margin:0,lineHeight:15}}
                onChangeText={(text) => {_this.setState({repass:text})}} value={_this.state.repass} maxLength={24} secureTextEntry/>
            </View>
          </View>
          <TouchableOpacity style={styles.submit} underlayColor='transparent' onPress={() => {
            _this.resetpassAction()
          }}>
            <Text style={{fontSize:18,color:'#FFFFFF',textAlign:'center'}}>提交</Text>
          </TouchableOpacity>
        </View>
        <PasswordFail {...PasswordFailProps}/>
        <PasswordSuccess {...PasswordSuccessProps}/>
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
    marginBottom:15,
  },

  input: {
    height: 135,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    paddingLeft: 10,
    paddingRight:10,
    marginTop:15,
  },

  line: {
    borderBottomWidth:1,
    borderBottomColor: '#ddd',
    borderStyle: 'solid',
  },
  one:{
    height:45,
    justifyContent: 'center',
  },
  submit: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: width-20,
    height: 45,
    backgroundColor: '#237ee5',
    borderWidth: 1,
    borderColor: '#237ee5',
    marginTop:20,
    borderRadius : 6,
  },
});

module.exports = Password
