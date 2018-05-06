'use strict';
import React, { Component, } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity, Picker, } from 'react-native';
import PercentageCircle from 'react-native-percentage-circle';
import NavigatorTopBar from './../../components/NavigatorTopBar';
import RepairGrabModal from './../../components/online/RepairGrabModal';
import TimeOnline from './../../components/online/TimeOnline';
import BaiduLocation from 'react-native-baidu-location';
var { getMaintInfo, WorkOrderRob } = require('../../service/online');
var Dimensions = require('Dimensions');
var AsyncStorage = require('AsyncStorage');
var { width, height } = Dimensions.get('window');
var _navigator,_this,_state,_props,onlineSign=false;


class Online extends Component {

  constructor(props) {
    super(props);
    this.state = {
      online: global.Socketonline,
      modalVisible: false,
      getMsg: {},
      metatime: new Date().getTime(),
      time: 0,
      orderData: undefined,
    }
  }
  online(e){
    e= eval("("+e+")");
    if(e.success){
      global.Socketonline = true;
      _this.setState({time: e.onlineTime*1000,online: true,metatime:new Date().getTime()});
      //开始定位
      BaiduLocation.startLocation();
      if(!global.locationdata)global.locationdata = {};
      if(!global.locationdata.on){
        global.locationdata.on = true;
        BaiduLocation.didUpdateBMKUserLocation(//定位刷新回调
          function(param){
            if(param.describe == "网络定位成功"){
              if(global.locationdata.latitude != param.latitude || global.locationdata.longitude != param.longitude){
                global.locationdata.latitude = param.latitude;
                global.locationdata.longitude = param.longitude;
                global.sendSocketMsg("createUserGps",{latitude: param.latitude,longitude: param.longitude, userId:_state.userId})
              }
            }
          }
        );
        BaiduLocation.didFailToLocateUserWithError(//定位失败的回调
          function(param){
            console.log('didFailToLocateUserWithError',param);
          }
        );
        BaiduLocation.didStopLocatingUser(//定位停止的回调
          function didStopLocatingUser(param){
            console.log('didStopLocatingUser',param);
          }
        );
      }
    }
  }
  removeOnline(e){
    e= eval("("+e+")");
    if(e.success){
      global.Socketonline = false;
      _this.setState({time: e.onlineTime*1000,online: false,metatime:new Date().getTime()})
      //停止定位
      BaiduLocation.stopLocation();
    }
  }
  order(e){
    e.pushInfo= eval("("+e.pushInfo+")");
    e.userId = _state.userId;
    console.log(e)
    _this.setState({modalVisible: true,orderData:e})
  }
  componentDidMount(){
    AsyncStorage.getItem("main",(error,text)=>{
      if(!error){
        var data = JSON.parse(text)
        _this.setState({userId: data.id})
        getMaintInfo(data.id+"",_this.getMsgFn)
      }else{
      }
    });
    global.getSocketMsg.online = _this.online.bind(this);
    global.getSocketMsg.removeOnline = _this.removeOnline;
    global.getSocketMsg.order = _this.order;
  }
  componentWillUnmount(){
    global.getSocketMsg.order = null;
  }
  getMsgFn(result){
    if(result.success && result.data){
      _this.setState({getMsg: result.data,time: result.data.onlineTime*1000})
    }
  }
  _onlineChange(){//上下线处理
    if(_state.online){
      global.sendSocketMsg("removeOnline",{userId: _state.userId})
    }else{
      global.sendSocketMsg("online",{userId: _state.userId})
    }
  }
  _onClickGrab(){
    var e = {
      delFlag:0,
      orderId:"bd93dcf70c944d359cafeafb754547c3",
      pushInfo:'{"code":"GD20170619003","address":"北京市朝阳区中科院华严北里小区-华严北里09号楼-1-1-七所联建-9-1-101","description":"推送工单","isMember":0,"phone":"17777843182","event_comunication_id":"cb972b893ad34368ab3351166199a61f","bxName":"admin1","projectId":1,"fileList":[]}',
      pushTime:1497859615432,
      pushType:2,
      pushUserId:13,
      status:0,
    }
    e.pushInfo= eval("("+e.pushInfo+")");
    e.userId = _state.userId;
    _this.setState({modalVisible: true,orderData:e})
  }
  getpercent(getMsg){//百分比计算
    if(!getMsg.finished){
      return 0
    }else if(getMsg.finished && !getMsg.curToDo){
      return 100
    }else{
      return (getMsg.finished/(getMsg.finished + getMsg.curToDo)*100).toFixed(1)
    }
  }
  _onPushRouter(id,params){
    if(id){
      _navigator.push({
        title:id,
        id:id,
        params:params,
      });
    }
  }
  render() {
    _this = this;
    _state = _this.state;
    _props = _this.props;
    _navigator = _props.navigator;
    let NavigatorTopBarProps = {
      visible: true,
      title: "维修",
      leftView: (
        <TouchableOpacity style={{flex: 1}}
          underlayColor='transparent'
          onPress={() => {_navigator.pop()}}>
          <View style={{flex: 1, paddingLeft: 10,flexDirection: 'row',alignItems: 'center',}}>
            <Image style={{width: 23, height: 23,}} source={require('../../images/46a2.png')}></Image>
          </View>
        </TouchableOpacity>
      ),
      navigator: _navigator,
    }
    let RepairGrabModalProps = {
      visible: _state.modalVisible,
      data: _state.orderData,
      navigator: _navigator,
      onClose: function(){
        _this.setState({modalVisible: false})
      },
    }
    let TimeOnlineProps = {
      time: _state.time,
      metatime: _state.metatime,
      open: _state.online,
    }
    return (
      <View style={{flex: 1}}>
        <NavigatorTopBar {...NavigatorTopBarProps}/>
        <View style={styles.main}>
          <ScrollView>
            <View style={styles.total}>
              <View style={styles.left}>
                <View style={{ height: 108,  paddingBottom:5,}}>
                  <TimeOnline {...TimeOnlineProps}/>
                  <Text style={{fontSize:15,color:'#999999',textAlign:'left',padding:0,marginTop:0,marginBottom:8}}>在线时间</Text>
                  <Text style={{fontSize:15,color:'#333333',textAlign:'left'}}>已接&nbsp;:&nbsp;&nbsp;{_state.getMsg["count(1)"]?_state.getMsg["count(1)"]:0}单</Text>
                  <View style={styles.line}></View>
                  <Text style={{fontSize:15,color:'#333333',textAlign:'left',}}>流水&nbsp;:&nbsp;&nbsp;{_state.getMsg["cost"]?_state.getMsg["cost"]:0}元</Text>
                </View>
              </View>
              <View style={[styles.right,{}]}>
                <PercentageCircle radius={54} percent={_this.getpercent(_state.getMsg)} borderWidth={9} color={"#00aaff"}>
                  <Text style={{color: "#666",fontSize: 20}}>{_this.getpercent(_state.getMsg)}%</Text>
                  <Text style={{color: "#999",fontSize: 12}}>完工率</Text>
                </PercentageCircle>
              </View>
            </View>
            <TouchableOpacity onPress={() => {/*_this._onClickGrab()*/}}>
              <Image style={{width:width-20,height:70,marginTop:10,marginRight:10,marginLeft:10}} source={require('../../images/repair.png')}></Image>
            </TouchableOpacity>
            <View  style={{marginRight:10,marginLeft:10}}>
              <View style={styles.online}>
                <Image style={{width:16,height:18,marginRight:10,}} source={require('../../images/repair2.png')}></Image>
                <Text style={{fontSize:18,color:'#333333',textAlign:'left'}}>温馨提示</Text>
              </View>
              <View style={{marginLeft:26,marginTop:10,marginBottom:10, backgroundColor: '#fafafa',}}>
                <Text numberOfLines={3} style={{fontSize:15,color:'#666666',textAlign:'left',lineHeight:22}}>
                  请挑选合适工单
                </Text>
              </View>
            </View>
            <View style={{alignItems: 'center',  flexDirection: 'row',marginRight:10,marginLeft:10}}>
              <TouchableOpacity style={styles.block} onPress={()=>{/*_this._onPushRouter("RewardList")*/}}>
                <Text style={{fontSize:15,color:'#666666',textAlign:'center'}}>奖励</Text>
              </TouchableOpacity>
              <View style={{width:2,}}></View>
              <TouchableOpacity style={styles.block} onPress={()=>{_this._onPushRouter("WaitRepairList")}}>
                <View style={{flexDirection: 'row',}}>
                  <Text style={{fontSize:15,color:'#666666',textAlign:'center'}}>待修工单  </Text>
                  <Image style={{width:6,height:6,}} source={require('../../images/repair1.png')}></Image>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1,justifyContent: 'center',alignItems: 'center',marginRight:10,marginLeft:10,marginTop:30,marginBottom:30,}}>
              <TouchableOpacity style={[styles.circular,{borderColor:_state.online?"#f53f6a":"#2cd248"}]}
                onPress={() => {_this._onlineChange()}}>
                <View style={[styles.inside,{backgroundColor:_state.online?"#f53f6a":"#2cd248"}]}>
                  <Text style={{fontSize:18,color:'#ffffff',textAlign:'center'}}>{_state.online?"下线":"上线"}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
        <RepairGrabModal {...RepairGrabModalProps}/>
      </View>
    );
  }

};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: '#fafafa',
  },
  title: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2486f4',
  },
  total: {
    height: 140,
    marginTop:20,
    backgroundColor: '#ffffff',
    borderWidth:1,
    borderColor:'#8abef9',
    borderStyle:'dashed',
    borderRadius: 6,
    paddingLeft:30,
    flexDirection: 'row',
    marginRight:10,
    marginLeft:10,
  },
  left: {
    flex: 1,
    justifyContent: 'center',
    flexDirection:'column',
  },
  right: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progress:{
    alignItems: 'center',
    justifyContent: 'center',
    width:108,
    height:108,
    borderRadius:54,
    backgroundColor: '#dddddd',
  },
  core:{
    width:90,
    height:90,
    borderRadius:45,
    backgroundColor: '#ffffff',
  },
  line: {
    borderBottomWidth:1,
    borderBottomColor: '#ddd',
    borderStyle: 'solid',
    marginTop:2,
    marginBottom:2,
  },
  online:{
    alignItems: 'center',
    flexDirection: 'row',
    height:18,
    marginTop:20,
  },
  block:{
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    height:45,
    width:(width-20)/2,
    marginTop:40,
  },
  circular: {
    justifyContent: 'center',
    alignItems: 'center',
    width:100,
    height: 100,
    borderRadius:50,
    borderColor: '#2cd248',
    borderWidth:1,
  },
  inside: {
    justifyContent: 'center',
    alignItems: 'center',
    width:88,
    height: 88,
    borderRadius:44,
    backgroundColor: '#2cd248',
  },
});

module.exports = Online
