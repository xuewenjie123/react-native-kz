'use strict';
import React, { Component, } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, AsyncStorage, ToastAndroid } from 'react-native';
var { getAdInfo, } = require('../../service/home');
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
import NavigatorTopBar from './../../components/NavigatorTopBar';
import NaviBottomBar from './../../components/NaviBottomBar';
import color from './../../constant/color';
import RepairChoiceModal from './../../components/RepairChoiceModal';
import SwiperBox from './../../components/home/SwiperBox';
var _navigator,_this,_state,_props;

var imageList = {
  "66a1": require('../../images/66a1.png'),
  "66a2": require('../../images/66a2.png'),
  "66a3": require('../../images/66a3.png'),
  "66a4": require('../../images/66a4.png'),
  "66a5": require('../../images/66a5.png'),
}

var menuList = [
  { title: "OA", image: "66a1", handlefunc: "_onPushRouter", routerId: "", },
  { title: "考勤", image: "66a1", handlefunc: "_onPushRouter", routerId: "", },
  { title: "公告", image: "66a1", handlefunc: "_onPushRouter", routerId: "", },
  { title: "审批", image: "66a1", handlefunc: "_onPushRouter", routerId: "", },
  { title: "积分", image: "66a1", handlefunc: "_onPushRouter", routerId: "", },
  { title: "会务", image: "66a1", handlefunc: "_onPushRouter", routerId: "", },
  { title: "维修", image: "66a2", handlefunc: "_onPushRouter", routerId: "Online", },
  { title: "车务", image: "66a1", handlefunc: "_onPushRouter", routerId: "", },
  { title: "邮件", image: "66a1", handlefunc: "_onPushRouter", routerId: "", },
  { title: "投诉", image: "66a5", handlefunc: "_onPushRouter", routerId: "ComplaintDealList", },
  { title: "报修", image: "66a3", handlefunc: "_onPushRepair", routerId: "Repair", },
  { title: "查看工作", image: "66a4", handlefunc: "_onPushRouterFade", routerId: "ViewWork", },
  { title: "工单管理", image: "66a1", handlefunc: "_onPushRouter", routerId: "WorkOrderManagement", },
  { title: "登录", image: "66a1", handlefunc: "_onPushRouter", routerId: "Login", },
  { title: "奖励", image: "66a1", handlefunc: "_onPushRouter", routerId: "RewardList", },
  { title: "待修工单", image: "66a1", handlefunc: "_onPushRouter", routerId: "WaitRepairList", },
]

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      repairModal: false,
      menu: [],
      imglist: [],
    }
  }
  componentDidMount(){
    AsyncStorage.getItem("main",(error,text)=>{
      if(!error){
        var data = JSON.parse(text)
        if(data){
          if(data.isMaintenance){
            _this.setState({
              userId: data.id,
              menu: [
                { title: "OA", image: "66a1", handlefunc: "_noPushRouter", routerId: "", },
                { title: "考勤", image: "66a1", handlefunc: "_noPushRouter", routerId: "", },
                { title: "公告", image: "66a1", handlefunc: "_noPushRouter", routerId: "", },
                { title: "审批", image: "66a1", handlefunc: "_noPushRouter", routerId: "", },
                { title: "积分", image: "66a1", handlefunc: "_noPushRouter", routerId: "", },
                { title: "会务", image: "66a1", handlefunc: "_noPushRouter", routerId: "", },
                { title: "车务", image: "66a1", handlefunc: "_noPushRouter", routerId: "", },
                { title: "邮件", image: "66a1", handlefunc: "_noPushRouter", routerId: "", },
                { title: "查看工作", image: "66a4", handlefunc: "_onPushRouterFade", routerId: "ViewWork", },
                { title: "工单管理", image: "66a3", handlefunc: "_onPushRouter", routerId: "WorkOrderManagement", },
              ],
            });
          }else{
            _this.setState({
              userId: data.id,
              menu: [
                { title: "OA", image: "66a1", handlefunc: "_noPushRouter", routerId: "", },
                { title: "考勤", image: "66a1", handlefunc: "_noPushRouter", routerId: "", },
                { title: "公告", image: "66a1", handlefunc: "_noPushRouter", routerId: "", },
                { title: "积分", image: "66a1", handlefunc: "_noPushRouter", routerId: "", },
                { title: "会务", image: "66a1", handlefunc: "_noPushRouter", routerId: "", },
                { title: "车务", image: "66a1", handlefunc: "_noPushRouter", routerId: "", },
                { title: "邮件", image: "66a1", handlefunc: "_noPushRouter", routerId: "", },
                { title: "维修", image: "66a2", handlefunc: "_onPushRouter", routerId: "Online", },
                { title: "待修工单", image: "66a3", handlefunc: "_onPushRouter", routerId: "WaitRepairList", },
              ],
            });
          }
        }else{
          _this._resetToRouter("Login")
        }
      }
    });
    getAdInfo("",_this.getAdInfoResult);
  }
  getAdInfoResult(result){
    if(result.success && result.data){
      if(result.data.length)
      _this.setState({imglist: result.data});
      else
      _this.setState({imglist: [require('../../images/zelse750a1.png'),require('../../images/zelse750a1.png'),require('../../images/zelse750a1.png')]});
    }else{
    }
  }
  _resetToRouter(id){
    if(id){
      _navigator.resetTo({
        title:id,
        id:id,
      });
    }
  }
  _onPushRouter(id,params){
    if(id){
      _navigator.push({
        title:id,
        id:id,
        params:{
          mapId:_state.userId,
        },
      });
    }
  }
  _onPushRouterFade(id,params){
    if(id){
      _navigator.push({
        title:id,
        id:id,
        params:params,
        moveScene: "Fade",
      });
    }
  }
  _onPushRepair(id,params){
    this.setState({repairModal: true})
  }
  _noPushRouter(){
    ToastAndroid.show('功能开发中，敬请期待。。。', ToastAndroid.SHORT);
  }
  render() {
    _this = this;
    _state = _this.state;
    _props = _this.props;
    _navigator = _this.props.navigator;
    let NavigatorTopBarProps = {
      visible: true,
      title: "易科住",
      leftView: (
        <TouchableOpacity style={{flex: 1}}
          underlayColor='transparent'
          onPress={() => {}}>
          <View style={{flex: 1, paddingLeft: 10,flexDirection: 'row',alignItems: 'center',}}>
          </View>
        </TouchableOpacity>
      ),
      navigator: _navigator,
    }
    let NaviBottomBarProps = {
      order: "home",
      _navigator: _navigator,
    }
    let RepairChoiceModalProps = {
      visible: _state.repairModal,
      onRepair: function(){
        _this.setState({ repairModal: false, })
        _this._onPushRouter("Repair",{})
      },
      onRepairGeneration: function(){
        _this.setState({ repairModal: false, })
        _this._onPushRouter("RepairGeneration",{})
      },
      onfalse: function(){
        _this.setState({ repairModal: false, })
      },
    }
    let SwiperBoxProps = {
      imglist: _state.imglist,
      imgstyle: styles.image,
    }
    return (
      <View style={{flex: 1}}>
        <NavigatorTopBar {...NavigatorTopBarProps}/>
        <View style={styles.main}>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <View style={styles.image}>
              {_state.imglist.length?(<SwiperBox {...SwiperBoxProps} style={styles.image}/>):null}
            </View>
            <View style={styles.info}>
              {this.state.menu.map((d,index)=>(
                <View style={styles.infobox} key={index}>
                  <TouchableOpacity style={{justifyContent: 'center',}} underlayColor='transparent'
                    onPress={() => {this[d.handlefunc](d.routerId,{})}}>
                    <View style={styles.infoinbox}>
                      <Image style={styles.image66} source={imageList[d.image]}></Image>
                      <Text style={styles.text}>
                        {d.title}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
        <NaviBottomBar {...NaviBottomBarProps}/>
        <RepairChoiceModal {...RepairChoiceModalProps}/>
      </View>
    );
  }

};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: color.white2C,
    flexDirection: 'column',
    padding: 0,
  },
  contentContainer: {
    width: width,
    position: 'relative',
  },
  image: {
    width:width,
    height:351*width/750,
  },
  image66: {
    width:33,
    height:33,
    marginBottom: 10,
  },
  info: {
    marginTop: 10,
    marginBottom: 20,
    marginRight: -1,
    width:width+1,
    borderTopWidth: 1,
    borderColor: color.line2C,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  infobox: {
    width:width/4,
    height:width/4,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: color.white1C,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: color.line2C,
  },
  infoinbox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    color: color.black2C,
  },
});

module.exports = Home
