'use strict';
import React, { Component, } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ListView, RefreshControl, AsyncStorage } from 'react-native';
var { getFinishWorkOrder, } = require('../../service/workOrder');
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
import color from './../../constant/color';
import { date2str } from './../../constant/constants';
var _navigator,_this,_state;

var imageList = {
  "70a1": require('../../images/70a1.png'),
  "70a2": require('../../images/70a2.png'),
  "70a3": require('../../images/70a3.png'),
  "36b1": require('../../images/36b1.png'),
  "36b2": require('../../images/36b2.png'),
  "48a2": require('../../images/48a2.png'),
  "48a3": require('../../images/48a3.png'),
}

class WorkOrderDoes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: undefined,
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows([]),
      getList: [],
      total: undefined,
      current: 1,
      size: 10,
      load: false,
      onSearchLoad: false,
      reset: false,
      projectId: undefined,
      dateTime: undefined,
    };
  }
  componentDidMount(){
    _this.setState({onSearchLoad: true,reset: true});
    AsyncStorage.getItem("main",(error,text)=>{
      if(!error){
        var data = JSON.parse(text)
        _this.setState({userId: data.id,});
        getFinishWorkOrder({currentUserId:data.id,currentPage: 1,pageSize: 10,projectId:_state.projectId,dateTime: _state.dateTime,},_this.updata);
      }else{
      }
    });
  }
  componentWillReceiveProps(newProps){
    if(newProps.projectId != _this.props.projectId){
      _this.setState({onSearchLoad: true,reset: true});
      getFinishWorkOrder({currentUserId:_state.userId,currentPage: 1,pageSize: 10,projectId:newProps.projectId,dateTime: _state.dateTime,},_this.updata);
    }
    if(newProps.dateTime != _this.props.dateTime){
      _this.setState({onSearchLoad: true,reset: true});
      getFinishWorkOrder({currentUserId:_state.userId,currentPage: 1,pageSize: 10,projectId:_state.projectId,dateTime: newProps.dateTime,},_this.updata);
    }
  }
  updata(result){
    if(result.success && result.data){
      if(_state.reset){
        _this.setState({
          dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(result.data.records),
          getList: result.data.records,
          total: result.data.total,
          current: result.data.current,
          onSearchLoad: false,
          load: false,
          reset: false,
        });
      }else{
        Array.prototype.splice.apply(_state.getList,[(result.data.current-1)*10,10,].concat(result.data.records))
        _this.setState({
          dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(_state.getList),
          getList: _state.getList,
          total: result.data.total,
          current: result.data.current,
          load: false,
        });
      }
    }else{
      _this.setState({
        dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows([]),
        getList: [],
        total: 0,
        current: 1,
        onSearchLoad: false,
        load: false,
        reset: false,
      });
    }
  }
  onSearch(){
    if(!_state.load){
      _this.setState({onSearchLoad: true,reset: true});
      getFinishWorkOrder({currentUserId:_state.userId,currentPage: 1,pageSize: 10,projectId:_state.projectId,dateTime: _state.dateTime,},_this.updata);
    }
  }
  onEndReached(){
    if(_state.current*_state.size<_state.total && !_state.load){
      _this.setState({load: true,});
      getFinishWorkOrder({currentUserId:_state.userId,currentPage: _state.current+1,pageSize: _state.size,projectId:_state.projectId,dateTime: _state.dateTime,},_this.updata);
    }
  }
  _onPushRouterDetail(d){
    _navigator.push({
      title:"",
      id:"RepairViewWorkDetail",
      params:{
        params:d,
      },
    });
  }
  render() {
    _this = this;
    _state = _this.state;
    _navigator = _this.props.navigator;
    return (
      <View style={{flex: 1,}}>
        <View style={styles.scrollbox}>
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
      </View>
    );
  }
  _renderRow(rowData,sectionID,rowID,){
    return(
      <View key={rowID} style={styles.databox1}>
        <View style={styles.databox2}>
          <View style={styles.databox3}>
            <TouchableOpacity onPress={()=>{_this._onPushRouterDetail(rowData)}}>
              <View style={[styles.dabox1,{height: 35}]}>
                {rowData.userType?(<View>
                  <Image style={styles.image} source={(rowData.userType==2)?imageList["70a3"]:(rowData.assignOrderType==2)?imageList["70a2"]:imageList["70a1"]}></Image>
                </View>):null}
                <View style={styles.dabox2}>
                  <View style={{justifyContent: 'center',paddingLeft: 10,flex:1,}}>
                    <Text style={styles.perdtit}>
                      {rowData.code}
                    </Text>
                  </View>
                  <View style={styles.dabox3}>
                    <Text style={styles.perdtit2}>
                      {rowData.create_time?date2str(new Date(rowData.create_time),"yyyy-MM-dd hh:mm"):null}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.dabox4}>
                <View style={[styles.dabox1,styles.dabox8]}>
                  <View style={{justifyContent: 'center',}}>
                    <Image style={styles.image2} source={rowData.locationType?imageList["36b1"]:imageList["36b2"]}></Image>
                  </View>
                  <View style={styles.dabox2}>
                    <View style={{justifyContent: 'center',flex:1,}}>
                      <Text style={styles.perdtit} numberOfLines={1}>
                        {rowData.addressName}
                      </Text>
                    </View>
                    <View style={[styles.dabox3,{paddingRight: 0}]}>
                      <Text style={styles.perdtit3}>
                        {rowData.currentStatusName}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.dabox5}>
                  {rowData.fPaths&&rowData.fPaths.length?<View style={styles.dabox6}>
                    <Image style={styles.image36} source={{uri: rowData.fPaths[0]}}></Image>
                  </View>:null}
                  <View style={styles.dabox7}>
                    <Text style={styles.perdtit4} numberOfLines={2}>
                      {rowData.description}
                    </Text>
                  </View>
                </View>
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
    backgroundColor: color.white2C,
    flexDirection: 'column',
  },
  contentContainer: {
  },
  scrollbox: {
    flex:1,
    padding: 10,
    flexDirection: 'column',
  },
  databox1: {
    marginBottom: 10,
    borderStyle: 'solid',
    borderColor: color.line2C,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 2,
  },
  databox2: {
    borderStyle: 'solid',
    borderColor: color.line4C,
    borderBottomWidth: 1,
  },
  databox3: {
    borderStyle: 'solid',
    borderColor: color.line5C,
    borderBottomWidth: 1,
    backgroundColor: color.white1C,
  },
  databox4: {
    marginBottom: 10,
    borderStyle: 'solid',
    borderColor: color.embe1C,
    borderWidth: 2,
    borderRadius: 2,
  },
  databoxon: {
    height: 64,
    width: width,
    borderStyle: 'solid',
    borderColor: color.line2C,
    borderBottomWidth: 1,
    paddingLeft: 15,
    paddingTop: 10,
    paddingRight: 15,
    paddingBottom: 10,
    flexDirection: 'row',
  },
  dabox1: {
    flexDirection: 'row',
  },
  dabox2: {
    flex: 1,
    flexDirection: 'row',
  },
  dabox3: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  dabox4: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 20,
  },
  dabox5: {
    flexDirection: 'row',
  },
  dabox8: {
    paddingTop: 2,
    borderColor: color.line1C,
    borderStyle: 'dashed',
    borderTopWidth: 4,
    height: 35,
  },
  shedbox: {
    marginTop: 10,
    borderStyle: 'dashed',
    borderColor: color.main1C,
    borderWidth: 1,
    backgroundColor: color.main4C,
    padding:10,
  },
  shedbox2: {
    flexDirection: 'row',
  },
  perdtit: {
    fontSize: 13,
    color: color.black2C,
  },
  perdtit2: {
    fontSize: 12,
    color: color.black4C,
  },
  perdtit3: {
    fontSize: 13,
    color: color.embe1C,
  },
  perdtit4: {
    fontSize: 12,
    color: color.black5C,
  },
  text: {
    fontSize: 12,
    color: color.black2C,
  },
  text2: {
    fontSize: 12,
    color: color.main1C,
  },
  image88: {
    width:44,
    height:44,
    marginRight: 10,
  },
  image: {
    width:35,
    height:35,
  },
  image2: {
    width:18,
    height:18,
    marginRight: 10,
  },
  image24: {
    height: 24,
    width: 24,
    opacity: 1,
  },
  image36: {
    width:36,
    height:36,
    marginRight: 10,
  },
  image362: {
    width:36,
    height:36,
    marginRight: 10,
    marginTop: 10,
  },
});

module.exports = WorkOrderDoes
