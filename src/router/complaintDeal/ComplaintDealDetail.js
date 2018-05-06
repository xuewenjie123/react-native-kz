'use strict';
import React, { Component, } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity, Picker, } from 'react-native';
import NavigatorTopBar from './../../components/NavigatorTopBar';
import ComplaintDealModal from './../../components/complaintDeal/ComplaintDealModal';
import color from './../../constant/color';
var { getCompleteDatile, } = require('../../service/complaintDeal');
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
var _navigator;

var imageList = {
  "36b3": require('../../images/36b3.png'),
  "36b4": require('../../images/36b4.png'),
  "54a1": require('../../images/54a1.png'),
  "zelse72a1": require('../../images/zelse72a1.png'),
  "zelse88a1": require('../../images/zelse88a1.png'),
  "zelse88a2": require('../../images/zelse88a2.png'),
  "zelse88a3": require('../../images/zelse88a3.png'),
  "zelse88a4": require('../../images/zelse88a4.png'),
  "zelse78a1": require('../../images/zelse78a1.png'),
  "zelse78a2": require('../../images/zelse78a2.png'),
}

var List = [
  { name: "张安萨", status: "提交", img: "zelse88a1", time: "2016-12-03 12:32", subop: "【管道-水龙头漏水】",
    imgList: ["zelse78a1","zelse78a2"], opration: "房顶漏水，墙皮脱落！水龙头坏了，滴水很严重，麻烦前处理水龙头坏了，滴水很严……", },
  { name: "客服001", status: "审核通过", img: "zelse88a2", time: "2016-12-03 12:32", subop: "",
    imgList: ["zelse78a1","zelse78a2"], opration: "房顶漏水，墙皮脱落！水龙头坏了，滴水很严重，麻烦前处理水龙头坏了，滴水很严……", },
  { name: "工程部", status: "抢单", img: "zelse88a3", time: "2016-12-03 12:32", subop: "",
    imgList: ["zelse78a1","zelse78a2"], opration: "房顶漏水，墙皮脱落！水龙头坏了，滴水很严重，麻烦前处理水龙头坏了，滴水很严……", },
  { name: "工人 张亚东", status: "抢单", img: "zelse88a4", time: "2016-12-03 12:32", subop: "",
    imgList: ["zelse78a1","zelse78a2"], opration: "房顶漏水，墙皮脱落！水龙头坏了，滴水很严重，麻烦前处理水龙头坏了，滴水很严……", },
]

class ComplaintDealDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      obj: {},
      modalVisible: false,
     };
  }
  componentDidMount(){
    function updata(response){
      if(response){
        _this.setState({obj: {}});
      }else{
      }
    }
    getCompleteDatile({},updata);
  }
  _onPushRouter(id,params){
    if(id){
      _navigator.push({
        id:id,
        params:params,
      });
    }
  }
  _getimglist(arr){
    var imglist = [];
    for(var t = 0; t < 2; t++){
      imglist.push(<Image key={t} style={styles.image39} source={imageList[arr[t]]}></Image>)
    }
    return imglist
  }
  render() {
    let _this = this;
    let state = this.state;
    _navigator = this.props.navigator;
    let NavigatorTopBarProps = {
      visible: true,
      title: "投诉",
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
          onPress={() => { _this.setState({modalVisible: true}) }}>
          <View style={{flex: 1, paddingRight: 10,flexDirection: 'row',justifyContent: 'flex-end', alignItems: 'center',}}>
            <Text style={{fontSize: 15, color: "#fff"}}>
              {"处理"}
            </Text>
          </View>
        </TouchableOpacity>
      ),
    }
    let ComplaintDealModalProps = {
      visible: state.modalVisible,
      onClose: function(){
        _this.setState({modalVisible: false});
      },
      onClick: function(id,params){
        _this._onPushRouter(id,params);
        _this.setState({modalVisible: false});
      },
    }
    return (
      <View style={{flex: 1,}}>
        <NavigatorTopBar {...NavigatorTopBarProps}/>
        <View style={styles.main}>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <View style={styles.scrollbox}>
              <View style={styles.scrollback}>
              </View>
              <View style={styles.topbox}>
                <View style={styles.line}>
                  <View style={styles.lineleft}>
                    <Text style={styles.text1}>
                      {"GD13742"}
                    </Text>
                  </View>
                  <View style={styles.lineright}>
                    <Text style={styles.text2}>
                      {"一般投诉"}
                    </Text>
                  </View>
                </View>
                <View style={styles.topbox2}>
                  <View style={styles.line}>
                    <View style={styles.lineleft}>
                      <Image style={styles.image18} source={imageList['36b3']}></Image>
                      <Text style={styles.text1}>
                        {"张安萨"}
                      </Text>
                      <Image style={styles.image27} source={imageList['54a1']}></Image>
                    </View>
                    <View style={styles.lineright}>
                      <Text style={styles.text2}>
                        {"13894188882"}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.line}>
                    <View style={[styles.lineleft,{alignItems: 'flex-start'}]}>
                      <Image style={styles.image18} source={imageList['36b4']}></Image>
                      <Text style={styles.text3}>
                        {"北京市 海淀区南三街阳光书覅奢华公寓8号楼2单元1901室 张安卓"}
                      </Text>
                    </View>
                    <View style={styles.lineright}>
                      <Text style={styles.text2}>
                        {""}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.topbox3}>
                    <View style={[styles.line,styles.topbox4,{height: 40}]}>
                      <View style={styles.lineleft}>
                        <Text style={styles.text5}>
                          {"投诉来源"}
                        </Text>
                      </View>
                      <View style={styles.lineright}>
                        <Text style={styles.text5}>
                          {"客服记录"}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.scrollback}>
              </View>
              <View style={styles.statusbox}>
                {List.map((d,index)=>{
                  var cont = (
                    <View key={index}>
                      <View style={styles.line}>
                        <View style={styles.lineleft}>
                          <Image style={styles.image44} source={imageList[d.img]}></Image>
                          <Text style={styles.text1}>
                            {d.name}
                          </Text>
                        </View>
                        <View style={styles.lineright}>
                          <Text style={styles.text6}>
                            {d.status}
                          </Text>
                        </View>
                      </View>
                      <View style={[styles.statusb1,(index==List.length-1)?styles.statusb:{}]}>
                        <View style={styles.statusb2}>
                          <View style={styles.statusb3}>
                            <Text style={styles.text4}>
                              {d.subop?<Text style={styles.text4}>
                                {d.subop}
                              </Text>:null}
                              {d.opration}
                            </Text>
                          </View>
                          <View style={styles.statusb4}>
                            {d.imgList?this._getimglist(d.imgList):null}
                          </View>
                          <View>
                            <Text style={styles.text4}>
                              {d.time}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  )
                  return cont
                })}
              </View>
            </View>
          </ScrollView>
        </View>
        <ComplaintDealModal {...ComplaintDealModalProps}/>
      </View>
    );
  }

};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: color.white1C,
    flexDirection: 'column',
  },
  contentContainer: {
  },
  float: {
    position: 'absolute',
    bottom: 15,
    right: 10,
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: color.embe1C,
    opacity: .9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollbox: {
    flexDirection: 'column',
  },
  scrollback: {
    height: 10,
    backgroundColor: color.white3C,
    borderBottomWidth: 1,
    borderColor: color.line1C,
    borderStyle: 'solid',
  },
  topbox: {
    backgroundColor: color.white1C,
    borderColor: color.line1C,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  topbox2: {
    borderColor: color.line1C,
    borderStyle: 'dashed',
    borderTopWidth: 1,
  },
  topbox3: {
    paddingLeft: 18,
    paddingTop: 10,
  },
  topbox4: {
    borderColor: color.line1C,
    borderStyle: 'solid',
    borderTopWidth: 1,
  },
  statusbox: {
    padding: 15,
  },
  statusb: {
    borderLeftWidth: 0,
  },
  statusb1: {
    marginLeft: 22,
    borderColor: color.line1C,
    borderStyle: 'solid',
    borderLeftWidth: 1,
    paddingLeft:20,
    paddingBottom: 10,
  },
  statusb2: {
    padding: 10,
    backgroundColor: color.white3C,
  },
  statusb3: {
    marginBottom: 15,
  },
  statusb4: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  line: {
    height: 40,
    flexDirection: 'row',
  },
  lineleft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lineright: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  image18: {
    height: 18,
    width: 18,
  },
  image24: {
    height: 24,
    width: 24,
    opacity: 1,
  },
  image27: {
    height: 27,
    width: 27,
    marginLeft: 10,
  },
  image39: {
    height: 39,
    width: 39,
    marginRight: 10,
    marginBottom: 10,
  },
  image44: {
    height: 44,
    width: 44,
    marginRight: 10,
  },
  text1: {
    fontSize: 15,
    color: color.black2C,
  },
  text2: {
    fontSize: 15,
    color: color.black5C,
  },
  text3: {
    fontSize: 13,
    color: color.black2C,
  },
  text4: {
    fontSize: 13,
    color: color.black5C,
  },
  text5: {
    fontSize: 15,
    color: color.black4C,
  },
  text6: {
    fontSize: 12,
    color: color.black5C,
  },
  text7: {
    fontSize: 12,
    color: color.black5C,
  },
});

module.exports = ComplaintDealDetail
