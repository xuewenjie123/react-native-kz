'use strict';
import React, { Component, } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity, Picker, } from 'react-native';
var { get, } = require('../../service/login');
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
import NavigatorTopBar from './../../components/NavigatorTopBar';
import NaviBottomBar from './../../components/NaviBottomBar';
import color from './../../constant/color';
var _navigator;

var imageList = {
  "66a1": require('../../images/66a1.png'),
  "66a2": require('../../images/66a2.png'),
  "66a3": require('../../images/66a3.png'),
  "66a4": require('../../images/66a4.png'),
  "66a5": require('../../images/66a5.png'),
}

var tabs = [
  {key: 0, },
  {key: 1, },
  {key: 2, },
  {key: 3, },
  {key: 4, },
]

class Repair extends Component {
  constructor(props) {
    super(props);
    this.state = { place: false };
  }
  render() {
    _navigator = this.props.navigator;
    let NavigatorTopBarProps = {
      visible: true,
      title: "报修",
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
            <Image style={{width: 23, height: 23,}} source={require('../../images/46a6.png')}></Image>
          </View>
        </TouchableOpacity>
      ),
    }
    return (
      <View style={{flex: 1}}>
        <NavigatorTopBar {...NavigatorTopBarProps}/>
        <View style={styles.main}>
          <View style={styles.tab}>
            <View style={styles.tab2}>
              <View style={styles.tab3}>
                <View style={styles.tab4}>
                  <ScrollView horizontal contentContainerStyle={styles.tabContainer}>
                    {tabs.map( (d,index) => (
                      <View key={index} style={styles.tabCont}>
                        <Text style={styles.tabtext}>
                          {"事项 "+index}
                        </Text>
                        {tabs.length?(
                          <Image style={styles.image} source={require('../../images/36a1.png')}></Image>
                        ):""}
                      </View>
                    ))}
                  </ScrollView>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.cont}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
              <View style={[styles.contPadBoth,{borderTopWidth: 0,}]}>
                <View style={styles.contlinebot}>
                  <View style={styles.contlileft}>
                    <Image style={styles.image2} source={require('../../images/36a4.png')}></Image>
                    <Text style={styles.contit}>
                      {"地点类型"}
                    </Text>
                  </View>
                  <View style={[styles.contliright,{flex: 1}]}>
                    {this.state.place?(
                      <Text style={styles.context}>
                        {"请选择"}
                      </Text>
                    ):(
                      <Text style={styles.contextP}>
                        {"请选择"}
                      </Text>
                    )}
                    <Image style={styles.image3} source={require('../../images/36a9.png')}></Image>
                  </View>
                </View>
                <View style={styles.contlinebot}>
                  <View style={styles.contlileft}>
                    <Image style={styles.image2} source={require('../../images/36a2.png')}></Image>
                    <Text style={styles.contit}>
                      {"地点"}
                    </Text>
                  </View>
                  <View style={[styles.contliright,{flex: 1}]}>
                    {this.state.place?(
                      <Text style={styles.context}>
                        {"请选择"}
                      </Text>
                    ):(
                      <Text style={styles.contextP}>
                        {"请选择"}
                      </Text>
                    )}
                    <Image style={styles.image3} source={require('../../images/36a9.png')}></Image>
                  </View>
                </View>
                <View style={styles.contlineheight}>
                  <View style={styles.contlileft}>
                    <Image style={styles.image2} source={require('../../images/36a3.png')}></Image>
                  </View>
                  <Text style={[styles.contlirighttext,{width: width-44}]} numberOfLines={5}>
                    <Text style={[styles.context,{color: color.main1C}]}>
                      {"[常用地点] "}
                    </Text>
                    <Text style={styles.context}>
                      {"北京市北京市海淀区风景小区5号楼1-102北京市北京市海淀区风景小区5号楼1-102"}
                    </Text>
                  </Text>
                </View>
                <View style={styles.contline}>
                  <View style={styles.contlileft}>
                    <Image style={styles.image2} source={require('../../images/36a5.png')}></Image>
                    <Text style={styles.contit}>
                      {"问题描述"}
                    </Text>
                  </View>
                  <View style={[styles.contliright,{flex: 1}]}>
                  </View>
                </View>
                <View style={styles.contlineall}>
                  <TextInput maxLength={200} placeholder={'请描述您的问题'} multiline={true} numberOfLines={10} underlineColorAndroid={"transparent"}
                    style={{padding: 0,height:16,width: width-42,alignItems: 'flex-start',}}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                  />
                </View>
                <View style={styles.imagesBox}>
                  <View style={styles.imagesitemadd}>
                    <Text style={styles.imagesitemaddtext}>
                      {"+"}
                    </Text>
                  </View>
                </View>
                <View style={styles.imagestit}>
                  <Text style={styles.imagestitext}>
                    {"温馨提示：请上传您的问题快照，图片大小不得超过2M"}
                  </Text>
                </View>
              </View>
              {/*<View style={styles.pertitbox}>
                <Text style={styles.pertit}>
                  {"个人信息"}
                </Text>
              </View>
              <View style={styles.contPadBoth}>
                <View style={styles.contlinebot}>
                  <View style={styles.contlileft}>
                    <Image style={styles.image2} source={require('../../images/36a4.png')}></Image>
                    <Text style={styles.contit}>
                      {"姓名"}
                    </Text>
                  </View>
                  <View style={[styles.contliright,{flex: 1}]}>
                    {this.state.place?(
                      <Text style={styles.context}>
                        {"请选择"}
                      </Text>
                    ):(
                      <Text style={styles.contextP}>
                        {"请选择"}
                      </Text>
                    )}
                    <Image style={styles.image3} source={require('../../images/36a9.png')}></Image>
                  </View>
                </View>
                <View style={styles.contlinebot}>
                  <View style={styles.contlileft}>
                    <Image style={styles.image2} source={require('../../images/36a2.png')}></Image>
                    <Text style={styles.contit}>
                      {"性别"}
                    </Text>
                  </View>
                  <View style={[styles.contliright,{flex: 1}]}>
                    {this.state.place?(
                      <Text style={styles.context}>
                        {"请选择"}
                      </Text>
                    ):(
                      <Text style={styles.contextP}>
                        {"请选择"}
                      </Text>
                    )}
                    <Image style={styles.image3} source={require('../../images/36a9.png')}></Image>
                  </View>
                </View>
                <View style={styles.contline}>
                  <View style={styles.contlileft}>
                    <Image style={styles.image2} source={require('../../images/36a2.png')}></Image>
                    <Text style={styles.contit}>
                      {"联系方式"}
                    </Text>
                  </View>
                  <View style={[styles.contliright,{flex: 1}]}>
                    {this.state.place?(
                      <Text style={styles.context}>
                        {"请选择"}
                      </Text>
                    ):(
                      <Text style={styles.contextP}>
                        {"请选择"}
                      </Text>
                    )}
                    <Image style={styles.image3} source={require('../../images/36a9.png')}></Image>
                  </View>
                </View>
              </View>*/}
              <View style={styles.buttonB}>
                <View style={styles.buttonBtn}>
                  <Text style={styles.buttonBtntext}>
                    {"提交"}
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
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
  tab: {
    width: width,
    height: 48,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: color.white3C,
  },
  tab2: {
    flex: 1,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: color.line2C,
  },
  tab3: {
    flex: 1,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: color.line1C,
  },
  tab4: {
    width: width,
    height: 65,
  },
  tabContainer: {
    paddingLeft: 15,
    paddingRight: 5,
    paddingTop: 10,
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  tabCont: {
    width: 97,
    height: 26,
    marginRight: 10,
    borderColor: color.line1C,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 14,
    flexDirection: 'row',
  },
  tabtext: {
    fontSize: 15,
    color: color.black2C,
  },
  image: {
    marginLeft: 10,
    width: 18,
    height: 18,
  },
  image2: {
    marginRight: 6,
    width: 18,
    height: 18,
  },
  image3: {
    marginLeft: 6,
    width: 18,
    height: 18,
  },
  cont: {
    flex: 1,
  },
  contentContainer: {

  },
  contPadBoth: {
    paddingLeft: 10,
    paddingRight: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: color.line1C,
    borderStyle: 'solid',
  },
  contline: {
    flexDirection: 'row',
    height: 45,
  },
  contlinebot: {
    height: 45,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: color.line1C,
    borderStyle: 'solid',
  },
  contlineall: {
    height: 85,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: color.line1C,
    borderStyle: 'solid',
    borderRadius: 4,
    padding: 10,
  },
  contlineheight: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: color.line1C,
    borderStyle: 'solid',
  },
  contlileft: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contliright: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  contlirighttext: {
    flexWrap: 'wrap',
  },
  contit: {
    fontSize: 15,
    color: color.black2C,
  },
  context: {
    fontSize: 13,
    color: color.black4C,
  },
  contextP: {
    fontSize: 13,
    color: color.black5C,
  },
  imagesBox: {
    marginTop: 20,
    flexDirection: 'row',
  },
  imagesitemadd: {
    width: 90,
    height: 90,
    borderStyle: 'dotted',
    borderWidth: 1,
    borderColor: color.line2C,
    marginBottom: 10,
  },
  imagesitemaddtext: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 60,
    color: color.line1C,
  },
  imagestit: {
    marginBottom: 10,
  },
  imagestitext: {
    fontSize: 13,
    color: color.main1C,
  },
  pertitbox: {
    backgroundColor: color.white3C,
    height: 25,
    paddingLeft: 15,
    justifyContent: 'center',
  },
  pertit: {
    fontSize: 12,
    color: color.black5C,
  },
  buttonB: {
    marginTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 20,
  },
  buttonBtn: {
    height: 44,
    borderRadius: 4,
    backgroundColor: color.main1C,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonBtntext: {
    height: 16,
    color: color.white1C,
  },
});

module.exports = Repair
