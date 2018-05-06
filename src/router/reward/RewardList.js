'use strict';
import React, { Component, } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity, Picker, } from 'react-native';
import NavigatorTopBar from './../../components/NavigatorTopBar';
var { getList, } = require('../../service/reward');
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
var _navigator;


class RewardList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      getList: [],
    }
  }
  componentDidMount(){
    function updata(response){
      if(response){
        _this.setState({getList: []});
      }else{
        _this.setState({getList: []});
      }
    }
    getList({},updata);
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
  render() {
    _navigator = this.props.navigator;
    let NavigatorTopBarProps = {
      visible: true,
      title: "奖励",
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
    return (
      <View style={{flex: 1}}>
        <NavigatorTopBar {...NavigatorTopBarProps}/>
        <View style={styles.main}>
          <View style={styles.last}>
            <View style={styles.time}>
              <Text style={{fontSize:9,color:'#ffffff',}}>2016年12月01日</Text>
            </View>
            <TouchableOpacity style={styles.borderss}
              underlayColor='transparent'
              onPress={() => {this._onPushRouter("RewardListDetail")}}>
              <View style={styles.borders}>
                <View style={styles.text}>
                  <View style={styles.info}>
                    <View style={styles.online}>
                      <Text numberOfLines={1} style={{fontSize:15,color:'#333333',textAlign:'left',lineHeight:15,padding:0,margin:0}}>关于物业春节年终奖励具体如下：</Text>
                    </View>
                    <Text numberOfLines={2} style={{fontSize:12,color:'#666666',lineHeight:18,padding:0,margin:0}}>本周末家里暖气有损坏或者没有温度，请拨打维修有损坏或者没有温度，请拨打维修团队打电话：13756727282，团队周一将离开！</Text>
                  </View>
                  <View style={styles.line}></View>
                  <View style={styles.come}>
                    <Text style={{fontSize:12,color:'#999999'}}>暖气服务中心</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <View style={styles.time}>
              <Text style={{fontSize:9,color:'#ffffff',}}>2016年12月01日</Text>
            </View>
            <View style={styles.borderss}>
              <View style={styles.borders}>
                 <View style={styles.text}>
                 <View style={styles.info}>
                     <View style={styles.online}>
                       <Text numberOfLines={1} style={{fontSize:15,color:'#333333',textAlign:'left',lineHeight:15,padding:0,margin:0}}>关于物业春节年终奖励具体如下：</Text>
                     </View>
                     <Text numberOfLines={2} style={{fontSize:12,color:'#666666',lineHeight:18,padding:0,margin:0}}>本周末家里暖气有损坏或者没有温度，请拨打维修团队打电话：13756727282，团队周一将离开！</Text>
                  </View>
                 <View style={styles.line}></View>
                 <View style={styles.come}>
                       <Text style={{fontSize:12,color:'#999999'}}>暖气服务中心</Text>
                 </View>
               </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }

};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection:'column',
  },

  title: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2486f4',
  },

  last:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  time: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 15,
    width: 92,
    backgroundColor: '#bdbebe',
    marginTop : 15,
    marginBottom : 10,
    borderRadius : 6,
  },
  text: {
    height: 113,
    width: width-20,
    borderRadius : 6,
    backgroundColor: '#ffffff',
    paddingLeft:10,
    paddingRight:10,
  },
  borders:{
    borderBottomWidth:1,
    borderBottomColor: '#b0c1c7',
    borderStyle: 'solid',
  },
  borderss:{
    borderBottomWidth:1,
    borderLeftWidth:1,
    borderRightWidth:1,
    borderTopWidth:0,
    borderColor: '#dde4e7',
    borderStyle: 'solid',
  },


    info: {
      height: 83,
      borderTopRightRadius : 6,
      borderTopLeftRadius : 6,
    },
    online: {
      height: 30,
      marginTop:8,
      justifyContent: 'center',
    },
    come: {
      height: 30,
      borderBottomRightRadius : 6,
      borderBottomLeftRadius : 6,
      justifyContent: 'center',
    },
    line: {
      borderBottomWidth:1,
      borderBottomColor: '#ddd',
      borderStyle: 'solid',
      },


});

module.exports = RewardList
