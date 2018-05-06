'use strict';
import React, { Component, } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity, Picker, Modal, } from 'react-native';
var { get, } = require('../../service/login');
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
var _navigator;

class PasswordSuccess extends Component {
  constructor(props) {
   super(props);
  }
  render() {
    var props = this.props;
    var modalProps = {
      animationType: 'slide',
      transparent: true,
      visible: props.visible,
      onRequestClose:()=>{},
    }
    return (
      <Modal {...modalProps} >
        <View style={{position: 'absolute', width: width, height: height, backgroundColor: "#000", opacity: .7,}}>
          <TouchableOpacity style={{flex:1}} onPress={() => {
            props.onClose()
          }}>
          </TouchableOpacity>
        </View>
        <View style={styles.main}>
          <View style={styles.title}>
            <Image style={{width:16,height:16,marginRight:5,}} source={require('../../images/success.png')}></Image>
            <Text style={{fontSize:15,color:'#333333',}}>密码修改成功</Text>
          </View>
        </View>
      </Modal>
    );
  }
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    width:315,
    height: 180,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius : 8,
    flexDirection: 'row',

  },

});

module.exports = PasswordSuccess
