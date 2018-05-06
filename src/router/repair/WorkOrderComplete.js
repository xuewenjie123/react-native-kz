'use strict';
import React, { Component, } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity, Picker, ToastAndroid, AsyncStorage } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import NavigatorTopBar from './../../components/NavigatorTopBar';
var { WorkorderFinish, } = require('../../service/repair');
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
var _navigator,_this,_state;

class WorkOrderComplete extends Component {

  constructor(props) {
    super(props);
    this.state = {
      personnelCost: "",
      materialCost: "",
      chargeType: "1",
      description: undefined,
      images: [],
      maxFiles: 5,
    }
  }
  componentDidMount(){
    AsyncStorage.getItem("main",(error,text)=>{
      if(!error){
        var data = JSON.parse(text)
        _this.setState({userId: data.id});
      }else{
      }
    });
  }
  _onPushRouter(id,params){
    if(id){
      _navigator.replace({
        id:id,
        params:{
          params: _this.props.params,
          _this:_this.props._this,
        },
      });
    }
  }
  getconst(){
    if(_state.personnelCost && _state.materialCost){
      return parseFloat(_state.materialCost)+parseFloat(_state.materialCost)+""
    }else if(_state.personnelCost && !_state.materialCost){
      return _state.materialCost
    }else if(!_state.personnelCost && _state.materialCost){
      return _state.materialCost
    }else{
      return "0"
    }
  }
  submit(){
    if(_state.personnelCost == undefined){
      _state.personnelCost = 0
    }else if(_state.materialCost == undefined){
      _state.materialCost = 0
    }
    var data={
      personnelCost: _state.personnelCost,
      materialCost: _state.materialCost,
      chargeType: _state.chargeType,
      description: _state.description,
    };
    data.files = _state.images?_state.images.map(d=>{
      var base64 = "data:"+d.mime+";base64," + d.data;
      var name = d.path.split("/")
      return {file: base64,fileName: name[name.length-1],}
    }):undefined;
    data.workOrderId = _this.props.params.orderId;
    data.operateUserId = _state.userId;
    WorkorderFinish(data,_this.submitFn)
  }
  submitFn(result){
    if(result.success){
      _this._onPushRouter("CustomerConfirmation")
    }else{
      ToastAndroid.show(response.errorMsg, ToastAndroid.SHORT);
    }
  }
  render() {
    _this = this;
    _state = _this.state;
    _navigator = _this.props.navigator;
    let NavigatorTopBarProps = {
      visible: true,
      title: "工单完成",
      leftView: (
        <TouchableOpacity style={{flex: 1}}
          underlayColor='transparent'
          onPress={() => {_this.props._this.getDetail();_navigator.pop()}}>
          <View style={{flex: 1, paddingLeft: 10,flexDirection: 'row',alignItems: 'center',}}>
            <Image style={{width: 23, height: 23,}} source={require('../../images/46a2.png')}></Image>
          </View>
        </TouchableOpacity>
      ),
      rightView: (
        <TouchableOpacity  style={{flex: 1}}
          onPress={() => {}}>
        </TouchableOpacity>
      ),
    }
    return (
      <View style={{flex: 1,}}>
        <NavigatorTopBar {...NavigatorTopBarProps}/>
        <ScrollView>
          <View style={styles.main}>
            <View style={styles.text}>
              <View style={styles.online}>
                <View style={{alignItems: 'center',flexDirection: 'row',}}>
                  <View style={{alignItems: 'center',flexDirection: 'row',justifyContent: 'space-between',width:50,}}>
                    <Text style={{fontSize:12,color:'#333',textAlign:'left'}}>材</Text>
                    <Text style={{fontSize:12,color:'#333',textAlign:'left'}}>料</Text>
                    <Text style={{fontSize:12,color:'#333',textAlign:'left'}}>费</Text>
                  </View>
                  <Text style={{fontSize:12,color:'#333',textAlign:'left',marginLeft:2}}>:</Text>
                </View>
                <TextInput underlineColorAndroid="transparent" placeholder='￥/元' keyboardType="numeric"
                  value={_state.materialCost} style={{color:'#333',fontSize:12,textAlign:'right',margin:0,padding:0,flex:1}}
                   onChangeText={(text)=>{_this.setState({materialCost:text})}}/>
              </View>
              <View style={styles.line}></View>
              <View style={styles.online}>
                <View style={{alignItems: 'center',flexDirection: 'row',}}>
                  <View style={{alignItems: 'center',flexDirection: 'row',justifyContent: 'space-between',width:50,}}>
                    <Text style={{fontSize:12,color:'#333',textAlign:'left'}}>人</Text>
                    <Text style={{fontSize:12,color:'#333',textAlign:'left'}}>工</Text>
                    <Text style={{fontSize:12,color:'#333',textAlign:'left'}}>费</Text>
                  </View>
                  <Text style={{fontSize:12,color:'#333',textAlign:'left',marginLeft:2}}>:</Text>
                </View>
                <TextInput underlineColorAndroid="transparent" placeholder='￥/元' keyboardType="numeric"
                  value={_state.personnelCost} style={{color:'#333',fontSize:12,textAlign:'right',margin:0,padding:0,flex:1}}
                   onChangeText={(text)=>{_this.setState({personnelCost:text})}}/>
              </View>
              <View style={styles.line}></View>
              <View style={styles.online}>
                <View style={{alignItems: 'center',flexDirection: 'row',}}>
                  <View style={{alignItems: 'center',flexDirection: 'row',justifyContent: 'space-between',width:50,}}>
                    <Text style={{fontSize:12,color:'#333',textAlign:'left'}}>应</Text>
                    <Text style={{fontSize:12,color:'#333',textAlign:'left'}}>收</Text>
                    <Text style={{fontSize:12,color:'#333',textAlign:'left'}}>总</Text>
                    <Text style={{fontSize:12,color:'#333',textAlign:'left'}}>计</Text>
                  </View>
                  <Text style={{fontSize:12,color:'#333',textAlign:'left',marginLeft:2}}>:</Text>
                </View>
                <TextInput underlineColorAndroid="transparent" editable={false} placeholder='￥/元' keyboardType="numeric"
                  value={_this.getconst()} style={{color:'#333',fontSize:12,textAlign:'right',margin:0,padding:0,flex:1}}/>
              </View>
              <View style={styles.line}></View>
              <View style={styles.online}>
                <View style={{alignItems: 'center',flexDirection: 'row',}}>
                  <View style={{alignItems: 'center',flexDirection: 'row',justifyContent: 'space-between',width:50,}}>
                    <Text style={{fontSize:12,color:'#333',textAlign:'left'}}>实</Text>
                    <Text style={{fontSize:12,color:'#333',textAlign:'left'}}>收</Text>
                    <Text style={{fontSize:12,color:'#333',textAlign:'left'}}>金</Text>
                    <Text style={{fontSize:12,color:'#333',textAlign:'left'}}>额</Text>
                  </View>
                  <Text style={{fontSize:12,color:'#333',textAlign:'left',marginLeft:2}}>:</Text>
                </View>
                <TextInput underlineColorAndroid="transparent" placeholder='￥/元' keyboardType="numeric"
                  value={_this.getconst()} style={{color:'#333',fontSize:12,textAlign:'right',margin:0,padding:0,flex:1}}
                  onChangeText={(text)=>{_this.setState({const:text})}}/>
              </View>
              <View style={{borderBottomWidth:1, borderBottomColor: '#ddd', borderStyle: 'solid',}}></View>
              <View style={styles.online}>
                <View style={{alignItems: 'center',flexDirection: 'row',}}>
                  <View style={{alignItems: 'center',flexDirection: 'row',justifyContent: 'space-between',width:50,}}>
                    <Text style={{fontSize:12,color:'#333',textAlign:'left'}}>支</Text>
                    <Text style={{fontSize:12,color:'#333',textAlign:'left'}}>付</Text>
                    <Text style={{fontSize:12,color:'#333',textAlign:'left'}}>方</Text>
                    <Text style={{fontSize:12,color:'#333',textAlign:'left'}}>式</Text>
                  </View>
                  <Text style={{fontSize:12,color:'#333',textAlign:'left',marginLeft:2}}>:</Text>
                </View>
                <View style={{flex: 2,justifyContent: 'flex-end',alignItems: 'flex-end',}}>
                  <Picker style={{width: 80,}}
                    selectedValue={_state.chargeType} mode="dropdown"
                    onValueChange={(lang) => _this.setState({chargeType: lang})}>
                    <Picker.Item label="现金" value="1" />
                  </Picker>
                </View>
              </View>
            </View>
            <View style={styles.input}>
              <TextInput underlineColorAndroid="transparent" placeholder='请输入情况说明......' multiline={true} maxLength={200}
                style={{color:'#666',height: 100,fontSize:12,textAlign:'left',margin:0,padding:0,textAlignVertical: 'top'}}
                value={_state.description} onChangeText={(text)=>{_this.setState({description:text})}}/>
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
            <TouchableOpacity style={styles.submit} onPress={() => _this.submit()}>
              <Text style={{fontSize:18,color:'#FFFFFF',textAlign:'center'}}>提交</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
    width: width,
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
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  online:{
    width:width-30,
    height:45,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding:0,
    marginRight:15,
    marginLeft:15,
  },
  line: {
     borderBottomWidth:1,
     borderBottomColor: '#ddd',
     borderStyle: 'solid',
     marginRight:15,
     marginLeft:15,
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
  submit: {
     justifyContent: 'center',
     alignSelf: 'center',
     width: width-20,
     height: 44,
     backgroundColor: '#237ee5',
     borderWidth: 1,
     borderColor: '#237ee5',
     marginTop:40,
     marginBottom:40,
     borderRadius : 6,
  },
});

// <View style={styles.text}>
//    <View style={styles.online}>
//        <Text style={{fontSize:12,color:'#333',textAlign:'left',padding:0,margin:0,}}>材料明细</Text>
//        <Image style={{width:12,height:12,}} source={require('../../images/icon17.png')}></Image>
//    </View>
//    <View style={{borderBottomWidth:1, borderBottomColor: '#ddd', borderStyle: 'solid',}}></View>
//    <View style={styles.online}>
//        <View style={{flex: 2,}}>
//           <Text style={{fontSize:12,color:'#666666',textAlign:'left',padding:0,margin:0,}}>电工 - 灯泡</Text>
//        </View>
//        <View style={{flex: 1,}}>
//           <Text style={{fontSize:12,color:'#666666',textAlign:'right',padding:0,margin:0,}}>￥12.0元</Text>
//        </View>
//        <View style={{flex: 1,}}>
//           <TextInput underlineColorAndroid = "transparent" placeholder='2'  style={{color:'#666666',fontSize:12,textAlign:'right'}} />
//        </View>
//        <View style={{flex: 1,alignItems: 'flex-end',}}>
//           <Image style={{width:12,height:12,}} source={require('../../images/icon18.png')}></Image>
//        </View>
//    </View>
//    <View style={styles.line}></View>
//    <View style={styles.online}>
//       <View style={{flex: 2,}}>
//           <Text style={{fontSize:12,color:'#666666',textAlign:'left',padding:0,margin:0,}}>电工 - 电线</Text>
//       </View>
//       <View style={{flex: 1,}}>
//           <Text style={{fontSize:12,color:'#666666',textAlign:'right',padding:0,margin:0,}}>￥22.9元</Text>
//        </View>
//        <View style={{flex: 1,}}>
//           <TextInput underlineColorAndroid = "transparent" placeholder='2'  style={{color:'#666666',fontSize:12,textAlign:'right'}} />
//        </View>
//       <View style={{flex: 1,alignItems: 'flex-end',}}>
//           <Image style={{width:12,height:12,}} source={require('../../images/icon18.png')}></Image>
//       </View>
//    </View>
// </View>

module.exports = WorkOrderComplete
