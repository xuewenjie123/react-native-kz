'use strict';
import React, { Component, } from 'react';
import { StyleSheet, Text, View, Image, Modal, TextInput, TouchableOpacity, } from 'react-native';
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
import color from './../constant/color';

class RepairChoiceModal extends Component {
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
        <View style={styles.back}>
        </View>
        <View style={styles.cont}>
          <TouchableOpacity style={styles.contbox1} onPress={() => {
            props.onRepair()
          }}>
            <View style={styles.cont}>
              <Text style={styles.text}>报修</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.contbox1,{backgroundColor: color.embe2C}]} onPress={() => {
            props.onRepairGeneration()
          }}>
            <View style={styles.cont}>
              <Text style={styles.text}>代报修</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.contbox2}>
            <TouchableOpacity onPress={() => {
              props.onfalse()
            }}>
              <View style={styles.cont}>
                <Image style={styles.image} source={require('../images/30a1.png')}></Image>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }
};

const styles = StyleSheet.create({
  back: {
    position: 'absolute',
    width: width,
    height: height,
    backgroundColor: color.black1C,
    opacity: .7,
  },
  cont: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contbox1: {
    width: 175,
    height: 44,
    backgroundColor: color.main1C,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderRadius: 22,
  },
  contbox2: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    borderRadius: 15,
    borderColor: color.white1C,
    borderWidth: 1,
    borderStyle: 'solid'
  },
  text: {
    fontSize: 18,
    color: color.white1C,
  },
  image: {
    width: 15,
    height: 15,
  },
});

module.exports = RepairChoiceModal
