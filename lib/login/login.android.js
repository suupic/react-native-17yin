'use strict';
import React from 'react-native';
var {
  Text,
  Component,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  PropTypes,
  StyleSheet,
  Alert
} = React;

import Base64 from 'base-64';

export default class Login extends Component {
  static propTypes = {
    loginSuccess: React.PropTypes.func.isRequired,
    loginFailed: React.PropTypes.func.isRequired
  };

  state = {
    mobile: '13331279132',
    password: '111111',
    processing: false
  };
  render () {
    let _renderBotton = function () {
      if (this.state.processig) {
        return (
          <TouchableHighlight style={[styles.button, styles.disabledButton]} underlayColor='#42e47e'>
            <Text style={styles.buttonText}>处理中...</Text>
          </TouchableHighlight>
        )
      } else {
        return (
          <TouchableHighlight style={[styles.button, styles.submitButton]} onPress={this.submit.bind(this)} underlayColor='#42e47e'>
            <Text style={styles.buttonText}>登录</Text>
          </TouchableHighlight>
        )
      }
    };

    return (
      <View style={styles.container}>
        <Image source={require('../img/logo.png')}/>
        <TextInput style={styles.textInput}
          onChangeText={(text) => this.setState({mobile: text})}
          value={this.state.mobile}
          placeholder="请输入手机号码"
          placeholderTextColor="#ccc"
        ></TextInput>

        <TextInput style={styles.textInput}
          onChangeText={(text) => this.setState({password: text})}
          placeholder="请输入密码"
          placeholderTextColor="#ccc"
          secureTextEntry={1==1}
          value={this.state.password}
        ></TextInput>
        <View style={styles.buttonContainer}>
        {_renderBotton.apply(this)}
        </View>
      </View>
    )
  };

  submit () {
    this.login()
  };

  login () {
    this.props.loginFunc();
  };
};

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 20
  },
  textInput: {
    height: 40, borderColor: 'gray', borderWidth: 1, marginTop:20,
    borderRadius: 2,
    padding: 4,
    color: '#333'
  },
  buttonContainer: {
		//  flex: 1, //1
		alignSelf: 'stretch',
		justifyContent: 'center'
	},
  button: {
    marginTop: 20,
    height: 49,
		backgroundColor: '#4cae4c',
		justifyContent: 'center',
		alignSelf: 'stretch',
    alignItems: 'center',
    borderRadius: 2
  },
  submitButton: {
		backgroundColor: '#4cae4c',
  },
  disabledButton: {
    backgroundColor: '#CCC'
  },
  buttonText: {
		fontSize: 18,
		color: '#FFF'
  }

});
