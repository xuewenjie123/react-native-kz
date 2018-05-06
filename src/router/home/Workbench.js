'use strict';
import React, { Component, } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, AsyncStorage, } from 'react-native';
var { getImportantItem, getNeedToDo, getAdInfo, } = require('../../service/home');
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
import NavigatorTopBar from './../../components/NavigatorTopBar';
import NaviBottomBar from './../../components/NaviBottomBar';
import color from './../../constant/color';
import { date2str } from './../../constant/constants';
var _navigator,_this,_state;

var imageList = {
  "36b1": require('../../images/36b1.png'),
  "36b2": require('../../images/36b2.png'),
  "36c2": require('../../images/36c2.png'),
  "36c5": require('../../images/36c5.png'),
  "36c6": require('../../images/36c6.png'),
  "54a1": require('../../images/54a1.png'),
  "66a1": require('../../images/66a1.png'),
  "66a2": require('../../images/66a2.png'),
  "66a3": require('../../images/66a3.png'),
  "66a4": require('../../images/66a4.png'),
  "66a5": require('../../images/66a5.png'),
  "70a1": require('../../images/70a1.png'),
  "70a2": require('../../images/70a2.png'),
  "70a3": require('../../images/70a3.png'),
  "zelse72a1": require('../../images/zelse72a1.png'),
}

class Workbench extends Component {

  constructor(props) {
    super(props);
    this.state = {
      repairModal: false,
      importantItem: [],
      needToDo: [],
      importantItemSign: true,
      needToDoSign: true,
    }
  }
  componentDidMount(){
    AsyncStorage.getItem("main",(error,text)=>{
      if(!error){
        var data = JSON.parse(text)
        if(data){
          _this.setState({isMaintenance: data.isMaintenance,userId:data.id});
          if(data.isMaintenance)getImportantItem({currentUserId:data.id,},_this.getImportantItemResult);
          getNeedToDo({currentUserId:data.id,},_this.getNeedToDoResult);
        }else{
          _this._resetToRouter("Login")
        }
      }
    });
  }
  getreturn(){
    if(_state.isMaintenance)getImportantItem({currentUserId:_state.userId,},_this.getImportantItemResult);
    getNeedToDo({currentUserId:_state.userId,},_this.getNeedToDoResult);
  }
  getImportantItemResult(result){
    if(result.success && result.data){
      _this.setState({importantItem: result.data});
    }else{
    }
  }
  getNeedToDoResult(result){
    if(result.success && result.data){
      _this.setState({needToDo: result.data});
    }else{
    }
  }
  pushhidden(sign){
    _this.setState({[sign]: !_state[sign]});
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
        params:params,
      });
    }
  }
  _onPushRouterDetail(d){
    if(_state.isMaintenance){
      _navigator.push({
        title:"",
        id:"WorkOrderDetail",
        params:{
          params:d,
          getreturn: _this.getreturn,
        },
      });
    }else{
      _navigator.push({
        title:"",
        id:"WaitRepairDetail",
        params:{
          params:d,
          getreturn: _this.getreturn,
        },
      });
    }
  }
  render() {
    _this = this;
    _state = _this.state;
    _navigator = _this.props.navigator;
    let NavigatorTopBarProps = {
      visible: true,
      title: "易科住",
      leftView: (
        <TouchableOpacity
          underlayColor='transparent'
          onPress={() => {}}>
          <View style={{flex: 1, paddingLeft: 10,flexDirection: 'row',alignItems: 'center',}}>
          </View>
        </TouchableOpacity>
      ),
      navigator: _navigator,
    }
    let NaviBottomBarProps = {
      order: "Workbench",
      _navigator: _navigator,
    }
    return (
      <View style={{flex: 1}}>
        <NavigatorTopBar {...NavigatorTopBarProps}/>
        <View style={styles.main}>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            {_state.isMaintenance?(<TouchableOpacity style={styles.titbox} onPress={()=>{_this.pushhidden("importantItemSign")}}>
              <View style={styles.titbox2}>
                <Image style={[styles.image18,{marginRight: 10,}]} source={require('../../images/36c3.png')}></Image>
                <Text style={styles.text}>
                  {"重要事项"}
                </Text>
              </View>
              <View style={styles.titbox3}>
                {_state.importantItem.length?(
                  <View style={styles.titbox4}>
                    <Text style={styles.text2}>
                      {_state.importantItem.length}
                    </Text>
                  </View>
                ):null}
                <Image style={[styles.image18,{marginLeft: 10,}]} source={_state.importantItemSign?imageList["36c5"]:imageList["36c2"]}></Image>
              </View>
            </TouchableOpacity>):null}
            {(_state.isMaintenance && _state.importantItemSign && _state.importantItem.length)?(<View style={styles.contbox}>
              {_state.importantItem.map((d,index)=>(
                <TouchableOpacity key={index} style={styles.cont1st} onPress={()=>{_this._onPushRouterDetail(d)}}>
                  <View style={[styles.dabox1,{height: 35}]}>
                    <View>
                    </View>
                    <View style={styles.dabox2}>
                      <View style={{justifyContent: 'center', paddingLeft: 10,}}>
                        <Text style={styles.perdtit}>
                          {d.code}
                        </Text>
                      </View>
                      <View style={styles.dabox3}>
                        <Text style={styles.perdtit2}>
                          {d.create_time?date2str(new Date(d.create_time),"yyyy-MM-dd hh:mm"):null}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.dabox4}>
                    <View style={[styles.dabox1,styles.dabox8]}>
                      <View style={styles.dabox2}>
                        <View style={{alignItems: 'center',flexDirection: 'row',}}>
                          <Image style={styles.image18} source={imageList["36c6"]}></Image>
                          <Text style={styles.perdtit}>
                            {d.contactName+" "}
                          </Text>
                          <Image style={styles.image3} source={imageList["54a1"]}></Image>
                          {d.repairType?<Text style={styles.perdtit5}>
                            {" | "+d.repairType}
                          </Text>:null}
                        </View>
                        <View style={[styles.dabox3,{paddingRight: 0}]}>
                          <Text style={styles.perdtit3}>
                            {d.currentStatusName}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.dabox5}>
                      {d.fPaths&&d.fPaths.length?<View style={styles.dabox6}>
                        <Image style={styles.image36} source={{uri: d.fPaths[0]}}></Image>
                      </View>:null}
                      <View style={styles.dabox7}>
                        <Text style={styles.perdtit4} numberOfLines={2}>
                          {d.description}
                        </Text>
                      </View>
                    </View>
                    <View style={[styles.dabox1,styles.dabox8]}>
                      <View style={{justifyContent: 'center',}}>
                        <Image style={styles.image2} source={d.locationType?imageList["36b1"]:imageList["36b2"]}></Image>
                      </View>
                      <View style={styles.dabox2}>
                        <View style={{justifyContent: 'center',}}>
                          <Text style={styles.perdtit} numberOfLines={1}>
                            {d.addressName}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>):null}
            <TouchableOpacity style={styles.titbox} onPress={()=>{_this.pushhidden("needToDoSign")}}>
              <View style={styles.titbox2}>
                <Image style={[styles.image18,{marginRight: 10,}]} source={require('../../images/36c4.png')}></Image>
                <Text style={styles.text}>
                  {"在办工单"}
                </Text>
              </View>
              <View style={styles.titbox3}>
                {_state.needToDo.length?(
                  <View style={styles.titbox4}>
                    <Text style={styles.text2}>
                      {_state.needToDo.length}
                    </Text>
                  </View>
                ):null}
                <Image style={[styles.image18,{marginLeft: 10,}]} source={_state.needToDoSign?imageList["36c5"]:imageList["36c2"]}></Image>
              </View>
            </TouchableOpacity>
            {(_state.needToDoSign&&_state.needToDo.length)?(
              <View style={styles.contbox}>
                {_state.needToDo.map((d,index)=>(
                    <TouchableOpacity key={index} style={styles.cont1st} onPress={()=>{_this._onPushRouterDetail(d)}}>
                      <View style={[styles.dabox1,{height: 35}]}>
                        {!_state.isMaintenance?(<View>
                          <Image style={styles.image} source={(d.userType==2)?imageList["70a3"]:(d.assignOrderType==2)?imageList["70a2"]:imageList["70a1"]}></Image>
                        </View>):null}
                        <View style={styles.dabox2}>
                          <View style={{justifyContent: 'center',}}>
                            <Text style={styles.perdtit}>
                              {d.code}
                            </Text>
                          </View>
                          <View style={styles.dabox3}>
                            <Text style={styles.perdtit2}>
                              {d.create_time?date2str(new Date(d.create_time),"yyyy-MM-dd hh:mm"):null}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View style={styles.dabox4}>
                        <View style={[styles.dabox1,styles.dabox8]}>
                          <View style={{justifyContent: 'center',}}>
                            <Image style={styles.image2} source={d.locationType?imageList["36b1"]:imageList["36b2"]}></Image>
                          </View>
                          <View style={styles.dabox2}>
                            <View style={{justifyContent: 'center',flex:1}}>
                              {d.addressName?(<Text style={styles.perdtit} numberOfLines={1}>
                                {d.addressName}
                              </Text>):null}
                            </View>
                            <View style={[styles.dabox3,{paddingRight: 0,flex:0}]}>
                              <Text style={styles.perdtit3}>
                                {d.currentStatusName}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View style={styles.dabox5}>
                          {d.fPaths&&d.fPaths.length?<View style={styles.dabox6}>
                            <Image style={styles.image36} source={{uri: d.fPaths[0]}}></Image>
                          </View>:null}
                          <View style={styles.dabox7}>
                            <Text style={styles.perdtit4} numberOfLines={2}>
                              {d.description}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                ))}
              </View>
            ):null}
          </ScrollView>
        </View>
        <NaviBottomBar {...NaviBottomBarProps}/>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: color.white3C,
    flexDirection: 'column',
    padding: 0,
  },
  contentContainer: {
    position: 'relative',
  },
  titbox: {
    height: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: color.line1C,
    borderStyle: 'solid',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    backgroundColor: color.white1C,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
  },
  titbox2: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titbox3: {
    height: 44,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  titbox4: {
    height: 14,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: color.embe1C,
    borderRadius: 7,
  },
  contbox: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    backgroundColor: color.white1C,
    borderColor: color.line1C,
    borderStyle: 'solid',
    borderBottomWidth: 1,
  },
  cont1st: {
    backgroundColor: color.white2C,
    marginBottom: 10,
  },
  cont1st2: {
    backgroundColor: color.white2C,
  },
  image18: {
    width: 18,
    height: 18,
  },
  text: {
    fontSize: 15,
    color: color.black2C,
  },
  text2: {
    lineHeight: 14,
    padding: 0,
    fontSize: 12,
    color: color.white1C,
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
  perdtit5: {
    fontSize: 13,
    color: color.black5C,
  },
  image36: {
    width:36,
    height:36,
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
  image3: {
    width:27,
    height:27,
  },
});

module.exports = Workbench
