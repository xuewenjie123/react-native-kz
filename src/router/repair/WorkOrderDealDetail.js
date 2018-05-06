'use strict';
import React, { Component, } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity, Picker, AsyncStorage, ToastAndroid, } from 'react-native';
import NavigatorTopBar from './../../components/NavigatorTopBar';
import { date2str } from './../../constant/constants';
import ImagePicker from 'react-native-image-crop-picker';
var { updateWorkorderStatus, } = require('../../service/repair');
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
var _navigator,_this,_state;

class WorkOrderDealDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      time: date2str(new Date(),"yyyy-MM-dd hh:mm"),
      workHours: undefined,
      isNeedCoordination: undefined,
      description: "",
      images: [],
      maxFiles: 5,
    }
  }
  componentDidMount(){
    AsyncStorage.getItem("main",(error,text)=>{
      if(!error){
        var data = JSON.parse(text)
        console.log(data)
        _this.setState({userId: data.id});
      }else{
        console.log(error)
      }
    });
  }
  submit(){
    if(!_state.workHours){
      ToastAndroid.show('请选择工时', ToastAndroid.SHORT);
    }else{
      var data={};
      data.files = _state.images?_state.images.map(d=>{
        var base64 = "data:"+d.mime+";base64," + d.data;
        var name = d.path.split("/")
        return {file: base64,fileName: name[name.length-1],}
      }):undefined;
      data.workHours = _state.workHours;
      data.isNeedCoordination = _state.isNeedCoordination;
      data.description = _state.description;
      data.workOrderId = _this.props.params.orderId;
      data.operateUserId = _state.userId;
      updateWorkorderStatus(data,_this.submitFn)
    }
  }
  submitFn(result){
    if(result.success){
      _navigator.pop()
      if(_state.isNeedCoordination && _state.isNeedCoordination!="0"){
        _this.props._this.setState({modalVisible2: true,})
      }
      _this.props._this.getDetail()
    }else{

    }
  }

  render() {
    _this = this;
    _state = _this.state;
    _navigator = _this.props.navigator;
    let NavigatorTopBarProps = {
      visible: true,
      title: "处理详情",
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
    return (
      <View style={{flex: 1,}}>
        <NavigatorTopBar {...NavigatorTopBarProps}/>
        <View style={styles.main}>
          <View style={styles.text}>
            <View style={styles.online}>
              <View style={{flex: 1,padding:0,margin:0,}}>
                <Text style={{fontSize:12,color:'#333333',textAlign:'left',padding:0,margin:0,}}>处理时间:</Text>
              </View>
              <View style={{flex: 1,padding:0,margin:0,}}>
                <TextInput underlineColorAndroid="transparent" editable={false}
                  value={_state.time} style={{color:'#333333',fontSize:12,textAlign:'right',margin:0,padding:0,lineHeight:12}} />
              </View>
            </View>
            <View style={styles.onlinee}>
              <View style={{flex: 1,padding:0,margin:0,}}>
                <Text style={{fontSize:12,color:'#333333',textAlign:'left',padding:0,margin:0,}}>处理地点:</Text>
              </View>
              <View style={{flex: 1,padding:0,margin:0,flexWrap:'wrap',}}>
                <TextInput underlineColorAndroid="transparent" editable={false}
                  value={_this.props.params.address} style={{color:'#333333',fontSize:12,textAlign:'right',margin:0,padding:0,textAlignVertical: 'top',lineHeight:15}} />
              </View>
            </View>
            <View style={styles.online}>
              <View style={{flex: 1,padding:0,margin:0,}}>
                <Text style={{fontSize:12,color:'#333333',textAlign:'left',padding:0,margin:0,}}>工
                <Text style={{fontSize:12,color:'#ffffff',textAlign:'left',padding:0,margin:0,opacity: 0}}>工时</Text>
                  时:</Text>
              </View>
              <View style={{flex: 1,padding:0,margin:0,}}>
                <TextInput underlineColorAndroid="transparent" placeholder='(小时)' style={{color:'#333333',fontSize:12,textAlign:'right',margin:0,padding:0,lineHeight:12}}
                  value={_state.workHours} onChangeText={(text)=>{_this.setState({workHours:text})}} keyboardType={"numeric"}/>
              </View>
            </View>
          </View>
          <View style={styles.number}>
            <Text style={{fontSize:12,color:'#333333',textAlign:'left'}}>申请协同：</Text>
            <View style={{flex: 1,padding:0,margin:0,}}>
              <TextInput underlineColorAndroid="transparent" placeholder='(人)' style={{color:'#333333',fontSize:12,textAlign:'right',margin:0,padding:0,lineHeight:12}}
                value={_state.isNeedCoordination} onChangeText={(text)=>{_this.setState({isNeedCoordination:text})}} keyboardType={"numeric"}/>
            </View>
          </View>
          <View style={styles.input}>
            <TextInput underlineColorAndroid="transparent" style={{color:'#666666',height: 100,fontSize:12,textAlign:'left',margin:0,padding:0,textAlignVertical: 'top'}}
              placeholder='请说明现场情况' value={_state.description} onChangeText={(text)=>{_this.setState({description:text})}} multiline={true}  maxLength={200}/>
          </View>
          <View style={{paddingLeft:5,paddingRight:5,flexDirection: 'row',marginTop : 5,  flexWrap:'wrap',}}>
            {_state.images?_state.images.map((d,index)=>(
              <TouchableOpacity key={index} onPress={()=>_this.delPicker(index)} style={{width:70,height:70,marginLeft:5,marginRight:5,marginTop : 10}}>
                <Image style={{width:70,height:70}}
                  resizeMode="contain" source={{uri:d.path}}></Image>
              </TouchableOpacity>
            )):null}
            {_state.maxFiles?(
              <TouchableOpacity onPress={()=>_this.openPicker()} style={{width:70,height:70,marginLeft:5,marginRight:5,marginTop : 10}}>
                <Image style={{width:70,height:70}} source={require('../../images/apply2.png')}></Image>
              </TouchableOpacity>
            ):null}
          </View>
        </View>
      </View>
    );
  }
  delPicker(d){
    _state.images.splice(d,1)
    _this.setState({images:_state.images,maxFiles: 5-_state.images.length})
  }
  openPicker(){
    ImagePicker.openCamera({
      includeBase64: true,
    }).then(_this.openPickerResult);
  }
  openPickerResult(images){
    _this.setState({images:_state.images.concat(images),maxFiles: 5-images.length-_state.images.length})
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
    height: 114,
    marginTop : 10,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ddd',
    paddingLeft:15,
    paddingRight:15,
    paddingTop:10,
  },
  online:{
    height:12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:7,
    marginBottom:7,
    padding:0,
   },
   onlinee:{
     height:30,
     flexDirection: 'row',
     justifyContent: 'space-between',
     marginTop:7,
     marginBottom:7,
     padding:0,
    },

  number: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width,
    height: 45,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingLeft:15,
    paddingRight:15,
    borderTopWidth: 0,
  },
  input: {
    width: width,
    height: 140,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop : 10,
    paddingLeft:15,
    paddingRight:15,
    paddingTop:20,
  },
  photo: {
    width: 140,
    height: 140,
  },

});

module.exports = WorkOrderDealDetail
