'use strict';
import React, { Component, } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity, Picker, } from 'react-native';
import NavigatorTopBar from './../../components/NavigatorTopBar';
var { getDatile, } = require('../../service/reward');
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
var _navigator;


class RewardDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      getDatile: [],
    }
  }
  componentDidMount(){
    function updata(response){
      if(response){
        _this.setState({getDatile: []});
      }else{
        _this.setState({getDatile: []});
      }
    }
    getDatile({},updata);
  }

  render() {
    _navigator = this.props.navigator;
    let NavigatorTopBarProps = {
      visible: true,
      title: "奖励详情",
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
        <ScrollView>
          <View style={styles.main}>
            <View style={styles.text}>
             <View style={styles.online}>
               <View style={{marginTop:30}}>
                 <Image style={{width:2,height:13,marginTop:4}} source={require('../../images/RewardList3.png')}></Image>
               </View>
               <View style={styles.up}>
                  <Text style={{fontSize:15,color:'#333333',textAlign:'left'}}>关于物业春节年夜春节物业春节年夜春节物业春节年夜春节物业春节年夜春节，具体内容如下：</Text>
               </View>
             </View>
               <View style={{paddingLeft:10,paddingRight:10,alignItems: 'flex-end',}}>
                  <Image style={{width:13,height:13,}} source={require('../../images/RewardList1.png')}></Image>
               </View>
               <View style={styles.article}>
                  <Text style={{fontSize:15,color:'#666666',textAlign:'left'}}>内容如如下关年夜春节，具体内容如</Text>
               </View>
               <View style={{paddingLeft:10,paddingRight:10,alignItems: 'flex-start',}}>
                  <Image style={{width:13,height:13,marginBottom:35}} source={require('../../images/RewardList2.png')}></Image>
               </View>
            </View>
          </View>
        </ScrollView>
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
  text: {
    justifyContent: 'center',
  },
  up: {
    justifyContent: 'center',
    marginTop:30,
    marginLeft:4,
    marginRight:25,
    width:width-50
  },
  article: {
    justifyContent: 'center',
    marginLeft:25,
    marginRight:25,
  },
  online: {
      marginLeft:19,
      flexDirection: 'row',
  },
});

module.exports = RewardDetail
