'use strict';
import React, { Component, } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Picker, AsyncStorage, } from 'react-native';
import NavigatorTopBar from './../../components/NavigatorTopBar';
import color from './../../constant/color';
import WorkOrderConfirmModal from './../../components/workOrder/WorkOrderConfirmModal';
import WorkOrderCancelModal from './../../components/workOrder/WorkOrderCancelModal';
import WorkOrderCancelChangeModal from './../../components/workOrder/WorkOrderCancelChangeModal';
import GetManModal from './../../components/workOrder/GetManModal';
import ImgDetail from './../../components/ImgDetail';
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
var { getDetail, } = require('../../service/repair');
import { date2str } from './../../constant/constants';
import { feilURI } from './../../constant/url';
var _navigator,_this,_state;

var imageList = {
  "36b3": require('../../images/36b3.png'),
  "36b4": require('../../images/36b4.png'),
  "54a1": require('../../images/54a1.png'),
  "88a1": require('../../images/88a1.png'),
}

class WorkOrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {},
      status: [],
      modalCancelVisible: false,
      modalCancelChangeVisible: false,
      modalEnsureVisible: false,
      assignmain: false,
      modalGetManVisible: false,
      mtitle: "",
      imgDetailVisible: false,
    };
  }
  componentDidMount(){
    AsyncStorage.getItem("main",(error,text)=>{
      if(!error){
        var data = JSON.parse(text)
        _this.setState({userId: data.id});
      }
    });
    getDetail(_this.props.params.event_comunication_id,_this.getDetailFn);
  }
  getDetail(){
    getDetail(_this.props.params.event_comunication_id,_this.getDetailFn);
  }
  getDetailFn(result){
    if(result.success && result.data){
      var data = {},event=result.data.event,status=result.data.status;
      data.operateUserName = event.contactName;
      data.statusName = "提交";
      data.create_time = event.createTime;
      data.description = event.description;
      data.filePaths = event.fPaths;
      status.reverse()
      status.push(data)
      status.reverse()
      _this.setState({
        event: event,
        status: status,
      });
    }else{

    }
  }
  workOrderMenu(){
    if(_state.event.status == "100"){//未派单
      return (
        <View style={styles.bottombox}>
          <TouchableOpacity style={[styles.bottomright,{flex: 1}]}
            onPress={() => {_this.setState({modalGetManVisible: true,assignmain: true,mtitle: "派单"})}}>
            <Text style={styles.bottomtext2}>
              {"派单"}
            </Text>
          </TouchableOpacity>
        </View>
      )
    }else if(_state.event.status == "202"){//申请改派
      return (
        <View style={styles.bottombox}>
          <TouchableOpacity style={styles.bottomleft}
            onPress={() => {_this.setState({modalCancelChangeVisible: true})}}>
            <Text style={styles.bottomtext}>
              {"拒绝"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.bottomright,{flex: 3}]}
            onPress={() => {_this.setState({modalGetManVisible: true,assignmain:true,mtitle: "改派"})}}>
            <Text style={styles.bottomtext2}>
              {"改派"}
            </Text>
          </TouchableOpacity>
        </View>
      )
    }else if(_state.event.status == "200" || _state.event.status == "300" || _state.event.status == "400" || _state.event.status == "401"
      || _state.event.status == "201"){//申请协同人
      return (
        <View style={styles.bottombox}>
          <TouchableOpacity style={[styles.bottomright2,{flex: 1}]}
            onPress={() => {_this.setState({modalGetManVisible: true,assignmain:true,mtitle: "改派"})}}>
            <Text style={styles.bottomtext2}>
              {"改派"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.bottomright,{flex: 1}]}
            onPress={() => {_this.setState({modalGetManVisible: true,assignmain:false,mtitle: "增加协同人"})}}>
            <Text style={styles.bottomtext2}>
              {"增加协同人"}
            </Text>
          </TouchableOpacity>
        </View>
      )
    // }else if(_state.event.status == "203"){//申请取消
    //   return (
    //     <View style={styles.bottombox}>
    //       <TouchableOpacity style={styles.bottomleft}
    //         onPress={() => {_this.setState({modalCancelVisible: true})}}>
    //         <Text style={styles.bottomtext}>
    //           {"拒绝"}
    //         </Text>
    //       </TouchableOpacity>
    //       <TouchableOpacity style={[styles.bottomright,{flex: 3}]}
    //         onPress={() => {_this.setState({modalEnsureVisible: true})}}>
    //         <Text style={styles.bottomtext2}>
    //           {"同意"}
    //         </Text>
    //       </TouchableOpacity>
    //     </View>
    //   )
    }else{
      return null;
    }
  }
  render() {
    _this = this;
    _state = _this.state;
    _navigator = _this.props.navigator;
    let NavigatorTopBarProps = {
      visible: true,
      title: "工单详情",
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
    let WorkOrderCancelModalProps = {
      visible: _state.modalCancelVisible,
      onClose: function(){
        _this.setState({modalCancelVisible: false,})
      },
      _this:_this,
      params: _state.event,
    }
    let WorkOrderCancelChangeModalProps = {
      visible: _state.modalCancelChangeVisible,
      onClose: function(){
        _this.setState({modalCancelChangeVisible: false,})
      },
      _this:_this,
      params: _state.event,
    }
    let WorkOrderConfirmModalProps = {
      visible: _state.modalEnsureVisible,
      onClose: function(){
        _this.setState({modalEnsureVisible: false,})
      },
      _this:_this,
      params: _state.event,
    }
    let GetManModalProps = {
      assignmain: _state.assignmain,
      mtitle: _state.mtitle,
      visible: _state.modalGetManVisible,
      onClose: function(){
        _this.setState({modalGetManVisible: false,})
      },
      _this:_this,
      params: _state.event,
    }
    let ImgDetailProps = {
      visible: _state.imgDetailVisible,
      onClose: function(){
        _this.setState({imgDetailVisible: false,})
      },
      imgUrl: _state.imgUrl,
    }
    return (
      <View style={{flex: 1,}}>
        <NavigatorTopBar {...NavigatorTopBarProps}/>
        <View style={styles.main}>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <View style={styles.scrollbox}>
              <View style={styles.scrollback}>
              </View>
              <View style={styles.topbox}>
                <View style={styles.line}>
                  <View style={styles.lineleft}>
                    <Text style={styles.text1}>
                      {_state.event.orderCode}
                    </Text>
                  </View>
                  <View style={styles.lineright}>
                    <Text style={styles.text2}>
                      {""}
                    </Text>
                  </View>
                </View>
                <View style={styles.topbox2}>
                  <View style={styles.line}>
                    <View style={styles.lineleft}>
                      <Image style={styles.image18} source={imageList['36b3']}></Image>
                      <Text style={styles.text1}>
                        {_state.event.contactName}
                      </Text>
                      {_state.event.isMember?(
                        <Image style={styles.image27} source={imageList['54a1']}></Image>
                      ):null}
                    </View>
                    <View style={styles.lineright}>
                      <Text style={styles.text2}>
                        {_state.event.contactNumber}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.line}>
                    <View style={[styles.lineleft,{alignItems: 'flex-start'}]}>
                      <Image style={[styles.image18,{marginTop:2}]} source={imageList['36b4']}></Image>
                      <Text style={styles.text3}>
                        {_state.event.address}
                      </Text>
                    </View>
                    <View style={styles.lineright}>
                      <Text style={styles.text2}>
                        {""}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.topbox3}>
                    <View style={[styles.line,{height: 22}]}>
                      <View style={styles.lineleft}>
                        <Text style={styles.text4}>
                          {"总工时："}
                        </Text>
                      </View>
                      <View style={styles.lineright}>
                        <Text style={styles.text2}>
                          {_state.event.workHours?_state.event.workHours+"小时":0+"小时"}
                        </Text>
                      </View>
                    </View>
                    <View style={[styles.line,{height: 22}]}>
                      <View style={styles.lineleft}>
                        <Text style={styles.text4}>
                          {"材料费："}
                        </Text>
                      </View>
                      <View style={styles.lineright}>
                        <Text style={styles.text2}>
                          {"￥"+(_state.event.materialCost)}
                        </Text>
                      </View>
                    </View>
                    <View style={[styles.line,{height: 22}]}>
                      <View style={styles.lineleft}>
                        <Text style={styles.text4}>
                          {"人工费："}
                        </Text>
                      </View>
                      <View style={styles.lineright}>
                        <Text style={styles.text2}>
                          {"￥"+(_state.event.laborCost)}
                        </Text>
                      </View>
                    </View>
                    <View style={[styles.line,styles.topbox4,{height: 40}]}>
                      <View style={styles.lineleft}>
                        <Text style={styles.text5}>
                          {"总计："}
                        </Text>
                      </View>
                      <View style={styles.lineright}>
                        <Text style={styles.text5}>
                          {"￥"+(_state.event.laborCost+_state.event.materialCost)}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.scrollback}>
              </View>
              <View style={styles.statusbox}>
                {_state.status.map((d,index)=>(
                  <View key={index}>
                    <View style={styles.line}>
                      <View style={styles.lineleft}>
                        <Image style={styles.image44} source={d.img?{uri:d.img}:imageList["88a1"]}></Image>
                        <Text style={styles.text1}>
                          {d.operateUserName}
                        </Text>
                      </View>
                      <View style={styles.lineright}>
                        <Text style={styles.text6}>
                          {d.statusName}
                        </Text>
                      </View>
                    </View>
                    <View style={[styles.statusb1,(index==_state.status.length-1)?styles.statusb:{}]}>
                      <View style={styles.statusb2}>
                        <View>
                          <View style={styles.statusb3}>
                            <Text style={styles.text4}>
                              {d.subop?<Text style={styles.text4}>
                                {d.subop}
                              </Text>:null}
                              {d.description}
                            </Text>
                          </View>
                          <View style={styles.statusb4}>
                            {d.filePaths?d.filePaths.map((img,inde)=>(
                              <TouchableOpacity key={inde} style={{height: 39, width: 39, marginRight: 10, marginBottom: 10,}}
                                onPress={() => _this.setState({imgDetailVisible: true,imgUrl:feilURI+img})}>
                                <Image style={{height: 39, width: 39,}} source={{uri: feilURI+img}}></Image>
                              </TouchableOpacity>
                            )):null}
                          </View>
                          <View>
                            <Text style={styles.text4}>
                              {d.create_time?date2str(new Date(d.create_time),"yyyy-MM-dd hh:mm"):null}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        </View>
        {_this.workOrderMenu()}
        <WorkOrderCancelModal {...WorkOrderCancelModalProps}/>
        <WorkOrderCancelChangeModal {...WorkOrderCancelChangeModalProps}/>
        <WorkOrderConfirmModal {...WorkOrderConfirmModalProps}/>
        <GetManModal {...GetManModalProps}/>
        <ImgDetail {...ImgDetailProps}/>
      </View>
    );
  }

};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: color.white1C,
    flexDirection: 'column',
  },
  contentContainer: {
  },
  bottombox: {
    height: 49,
    flexDirection: 'row',
  },
  bottomleft: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.white2C,
    borderColor: color.line1C,
    borderStyle: 'solid',
    borderWidth: 1,
  },
  bottomright2: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.main1C,
    borderColor: "#fff",
    borderStyle: 'solid',
    borderRightWidth: 1,
  },
  bottomright: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.main1C,
  },
  bottomtext: {
    fontSize: 16,
    color: color.black4C,
  },
  bottomtext2: {
    fontSize: 16,
    color: color.white1C,
  },
  scrollbox: {
    flexDirection: 'column',
  },
  scrollback: {
    height: 10,
    backgroundColor: color.white3C,
    borderBottomWidth: 1,
    borderColor: color.line1C,
    borderStyle: 'solid',
  },
  topbox: {
    backgroundColor: color.white1C,
    borderColor: color.line1C,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  topbox2: {
    borderColor: color.line1C,
    borderStyle: 'dashed',
    borderTopWidth: 1,
  },
  topbox3: {
    paddingLeft: 18,
    paddingTop: 10,
  },
  topbox4: {
    borderColor: color.line1C,
    borderStyle: 'solid',
    borderTopWidth: 1,
  },
  statusbox: {
    padding: 15,
  },
  statusb: {
    borderLeftWidth: 0,
  },
  statusb1: {
    marginLeft: 22,
    borderColor: color.line1C,
    borderStyle: 'solid',
    borderLeftWidth: 1,
    paddingLeft:20,
    paddingBottom: 10,
  },
  statusb2: {
    padding: 10,
    backgroundColor: color.white3C,
  },
  statusb3: {
    marginBottom: 15,
  },
  statusb4: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  line: {
    height: 40,
    flexDirection: 'row',
  },
  lineleft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lineright: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  image18: {
    height: 18,
    width: 18,
  },
  image24: {
    height: 24,
    width: 24,
    opacity: 1,
  },
  image27: {
    height: 27,
    width: 27,
    marginLeft: 10,
  },
  image39: {
    height: 39,
    width: 39,
    marginRight: 10,
    marginBottom: 10,
  },
  image44: {
    height: 44,
    width: 44,
    marginRight: 10,
  },
  text1: {
    fontSize: 15,
    color: color.black2C,
  },
  text2: {
    fontSize: 15,
    color: color.black5C,
  },
  text3: {
    fontSize: 13,
    color: color.black2C,
  },
  text4: {
    fontSize: 13,
    color: color.black5C,
  },
  text5: {
    fontSize: 15,
    color: color.black4C,
  },
  text6: {
    fontSize: 12,
    color: color.black5C,
  },
  text7: {
    fontSize: 12,
    color: color.black5C,
  },
});

module.exports = WorkOrderDetail
