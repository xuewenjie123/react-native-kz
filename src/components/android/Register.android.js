'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  TouchableNativeFeedback,
  Platform
} from 'react-native';

class Register extends Component {
  render() {
    return (
        <View style={styles.button}>
          <Text style={{margin: 10,color:'black',textAlign:'center'}}>注册</Text>
        </View>
    );
  }
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

module.exports = Register
