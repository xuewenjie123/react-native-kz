'use strict';
import React, { Component, } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity, Picker, } from 'react-native';
import NavigatorTopBar from './../../components/NavigatorTopBar';
var { get, } = require('../../service/login');
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
var _navigator;


class Transfer extends Component {

  constructor(props) {
   super(props);
  }

  render() {
    _navigator = this.props.navigator;
    let NavigatorTopBarProps = {
      visible: true,
      title: "转交他人",
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
          onPress={() => {}}>
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
            <View style={styles.select}>
              <TextInput underlineColorAndroid = "transparent" placeholder='搜索' style={{color:'#666666',fontSize:15,textAlign:'center',padding:0,margin:0,}} />
            </View>
          </View>
          <View style={styles.list}>
            <View style={styles.listA}>
              <View style={styles.photo}>
                <Image style={{width:44,height:44,}} source={require('../../images/listPhoto.png')}></Image>
              </View>
              <View style={{flex: 1,height:44,paddingTop:5,paddingBottom:5,}}>
                <View  style={styles.online}>
                  <View>
                      <Text style={{fontSize:15,color:'#333333',textAlign:'left',lineHeight:15}}>易烊千玺</Text>
                  </View>
                </View>
                <Text style={{fontSize:12,color:'#999999',textAlign:'left',marginTop:6,lineHeight:12}}>工程部</Text>
              </View>
            </View>
            <View style={styles.listA}>
              <View style={styles.photo}>
                <Image style={{width:44,height:44,}} source={require('../../images/listPhoto.png')}></Image>
              </View>
              <View style={{flex: 1,height:44,paddingTop:5,paddingBottom:5,}}>
                <View  style={styles.online}>
                  <View>
                      <Text style={{fontSize:15,color:'#333333',textAlign:'left',lineHeight:15}}>易烊千玺</Text>
                  </View>
                </View>
                <Text style={{fontSize:12,color:'#333333',textAlign:'left',marginTop:6,lineHeight:12}}>1234567890</Text>
              </View>
            </View>
            <View style={styles.listA}>
              <View style={styles.photo}>
                <Image style={{width:44,height:44,}} source={require('../../images/listPhoto.png')}></Image>
              </View>
              <View style={{flex: 1,height:44,paddingTop:5,paddingBottom:5,}}>
                <View  style={styles.online}>
                  <View>
                      <Text style={{fontSize:15,color:'#333333',textAlign:'left',lineHeight:15}}>易烊千玺</Text>
                  </View>
                  <Text style={{fontSize:15,color:'#999999',textAlign:'left',marginRight:10,marginLeft:10}}>|</Text>
                  <View>
                      <Text style={{fontSize:13,color:'#999999',textAlign:'left',}}>部门主管</Text>
                  </View>
                </View>
                <Text style={{fontSize:12,color:'#333333',textAlign:'left',marginTop:6,lineHeight:12}}>1234567890</Text>
              </View>
            </View>
            <View style={styles.listA}>
              <View style={styles.photo}>
                <Image style={{width:44,height:44,}} source={require('../../images/listPhoto.png')}></Image>
              </View>
              <View style={{flex: 1,height:44,paddingTop:5,paddingBottom:5,}}>
                <View  style={styles.online}>
                  <View>
                      <Text style={{fontSize:15,color:'#333333',textAlign:'left',lineHeight:15}}>易烊千玺</Text>
                  </View>
                </View>
                <Text style={{fontSize:12,color:'#333333',textAlign:'left',marginTop:6,lineHeight:12}}>1234567890</Text>
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
    backgroundColor: '#f5f5f5',
  },
  title: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2486f4',
  },
  input: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  select: {
    width:width-30,
    justifyContent: 'center',
    height: 28,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius:25,
  },
  list: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop:10,
  },
  photo: {
    justifyContent: 'center',
    alignItems: 'center',
    width:44,
    height: 44,
    borderRadius:22,
    backgroundColor: '#2486f4',
    marginRight:10,
  },
  listA: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 64,
    backgroundColor: 'white',
    paddingLeft:15,
    borderBottomWidth:1,
    borderBottomColor: '#ddd',
    borderStyle: 'solid',
  },
  online:{
    flex: 1,
    height: 15,
    alignItems: 'center',
    flexDirection: 'row',
   },
});

module.exports = Transfer
