'use strict';
import React, { Component, } from 'react';
import { StyleSheet, Text, View, Navigator, BackAndroid, TouchableOpacity, StatusBar, PermissionsAndroid, AsyncStorage, } from 'react-native';
//import SocketIO from 'react-native-swift-socketio';
import { socketMsgURI, socketWorkURI, } from './constant/url'
import color from './constant/color'
var Login = require('./router/Login');


  var Home = require('./router/home/Home');


  var Workbench = require('./router/home/Workbench');


  var Mine = require('./router/home/Mine');
  var Setting = require('./router/mine/Setting');
  var PersonalData = require('./router/mine/PersonalData');
  var Password = require('./router/mine/Password');
  var SetNewNews = require('./router/mine/SetNewNews');
  var ResponsibleArea = require('./router/mine/ResponsibleArea');

  var WorkOrderHistoryList = require('./router/history/WorkOrderHistoryList');
  var WorkOrderHistoryDetail = require('./router/history/WorkOrderHistoryDetail');

  var MailList = require('./router/mailList/MailList');


  var Repair = require('./router/applyRepair/Repair');
  var RepairGeneration = require('./router/applyRepair/RepairGeneration');


  var Online = require('./router/online/Online');


  var WaitRepairList = require('./router/repair/WaitRepairList');
  var WaitRepairDetail = require('./router/repair/WaitRepairDetail');
  var WorkOrderComplete = require('./router/repair/WorkOrderComplete');
  var CustomerConfirmation = require('./router/repair/CustomerConfirmation');
  var ApplyChange = require('./router/repair/ApplyChange');
  var ApplyHang = require('./router/repair/ApplyHang');
  var ApplyCoordination = require('./router/repair/ApplyCoordination');
  var WorkOrderDealDetail = require('./router/repair/WorkOrderDealDetail');


  var RewardList = require('./router/reward/RewardList');
  var RewardDetail = require('./router/reward/RewardDetail');


  var MessageNotice = require('./router/message/Main');
  var NoticeDetail = require('./router/message/NoticeDetail');


  var ComplaintDealList = require('./router/complaintDeal/ComplaintDealList');
  var ComplaintDealDetail = require('./router/complaintDeal/ComplaintDealDetail');
  var SugesstionDealList = require('./router/complaintDeal/SugesstionDealList');
  var SugesstionDealDetail = require('./router/complaintDeal/SugesstionDealDetail');
  var ComplaintDealComplete = require('./router/complaintDeal/ComplaintDealComplete');
  var Transfer = require('./router/complaintDeal/Transfer');


  var ViewWork = require('./router/viewWork/ViewWork');
  var ViewWorkListRepair = require('./router/viewWork/ViewWorkListRepair');
  var ViewWorkListMan = require('./router/viewWork/ViewWorkListMan');
  var ViewWorkListComplaint = require('./router/viewWork/ViewWorkListComplaint');
  var ViewWorkListInquiries = require('./router/viewWork/ViewWorkListInquiries');
  var ViewWorkListSugesstion = require('./router/viewWork/ViewWorkListSugesstion');
  var RepairViewWorkDetail = require('./router/viewWork/RepairViewWorkDetail');
  var ManViewWorkDetail = require('./router/viewWork/ManViewWorkDetail');
  var ViewWorkDetailComplaint = require('./router/viewWork/ViewWorkDetailComplaint');
  var ViewWorkDetailInquiries = require('./router/viewWork/ViewWorkDetailInquiries');
  var ViewWorkDetailSugesstion = require('./router/viewWork/ViewWorkDetailSugesstion');

  var WorkOrderManagement = require('./router/workOrder/WorkOrderManagement');
  var WorkOrderDetail = require('./router/workOrder/WorkOrderDetail');


  var RnBaiduLocation = require('./components/rnBaiduLocation/RnBaiduLocation');
  var BaiduMap = require('./router/map/Map');
  var Dackpush = require('./components/dackpush/Dackpush');

var _navigator;
function maxfont(str,da){
  if(str){
    str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
    str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
    str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
    str = str.replace(/ /ig,'');//去掉
    return str
  }else{
    return "";
  }
}

BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator.getCurrentRoutes().length === 1  ) {
     return false;
  }else{
    _navigator.pop();
    return true;
  }
});

function socketLinkFn(url){
  var wx = new WebSocket(url)
  function sendSocketMsg(map,data){
    console.log(map)
    console.log(data)
    if(global.getSocketMsg && global.socketMsg.readyState == 1){
      wx.send(JSON.stringify({map: map,data: data}))
    }
  }
  function getSocketMsg(map,data){
    (global.getSocketMsg && global.getSocketMsg[map])?global.getSocketMsg[map](data):null
  }
  function onopen(){// 打开一个连接
    console.log("onopen")
    global.sendSocketMsg = sendSocketMsg;
    AsyncStorage.getItem("main",(error,text)=>{
      if(!error){
        var data = JSON.parse(text)
        if(data){
          global.sendSocketMsg("init",{userId: data.id})
        }
      }
    });
  }
  function onmessage(e){// 接收到了一个消息
    console.log("onmessage");
    var data = JSON.parse(e.data);
    console.log(data);
    getSocketMsg(data.map,data.data)
  }
  function onerror(e){// 发生了一个错误
    console.log("onerror");
    console.log(e);
  }
  function onclose(e){// 连接被关闭了
    console.log("onclose");
    console.log(e);
    if(global.socketMsgOnSign){
      global.socketMsg = null;
      socketLinkFn(socketMsgURI);
    }
  }
  wx.onopen = onopen;
  wx.onmessage = onmessage;
  wx.onerror = onerror;
  wx.onclose = onclose;
  global.socketMsg = wx;
}

class Routers extends Component {

  componentDidMount(){
    global.socketMsgOnSign = true;
    socketLinkFn(socketMsgURI);
    global.getSocketMsg = {}
    AsyncStorage.getItem("main",(error,text)=>{
      if(!error){
        var data = JSON.parse(text)
        if(data){
          global.getSocketMsg.msg = function(e){
            if(e instanceof Object){
              global.getMsgSign = true;
              console.log(e)
              e.pushInfo= e.pushInfo?eval("("+e.pushInfo+")"):undefined;
              var sendData = {};
              if(e.pushInfo && e.pushInfo.title)sendData.title = e.pushInfo.title;
              else sendData.title = "您有新的消息";
              if(e.pushInfo && e.pushInfo.content)sendData.body = maxfont(e.pushInfo.content);
              else sendData.body = "请注意查收";
              global.pushDackData(sendData)
            }
          }
        }
      }
    });
    global.getSocketMsg.initSuccess = this.setIntervalStart
  }
  setIntervalStart(){
    if(!this._timego)
    this._timego = setInterval(()=>global.sendSocketMsg("defaultMsg",{}),50000);
  }
  componentWillUnmount(){
    clearInterval(this._timego);
    this._timego = null;
  }
  renderScene(route, navigator) {
    _navigator = navigator;
    var Conment;
    switch (route.id) {
      case 'RnBaiduLocation':
        Conment = RnBaiduLocation;
        break;
      case 'BaiduMap':
        Conment = BaiduMap;
        break;
      case 'Dackpush':
        Conment = Dackpush;
        break;
      case 'Login':
        Conment = Login;
        break;


      case 'Home':
        Conment = Home;
        break;


      case 'Workbench':
        Conment = Workbench;
        break;


      case 'Mine':
        Conment = Mine;
        break;
      case 'Setting':
        Conment = Setting;
        break;
      case 'PersonalData':
        Conment = PersonalData;
        break;
      case 'Password':
        Conment = Password;
        break;
      case 'SetNewNews':
        Conment = SetNewNews;
        break;
      case 'ResponsibleArea':
        Conment = ResponsibleArea;
        break;
      case 'WorkOrderHistoryList':
        Conment = WorkOrderHistoryList;
        break;
      case 'WorkOrderHistoryDetail':
        Conment = WorkOrderHistoryDetail;
        break;

      case 'MailList':
        Conment = MailList;
        break;


      case 'Repair':
        Conment = Repair;
        break;
      case 'RepairGeneration':
        Conment = RepairGeneration;
        break;
      case 'Online':
        Conment = Online;
        break;
      case 'WaitRepairList':
        Conment = WaitRepairList;
        break;
      case 'WaitRepairDetail':
        Conment = WaitRepairDetail;
        break;
      case 'WorkOrderComplete':
        Conment = WorkOrderComplete;
        break;
      case 'CustomerConfirmation':
        Conment = CustomerConfirmation;
        break;
      case 'ApplyChange':
        Conment = ApplyChange;
        break;
      case 'ApplyHang':
        Conment = ApplyHang;
        break;
      case 'ApplyCoordination':
        Conment = ApplyCoordination;
        break;
      case 'WorkOrderDealDetail':
        Conment = WorkOrderDealDetail;
        break;


      case 'RewardList':
        Conment = RewardList;
        break;
      case 'RewardDetail':
        Conment = RewardDetail;
        break;


      case 'MessageNotice':
        Conment = MessageNotice;
        break;
      case 'NoticeDetail':
        Conment = NoticeDetail;
        break;


      case 'ComplaintDealList':
        Conment = ComplaintDealList;
        break;
      case 'ComplaintDealDetail':
        Conment = ComplaintDealDetail;
        break;
      case 'SugesstionDealList':
        Conment = SugesstionDealList;
        break;
      case 'SugesstionDealDetail':
        Conment = SugesstionDealDetail;
        break;
      case 'ComplaintDealComplete':
        Conment = ComplaintDealComplete;
        break;
      case 'Transfer':
        Conment = Transfer;
        break;


      case 'ViewWork':
        Conment = ViewWork;
        break;
      case 'ViewWorkListRepair':
        Conment = ViewWorkListRepair;
        break;
      case 'ViewWorkListMan':
        Conment = ViewWorkListMan;
        break;
      case 'ViewWorkListComplaint':
        Conment = ViewWorkListComplaint;
        break;
      case 'ViewWorkListInquiries':
        Conment = ViewWorkListInquiries;
        break;
      case 'ViewWorkListSugesstion':
        Conment = ViewWorkListSugesstion;
        break;
      case 'RepairViewWorkDetail':
        Conment = RepairViewWorkDetail;
        break;
      case 'ManViewWorkDetail':
        Conment = ManViewWorkDetail;
        break;
      case 'ViewWorkDetailComplaint':
        Conment = ViewWorkDetailComplaint;
        break;
      case 'ViewWorkDetailInquiries':
        Conment = ViewWorkDetailInquiries;
        break;
      case 'ViewWorkDetailSugesstion':
        Conment = ViewWorkDetailSugesstion;
        break;

      case 'WorkOrderManagement':
        Conment = WorkOrderManagement;
        break;
      case 'WorkOrderDetail':
        Conment = WorkOrderDetail;
        break;
      default:
        Conment = Home;
    }
    return (
      <View style={{flex: 1}}>
        <Conment navigator={navigator} route={route} {...route.params} />
      </View>
    );
  }

  configureScene(route, routeStack) {
    if(route.moveScene == "Fade"){
      return Navigator.SceneConfigs.FadeAndroid; //淡化进入
    }else if(route.moveScene == "FloatFromRight"){
      return Navigator.SceneConfigs.FloatFromRight; //默认右划进入
    }else{
      return Navigator.SceneConfigs.FloatFromRight; //默认右划进入
    }
  }
  render() {
    return (
      <View style={{flex: 1,}}>
         <StatusBar
           translucent={true}
           backgroundColor={"transparent"}
           barStyle="light-content"
         />
         <Dackpush />
        <Navigator
          initialRoute = {{id: 'Home'}}
          configureScene = {this.configureScene}
          renderScene={this.renderScene}
        />
      </View>
    );
  }
}
var styles = StyleSheet.create({
});

module.exports = Routers
