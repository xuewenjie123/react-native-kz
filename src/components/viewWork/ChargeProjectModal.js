'use strict';
import React, { Component, } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Modal, AsyncStorage, } from 'react-native';
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
var _navigator,_this,_state,_props;
var projectList = [{},{},{},{},{},{},]

class ApplyCancelModal extends Component {
  constructor(props) {
    super(props);
  }
  onClick(ind){
    if(!_props.projectList[ind].choice){
      var projectList = _props.projectList.map(d=>{
        d.choice = false;
        return d;
      })
      projectList[ind].choice = true;
      _props._this.setState({projectList:projectList,projectId: projectList[ind].id,projectModalV: false})
    }
  }
  render() {
    _this = this;
    _state = _this.state;
    _navigator = _this.props.navigator;
    _props = _this.props;
    var modalProps = {
      animationType: 'slide',
      transparent: true,
      visible: _props.visible,
      onRequestClose:()=>{},
    }
    return (
      <Modal {...modalProps} >
        <View style={{position: 'absolute', width: width, height: height, backgroundColor: "#000", opacity: .7,}}>
          <TouchableOpacity style={{flex:1}} onPress={() => {
            _props._this.setState({projectModalV: false})
          }}>
          </TouchableOpacity>
        </View>
        <View style={styles.main}>
          <View style={styles.allbox}>
            <View style={styles.centerbox}>
              <ScrollView>
                {_props.projectList.length?_props.projectList.map((d,index)=>(
                  <TouchableOpacity key={index} style={styles.topbox} onPress={() => _this.onClick(index)}>
                    <Text style={{fontSize:16,color:'#555',textAlign:'center',fontWeight:'bold',}}>{d.name}</Text>
                    {d.choice?(
                      <Image style={{width:15,height:15,marginLeft:5,}} source={require('../../images/30b2.png')}></Image>
                    ):null}
                  </TouchableOpacity>
                )):null}
              </ScrollView>
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
  allbox: {
    width:315,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius : 8,
  },
  line:{
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  linebtn:{
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  linebtnleft:{
    height: 28,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#2486f4",
    borderRadius: 4,
  },
  linebtncenter:{
    height: 28,
    width: 20,
  },
  linebtnright:{
    height: 28,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#2486f4",
    borderRadius: 4,
  },
  topbox: {
    height: 48,
    width:315,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerbox: {
    borderTopLeftRadius : 8,
    borderTopRightRadius : 8,
    overflow: 'hidden',
    paddingTop: 4,
    paddingBottom: 4,
    maxHeight: 200,
  },
  bottombox: {
    paddingTop: 10,
    height: 48,
    backgroundColor: "#f3f3f3",
    width:315,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius : 8,
    borderBottomRightRadius : 8,
  },
  input: {
    height: 100,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop : 10,
    paddingLeft:10,
    paddingRight:10,
    paddingTop:10,
  },
});

module.exports = ApplyCancelModal
