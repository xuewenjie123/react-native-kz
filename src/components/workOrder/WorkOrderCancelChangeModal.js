'use strict';
import React, { Component, } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity, Picker, Modal, AsyncStorage, ToastAndroid, } from 'react-native';
var { refuseApplyChange, } = require('../../service/repair');
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
var _navigator,_this,_state,_props;

class WorkOrderCancelApplyModal extends Component {
  constructor(props) {
    super(props);
    this.state={
      content: undefined,
    }
  }
  componentDidMount(){
    AsyncStorage.getItem("main",(error,text)=>{
      if(!error){
        var data = JSON.parse(text)
        _this.setState({userId: data.id});
      }else{
      }
    });
  }
  submit(){
    if(!_state.content){
      ToastAndroid.show('请输入现场情况说明', ToastAndroid.SHORT);
    }else{
      var data={};
      data.content = _state.content;
      data.workOrderId = _props.params.orderId;
      data.applyUserId = _state.userId;
      refuseApplyChange(data,_this.submitFn)
    }
  }
  submitFn(result){
    if(result.success){
      _props.onClose()
      _props._this.getDetail()
    }else{

    }
  }
  render() {
    _this = this;
    _state = _this.state;
    _props = _this.props;
    _navigator = _props.navigator;
    var modalProps = {
      animationType: 'slide',
      transparent: true,
      visible: _props.visible,
      onRequestClose:()=>{},
    }
    return (
      <Modal {...modalProps} >
        <View style={{position: 'absolute', width: width, height: height, backgroundColor: "#000", opacity: .6,}}>
        </View>
        <View style={styles.main}>
          <View style={styles.allbox}>
            <View style={styles.topbox}>
              <Text style={{fontSize:16,color:'#333',textAlign:'center',fontWeight:'bold',}}>{"确定拒绝申请吗？"}</Text>
            </View>
            <View style={styles.centerbox}>
              <TextInput underlineColorAndroid="transparent" style={{color:'#666666',height: 100,fontSize:12,textAlign:'left',margin:0,padding:0,textAlignVertical: 'top'}}
                placeholder='请输入拒绝理由' value={_state.content} onChangeText={(text)=>{_this.setState({content:text})}} multiline={true}  maxLength={200}/>
            </View>
            <View style={styles.bottombox}>
              <View style={styles.linebtn}>
                <TouchableOpacity style={styles.linebtnleft}
                  onPress={() => {_props.onClose()}}>
                  <Text style={{fontSize:15,color:'#fff',}}>{"取消"}</Text>
                </TouchableOpacity>
                <View style={styles.linebtncenter}></View>
                <TouchableOpacity style={styles.linebtnright}
                  onPress={() => {_this.submit()}}>
                  <Text style={{fontSize:15,color:'#fff',}}>{"确定"}</Text>
                </TouchableOpacity>
              </View>
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
    backgroundColor: "#f3f3f3",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius : 8,
    borderTopRightRadius : 8,
  },
  centerbox: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  textInputstyle: {
    padding: 0,
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

});

module.exports = WorkOrderCancelApplyModal
