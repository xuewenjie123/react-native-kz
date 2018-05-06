'use strict';
import React, { Component, } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ListView, RefreshControl, AsyncStorage } from 'react-native';
import NavigatorTopBar from './../../components/NavigatorTopBar2';
import color from './../../constant/color';
var { getActivityInformation } = require('../../service/message');
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
import { date2str } from './../../constant/constants';
var _navigator,_this,_state;


class Notice extends Component {

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
        getActivityInformation({currentUserId:data.id,currentPage: 1,pageSize: 10,},_this.updata);
      }
    });
  }
  onSearch(){
    if(!_state.load){
      _this.setState({onSearchLoad: true,reset: true});
      getActivityInformation({currentUserId:_state.userId,currentPage: 1,pageSize: 10,},_this.updata);
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
      getActivityInformation({currentUserId:_state.userId,currentPage: _state.current+1,pageSize: _state.size,},_this.updata);
    }
  }
  maxfont(str,da){
    if(str){
      str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
      str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
      str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
      str = str.replace(/ /ig,'');//去掉
      if(str.length>da){
        return str.slice(0,da)+"。。。"
      }
      return str
    }else{
      return "";
    }
  }
  goDetail(params){
    _navigator.push({
      title:"",
      id:"NoticeDetail",
      params:{
        params: params,
      },
    });
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
    var rowD = eval("("+rowData.push_info+")")
    return(
      <View key={rowID} style={styles.last}>
        <View style={styles.time}>
          <Text style={{fontSize:9,color:'#ffffff',}}>
            {rowD.createTime?date2str(new Date(rowD.createTime),"yyyy年MM月dd日"):null}
          </Text>
        </View>
        <View style={styles.borderss}>
          <View style={styles.borders}>
            <TouchableOpacity style={styles.text} underlayColor='transparent'
              onPress={() => {_this.goDetail(rowD)}}>
              <View style={styles.info}>
                <View style={styles.online}>
                  <Text numberOfLines={1} style={{fontSize:15,color:'#333333',textAlign:'left',lineHeight:15,padding:0,margin:0}}>
                    {rowD.title}
                  </Text>
                </View>
                <Text numberOfLines={2} style={{fontSize:12,color:'#666666',lineHeight:18,padding:0,margin:0}}>
                  {_this.maxfont(rowD.content,40)}
                </Text>
              </View>
              <View style={styles.line}></View>
              <View style={styles.come}>
                <Text style={{fontSize:12,color:'#999999'}}>
                  {rowD.orgName}
                </Text>
              </View>
            </TouchableOpacity>
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

module.exports = Notice
