'use strict';
import React, { Component, } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity, Picker, Modal, } from 'react-native';
var { get, } = require('../../service/login');
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
var _navigator;


class ComplaintDealModal extends Component {

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
        </View>
        <View style={styles.main}>
           <View style={styles.list}>
              <TouchableOpacity style={styles.select} onPress={() => {
                props.onClick("ComplaintDealComplete",{title: "直接处理"})
              }}>
               <Text style={{fontSize:18,color:'#ff3428',textAlign:'center'}}>直接处理</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.select} onPress={() => {
                props.onClick("Transfer")
              }}>
               <Text style={{fontSize:18,color:'#ff3428',textAlign:'center'}}>转交他人</Text>
              </TouchableOpacity>
           </View>
           <TouchableOpacity style={styles.submit} onPress={() => {
             props.onClose()
           }}>
               <Text style={{fontSize:18,color:'#2486f4',textAlign:'center'}}>取消</Text>
           </TouchableOpacity>
        </View>
      </Modal>
    );
  }

};

const styles = StyleSheet.create({
  main: {
    width:width,
    height:height,
    flex: 1,
    flexDirection:'column',
    justifyContent: 'flex-end',
  },
  submit: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: width-20,
    height: 45,
    backgroundColor: '#ffffff',
    marginBottom:10,
    borderRadius : 6,
  },
  list: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: width-20,
    backgroundColor: '#ffffff',
    marginBottom:10,
    borderRadius : 6,
  },
  select: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: width-30,
    height: 45,
    borderBottomWidth:1,
    borderBottomColor: '#ddd',
    borderStyle: 'solid',
  },

});

module.exports = ComplaintDealModal
