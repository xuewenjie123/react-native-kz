'use strict';
import React, { Component, } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity, Picker, Modal, ActivityIndicator, } from 'react-native';
const Dimensions = require('Dimensions');
const { width, height } = Dimensions.get('window');
var _navigator,_this,_state,_props;

class TimeChoiceModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      listVlaue: [],
    };
  }
  componentWillReceiveProps(newProps){
    if(newProps.visible && !_props.visible && !_state.listData.length){
      // newProps.listData.map(d=>{
      //   d.choice = false;
      //   return d;
      // })
      _this.setState({listData:[newProps.listData],})
    }
  }
  _onClickItem(item,itemIndex,listIndex){
    if(item.children){
      _state.listData[listIndex+1] = item.children.map(d=>{
        d.choice = false;
        return d;
      });
      _state.listData.splice(listIndex+2)
      _state.listVlaue.splice(listIndex+1)
    }
    _state.listData[listIndex] = _state.listData[listIndex].map(d=>{
      d.choice = false;
      return d;
    })
    _state.listVlaue[listIndex] = _state.listData[listIndex][itemIndex].value
    _state.listData[listIndex][itemIndex].choice = true;
    _this.setState({listData: _state.listData,listVlaue:_state.listVlaue})
  }
  onClose(){
    _props._this.setState({timeModalV:false,})
  }
  onSure(){
    _props._this.onSure(_state.listVlaue)
    _props._this.setState({timeModalV:false,})
  }
  render() {
    _this = this;
    _state = _this.state;
    _props = _this.props;
    _navigator = _props.navigator;
    let modalProps = {
      animationType: 'slide',
      transparent: true,
      visible: _props.visible,
      onRequestClose:()=>{},
    }
    let topTitle = (mod) => {
      return (
        <View style={styles.topbox}>
          <View style={{flex: 1,flexDirection: 'row',alignItems: 'center',paddingLeft:10,}}>
            <TouchableOpacity style={{padding:5,}}
              onPress={() => {_this.onClose()}}>
              <Text style={{fontSize:15,color:'#999',textAlign:'center',}}>{"取消"}</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 2,flexDirection: 'row',alignItems: 'center',justifyContent: 'center',}}>
            <Text style={{fontSize:15,color:'#999',textAlign:'center',}}>{_props.title}</Text>
          </View>
          <View style={{flex: 1,flexDirection: 'row',alignItems: 'center',justifyContent: 'flex-end',paddingRight:10,}}>
            <TouchableOpacity style={{padding:5,}}
              onPress={() => {_this.onSure()}}>
              <Text style={{fontSize:15,color:'#999',textAlign:'center',}}>{"确定"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
    let bottomCont = () => _state.listData.map((d,index)=>(
      <View key={index} style={styles.contboxitem}>
        <ScrollView style={styles.contboxitems} >
          <View style={styles.contboxitemss}>
            {d.map( (e,ind)=>(
              <TouchableOpacity key={ind} style={styles.itemdata} onPress={() => {_this._onClickItem(e,ind,index)}}>
                <Text style={{fontSize:12,color:e.choice?'#2aa7f6':'#333',}}>{e.label}</Text>
                {e.choice?(<Image style={{width: 15,height: 15,marginLeft: 10,}} source={require('../../images/30b2.png')}></Image>):null}
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    ))
    return (
      <Modal {...modalProps} >
        <View style={{position: 'absolute', width: width, height: height, backgroundColor: "#000", opacity: .6,}}>
        </View>
        <View style={styles.main}>
          <View style={styles.allbox}>
            {topTitle()}
            <View style={styles.subtopbox}>
            </View>
            <View style={styles.contbox}>
              {bottomCont()}
            </View>
          </View>
        </View>
      </Modal>
    );
  }
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  allbox: {
    width:width,
    backgroundColor: 'white',
  },
  topbox: {
    height: 44,
    width:width,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtopbox: {
    width:width,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: "#ddd",
  },
  subtitle: {
    height: 32,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'column',
    overflow: 'visible',
  },
  subtitle2: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle3: {
    flex: 1,
    marginBottom: -1,
    borderBottomWidth: 3,
    borderStyle: 'solid',
    borderColor: "#2486f4",
  },
  contbox: {
    height: 300,
    width:width,
    flexDirection: 'row',
  },
  contboxitem: {
    flex: 1,
    height: 300,
  },
  contboxitems: {
    flexDirection: 'column',
  },
  contboxitemss: {
    flexDirection: 'column',
    padding: 10,
  },
  itemdata: {
    width:width,
    height: 30,
    alignItems: 'center',
    flexDirection: 'row',
  },
});

module.exports = TimeChoiceModal
