'use strict';
import React, { Component, } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity, AsyncStorage, StatusBar, } from 'react-native';
var { employeeInfo, } = require('../../service/mine');
import NaviBottomBar from './../../components/NaviBottomBar';
import NaviMsgBar from './../../components/NaviMsgBar';
import { feilURI } from './../../constant/url';
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
var _navigator,_this,_state;


class Mine extends Component {

  constructor(props) {
    super(props);
    this.state = {
      employeeInfo: {},
      isMaintenance: false,
      userId: undefined,
    }
  }
  componentDidMount(){
    AsyncStorage.getItem("main",(error,text)=>{
      if(!error){
        var data = JSON.parse(text)
        _this.setState({isMaintenance: data.isMaintenance,userId:data.id});
        employeeInfo(data.id+"",_this.resultFu);
      }
    });
  }
  resultFu(result){
    if(result.success && result.data){
      _this.setState({
        employeeInfo: result.data,
        name: result.data.name,
        propertySpecialName: result.data.propertySpecialName,
        imgurl: result.data.faceImg?result.data.faceImg:undefined,
      });
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

  render() {
    _this = this;
    _state = _this.state;
    _navigator = _this.props.navigator;
    let NaviBottomBarProps = {
      order: "Mine",
      _navigator: _navigator,
    }
    var MsgProps = {
      navigator:_navigator
    }
    return (
      <View style={{flex: 1,}}>
        <View style={styles.main}>
          <Image style={[styles.head,{paddingTop:StatusBar.currentHeight}]} resizeMode="stretch" source={require('../../images/mineA.png')}>
            <View style={styles.middle}>
              <View style={{width:60,}}>
                 <NaviMsgBar {...MsgProps}/>
              </View>
            </View>
            <View style={styles.last}>
               <TouchableOpacity style={styles.circular} onPress={() => {_this._onPushRouter("PersonalData",{})}}>
                  <View style={styles.circularGray}>
                     <Image style={{width:70,height:70,borderRadius: 35,overflow: 'hidden'}} source={_state.imgurl?{uri: feilURI+_state.imgurl}:require('../../images/list1.png')}></Image>
                  </View>
               </TouchableOpacity>
               <Text style={{fontSize:15,marginTop:12,marginBottom:10,color:'#FFFFFF',textAlign:'center',padding:0,lineHeight:15}}>{_state.name}</Text>
               {_state.propertySpecialName?<View style={styles.post}>
                 <Text style={{fontSize:12,color:'#a9d7fb',textAlign:'center'}}>{_state.propertySpecialName}</Text>
               </View>:null}
            </View>
          </Image>
          <View style={styles.text}>
            <TouchableOpacity style={styles.online}
              underlayColor='transparent'
              onPress={() => {this._onPushRouter("ResponsibleArea",{})}}>
                  <Image style={{width:12,height:12,marginRight:10,marginLeft:15,}} source={require('../../images/icon4.png')}></Image>
                  <Text style={{fontSize:15,color:'#333333'}}>负责小区</Text>
            </TouchableOpacity>
            <View style={styles.line}></View>
            <TouchableOpacity style={styles.online}
              underlayColor='transparent'
              onPress={() => {this._onPushRouterFade("MailList",{})}}>
                  <Image style={{width:12,height:12,marginRight:10,marginLeft:15,}} source={require('../../images/icon3.png')}></Image>
                  <Text style={{fontSize:15,color:'#333333'}}>通讯录</Text>
            </TouchableOpacity>
            {!_state.isMaintenance?(<View style={styles.line}></View>):null}
            {!_state.isMaintenance?(<TouchableOpacity style={styles.online}
              underlayColor='transparent'
              onPress={() => {this._onPushRouter("WorkOrderHistoryList",{})}}>
                  <Image style={{width:12,height:12,marginRight:10,marginLeft:15,}} source={require('../../images/icon2.png')}></Image>
                  <Text style={{fontSize:15,color:'#333333'}}>历史工单</Text>
            </TouchableOpacity>):null}
          </View>
          <TouchableOpacity style={styles.set}
            underlayColor='transparent'
            onPress={() => {this._onPushRouter("Setting",{})}}>
                <Image style={{width:12,height:12,marginRight:10,marginLeft:15,}} source={require('../../images/icon5.png')}></Image>
                <Text style={{fontSize:15,color:'#333333'}}>设置</Text>
          </TouchableOpacity>
        </View>
        <NaviBottomBar {...NaviBottomBarProps}/>
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
  head:{
    width:width,
    height: 220+StatusBar.currentHeight,
    flexDirection:'column',
  },
  middle:{
    height: 45,
    flexDirection:'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  last:{
    height: 176,
    alignItems: 'center',
  },
  circular: {
    justifyContent: 'center',
    alignItems: 'center',
    width:82,
    height: 82,
    borderRadius:41,
    borderColor: '#24c5f4',
    borderWidth:6,
    backgroundColor: '#50b9f6',
    marginTop:10,
  },
  circularGray: {
    justifyContent: 'center',
    alignItems: 'center',
    width:70,
    height: 70,
    marginTop:3,
    marginBottom:3,
    borderRadius:35,
    backgroundColor: '#FFFFFF',
  },
  post: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 130,
    height: 20,
    backgroundColor: '#188ce7',
    borderWidth: 1,
    borderColor: '#188ce7',
    borderRadius:25,
  },
  text: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop : 10,
  },
  set: {
    height: 49,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop : 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  online: {
    height: 49,
    alignItems: 'center',
    flexDirection: 'row',
  },
  line: {
    borderBottomWidth:1,
    borderBottomColor: '#ddd',
    borderStyle: 'solid',
    marginLeft:37,
  },

});

module.exports = Mine
