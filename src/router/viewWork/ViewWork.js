'use strict';
import React, { Component, } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity, Picker, AsyncStorage } from 'react-native';
var { getProjectUser, } = require('../../service/viewWork');
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
import NavigatorTopBar from './../../components/NavigatorTopBar';
import NaviBottomBar from './../../components/NaviBottomBar';
import color from './../../constant/color';
var _navigator,_this,_state;

var imageList = {
  "80a1": require('../../images/80a1.png'),
  "80a2": require('../../images/80a2.png'),
  "80a3": require('../../images/80a3.png'),
  "80a4": require('../../images/80a4.png'),
}

var menu = [
  { title: "报修", image: "80a1", handlefunc: "_onPushRouter", routerId: "ViewWorkListRepair", },
  { title: "问询", image: "80a2", handlefunc: "", routerId: "ViewWorkListInquiries", },
  { title: "投诉", image: "80a3", handlefunc: "", routerId: "ViewWorkListComplaint", },
  { title: "建议", image: "80a4", handlefunc: "", routerId: "ViewWorkListSugesstion", },
]

class ViewWork extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personList: [],
      searchList: [],
    };
  }
  componentDidMount(){
    AsyncStorage.getItem("main",(error,text)=>{
      if(!error){
        var data = JSON.parse(text)
        _this.setState({userId:data.id});
        getProjectUser(data.id+"",_this.getResult);
      }
    });
  }
  getResult(result){
    if(result.success && result.data){
      if(result.data){
        _this.setState({
          personList:result.data,
          searchList:result.data,
        });
      }
    }
  }
  onSearch(){
    var arr = [],str = _state.selectCondition;
    _state.personList.map(d=>{
      if(d.name.indexOf(str)>-1 || d.jobName.indexOf(str)>-1 || d.orgName.indexOf(str)>-1)
      arr.push(d)
    })
    _this.setState({
      searchList:arr,
    });
  }
  _onPushRouter(id,params){
    if(id){
      _navigator.push({
        title:id,
        id:id,
        params:params,
      });
    }
  }
  render() {
    _this = this;
    _state = _this.state;
    _navigator = _this.props.navigator;
    let NavigatorTopBarProps = {
      visible: true,
      title: "查看工作",
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
      order: "none",
      _navigator: _navigator,
    }
    return (
      <View style={{flex: 1}}>
        <NavigatorTopBar {...NavigatorTopBarProps}/>
        <View style={styles.main}>
          <View style={styles.titbox}>
            <Text style={styles.titext}>
              {"按事项"}
            </Text>
          </View>
          <View style={styles.info}>
            {menu.map((d,index)=>(
              <View style={styles.infobox} key={index}>
                <TouchableOpacity style={{justifyContent: 'center',}}
                  underlayColor='transparent'
                  onPress={() => {this[d.handlefunc]?this[d.handlefunc](d.routerId,{}):undefined}}>
                  <View style={styles.infoinbox}>
                    <Image style={styles.image66} source={imageList[d.image]}></Image>
                    <Text style={styles.text}>
                      {d.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <View style={styles.titbox}>
            <Text style={styles.titext}>
              {"按人员"}
            </Text>
          </View>
          <View style={styles.searchbox}>
            <View style={styles.searchback}>
              <TextInput style={styles.search} underlineColorAndroid="transparent" placeholder='搜索' value={_state.selectCondition}
                onChangeText={(text)=>{_this.setState({selectCondition:text})}}
                onBlur={()=>{_this.onSearch()}} onSubmitEditing={()=>{_this.onSearch()}}
              />
            </View>
          </View>
          <View style={styles.contentContainer}>
            <ScrollView>
              {this.state.searchList.map((d,index)=>(
                <TouchableOpacity key={index}
                  underlayColor='transparent'
                  onPress={() => {this._onPushRouter("ViewWorkListMan",d)}}>
                  <View style={styles.perbox}>
                    <Image style={styles.image88} source={d.url?{uri:d.url}:require('../../images/88a1.png')}></Image>
                    <View style={styles.perdatebox}>
                      <View style={styles.perdatetop}>
                        <View style={styles.perdtopleft}>
                          <Text style={styles.perdtit}>
                            {d.name}
                            {d.jobName?<Text style={styles.perdtit4}>
                              {" | "+d.jobName}
                            </Text>:""}
                          </Text>
                        </View>
                        <View style={styles.perdtopright}>
                          <Text style={styles.perdtit2}>
                            {d.orgName}
                          </Text>
                        </View>
                      </View>
                      <Text style={styles.perdtit3}>
                        {d.phone?d.phone:""}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
        <NaviBottomBar {...NaviBottomBarProps}/>
      </View>
    );
  }

};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: color.white2C,
    flexDirection: 'column',
  },
  titbox: {
    width: width,
    height: 24,
    paddingLeft: 15,
    justifyContent: 'center',
  },
  titext: {
    fontSize: 12,
    color: color.black4C,
  },
  info: {
    marginRight: -1,
    width:width+1,
    borderTopWidth: 1,
    borderColor: color.line2C,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  infobox: {
    width:width/4,
    height:width/4,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: color.white1C,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: color.line2C,
  },
  infoinbox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image66: {
    width:40,
    height:40,
    marginBottom: 6,
  },
  text: {
    fontSize: 12,
    color: color.black4C,
  },
  searchbox: {
    height: 44,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: color.white1C,
    borderColor: color.line2C,
    borderStyle: 'solid',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  searchback: {
    flex: 1,
    height:28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.white2C,
    borderRadius: 14,
  },
  search: {
    height:28,
    width: width-60,
    fontSize: 12,
    padding: 0,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: color.white1C,
  },
  perbox: {
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
  perdatebox: {
    flex: 1,
    flexDirection: 'column',
  },
  perdatetop: {
    height: 22,
    marginBottom: 4,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  perdtopleft: {
    flex: 1,
    justifyContent: 'center'
  },
  perdtit: {
    fontSize: 15,
    color: color.black2C,
  },
  perdtit2: {
    fontSize: 12,
    color: color.black4C,
  },
  perdtit3: {
    fontSize: 13,
    color: color.black5C,
  },
  perdtit4: {
    fontSize: 12,
    color: color.black5C,
  },
  image88: {
    width:44,
    height:44,
    marginRight: 10,
  },
});

module.exports = ViewWork
