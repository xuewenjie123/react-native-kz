'use strict';
import React, { Component, } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Picker, ListView, } from 'react-native';
import NavigatorTopBar from './../../components/NavigatorTopBar';
var { getAreaList } = require('../../service/mine');
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
var _navigator,_this;

class ResponsibleArea extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows([]),
      getList: [],
      total: undefined,
      current: 1,
      size: 10,
      load: false,
      selectCondition: "",
      reset: false,
    }
  }
  componentDidMount(){
    _this.setState({load: true,reset: true});
    getAreaList({currentUserId:11,currentPage: 1,pageSize: 10,},_this.updata);
  }
  updata(result){
    if(result.success && result.data){
      if(_this.state.reset){
        _this.setState({
          dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(result.data.records),
          getList: result.data.records,
          total: result.data.total,
          current: result.data.current,
          load: false,
          reset: false,
        });
      }else{
        _this.setState({
          dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(_this.state.getList.concat(result.data.records)),
          getList: _this.state.getList.concat(result.data.records),
          total: result.data.total,
          current: result.data.current,
          load: false,
        });
      }
    }
  }
  onEndReached(){
    var state = _this.state;
    if(state.current*state.size<state.total && !state.load){
      _this.setState({load: true,});
      getAreaList({currentUserId:11,currentPage: _this.state.current+1,pageSize: _this.state.size,},_this.updata);
    }
  }

  render() {
    _this = this;
    _navigator = this.props.navigator;
    let NavigatorTopBarProps = {
      visible: true,
      title: "负责小区",
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
          <View style={{paddingBottom:10,flex:1}}>
            <ListView
              pageSize={_this.state.size}
              dataSource={_this.state.dataSource}
              renderRow={_this._renderRow}
              initialListSize={_this.state.size}
              scrollRenderAheadDistance={500}
              scrollEventThrottle={80}
              onEndReached={_this.onEndReached}
              onEndReachedThreshold={1000}
              enableEmptySections={true}
            />
          </View>
        </View>
      </View>
    );
  }
  _renderRow(rowData,sectionID,rowID,){
    return(
      <View key={rowID} style={styles.text}>
        <View style={styles.up}>
          <Text style={{fontSize:15,color:'#333333',textAlign:'left'}}>{rowData.name}</Text>
        </View>
        <View style={styles.down}>
          <View style={styles.online}>
            <Image style={{width:10,height:12,marginRight:10}} source={require('../../images/icon9.png')}></Image>
            <Text style={{fontSize:12,color:'#666666',textAlign:'left',}}>{rowData.phone}</Text>
          </View>
          <View style={styles.onlinee}>
            <View  style={{height:36,width:20}}>
              <Image style={{width:10,height:12,marginRight:10,marginTop:3}} source={require('../../images/icon10.png')}></Image>
            </View>
            <View  style={{height:36,width:width-50,backgroundColor: '#ffffff',}}>
              <Text numberOfLines={2} style={{fontSize:12,color:'#666666',textAlign:'left',lineHeight:18,}}>{rowData.address}</Text>
            </View>
          </View>
        </View>
      </View>
    )
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
  text: {
    height: 119,
    backgroundColor: '#ffffff',
    marginTop:10,
    paddingLeft:15,
    paddingRight:15,
    borderWidth:1,
    borderColor: '#ddd',
  },
  up: {
    height: 41,
    justifyContent: 'center',
    borderBottomWidth:1,
    borderBottomColor: '#ddd',
    borderStyle: 'solid',
  },
  down: {
    height: 78,
    justifyContent: 'center',
  },

  online: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom:5,
  },
  onlinee: {
    height: 36,
    alignItems: 'center',
    flexDirection: 'row',
  },

});

module.exports = ResponsibleArea
