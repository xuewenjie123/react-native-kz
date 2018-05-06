'use strict';
import React, { Component, } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity, Picker, AsyncStorage, ToastAndroid, } from 'react-native';
import NavigatorTopBar from './../../components/NavigatorTopBar';
import CanvasModal from './../../components/canvas/CanvasModal';
var { WorkorderCustomerConfirmation, getCustomerConfirmationInfo } = require('../../service/repair');
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
import { date2str } from './../../constant/constants';
var _navigator,_this,_state,_props;

class CustomerConfirmation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      userId: undefined,
      getclose: {},
      getFn: "",
    }
  }
  componentDidMount(){
    AsyncStorage.getItem("main",(error,text)=>{
      if(!error){
        var data = JSON.parse(text)
        _this.setState({userId: data.id,name: data.name});
      }else{
      }
    });
    getCustomerConfirmationInfo(_props.params.orderId,_this.getDetailFn);
  }
  getDetailFn(result){
    if(result.success && result.data){
      _this.setState({
        getclose: result.data,
      });
    }else{

    }
  }
  submit(){
    _this.setState({getFn: "get"})
  }
  submitgetimg(e){
    var data={};
    data.files = [{file: e, fileName: _this.props.params.orderCode+".jpeg"}];
    data.workOrderId = _this.props.params.orderId;
    data.operateUserId = _state.userId;
    WorkorderCustomerConfirmation(data,_this.submitFn)
  }
  submitgetfalse(e){
    ToastAndroid.show('请准备客户签字', ToastAndroid.SHORT);
  }
  submitFn(result){
    if(result.success){
      _navigator.pop()
      _this.props._this.getDetail()
    }else{

    }
  }
  getClear(){
    _this.setState({getFn: "clear"})
  }
  render() {
    _this = this;
    _state = _this.state;
    _props = _this.props;
    _navigator = _this.props.navigator;
    let NavigatorTopBarProps = {
      visible: true,
      title: "客户签字",
      leftView: (
        <TouchableOpacity style={{flex: 1}}
          underlayColor='transparent'
          onPress={() => {_navigator.pop()}}>
          <View style={{flex: 1, paddingLeft: 10,flexDirection: 'row',alignItems: 'center',}}>
            <Image style={{width: 23, height: 23,}} source={require('../../images/46a2.png')}></Image>
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
    let CanvasModalProps = {
      getFn: _state.getFn,
      _this: _this,
    }
    return (
      <View style={{flex: 1,}}>
        <NavigatorTopBar {...NavigatorTopBarProps}/>
        <View style={styles.main}>
          <ScrollView>
            <View style={styles.text}>
              <View style={styles.up}>
                <Text style={{fontSize:12,color:'#333',textAlign:'left'}}>{_props.params.orderCode}</Text>
                <Text style={{fontSize:12,color:'#666',textAlign:'right'}}>
                  {_props.params.createTime?date2str(new Date(_props.params.createTime),"yyyy-MM-dd hh:mm"):null}
                </Text>
              </View>
              <View>
                <View style={styles.middle}>
                  <View style={{alignItems: 'center',flexDirection: 'row',}}>
                    <View style={{alignItems: 'center',flexDirection: 'row',justifyContent: 'space-between',width:50,}}>
                      <Text style={{fontSize:12,color:'#333333',textAlign:'left'}}>报</Text>
                      <Text style={{fontSize:12,color:'#333333',textAlign:'left'}}>修</Text>
                      <Text style={{fontSize:12,color:'#333333',textAlign:'left'}}>人</Text>
                    </View>
                    <Text style={{fontSize:12,color:'#333333',textAlign:'left',marginLeft:2}}>:</Text>
                  </View>
                  <View style={{flexDirection: 'row',height:12,alignItems: 'center',}}>
                    {_props.params.isMember?(<Image style={{width:27,height:12,marginRight: 5,}} source={require('../../images/rob4.png')}></Image>):null}
                    <Text style={{fontSize:12,color:'#666666',textAlign:'right'}}>{_props.params.contactName}</Text>
                  </View>
                </View>
                <View style={styles.middle}>
                  <View style={{alignItems: 'center',flexDirection: 'row',}}>
                    <View style={{alignItems: 'center',flexDirection: 'row',justifyContent: 'space-between',width:50,}}>
                      <Text style={{fontSize:12,color:'#333333',textAlign:'left'}}>联</Text>
                      <Text style={{fontSize:12,color:'#333333',textAlign:'left'}}>系</Text>
                      <Text style={{fontSize:12,color:'#333333',textAlign:'left'}}>电</Text>
                      <Text style={{fontSize:12,color:'#333333',textAlign:'left'}}>话</Text>
                    </View>
                    <Text style={{fontSize:12,color:'#333333',textAlign:'left',marginLeft:2}}>:</Text>
                  </View>
                  <Text style={{fontSize:12,color:'#666666',textAlign:'right'}}>{_props.params.contactNumber}</Text>
                </View>
                <View style={styles.middle}>
                  <View style={{alignItems: 'center',flexDirection: 'row',}}>
                    <View style={{alignItems: 'center',flexDirection: 'row',justifyContent: 'space-between',width:50,}}>
                      <Text style={{fontSize:12,color:'#333333',textAlign:'left'}}>预</Text>
                      <Text style={{fontSize:12,color:'#333333',textAlign:'left'}}>约</Text>
                      <Text style={{fontSize:12,color:'#333333',textAlign:'left'}}>时</Text>
                      <Text style={{fontSize:12,color:'#333333',textAlign:'left'}}>间</Text>
                    </View>
                    <Text style={{fontSize:12,color:'#333333',textAlign:'left',marginLeft:2}}>:</Text>
                  </View>
                  <Text style={{fontSize:12,color:'#666666',textAlign:'right'}}>
                    {_props.params.reserveTime?date2str(new Date(_props.params.reserveTime),"yyyy-MM-dd hh:mm"):null}
                  </Text>
                </View>
                <View style={styles.middle}>
                  <View style={{alignItems: 'center',flexDirection: 'row',flex:1}}>
                    <View style={{alignItems: 'center',flexDirection: 'row',justifyContent: 'space-between',width:50}}>
                      <Text style={{fontSize:12,color:'#333333',textAlign:'left'}}>地</Text>
                      <Text style={{fontSize:12,color:'#333333',textAlign:'left'}}>点</Text>
                    </View>
                    <Text style={{fontSize:12,color:'#333333',textAlign:'left',marginLeft:2}}>:</Text>
                  </View>
                  <View style={{flex:5,flexWrap:'wrap',}}>
                    <Text style={{fontSize:12,color:'#666666',textAlign:'right'}}>
                      {_props.params.address}
                    </Text>
                  </View>
                </View>
                <View style={styles.middle}>
                  <View style={{alignItems: 'center',flexDirection: 'row',}}>
                    <View style={{alignItems: 'center',flexDirection: 'row',justifyContent: 'space-between',width:50,}}>
                     <Text style={{fontSize:12,color:'#333333',textAlign:'left'}}>问</Text>
                     <Text style={{fontSize:12,color:'#333333',textAlign:'left'}}>题</Text>
                     <Text style={{fontSize:12,color:'#333333',textAlign:'left'}}>分</Text>
                     <Text style={{fontSize:12,color:'#333333',textAlign:'left'}}>类</Text>
                    </View>
                    <Text style={{fontSize:12,color:'#333333',textAlign:'left',marginLeft:2}}>:</Text>
                  </View>
                  <Text style={{fontSize:12,color:'#666666',textAlign:'right'}}>
                    {_props.params.categoryName?_props.params.categoryName+"-"+_props.params.subCategoryName:""}
                  </Text>
                </View>
              </View>
              <View style={styles.last}>
                <View style={{flexDirection: 'row',flex:1}}>
                  <View style={{flexDirection: 'row',justifyContent: 'space-between',width:50}}>
                    <Text style={{fontSize:12,color:'#333333',textAlign:'left'}}>报</Text>
                    <Text style={{fontSize:12,color:'#333333',textAlign:'left'}}>修</Text>
                    <Text style={{fontSize:12,color:'#333333',textAlign:'left'}}>内</Text>
                    <Text style={{fontSize:12,color:'#333333',textAlign:'left'}}>容</Text>
                  </View>
                  <Text style={{fontSize:12,color:'#333333',textAlign:'left',marginLeft:2}}>:</Text>
                </View>
                <View style={{flex:5,flexWrap:'wrap',}}>
                  <Text style={{fontSize:12,color:'#666666',textAlign:'left'}}>
                    {_props.params.description}
                  </Text>
                </View>
              </View>
              <View style={{marginTop:10,backgroundColor: '#ffffff',paddingTop:12,paddingBottom:12}}>
                <View style={styles.middle}>
                  <View style={{alignItems: 'center',flexDirection: 'row',}}>
                    <View style={{alignItems: 'center',flexDirection: 'row',justifyContent: 'space-between',width:50,}}>
                     <Text style={{fontSize:12,color:'#333333',textAlign:'left'}}>维</Text>
                     <Text style={{fontSize:12,color:'#333333',textAlign:'left'}}>修</Text>
                     <Text style={{fontSize:12,color:'#333333',textAlign:'left'}}>人</Text>
                    </View>
                    <Text style={{fontSize:12,color:'#333333',textAlign:'left',marginLeft:2}}>:</Text>
                  </View>
                  <Text style={{fontSize:12,color:'#666666',textAlign:'right'}}>{_state.name}</Text>
                </View>
                <View style={styles.middle}>
                  <View style={{alignItems: 'center',flexDirection: 'row',}}>
                    <View style={{alignItems: 'center',flexDirection: 'row',justifyContent: 'space-between',width:50,}}>
                      <Text style={{fontSize:12,color:'#333333',textAlign:'left'}}>到</Text>
                      <Text style={{fontSize:12,color:'#333333',textAlign:'left'}}>达</Text>
                      <Text style={{fontSize:12,color:'#333333',textAlign:'left'}}>时</Text>
                      <Text style={{fontSize:12,color:'#333333',textAlign:'left'}}>间</Text>
                    </View>
                    <Text style={{fontSize:12,color:'#333333',textAlign:'left',marginLeft:2}}>:</Text>
                  </View>
                  <Text style={{fontSize:12,color:'#666666',textAlign:'right'}}>
                    {_state.getclose.startTime?date2str(new Date(_state.getclose.startTime),"yyyy-MM-dd hh:mm"):null}
                  </Text>
                </View>
                <View style={styles.middle}>
                  <View style={{alignItems: 'center',flexDirection: 'row',}}>
                    <View style={{alignItems: 'center',flexDirection: 'row',justifyContent: 'space-between',width:50,}}>
                      <Text style={{fontSize:12,color:'#333333',textAlign:'left'}}>完</Text>
                      <Text style={{fontSize:12,color:'#333333',textAlign:'left'}}>成</Text>
                      <Text style={{fontSize:12,color:'#333333',textAlign:'left'}}>时</Text>
                      <Text style={{fontSize:12,color:'#333333',textAlign:'left'}}>间</Text>
                    </View>
                    <Text style={{fontSize:12,color:'#333333',textAlign:'left',marginLeft:2}}>:</Text>
                  </View>
                  <Text style={{fontSize:12,color:'#666666',textAlign:'right'}}>
                    {_state.getclose.makeSpan?date2str(new Date(_state.getclose.makeSpan),"yyyy-MM-dd hh:mm"):null}
                  </Text>
                </View>
                <View style={styles.middle}>
                  <View style={{alignItems: 'center',flexDirection: 'row'}}>
                    <View style={{alignItems: 'center',flexDirection: 'row',justifyContent: 'space-between',width:50}}>
                      <Text style={{fontSize:12,color:'#333333',textAlign:'left'}}>处</Text>
                      <Text style={{fontSize:12,color:'#333333',textAlign:'left'}}>理</Text>
                      <Text style={{fontSize:12,color:'#333333',textAlign:'left'}}>记</Text>
                      <Text style={{fontSize:12,color:'#333333',textAlign:'left'}}>录</Text>
                    </View>
                    <Text style={{fontSize:12,color:'#333333',textAlign:'left',marginLeft:2}}>:</Text>
                  </View>
                  <Text style={{fontSize:12,color:'#666666',textAlign:'right'}}>{_state.getclose.maintDescription}</Text>
                </View>
                <View style={styles.middle}>
                  <View style={{alignItems: 'center',flexDirection: 'row',}}>
                    <View style={{alignItems: 'center',flexDirection: 'row',justifyContent: 'space-between',width:50,}}>
                      <Text style={{fontSize:12,color:'#333333',textAlign:'left'}}>费</Text>
                      <Text style={{fontSize:12,color:'#333333',textAlign:'left'}}>用</Text>
                    </View>
                    <Text style={{fontSize:12,color:'#333333',textAlign:'left',marginLeft:2}}>:</Text>
                  </View>
                  <Text style={{fontSize:12,color:'#f53f6a',textAlign:'right'}}>{"￥"+(_state.getclose.material_cost+_state.getclose.personnel_cost)+"元"}</Text>
                </View>
              </View>
              <View style={{alignItems: 'center',flexDirection: 'row',height:30,paddingLeft:15,paddingRight:15,}}>
                <Text style={{fontSize:12,color:'#666666',textAlign:'left'}}>请客户确认签字</Text>
                <Image style={{width:12,height:12,marginLeft:10,}} source={require('../../images/icon13.png')}></Image>
                <View style={{alignItems: 'center',flex:1,flexDirection: 'row',justifyContent: 'flex-end',paddingRight:15}}>
                  <TouchableOpacity style={{margin:-10,padding:10}}
                    underlayColor='transparent'
                    onPress={() => {_this.getClear()}}>
                    <Image style={{width:12,height:12,}} source={require('../../images/36d1.png')}></Image>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={[styles.input,{position: 'relative',alignItems: 'center',justifyContent: 'center',width:width,height:200}]}>
                <CanvasModal style={{width:width,height:200}} {...CanvasModalProps}/>
                <View pointerEvents="none" style={{position: 'absolute',left:0,top:0,alignItems: 'center',justifyContent: 'center',width:width,height:200}}>
                  <Image style={{width:width-30,height:180,}} source={require('../../images/makeOn.png')}></Image>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
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
  text: {
    width: width,
    marginTop : 10,
  },
  up: {
    width: width,
    height: 40,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    paddingLeft:15,
    paddingRight:15,
  },
  middle: {
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft:15,
    paddingRight:15,
    marginTop:6,
    marginBottom:6,
  },
  last: {
    width: width,
    height: 55,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingLeft:15,
    paddingRight:15,
    paddingTop:12,
  },
  input: {
    paddingLeft:15,
    paddingRight:15,
    backgroundColor: '#ffffff',
    marginBottom:20,
    borderWidth:1,
    borderColor:'#ddd',
    borderStyle:'solid',
  },
});

module.exports = CustomerConfirmation
