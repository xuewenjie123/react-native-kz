'use strict';
import React, { Component, } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ListView, RefreshControl, AsyncStorage,Linking } from 'react-native';
import NavigatorTopBar from './../../components/NavigatorTopBar';
import NaviBottomBar from './../../components/NaviBottomBar';
var { getList, } = require('../../service/mailList');
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
var _navigator,_this,_state;
class MailList extends Component {

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
      selectCondition: "",
      reset: false,
    }
  }
  componentDidMount(){
    _this.setState({onSearchLoad: true,reset: true});
    AsyncStorage.getItem("main",(error,text)=>{
      if(!error){
        var data = JSON.parse(text)
        _this.setState({userId: data.id,});
        getList({currentUserId:data.id,currentPage: 1,pageSize: 10,selectCondition:""},_this.updata);
      }else{
        console.log(error)
      }
    });
  }
  onSearch(){
    if(!_state.load){
      _this.setState({onSearchLoad: true,reset: true});
      getList({currentUserId:_state.userId,currentPage: 1,pageSize: 10,selectCondition:_state.selectCondition},_this.updata);
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
        _this.setState({
          dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(_state.getList.concat(result.data.records)),
          getList: _state.getList.concat(result.data.records),
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
  onEndReached(){
    if(_state.current*_state.size<_state.total && !_state.load){
      _this.setState({load: true,});
      getList({currentUserId:_state.userId,currentPage: _state.current+1,pageSize: _state.size,selectCondition:_state.selectCondition},_this.updata);
    }
  }
  openphone(str){
    if(str){
      var url = "tel:"+str;
      Linking.canOpenURL(url).then(supported => {
        if (!supported) {
          console.log('Can\'t handle url: ' + url);
        } else {
          return Linking.openURL(url);
        }
      }).catch(err => console.error('An error occurred', err));
    }
  }
  render() {
    _this = this;
    _state = _this.state;
    _navigator = _this.props.navigator;
    let NavigatorTopBarProps = {
      visible: true,
      title: "通讯录",
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
    let NaviBottomBarProps = {
      _navigator: _navigator,
    }
    return (
      <View style={{flex: 1}}>
        <NavigatorTopBar {...NavigatorTopBarProps}/>
        <View style={styles.main}>
          <View style={styles.input}>
            <View style={styles.select}>
              <TextInput underlineColorAndroid = "transparent" placeholder='搜索'
                value={_state.selectCondition} onChangeText={(text)=>{_this.setState({selectCondition:text})}}
                onBlur={()=>{_this.onSearch()}} onSubmitEditing={()=>{_this.onSearch()}}
                style={{color:'#666666',fontSize:15,textAlign:'center',padding:0,margin:0,}} />
            </View>
          </View>
          <TouchableOpacity style={styles.info} onPress={(e)=>{_this.openphone("01088189090")}}>
             <View style={styles.photo}>
               <Image style={{width:44,height:44,}} source={require('../../images/list1.png')}></Image>
             </View>
             <View style={{height:44,paddingTop:5,paddingBottom:5,}}>
               <Text style={{fontSize:15,color:'#333333',textAlign:'left',padding:0,margin:0,lineHeight:15}}>客服中心</Text>
               <Text style={{fontSize:12,color:'#2486f4',textAlign:'left',padding:0,marginTop:6,lineHeight:12}}>010-88189090</Text>
             </View>
          </TouchableOpacity>
          <View style={styles.list}>
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
        <NaviBottomBar {...NaviBottomBarProps}/>
      </View>
    );
  }
  _renderRow(rowData,sectionID,rowID,){
    return(
      <TouchableOpacity key={rowID} style={styles.listA} onPress={(e)=>{_this.openphone(rowData.phone)}}>
        <View style={styles.photo}>
          <Image style={{width:44,height:44,}} source={rowData.url?{uri:rowData.url}:require('../../images/listPhoto.png')}></Image>
        </View>
        <View style={{flex: 1,height:44,paddingTop:5,paddingBottom:5,}}>
          <View  style={styles.online}>
            <View>
              <Text style={{fontSize:15,color:'#333333',textAlign:'left',lineHeight:15}}>{rowData.name}</Text>
            </View>
            {!(!rowData.propertySpecial)?(
              <Text style={{fontSize:15,color:'#999999',textAlign:'left',lineHeight:15,marginRight:6,marginLeft:6}}>|</Text>
            ):null}
            {!(!rowData.propertySpecial)?(
              <View>
                  <Text style={{fontSize:13,color:'#999999',textAlign:'left',}}>{rowData.propertySpecial}</Text>
              </View>
            ):null}
            <View style={{flex: 1}}>
              <Text style={{fontSize:13,color:'#999999',textAlign:'right',marginRight:10,lineHeight:15}}>{rowData.orgName}</Text>
            </View>
          </View>
          <Text style={{fontSize:12,color:'#333333',textAlign:'left',marginTop:6,lineHeight:12}}>{rowData.phone}</Text>
        </View>
      </TouchableOpacity>
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
  info: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 64,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop:10,
    paddingLeft:15,
  },
  list: {
    flex: 1,
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
    flexDirection: 'row',
    padding:0,
    margin:0,
   },

});

module.exports = MailList
