'use strict';
import React, { Component, } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity, Picker, } from 'react-native';
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
import NavigatorTopBar from './../../components/NavigatorTopBar';
import NaviSubBar from './../../components/NaviSubBar2';
import color from './../../constant/color';
import WorkOrderNeedDo from './WorkOrderNeedDo';
import WorkOrderOnDo from './WorkOrderOnDo';
import WorkOrderDoes from './WorkOrderDoes';
var _navigator,_this,_state;

class WorkOrderManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: "1st"
    };
  }
  componentDidMount(){
  }
  _onPushRouter(id,params){
    if(id){
      _navigator.push({
        title:"id",
        id:id,
        params:params,
      });
    }
  }
  render() {
    _this = this;
    _state = _this.state;
    _navigator = _this.props.navigator;
    let NavigatorTopBarProps = {
      visible: true,
      title: "工单管理",
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
    }
    function getChildJsx(){
      switch (_state.order) {
        case "1st":
          return (<WorkOrderNeedDo {...modalProps}/>)
          break;
        case "2st":
          return (<WorkOrderOnDo {...modalProps}/>)
          break;
        case "3st":
          return (<WorkOrderDoes {...modalProps}/>)
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
    borderTopWidth: 4,
    height: 35,
  },
  shedbox: {
    marginTop: 10,
    borderStyle: 'solid',
    borderColor: color.main1C,
    borderWidth: 1,
    backgroundColor: color.main4C,
    padding:10,
  },
  shedbox2: {
    flexDirection: 'row',
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
  text: {
    fontSize: 12,
    color: color.black2C,
  },
  text2: {
    fontSize: 12,
    color: color.main1C,
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
  image362: {
    width:36,
    height:36,
    marginRight: 10,
    marginTop: 10,
  },
});

module.exports = WorkOrderManagement
