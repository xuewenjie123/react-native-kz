'use strict';
import React, { Component, } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity, Picker, Modal, } from 'react-native';
var { get, } = require('../../service/login');
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
var _navigator;

class PasswordFail extends Component {
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
              <Image style={{width:32,height:32,}} source={require('../../images/fail.png')}></Image>
              <Text style={{fontSize:15,marginTop:15,color:'#333333',textAlign:'center'}}>密码修改失败</Text>
                <TouchableOpacity style={styles.again} onPress={() => {
                  props.onClose()
                }}>
                  <Text style={{fontSize:15,marginTop:2,marginBottom:2,color:'#2486f4',textAlign:'center'}}>重来</Text>
                </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius : 8,
  },
  again: {
    width: 55,
    height: 25,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#68bfec',
    marginTop:30,
    borderRadius:25,
  },
});

module.exports = PasswordFail
