'use strict';
import React, { Component, } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity, Picker, Modal, } from 'react-native';
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
var _navigator;


class ApplyCoordinationModal extends Component {
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
            <View style={styles.title}>
              <View style={styles.topbox}>
                <TouchableOpacity onPress={() => {
                  props.onClose()
                }}>
                  <Image style={{width:18,height:18,marginRight:12,marginTop: 12,}} source={require('../../images/36d1.png')}></Image>
                </TouchableOpacity>
              </View>
              <View style={styles.centerbox}>
                <View style={styles.line}>
                  <Image style={{width:16,height:16,marginRight:5,}} source={require('../../images/message.png')}></Image>
                  <Text style={{fontSize:15,color:'#333333',textAlign:'center'}}>申协同已发出</Text>
                </View>
                <View style={styles.text}>
                  <Text style={{fontSize:15,color:'#999999',textAlign:'center'}}>如长时间无人接单/派单,您可以挂起等待</Text>
                </View>
              </View>
              <View style={styles.bottombox}>
              </View>
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
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius : 8,
  },
  text: {
    width:190,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop:15,
  },
  line:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  topbox: {
    height: 36,
    width:315,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  centerbox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottombox: {
    height: 36,
    width:315,
  },

});

module.exports = ApplyCoordinationModal
