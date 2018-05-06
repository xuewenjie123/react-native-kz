'use strict';
import React, { Component, } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity, Picker, AsyncStorage, ToastAndroid, } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import NavigatorTopBar from './../../components/NavigatorTopBar';
var { applyHang, } = require('../../service/repair');
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
var _navigator,_this,_state;

class ApplyChange extends Component {

  constructor(props) {
    super(props);
    this.state={
      content: undefined,
      images: [],
      maxFiles: 5,
    }
  }
  componentDidMount(){
    AsyncStorage.getItem("main",(error,text)=>{
      if(!error){
        var data = JSON.parse(text)
        _this.setState({userId: data.id});
      }
    });
  }
  submit(){
    if(!_state.content){
      ToastAndroid.show('请填写现场情况', ToastAndroid.SHORT);
    }else{
      var data={};
      data.files = _state.images?_state.images.map(d=>{
        var base64 = "data:"+d.mime+";base64," + d.data;
        var name = d.path.split("/")
        return {file: base64,fileName: name[name.length-1],}
      }):undefined;
      data.description = _state.content;
      data.workOrderId = _this.props.params.orderId;
      data.operateUserId = _state.userId;
      applyHang(data,_this.submitFn)
    }
  }
  submitFn(result){
    if(result.success){
      _navigator.pop()
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
      title: "申请挂起",
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
          <View style={styles.input}>
            <TextInput underlineColorAndroid="transparent" style={{color:'#666666',height: 100,fontSize:12,textAlign:'left',margin:0,padding:0,textAlignVertical: 'top'}}
              placeholder='请输入情况说明' value={_state.content} onChangeText={(text)=>{_this.setState({content:text})}} multiline={true}  maxLength={200}/>
          </View>
          <View style={styles.photo}>
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
    backgroundColor: "#fafafa",
  },
  title: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2486f4',
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
    paddingLeft:5,
    paddingRight:5,
    flexDirection: 'row',
    marginTop : 5,
    flexWrap:'wrap',
  },

});

module.exports = ApplyChange
