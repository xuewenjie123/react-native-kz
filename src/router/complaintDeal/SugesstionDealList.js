'use strict';
import React, { Component, } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity, Picker, } from 'react-native';
var { getSugesstionList, } = require('../../service/complaintDeal');
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
import NavigatorTopBar from './../../components/NavigatorTopBar2';
import NaviSubBar from './../../components/NaviSubBar';
import color from './../../constant/color';
var _navigator;

var imageList = {
  "70a1": require('../../images/70a1.png'),
  "70a2": require('../../images/70a2.png'),
  "70a3": require('../../images/70a3.png'),
  "36b1": require('../../images/36b1.png'),
  "36b2": require('../../images/36b2.png'),
  "48a2": require('../../images/48a2.png'),
  "48a3": require('../../images/48a3.png'),
  "zelse72a1": require('../../images/zelse72a1.png'),
}

var List = [
  { code: "JY1787893742", name: "管辖", image: "70a1", image2: "36b1", phone: "1192293921", post: "", time: "2016-12-03 12:32", adress: "幸福家园小区 2号楼-1单元-1201室", status: "处理中",
    imgList: ["zelse72a1","zelse72a1"], opration: "[管道-水管破裂]房顶漏水，墙皮脱落！", },
  { code: "JY1787893742", name: "管辖", image: "70a2", image2: "36b2", phone: "1192293921", post: "", time: "2016-12-03 12:32", adress: "科筑物业", status: "处理中",
    opration: "[管道-水管破裂]房顶漏水，墙皮脱落！水龙头坏了，滴水很严重，麻烦房顶漏水，墙皮脱落！水龙头坏了，滴水很严重，麻烦……", },
  { code: "JY1787893742", name: "管辖", image: "70a3", image2: "36b1", phone: "1192293921", post: "", time: "2016-12-03 12:32", adress: "幸福家园小区 2号楼-1单元-1201室", status: "处理中",
    opration: "[管道-水管破裂]房顶漏水，墙皮脱落！", },
  { code: "JY1787893742", name: "管辖", image: "70a3", image2: "36b1", phone: "1192293921", post: "", time: "2016-12-03 12:32", adress: "幸福家园小区 2号楼-1单元-1201室", status: "处理中",
    opration: "[管道-水管破裂]房顶漏水，墙皮脱落！", },
  { code: "JY1787893742", name: "管辖", image: "70a3", image2: "36b1", phone: "1192293921", post: "", time: "2016-12-03 12:32", adress: "幸福家园小区 2号楼-1单元-1201室", status: "处理中",
    opration: "[管道-水管破裂]房顶漏水，墙皮脱落！", },
]

var floatList = [
  {type: 'time'},
  {type: 'object'},
]

class SugesstionDealList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      List: [],
    };
  }
  componentDidMount(){
    function updata(response){
      if(response){
        _this.setState({List: []});
      }else{
      }
    }
    getSugesstionList({},updata);
  }
  _getimglist(arr){
    var imglist = [];
    for(var t = 0; t < 1; t++){
      imglist.push(<Image key={t} style={styles.image36} source={imageList[arr[t]]}></Image>)
    }
    return imglist
  }
  _onPushRouter(id,params){
    console.log(_navigator.getCurrentRoutes())
    //if(id){
      _navigator.push({
        title:"id",
        id:id,
        params:params,
      });
    //}
  }
  render() {
    _navigator = this.props.navigator;
    let NavigatorTopBarProps = {
      visible: true,
      title: "建议",
      leftView: (
        <TouchableOpacity style={{flex: 1}}
          underlayColor='transparent'
          onPress={() => {_navigator.pop()}}>
          <View style={{flex: 1, paddingLeft: 10,flexDirection: 'row',alignItems: 'center',}}>
            <Image style={{width: 23, height: 23,}} source={require('../../images/46a2.png')}></Image>
          </View>
        </TouchableOpacity>
      ),
      centerView: (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
          <View style={{ borderWidth:1,borderStyle: 'solid', height: 32, width: 150,
            borderColor: "#fff", borderRadius: 8, flexDirection: 'row',}}>
            <TouchableOpacity  style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}
              onPress={() => {this._onPushRouter("ComplaintDealList")}}>
              <Text style={{ fontSize: 16, color: "#fff"}}>
                {"投诉"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity  style={{flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor: "#fff"}}
              onPress={() => {}}>
              <Text style={{ fontSize: 16, color: color.main1C}}>
                {"建议"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ),
      navigator: _navigator,
    }
    let NaviSubBarProps = {
      order: "1st",
      leftAction: function (){
      },
      centerAction: function (){
      },
      rightAction: function (){
      },
    }
    return (
      <View style={{flex: 1,}}>
        <NavigatorTopBar {...NavigatorTopBarProps}/>
        <View style={styles.main}>
          <NaviSubBar {...NaviSubBarProps} />
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <View style={styles.scrollbox}>
              {List.map((d,index)=>{
                var cont = (
                  <TouchableOpacity onPress={()=>{this._onPushRouter("SugesstionDealDetail")}}>
                    <View style={[styles.dabox1,{height: 35}]}>
                      <View>
                      </View>
                      <View style={styles.dabox2}>
                        <View style={{justifyContent: 'center', paddingLeft: 10,}}>
                          <Text style={styles.perdtit}>
                            {d.code}
                          </Text>
                        </View>
                        <View style={styles.dabox3}>
                          <Text style={styles.perdtit2}>
                            {d.time}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.dabox4}>
                      <View style={[styles.dabox1,styles.dabox8]}>
                        <View style={styles.dabox2}>
                          <View style={{justifyContent: 'center',}}>
                            <Text style={styles.perdtit}>
                              {d.name}
                              {d.phone?<Text style={styles.perdtit5}>
                                {" | "+d.phone}
                              </Text>:""}
                            </Text>
                          </View>
                          <View style={[styles.dabox3,{paddingRight: 0}]}>
                            <Text style={styles.perdtit3}>
                              {d.status}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View style={styles.dabox5}>
                        <View style={styles.dabox6}>
                          {d.imgList?this._getimglist(d.imgList):null}
                        </View>
                        <View style={styles.dabox7}>
                          <Text style={styles.perdtit4} numberOfLines={2}>
                            {d.opration}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
                return (
                  <View style={styles.databox1} key={index}>
                    <View style={styles.databox2}>
                      <View style={styles.databox3}>
                        {cont}
                      </View>
                    </View>
                  </View>
                )
              })}
            </View>
          </ScrollView>
        </View>
        <View style={styles.floatbox}>
          {floatList.map((d,index)=>{
            return d.type=="time"?(
              <View key={index} style={[styles.float,{backgroundColor:color.main1C}]}>
                <Image style={styles.image24} source={imageList['48a2']}></Image>
              </View>
            ):(
              <View key={index} style={[styles.float,{backgroundColor:color.black2C}]}>
                <Image style={styles.image24} source={imageList['48a3']}></Image>
              </View>
            )
          })}
        </View>
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
  contentContainer: {
  },
  floatbox: {
    position: 'absolute',
    bottom: 15,
    right: 10,
    width: 50,
    justifyContent: 'flex-end',
  },
  float: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginTop: 10,
    backgroundColor: color.embe1C,
    opacity: .9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollbox: {
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
    flex: 1,
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
    borderTopWidth: 1,
    height: 35,
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
  perdtit5: {
    fontSize: 13,
    color: color.black5C,
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
});

module.exports = SugesstionDealList
