'use strict';
import React, { Component, } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, AsyncStorage } from 'react-native';
var { getChargeProject, getSelectTime } = require('../../service/viewWork');
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
import NavigatorTopBar from './../../components/NavigatorTopBar';
import NaviSubBar from './../../components/NaviSubBar';
import ChargeProjectModal from './../../components/viewWork/ChargeProjectModal';
import TimeChoiceModal from './../../components/viewWork/TimeChoiceModal';
import RepairNeedDo from './RepairNeedDo';
import RepairOnDo from './RepairOnDo';
import RepairDoes from './RepairDoes';
import color from './../../constant/color';
var _navigator,_this,_state;

var imageList = {
  "48a2": require('../../images/48a2.png'),
  "48a3": require('../../images/48a3.png'),
}

class ViewWorkList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: "1st",
      projectList: [],
      projectId: undefined,
      projectModalV: false,
      dateTimeList: [],
      dateTime: undefined,
      timeModalV: false,
    };
  }
  componentDidMount(){
    AsyncStorage.getItem("main",(error,text)=>{
      if(!error){
        var data = JSON.parse(text)
        _this.setState({userId:data.id});
        getChargeProject(data.id+"",_this.getChargeProjectFn);
        getSelectTime("",_this.getSelectTimeFn);
      }else{
      }
    });
  }
  getChargeProjectFn(result){
    if(result.success && result.data){
      var arr = [{name:"显示全部",id:undefined,choice: true}]
      _this.setState({projectList:arr.concat(result.data)});
    }
  }
  getSelectTimeFn(result){
    if(result.success && result.data){
      _this.setState({dateTimeList:result.data});
    }
  }
  _onPushRouter(id,params){
    if(id){
      _navigator.push({
        title:"id",
        id:id,
        params:{
          ..._this.props,
          params: params,
        },
      });
    }
  }
  onSure(value){
    _this.setState({dateTime:value[value.length-1]})
  }
  render() {
    _this = this;
    _state = _this.state;
    _navigator = _this.props.navigator;
    let NavigatorTopBarProps = {
      visible: true,
      title: "报修",
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
    let NaviSubBarProps = {
      order: _state.order,
      leftAction: function (){
        _this.setState({
          order: '1st'
        })
      },
      centerAction: function (){
        _this.setState({
          order: '2st'
        })
      },
      rightAction: function (){
        _this.setState({
          order: '3st'
        })
      },
    }
    let modalProps = {
      navigator: _navigator,
      projectId: _state.projectId,
      dateTime: _state.dateTime,
    }
    let ChargeProjectModalProps = {
      visible: _state.projectModalV,
      projectList: _state.projectList,
      _this: _this,
    }
    let TimeChoiceModalProps = {
      title: "时间筛选",
      visible: _state.timeModalV,
      listData: _state.dateTimeList,
      _this: _this,
      onSure: _this.onSure,
    }
    function getChildJsx(){
      switch (_state.order) {
        case "1st":
          return (<RepairNeedDo {...modalProps}/>)
          break;
        case "2st":
          return (<RepairOnDo {...modalProps}/>)
          break;
        case "3st":
          return (<RepairDoes {...modalProps}/>)
          break;
        default:
          return null
      }
    }
    return (
      <View style={{flex: 1,}}>
        <NavigatorTopBar {...NavigatorTopBarProps}/>
        <View style={styles.main}>
          <NaviSubBar {...NaviSubBarProps} />
          {getChildJsx()}
        </View>
        <View style={styles.floatbox}>
          {_state.order=="3st"?(
            <TouchableOpacity underlayColor='transparent' style={[styles.float,{backgroundColor:color.main1C}]} onPress={() => {_this.setState({timeModalV:true})}}>
              <Image style={styles.image24} source={imageList['48a2']}></Image>
            </TouchableOpacity>
          ):null}
          {_state.projectList.length>1?(
            <TouchableOpacity underlayColor='transparent' style={[styles.float,{backgroundColor:color.black2C}]} onPress={() => {_this.setState({projectModalV:true})}}>
              <Image style={styles.image24} source={imageList['48a3']}></Image>
            </TouchableOpacity>
          ):null}
        </View>
        <ChargeProjectModal {...ChargeProjectModalProps}/>
        <TimeChoiceModal {...TimeChoiceModalProps}/>
      </View>
    );
  }

};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: color.white2C,
    flexDirection: 'column',
  },
  contentContainer: {
  },
  floatbox: {
    position: 'absolute',
    bottom: 15,
    right: 10,
    width: 50,
    justifyContent: 'flex-end',
  },
  float: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginTop: 10,
    backgroundColor: color.embe1C,
    opacity: .9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollbox: {
    padding: 10,
    flexDirection: 'column',
  },
  databox1: {
    marginBottom: 10,
    borderStyle: 'solid',
    borderColor: color.line2C,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 2,
  },
  databox2: {
    borderStyle: 'solid',
    borderColor: color.line4C,
    borderBottomWidth: 1,
  },
  databox3: {
    borderStyle: 'solid',
    borderColor: color.line5C,
    borderBottomWidth: 1,
    backgroundColor: color.white1C,
  },
  databox4: {
    marginBottom: 10,
    borderStyle: 'solid',
    borderColor: color.embe1C,
    borderWidth: 2,
    borderRadius: 2,
  },
  databoxon: {
    height: 64,
    width: width,
    borderStyle: 'solid',
    borderColor: color.line2C,
    borderBottomWidth: 1,
    paddingLeft: 15,
    paddingTop: 10,
    paddingRight: 15,
    paddingBottom: 10,
    flexDirection: 'row',
  },
  dabox1: {
    flexDirection: 'row',
  },
  dabox2: {
    flex: 1,
    flexDirection: 'row',
  },
  dabox3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  dabox4: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 20,
  },
  dabox5: {
    flexDirection: 'row',
  },
  dabox8: {
    paddingTop: 2,
    borderColor: color.line1C,
    borderStyle: 'dashed',
    borderTopWidth: 1,
    height: 35,
  },
  perdtit: {
    fontSize: 13,
    color: color.black2C,
  },
  perdtit2: {
    fontSize: 12,
    color: color.black4C,
  },
  perdtit3: {
    fontSize: 13,
    color: color.embe1C,
  },
  perdtit4: {
    fontSize: 12,
    color: color.black5C,
  },
  image88: {
    width:44,
    height:44,
    marginRight: 10,
  },
  image: {
    width:35,
    height:35,
  },
  image2: {
    width:18,
    height:18,
    marginRight: 10,
  },
  image24: {
    height: 24,
    width: 24,
    opacity: 1,
  },
  image36: {
    width:36,
    height:36,
    marginRight: 10,
  },
});

module.exports = ViewWorkList
