'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  TouchableNativeFeedback,
  Platform
} from 'react-native';
var BusyIndicator = require('react-native-busy-indicator');
var loaderHandler = require('react-native-busy-indicator/LoaderHandler');
var DataService = require('../service/DataService');
var _navigator;

class Login extends Component {

  constructor(props) {
   super(props);
  }

  render() {
    _navigator = this.props.navigator;
    return (
      <View style={styles.main}>
        <View style={styles.logo}>
          <Image style={{width:100,height:100}} source={require('image!comment_avatar')}></Image>
        </View>
        <View style={styles.info}>
          <TextInput underlineColorAndroid = "transparent" placeholder='请输入用户名' style={{marginLeft:10,marginRight:10,borderWidth:0,paddingLeft: 20}} />
          <TextInput underlineColorAndroid = "transparent" placeholder='请输入密码'  style={{marginLeft:10,marginRight:10,borderWidth:0,paddingLeft: 20}} />
        </View>
        <View style={styles.button}>
          <TouchableNativeFeedback onPress={this._onLoginButton}>
            <View style={{width: 300, height: 40, backgroundColor: 'blue'}}>
              <Text style={{margin: 10,color:'#FFFFFF',textAlign:'center'}}>登录</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={this._onRegisterButton}>
            <View style={{width: 300, height: 40, backgroundColor: 'white',borderWidth: 1,borderColor: '#00ff00',marginTop:20}}>
              <Text style={{margin: 10,color:'black',textAlign:'center'}}>注册</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
        <View style={styles.button}>
        </View>
        <BusyIndicator />
      </View>
    );
  }
  _onLoginButton(){
    loaderHandler.showLoader("登录中");
    DataService.login()
     .then( responseData => {
       alert(responseData.token);
       loaderHandler.hideLoader();
     })
     .done();
  }
  _onRegisterButton(){
    _navigator.push({title:'Register',id:'Register'});
  }
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  logo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

module.exports = Login
