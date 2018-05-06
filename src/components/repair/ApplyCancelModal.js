'use strict';
import React, { Component, } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity, Picker, Modal, AsyncStorage, ToastAndroid, } from 'react-native';
var { getDicValue, } = require('../../service/common');
var { applyWorkOrderCancel, } = require('../../service/repair');
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
var _navigator,_this,_state,_props;

class ApplyCancelModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dicValue: [],
      contents: undefined,
    }
  }
  componentDidMount(){
    getDicValue("DIC_CANCEL_TYPE",_this.resultFn);
    AsyncStorage.getItem("main",(error,text)=>{
      if(!error){
        var data = JSON.parse(text)
        _this.setState({userId: data.id});
      }else{
      }
    });
  }
  resultFn(result){
    if(result.success && result.data){
      _this.setState({dicValue: result.data})
    }
  }
  onClick(ind){
    function loop(){
      _state.dicValue = _state.dicValue.map(d=>{
        d.choice = false;
        return d;
      })
    }
    if(_state.dicValue[ind].choice){
      loop()
      _state.dicValue[ind].choice = false;
    }else{
      loop()
      _state.dicValue[ind].choice = true;
    }
    _this.setState({dicValue:_state.dicValue})
  }
  backinput(){
    var ttt = null;
    _state.dicValue.map(d=>{
      if(d.choice && d.valueCode == "CANCEL_OTHER"){
        ttt = (
          <View style={styles.input}>
            <TextInput underlineColorAndroid="transparent" style={{color:'#666666',height: 80,fontSize:12,textAlign:'left',margin:0,padding:0,textAlignVertical: 'top'}}
              placeholder='请输入具体原因' value={_state.contents} onChangeText={(text)=>{_this.setState({contents:text})}} multiline={true}  maxLength={200}/>
          </View>
        )
      }
    })
    return ttt;
  }
  onSure(){
    var code = undefined;
    _state.dicValue.map(d=>{
      if(d.choice){
        code = d.valueCode;
      }
      return d;
    })
    if(code){
      if(code=="CANCEL_OTHER"){
        if(_state.contents)_this.submit(code)
        else
        ToastAndroid.show('请输入具体原因', ToastAndroid.SHORT);
      }else{
        _this.submit(code)
      }
    }else{
      ToastAndroid.show('请选择取消原因', ToastAndroid.SHORT);
    }
  }
  submit(code){
    var data={};
    data.cancelReasonCode = code;
    data.contents = _state.contents;
    data.workOrderId = _props.params.orderId;
    data.applyUserId = _state.userId;
    applyWorkOrderCancel(data,_this.submitFn)
  }
  submitFn(result){
    if(result.success){
      _state.dicValue = _state.dicValue.map(d=>{
        if(d.choice){
          d.choice = false;
        }
        return d;
      })
      _this.setState({dicValue:_state.dicValue})
      _props.onClose()
      _props._this.getDetail()
    }else{

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
        <View style={{position: 'absolute', width: width, height: height, backgroundColor: "#000", opacity: .6,}}>
        </View>
        <View style={styles.main}>
          <View style={styles.allbox}>
            <View style={styles.topbox}>
              <Text style={{fontSize:16,color:'#333',textAlign:'center',fontWeight:'bold',}}>{"确定取消工单吗？"}</Text>
            </View>
            <View style={styles.centerbox}>
              <View style={styles.line}>
                <Text style={{fontSize:15,color:'#333',}}>{"取消原因："}</Text>
              </View>
              {_state.dicValue.length?_state.dicValue.map((d,index)=>(
                <TouchableOpacity key={index} style={[styles.line,{paddingLeft: 10,}]} onPress={() => _this.onClick(index)}>
                  <Text style={{fontSize:15,color:'#666',}}>{d.label}</Text>
                  {d.choice?(
                    <Image style={{width:15,height:15,}} source={require('../../images/30b2.png')}></Image>
                  ):null}
                </TouchableOpacity>
              )):null}
              {_this.backinput()}
            </View>
            <View style={styles.bottombox}>
              <View style={styles.linebtn}>
                <TouchableOpacity style={styles.linebtnleft}
                  onPress={() => {_props.onClose()}}>
                  <Text style={{fontSize:15,color:'#fff',}}>{"取消"}</Text>
                </TouchableOpacity>
                <View style={styles.linebtncenter}></View>
                <TouchableOpacity style={styles.linebtnright}
                  onPress={() => {_this.onSure()}}>
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
