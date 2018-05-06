'use strict';
import React, { Component, } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ListView, RefreshControl, AsyncStorage } from 'react-native';
import color from './../../constant/color';
var { getAppInfoPushRecord } = require('../../service/message');
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
var _navigator,_this,_state;


class Message extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows([]),
      getList: [],
      total: undefined,
      current: 1,
      size: 10,
      load: true,
      onSearchLoad: true,
      reset: true,
    }
  }
  componentDidMount(){
    AsyncStorage.getItem("main",(error,text)=>{
      if(!error){
        var data = JSON.parse(text);
        _this.setState({userId: data.id});
        getAppInfoPushRecord({currentUserId:data.id,currentPage: 1,pageSize: 10,},_this.updata);
      }
    });
  }
  onSearch(){
    if(!_state.load){
      _this.setState({onSearchLoad: true,reset: true});
      getAppInfoPushRecord({currentUserId:_state.userId,currentPage: 1,pageSize: 10,},_this.updata);
    }
  }
  updata(result){
    if(result){
      if(_state.reset){
        _this.setState({
          dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(result.data.records),
          getList: result.data.records,
          total: 25,
          current: 1,
          onSearchLoad: false,
          load: false,
          reset: false,
        });
      }else{
        Array.prototype.splice.apply(_state.getList,[(result.data.current-1)*10,10,].concat(result.data.records))
        _this.setState({
          dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(_state.getList),
          getList: _state.getList,
          total: 25,
          current: _state.current+1,
          onSearchLoad: false,
          load: false,
          reset: false,
        });
      }
    }
  }
  onEndReached(){
    if(_state.current*_state.size<_state.total && !_state.load){
      _this.setState({load: true,});
      getAppInfoPushRecord({currentUserId:_state.userId,currentPage: _state.current+1,pageSize: _state.size,},_this.updata);
    }
  }
  render() {
    _this = this;
    _state = _this.state;
    _navigator = _this.props.navigator;
    return (
      <View style={{flex: 1}}>
        <ListView
          pageSize={_state.size}
          dataSource={_state.dataSource}
          renderRow={_this._renderRow}
          initialListSize={_state.size}
          scrollRenderAheadDistance={200}
          onEndReached={_this.onEndReached}
          onEndReachedThreshold={100}
          enableEmptySections={true}
          renderFooter={()=>(<View style={{padding:15,justifyContent: 'center',alignItems: 'center',}}>
            <Text style={{fontSize:12,color:'#999',textAlign:'center',}}>
              {_state.load? '努力加载中。。。' : '下面没有咯 ◠‿◠'}
            </Text>
          </View>)}
          refreshControl={
            <RefreshControl
              refreshing={_state.onSearchLoad}
              onRefresh={_this.onSearch}
            />
          }
        />
      </View>
    );
  }
  _renderRow(rowData,sectionID,rowID,){
    return(
      <View key={rowID} style={styles.last}>
        <View style={styles.time}>
          <Text style={{fontSize:9,color:'#ffffff',}}>{"2016年12月01日"}</Text>
        </View>
        <View style={styles.borderss}>
          <View style={styles.borders}>
            <View style={styles.text}>
              <View style={styles.info}>
                <View style={styles.online}>
                  <Text style={{fontSize:15,color:'#2486f4'}}>{"收到派单"}</Text>
                  <Text style={{fontSize:12,color:'#666666'}}>{"工程部-卢女士"}</Text>
                </View>
                <Text numberOfLines={2} style={{fontSize:12,color:'#666666',lineHeight:18,padding:0,margin:0,}}>
                  {"本周末家里暖气有损坏或者没有温度，请拨打维修团队打电话：13756727282，团队周一将离开！周末家里暖气有损坏或者周末家里暖气有损坏或者周末家里暖气有损坏或者"}
                </Text>
              </View>
              <View style={styles.line}></View>
              <View style={styles.come}>
                <Text style={{fontSize:12,color:'#999999'}}>
                  {"暖气服务中心"}
                </Text>
              </View>
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
    backgroundColor: '#f5f5f5',
  },
  title: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2486f4',
  },
  middle: {
    flexDirection: 'row',
    width: 150,
    height: 30,
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius : 8,
  },
  left: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
    height: 30,
  },
  right: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
    height: 30,
    backgroundColor: 'white',
    borderTopRightRadius : 8,
    borderBottomRightRadius : 8,
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
    paddingBottom:10,
  },
  online: {
    height: 30,
    marginTop:6,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
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

module.exports = Message
