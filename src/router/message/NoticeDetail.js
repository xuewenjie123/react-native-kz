'use strict';
import React, { Component, } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Picker, AsyncStorage, } from 'react-native';
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
import NavigatorTopBar from './../../components/NavigatorTopBar';
import color from './../../constant/color';
import { date2str } from './../../constant/constants';
var _navigator,_this,_state,_props;

var imageList = {
  "36b3": require('../../images/36b3.png'),
  "36b4": require('../../images/36b4.png'),
  "54a1": require('../../images/54a1.png'),
  "88a1": require('../../images/88a1.png'),
}
class NoticeDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount(){
  }
  maxfont(str,da){
    if(str){
      str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
      str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
      str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
      str = str.replace(/ /ig,'');//去掉
      return str
    }else{
      return "";
    }
  }
  render() {
    _this = this;
    _state = _this.state;
    _props = _this.props
    _navigator = _props.navigator;
    let NavigatorTopBarProps = {
      visible: true,
      title: "公告",
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
          underlayColor='transparent'>
        </TouchableOpacity>
      ),
    }
    return (
      <View style={{flex: 1,}}>
        <NavigatorTopBar {...NavigatorTopBarProps}/>
        <View style={styles.main}>
          <ScrollView>
            <View style={styles.box}>
              <Text style={{fontSize:16,color:'#333',marginTop: 10, marginBottom: 10,}}>
                {_props.params.title}
              </Text>
              <Text style={{fontSize:12,color:'#999', marginBottom: 10,}}>
                {_props.params.createTime?date2str(new Date(_props.params.createTime),"yyyy-MM-dd"):null}
                <Text style={{fontSize:12,color:'#0099cc',}}>
                  {_props.params.orgName?" "+_props.params.orgName:""}
                </Text>
              </Text>
              <Text style={{fontSize:12,color:'#999',marginTop: 10, marginBottom: 10,}}>
                {"尊敬的业主/住户："}
              </Text>
              <Text style={{fontSize:12,color:'#666', marginBottom: 10,}}>
                {_this.maxfont(_props.params.content)}
              </Text>
              <View style={styles.boxright}>
                <Text style={{fontSize:12,color:'#999', marginTop: 10, marginBottom: 10,}}>
                  {_props.params.createTime?date2str(new Date(_props.params.createTime),"yyyy-MM-dd"):null}
                </Text>
              </View>
              <View style={styles.boxright}>
                <Text style={{fontSize:12,color:'#999', marginBottom: 10,}}>
                  {_props.params.orgName}
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: color.white1C,
    flexDirection: 'column',
  },
  box: {
    flexDirection: 'column',
    padding: 15,
  },
  boxright: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

module.exports = NoticeDetail
