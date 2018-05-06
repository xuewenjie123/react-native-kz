'use strict';
import React, { Component, } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, TouchableNativeFeedback, ToastAndroid } from 'react-native';
import Swiper from 'react-native-swiper';
import { date2str } from './../../constant/constants';
import TimeOutGo from './TimeOutGo';
var { WorkOrderRob } = require('../../service/online');
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
var _navigator,_this;


class RepairRob extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }
  onClickRob(){
    var dtt = {},data=_this.props.data,info=data.pushInfo;
    dtt.type = (data.pushType==2)?1:(data.pushType==5)?2:data.pushType;
    dtt.workOrderId = data.orderId;
    dtt.changeUserId = data.userId;
    WorkOrderRob(dtt,_this.onClickRobResult);
  }
  onClickRobResult(result){
    if(result.success && result.data){
      _this.props.onClose()
      ToastAndroid.show(result.data, ToastAndroid.SHORT);
      _this.props.navigator.push({
        title:id,
        id:"Workbench",
        params:params,
      })
    }else{
      _this.props.onClose()
      ToastAndroid.show(result.errorMsg, ToastAndroid.SHORT);
    }
  }
  render() {
    _this = this;
    let props = _this.props;
    let data = props.data;
    let info = data?data.pushInfo:{};
    let modalProps = {
      animationType: 'slide',
      transparent: true,
      visible: props.visible,
      onRequestClose:()=>{},
    }
    let TimeOutGoProps = {
      timeon: props.visible,
      showtime: 20,
      timeondeal: function(){
        _this.props.onClose()
      },
    }
    let SwiperProps = {
      showsPagination: false,
      autoplay: false,
      showsButtons: true,
    }
    return (
      <Modal {...modalProps} >
        <View style={{position: 'absolute', width: width, height: height, backgroundColor: "#000", opacity: .7,}}>
        </View>
        {props.data?(
          <View style={styles.main}>
            <View style={styles.head}>
              <View style={styles.top}>
                <View style={styles.title}>
                  <Text style={{fontSize:15,color:'#333333',textAlign:'center'}}>{info.code}</Text>
                  <Text style={{fontSize:10,color:'#999999',textAlign:'center',marginTop:3}}>{data.pushTime?date2str(new Date(data.pushTime),"yyyy-MM-dd hh:mm"):null}</Text>
                </View>
                {(data.pushType==5)?(<Image style={{width:65,height:65,}} source={require('../../images/rob5.png')}></Image>):
                  null}
              </View>
              {(info.fileList && info.fileList.length)?(
                <View style={styles.photo}>
                  <View style={{width:width-20,height:140,}}>
                    <Swiper horizontal={false} loop={true} style={styles.wrapper} {...SwiperProps}
                      buttonWrapperStyle={{backgroundColor: 'transparent', flexDirection: 'row',flex: 1, justifyContent: 'space-between', alignItems: 'center',
                        position: 'absolute', top: 0, left: 0, height: 140,width:width-20, paddingHorizontal: 0, paddingVertical: 0,}}
                      nextButton={(
                        <View style={{width:35,height:140,justifyContent: 'center', alignItems: 'center'}}>
                          <Image style={{width:10,height:18,}} source={require('../../images/rob10.png')}></Image>
                        </View>
                      )}
                      prevButton={(
                        <View style={{width:35,height:140,justifyContent: 'center', alignItems: 'center'}}>
                          <Image style={{width:10,height:18,}} source={require('../../images/rob8.png')}></Image>
                        </View>
                      )}
                      >
                      {info.fileList.map((d,index)=>(
                        <View key={index} style={{width:width-20,height:140,justifyContent: 'center',alignItems: 'center',paddingLeft: 35,paddingRight: 35,}}>
                          <Image style={{width:width-90,height:140,}} source={{uri:d}}></Image>{/*require('../../images/rob7.png')*/}
                        </View>
                      ))}
                    </Swiper>
                  </View>
                </View>
              ):null}
              <View>
                 <View style={styles.up}>
                    <View style={[styles.left,{paddingRight:20}]}>
                      <Image style={{width:18,height:18,marginRight:10}} source={require('../../images/rob.png')}></Image>
                      <Text style={{fontSize:12,color:'#333333',textAlign:'left'}}>{info.address}</Text>
                    </View>
                    <Text style={{fontSize:12,color:'#f53f6a',textAlign:'right'}}>未派单</Text>
                 </View>
                <View style={styles.content}>
                   <Text numberOfLines={3} style={{fontSize:12,color:'#999999',textAlign:'left',lineHeight:18}}>
                      <Text style={{fontSize:12,color:'#999999',textAlign:'left',lineHeight:18}}></Text>
                      {info.description}
                   </Text>
                </View>
                <View style={styles.up}>
                   <View style={styles.left}>
                     <Image style={{width:10,height:12,marginRight:5}} source={require('../../images/rob3.png')}></Image>
                     <Text style={{fontSize:12,color:'#333333',textAlign:'left',marginRight:10}}>{info.bxName}</Text>
                     {info.isMember?<Image style={{width:27,height:12,}} source={require('../../images/rob4.png')}></Image>:null}
                   </View>
                  <Text style={{fontSize:12,color:'#999999',textAlign:'right'}}>{info.phone}</Text>
                </View>
                <View style={styles.down}>
                  <TouchableOpacity style={{width:30,height:30,}} onPress={() => {props.onClose()}}>
                    <Image style={{width:30,height:30,}} source={require('../../images/rob1.png')}></Image>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <Image style={{width:20,height:12,marginBottom:20}} source={require('../../images/rod6.png')}></Image>
            <TouchableOpacity style={styles.circular} onPress={() => {_this.onClickRob()}}>
              <View style={styles.inside}>
                <Text style={{fontSize:18,color:'#ffffff',textAlign:'center'}}>抢单</Text>
                <TimeOutGo {...TimeOutGoProps}/>
              </View>
            </TouchableOpacity>
          </View>
        ):null}
      </Modal>
    );
  }

};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'column',
    backgroundColor: '#4b4b4b',
  },
  head: {
    width:width-20,
    backgroundColor: '#ffffff',
    borderRadius: 6,
  },
  top:{
    height: 65,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    height: 65,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft:35,
  },
  photo:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:35,
    marginTop:5,
  },
  text:{

  },
  up:{
    marginLeft:10,
    marginRight:10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  left:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  content:{
    height:54,
    marginLeft:10,
    marginRight:10,
    marginTop:7,
    marginBottom:17,
  },
  down:{
    height:90,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:10,
    marginRight:10,
  },
  circular: {
    justifyContent: 'center',
    alignItems: 'center',
    width:100,
    height: 100,
    borderRadius:50,
    borderColor: '#f89118',
    borderWidth:1,
  },
  inside: {
    justifyContent: 'center',
    alignItems: 'center',
    width:88,
    height: 88,
    borderRadius:44,
    backgroundColor: '#f89118',
  },
});

module.exports = RepairRob
