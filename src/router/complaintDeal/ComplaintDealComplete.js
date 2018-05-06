'use strict';
import React, { Component, } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity, Picker, } from 'react-native';
import NavigatorTopBar from './../../components/NavigatorTopBar';
var { getCompleteList, } = require('../../service/complaintDeal');
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
var _navigator;

class ApplyChange extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount(){
  }

  render() {
    _navigator = this.props.navigator;
    let NavigatorTopBarProps = {
      visible: true,
      title: this.props.title,
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
            <TextInput underlineColorAndroid = "transparent" placeholder='请输入情况说明......'  style={{color:'#666666',fontSize:13,textAlign:'left',textAlignVertical: 'top'}} />
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
    width: width,
    height: 140,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop : 10,
    paddingLeft:15,
    paddingRight:15,
    flexWrap:'wrap',
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
