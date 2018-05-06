'use strict';

import React, {
  AppRegistry,
  Navigator,
  BackAndroid,
  Component,
  View
} from 'react-native';

import JPush , {JpushEventReceiveMessage, JpushEventOpenMessage} from 'react-native-jpush'

var Login = require('./Login.android');
var Register = require('./Register.android');

var _navigator;

BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator.getCurrentRoutes().length === 1  ) {
     return false;
  }
  _navigator.pop();
  return true;
});

class Routers extends Component {

  componentDidMount() {
    JPush.requestPermissions()
    JPush.setAlias('wanglei');
    this.pushlisteners = [
        JPush.addEventListener(JpushEventReceiveMessage, this.onReceiveMessage.bind(this)),
        JPush.addEventListener(JpushEventOpenMessage, this.onOpenMessage.bind(this)),
    ]
  }
  componentWillUnmount() {
      this.pushlisteners.forEach(listener=> {
          JPush.removeEventListener(listener);
      });
  }
  onReceiveMessage(message) {
    alert(message);
  }
  onOpenMessage(message) {
    alert(message);
  }

  renderScene(route, navigator) {
    _navigator = navigator;
    if (route.id === 'Login') {
      return (
        <View style={{flex: 1}}>
          <Login navigator={navigator} route={route} />
        </View>
      );
    }
    if (route.id === 'Register') {
      return (
        <View style={{flex: 1}}>
          <Register navigator={navigator} route={route} />
        </View>
      );
    }
  }
  render() {
    return (
      <Navigator
        initialRoute = {{id: 'Login'}}
        configureScene={() => Navigator.SceneConfigs.FadeAndroid}
        renderScene={this.renderScene}
      />
    );
  }
}

module.exports = Routers
