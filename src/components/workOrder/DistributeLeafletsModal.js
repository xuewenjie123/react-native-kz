'use strict';
import React, { Component, } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity, Picker, Modal, ActivityIndicator, } from 'react-native';
const Dimensions = require('Dimensions');
const { width, height } = Dimensions.get('window');
let _navigator;

let getValueOrder = (value)=>{

}

class DistributeLeaflets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: props.modal || "close", //confirm  close
      viewKey: 0,
      parentValue: props.listValue? true: false,
      listValue: props.listValue || [{value: "", label: "请选择"},],
      listData: props.listData || [],
    };

  }
  componentWillReceiveProps(newProps){
    if(this.props !== newProps){
      var oldProps = this.props;
      if(oldProps.listData !== newProps.listData){
        this.setState({listData: newProps.listData})
      }
      if(this.state.parentValue && oldProps.listValue !== newProps.listValue){
        var value = newProps.listValue;
        if(value.length < newProps.listData){
          value.push({value: "", label: "请选择"})
        }
        this.setState({listValue: value})
      }
    }
  }
  _onClickItem(item,itemIndex,listIndex){
    var listValue = this.state.listValue;
    listValue[listIndex] = item;
    listValue = listValue.slice(0,listIndex+1)
    this.state.parentValue && this.setState({listValue: listValue});
    var thisThis = this;
    function next (){
      listValue[listIndex+1] = {value: "", label: "请选择"};
      thisThis.setState({listValue: listValue,viewKey: listIndex+1})
    }
    this.props.onChange(listValue,next)
  }
  _onClickList(item,listIndex){
    this.setState({viewKey: listIndex})
  }
  render() {
    let props = this.props;
    let _state = this.state;
    let modalProps = {
      animationType: 'slide',
      transparent: true,
      visible: props.visible,
      onRequestClose:()=>{},
    }
    let topTitle = (mod) => {
      if(mod == "close"){
        return (
          <View style={styles.topbox}>
            <View style={{flex: 1,flexDirection: 'row',alignItems: 'center',paddingLeft:10,}}>
            </View>
            <View style={{flex: 2,flexDirection: 'row',alignItems: 'center',justifyContent: 'center',}}>
              <Text style={{fontSize:15,color:'#999',textAlign:'center',}}>{props.title}</Text>
            </View>
            <View style={{flex: 1,flexDirection: 'row',alignItems: 'center',justifyContent: 'flex-end',paddingRight:10,}}>
              <TouchableOpacity style={{padding:5,}}
                onPress={() => {props.onClose()}}>
                <Image style={{width: 15,height: 15}} source={require('../../images/30b1.png')}></Image>
              </TouchableOpacity>
            </View>
          </View>
        )
      }else if(mod == "confirm"){
        return (
          <View style={styles.topbox}>
            <View style={{flex: 1,flexDirection: 'row',alignItems: 'center',paddingLeft:10,}}>
              <TouchableOpacity style={{padding:5,}}
                onPress={() => {props.onClose()}}>
                <Text style={{fontSize:15,color:'#999',textAlign:'center',}}>{"取消"}</Text>
              </TouchableOpacity>
            </View>
            <View style={{flex: 2,flexDirection: 'row',alignItems: 'center',justifyContent: 'center',}}>
              <Text style={{fontSize:15,color:'#999',textAlign:'center',}}>{props.title}</Text>
            </View>
            <View style={{flex: 1,flexDirection: 'row',alignItems: 'center',justifyContent: 'flex-end',paddingRight:10,}}>
              <TouchableOpacity style={{padding:5,}}
                onPress={() => {props.onSure()}}>
                <Text style={{fontSize:15,color:'#999',textAlign:'center',}}>{"确定"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
      }
    }
    let bottomCont = (list,index) => {
      let item = list[index];
      if(item) return (
          <View style={styles.contboxitem}>
            <ScrollView style={styles.contboxitems} >
              <View style={styles.contboxitemss}>
                {item.map( (d,ind) => {
                  if(_state.listValue[index] && _state.listValue[index].value && d.value == _state.listValue[index].value)
                    return (
                      <TouchableOpacity key={ind} style={styles.itemdata} onPress={() => {this._onClickItem(d,ind,index)}}>
                        <Text style={{fontSize:12,color:'#2aa7f6',}}>{d.label}</Text>
                        <Image style={{width: 15,height: 15,marginLeft: 10,}} source={require('../../images/30b2.png')}></Image>
                      </TouchableOpacity>
                    )
                  else
                    return (
                      <TouchableOpacity key={ind} style={styles.itemdata} onPress={() => {this._onClickItem(d,ind,index)}}>
                        <Text style={{fontSize:12,color:'#333',}}>{d.label}</Text>
                      </TouchableOpacity>
                    )
                })}
              </View>
            </ScrollView>
          </View>
        )
      else return(
        <View style={[styles.contboxitem,{alignItems: 'center', justifyContent: 'center',}]}>
          <ActivityIndicator
            animating={true}
            size="large"
            color="#999"
          />
        </View>
      )
    }
    return (
      <Modal {...modalProps} >
        <View style={{position: 'absolute', width: width, height: height, backgroundColor: "#000", opacity: .6,}}>
        </View>
        <View style={styles.main}>
          <View style={styles.allbox}>
            {topTitle(_state.modal)}
            <View style={styles.subtopbox}>
              {_state.listValue.map( (item,index) => {
                if(_state.viewKey == index){
                  return (
                    <View key={index} style={styles.subtitle}>
                      <View style={styles.subtitle2}>
                        <Text style={{fontSize:12,color:'#333',}}>{item.label}</Text>
                      </View>
                      <View style={styles.subtitle3}>
                      </View>
                    </View>
                  )
                }else{
                  return (
                    <TouchableOpacity key={index} style={styles.subtitle} onPress={() => {this._onClickList(item,index)}}>
                      <View style={styles.subtitle2}>
                        <Text style={{fontSize:12,color:'#333',}}>{item.label}</Text>
                      </View>
                    </TouchableOpacity>
                  )
                }
              })}
            </View>
            <View style={styles.contbox}>
              {bottomCont(_state.listData,_state.viewKey)}
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
    height: 32,
    width:width,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: "#ddd",
    overflow: 'visible',
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
  },
  contboxitem: {
    width:width,
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

module.exports = DistributeLeaflets
