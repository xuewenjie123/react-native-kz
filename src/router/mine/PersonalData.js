'use strict';
import React, { Component, } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity, Picker, AsyncStorage, ToastAndroid, } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
var { editUserInfo, employeeInfo, saveFile } = require('../../service/mine');
import NavigatorTopBar from './../../components/NavigatorTopBar';
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
import { date2str } from './../../constant/constants';
import { feilURI } from './../../constant/url';
var _navigator,_this,_state;

class PersonalData extends Component {

  constructor(props) {
    super(props);
    this.state = {
      employeeInfo: {},
      phone: "",
      name: "",
      mail: "",
      sex: undefined,
    }
  }
  componentDidMount(){
    AsyncStorage.getItem("main",(error,text)=>{
      if(!error){
        var data = JSON.parse(text)
        _this.setState({userId: data.id})
        employeeInfo(data.id+"",_this.resultFu);
      }
    });
  }
  resultFu(result){
    if(result.success && result.data){
      _this.setState({
        employeeInfo: result.data,
        name: result.data.name,
        phone: result.data.phone,
        sex: result.data.gender,
        mail: result.data.email,
        inTime: result.data.joinTime?date2str(new Date(result.data.joinTime),"yyyy-MM-dd"):"",
        orgName: result.data.orgName,
        propertySpecial: result.data.propertySpecial,
        job: result.data.job,
        upLever: result.data.upLever,
        imgurl: result.data.faceImg?result.data.faceImg:undefined,
      });
    }else{
      console.log(result)
    }
  }
  resultFuImg(result){
    if(result.success && result.data){
      _this.setState({
        imgurl: result.data.faceImg?result.data.faceImg:undefined,
      });
    }else{
      console.log(result)
    }
  }
  saveFileFu(result,base64){
    if(result.success){
      employeeInfo(_state.userId+"",_this.resultFuImg);
    }else{
      console.log(result)
    }
  }
  submitData(){
    var data = {
      name: _state.name,
      phone: _state.pass,
      email: _state.pass,
      gender: _state.pass,
    };
    function result(result){
      if(result.success){
        _navigator.pop()
      }else{
        ToastAndroid.show(result.errMsg, ToastAndroid.SHORT);
      }
    }
    editUserInfo(data,result);
  }
  submitDataFuc(){
    if(!_state.name){
      ToastAndroid.show('请输入用户名', ToastAndroid.SHORT);
    }else if(!_state.phone){
      ToastAndroid.show('请输入手机号', ToastAndroid.SHORT);
    }else if(!_state.mail){
      ToastAndroid.show('请输入邮箱', ToastAndroid.SHORT);
    }else if(!_state.sex){
      ToastAndroid.show('请选择性别', ToastAndroid.SHORT);
    }else{
      this.submitData()
    }
  }

  render() {
    _this = this;
    _state = _this.state;
    _navigator = this.props.navigator;
    let NavigatorTopBarProps = {
      visible: true,
      title: "编辑个人资料",
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
        <TouchableOpacity style={{flex: 1}}
          underlayColor='transparent'
          onPress={() => {_this.submitDataFuc()}}>
          <View style={{flex: 1, paddingRight: 10,flexDirection: 'row',justifyContent: 'flex-end', alignItems: 'center',}}>
            <Text style={{fontSize:12,color:'#FFFFFF',}}>完成</Text>
          </View>
        </TouchableOpacity>
      ),
    }
    return (
      <View style={{flex: 1}}>
        <NavigatorTopBar {...NavigatorTopBarProps}/>
        <View style={styles.main}>
          <ScrollView>
            <View style={styles.input}>
              <TouchableOpacity style={styles.circular} onPress={()=>_this.openMycamera()}>
                <View style={{width:72,height:72,borderRadius: 36,borderColor: '#fff',borderWidth:1,borderStyle: 'solid',position: "relative",overflow: 'hidden',}}>
                  <Image style={{flex: 1,width:70,height:70,borderRadius: 35,overflow: 'hidden',}}
                    source={_state.imgurl?{uri: feilURI+_state.imgurl}:require('../../images/list1.png')}>
                  </Image>
                  <View style={{position: "absolute",top:0,left:0,right:0,bottom:0,justifyContent: 'center', alignItems: 'center',}}>
                    <Text style={{fontSize:14,color:'#fff',textAlign:'center'}}>编辑</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <View style={styles.one}>
                <View style={{flex: 1,}}>
                  <Text style={{fontSize:15,color:'#333',}}>姓名</Text>
                </View>
                <View style={{flex: 2,}}>
                 <TextInput underlineColorAndroid = "transparent" placeholder='王立横'
                    value={_state.name} onChangeText={(text)=>{this.setState({name:text})}}
                    style={{color:'#333333',fontSize:15,textAlign:'right'}} />
                </View>
              </View>
              <View style={styles.line}></View>
              <View style={styles.one}>
                <View style={{flex: 1,}}>
                  <Text style={{fontSize:15,color:'#333333',}}>性别</Text>
                </View>
                <View style={{flex: 2,justifyContent: 'flex-end',alignItems: 'flex-end',}}>

                  <Picker style={{ width: 80, }}
                    selectedValue={_state.sex} mode="dropdown"
                    onValueChange={(lang) => {this.setState({sex: lang})}}>
                    <Picker.Item label="男" value="1" />
                    <Picker.Item label="女" value="2" />
                  </Picker>
                </View>
              </View>
              <View style={styles.line}></View>
              <View style={styles.one}>
                <View style={{flex: 1,}}>
                  <Text style={{fontSize:15,color:'#333333',}}>手机号</Text>
                </View>
                <View style={{flex: 2,}}>
                 <TextInput underlineColorAndroid = "transparent" placeholder='1234567890'
                    value={_state.phone} onChangeText={(text)=>{this.setState({phone:text})}}
                    style={{color:'#333333',fontSize:15,textAlign:'right'}} />
                </View>
              </View>
              <View style={styles.line}></View>
              <View style={styles.one}>
                <View style={{flex: 1,}}>
                  <Text style={{fontSize:15,color:'#333333',}}>邮箱</Text>
                </View>
                <View style={{flex: 2,}}>
                 <TextInput underlineColorAndroid = "transparent" placeholder='234567@qq.com'
                    value={_state.mail} onChangeText={(text)=>{this.setState({mail:text})}}
                    style={{color:'#333333',fontSize:15,textAlign:'right'}} />
                </View>
              </View>
              <View style={styles.line}></View>
            </View>
            <View style={styles.inputt}>
              <View style={styles.one}>
                 <View style={{flex: 1,}}>
                    <Text style={{fontSize:15,color:'#333333',}}>入职日期</Text>
                 </View>
                 <View style={{flex: 2,}}>
                    <Text style={{fontSize:15,color:'#666666',textAlign:'right'}}>{_state.inTime}</Text>
                 </View>
              </View>
              <View style={styles.line}></View>
              <View style={styles.one}>
                 <View style={{flex: 1,}}>
                    <Text style={{fontSize:15,color:'#333333',}}>所属专项</Text>
                 </View>
                 <View style={{flex: 2,}}>
                    <Text style={{fontSize:15,color:'#666666',textAlign:'right'}}>{_state.propertySpecial}</Text>
                 </View>
              </View>
              <View style={styles.line}></View>
              <View style={styles.one}>
                 <View style={{flex: 1,}}>
                    <Text style={{fontSize:15,color:'#333333',}}>部门</Text>
                 </View>
                 <View style={{flex: 2,}}>
                    <Text style={{fontSize:15,color:'#666666',textAlign:'right'}}>{_state.orgNam}</Text>
                 </View>
              </View>
              <View style={styles.line}></View>
              <View style={styles.one}>
                 <View style={{flex: 1,}}>
                    <Text style={{fontSize:15,color:'#333333',}}>职务/岗位</Text>
                 </View>
                 <View style={{flex: 2,}}>
                    <Text style={{fontSize:15,color:'#666666',textAlign:'right'}}>{_state.job}</Text>
                 </View>
              </View>
              <View style={styles.line}></View>
              <View style={styles.one}>
                 <View style={{flex: 1,}}>
                    <Text style={{fontSize:15,color:'#333333',}}>直接上级</Text>
                 </View>
                 <View style={{flex: 2,}}>
                    <Text style={{fontSize:15,color:'#666666',textAlign:'right'}}>{_state.upLever}</Text>
                 </View>
              </View>
              <View style={styles.line}></View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
  openMycamera(){
    ImagePicker.openPicker({
      width: 320,
      height: 320,
      cropping: true,
      includeBase64: true,
    }).then(images => {
      var base64 = "data:"+images.mime+";base64," + images.data;
      var name = images.path.split("/")
      let formdata = {file: base64,fileName: name[name.length-1],curUserId: _state.userId};
      saveFile(formdata,(e)=>_this.saveFileFu(e,base64));
    });
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

  input: {
    backgroundColor: '#ffffff',
    height: 307,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop : 10,
  },
  one:{
    height: 45,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft:15,
    paddingRight:15,
  },
  inputt: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop : 10,
  },

  line: {
    borderBottomWidth:1,
    borderBottomColor: '#ddd',
    borderStyle: 'solid',
  },
  circular: {
    justifyContent: 'center',
    alignItems: 'center',
    width:82,
    height: 82,
    marginTop:35,
    marginBottom:10,
    borderRadius:41,
    borderColor: '#3891f5',
    borderWidth:1,
    backgroundColor: '#ffffff',
    alignSelf:'center',
  },
  circularGray: {
    justifyContent: 'center',
    alignItems: 'center',
    width:70,
    height: 70,
    marginTop:3,
    marginBottom:3,
    borderRadius:35,
    backgroundColor: '#999999',
  },

});

module.exports = PersonalData
