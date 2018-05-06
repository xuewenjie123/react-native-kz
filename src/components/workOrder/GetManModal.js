'use strict';
import React, { Component, } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity, Picker, Modal, AsyncStorage, BackAndroid, ToastAndroid } from 'react-native';
import NavigatorTopBar from './../../components/NavigatorTopBar';
var { WorkOrderAssign, getAssignPeronInfo, getAssignCoordinationPeronInfo, WorkOrderAssignCoordination, } = require('../../service/repair');
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
var _navigator,_this,_state,_props;

class Transfer extends Component {

  constructor(props) {
    super(props);
    this.state={
      manList: [],
      manListmax: undefined,
    }
  }
  componentDidMount(){
    AsyncStorage.getItem("main",(error,text)=>{
      if(!error){
        var data = JSON.parse(text)
        _this.setState({userId: data.id});
        //if()
      }else{
      }
    });
  }
  componentWillReceiveProps(newProps){
    if(newProps.visible && !_props.visible){
      BackAndroid.addEventListener('hardwareBackPress', function() {
        _props.onClose()
        return false;
      });
      if(newProps.assignmain){
        getAssignPeronInfo(newProps.params.orderId,_this.getMan)
      }else{
        getAssignCoordinationPeronInfo(newProps.params.orderId,_this.getManCoordination)
      }
    }else if(!newProps.visible && _props.visible){
      BackAndroid.removeEventListener('hardwareBackPress', function() {
      });
    }
  }
  getMan(result){
    if(result.success && result.data){
      var manList;
      result.data.map(d=>{
        if(d.label == "工程部"){
          manList = d.children;
        }
      })
      _this.setState({
        manList: manList
      });
    }else{

    }
  }
  getManCoordination(result){
    if(result.success && result.data){
      var manList;
      result.data.workOrderPersonList.map(d=>{
        if(d.label == "工程部"){
          manList = d.children;
        }
      })
      var getd = result.data.coordinationedCountMap,data;
      if(getd){
        data = {
          manList: manList,
          manListmax: getd.coordinationedCounts - getd.assignedCount,
          workOrderApplyCoordinationId: getd.workOrderApplyCoordinationId,
        }
      }else{
        data = {
          manList: manList,
          manListmax: 0,
        }
      }
      _this.setState(data);
    }else{

    }
  }
  submit(){
    var get = false;
    if(_props.assignmain){
      var userId = [];
      _state.manList.map(d=>{
        if(d.select){
          userId = d.value;
          get = true;
        }
      })
    }else{
      var manlist = [];
      _state.manList.map(d=>{
        if(d.select){
          manlist.push(d.value);
          get = true;
        }
      })
    }
    if(!get){
      ToastAndroid.show('请选择人员', ToastAndroid.SHORT);
    }else{

      var data={};
      data.workOrderId = _props.params.orderId;
      if(_props.assignmain){
        data.changeUserId = userId;
        WorkOrderAssign(data,_this.submitFn)
      }else{
        data.workOrderApplyCoordinationId = _state.workOrderApplyCoordinationId;
        data.assignCoordinations = manlist;
        WorkOrderAssignCoordination(data,_this.submitFn)
      }
    }
  }
  submitFn(result){
    if(result.success){
      _props.onClose()
      _props._this.getDetail()
    }else{

    }
  }
  selectFn(index){
    if(_props.assignmain){
      _state.manList = _state.manList.map((d,inde)=>{
        if(index == inde){
          d.select = !d.select
        }else{
          if(!_state.manList[index].select){
            d.select = false;
          }
        }
        return d;
      })
    }else{
      var max=0;
      _state.manList.map((d,inde)=>{
        if(d.select)max+=1
      })
      _state.manList = _state.manList.map((d,inde)=>{
        if(index == inde){
          if(_state.manListmax==0){
            ToastAndroid.show('工单负责人未申请协同', ToastAndroid.SHORT);
          }else if(!d.select && max >= _state.manListmax){
            ToastAndroid.show('协同人超额', ToastAndroid.SHORT);
          }else if(!d.select && max < _state.manListmax){
            d.select = true;
          }else if(d.select){
            d.select = false;
          }
        }else{
        }
        return d;
      })
    }
    _this.setState({
      manList: _state.manList
    })
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
    let NavigatorTopBarProps = {
      visible: true,
      title: _props.assignmain?_props.mtitle:_props.mtitle +(_state.manListmax?"（"+_state.manListmax+"）":"（0）"),
      leftView: (
        <TouchableOpacity style={{flex: 1}}
          underlayColor='transparent'
          onPress={() => {_props.onClose()}}>
          <View style={{flex: 1, paddingLeft: 10,flexDirection: 'row',alignItems: 'center',}}>
            <Text style={{fontSize: 15, color: "#fff"}}>
              {"取消"}
            </Text>
          </View>
        </TouchableOpacity>
      ),
      rightView: (
        <TouchableOpacity  style={{flex: 1}}
          underlayColor='transparent'
          onPress={() => {_this.submit()}}>
          <View style={{flex: 1, paddingRight: 10,flexDirection: 'row',justifyContent: 'flex-end', alignItems: 'center',}}>
            <Text style={{fontSize: 15, color: "#fff"}}>
              {"提交"}
            </Text>
          </View>
        </TouchableOpacity>
      ),
    }
    return (
      <Modal {...modalProps} >
        <View style={{flex: 1,}}>
          <NavigatorTopBar {...NavigatorTopBarProps}/>
          <View style={styles.main}>
            <View style={styles.input}>
              <View style={styles.select}>
                <TextInput underlineColorAndroid = "transparent" placeholder='搜索' style={{color:'#666666',fontSize:15,textAlign:'center',padding:0,margin:0,}} />
              </View>
            </View>
            <View style={styles.list}>
              <ScrollView>
                {_state.manList.map((d,index)=>(
                  <TouchableOpacity underlayColor='transparent' key={index} style={styles.listA}
                    onPress={() => _this.selectFn(index)}>
                    <View style={styles.photo}>
                      <Image style={{width:44,height:44,}} source={d.url?{uri: d.url}:require('../../images/list1.png')}></Image>
                    </View>
                    <View style={{flex: 1,height:44,paddingTop:5,paddingBottom:5,}}>
                      <View  style={styles.online}>
                        <View>
                          <Text style={{fontSize:15,color:'#333333',textAlign:'left',lineHeight:15}}>{d.label}</Text>
                        </View>
                        {d.params?(<Text style={{fontSize:15,color:'#999999',textAlign:'left',marginRight:10,marginLeft:10}}>|</Text>):null}
                        <View>
                          <Text style={{fontSize:13,color:'#999999',textAlign:'left',}}>{}</Text>
                        </View>
                      </View>
                      <Text style={{fontSize:12,color:'#333333',textAlign:'left',marginTop:6,lineHeight:12}}>{}</Text>
                    </View>
                    <View style={styles.photo2}>
                      {d.select?(
                        <Image style={{width:16,height:16,}} source={require('../../images/success.png')}></Image>
                      ):null}
                    </View>
                  </TouchableOpacity>
                ))}
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
    flexDirection:'column',
    backgroundColor: '#f5f5f5',
  },
  title: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2486f4',
  },
  input: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  select: {
    width:width-30,
    justifyContent: 'center',
    height: 28,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius:25,
  },
  list: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop:10,
  },
  photo: {
    justifyContent: 'center',
    alignItems: 'center',
    width:44,
    height: 44,
    borderRadius:22,
    backgroundColor: '#2486f4',
    marginRight:10,
  },
  photo2: {
    justifyContent: 'center',
    alignItems: 'center',
    width:44,
    height: 44,
  },
  listA: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 64,
    backgroundColor: 'white',
    paddingLeft:15,
    paddingRight:15,
    borderBottomWidth:1,
    borderBottomColor: '#ddd',
    borderStyle: 'solid',
  },
  online:{
    flex: 1,
    height: 15,
    alignItems: 'center',
    flexDirection: 'row',
   },
});

module.exports = Transfer
