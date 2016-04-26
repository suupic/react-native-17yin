'use strict';

import React, {
  Component,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  PropTypes,
  Text,
  View,
  Clipboard,
  Alert
} from 'react-native';

import  Icon from 'react-native-vector-icons/FontAwesome';
import Communications from 'react-native-communications';

export default class Merchant extends React.Component{
  static propTypes = {
    merchant: React.PropTypes.object.isRequired,
    onNamePress: React.PropTypes.func,
    onAddressPress: React.PropTypes.func
  };

  state = {
    merchant: this.props.merchant
  };

  render() {
    let merchant = this.state.merchant;
    let _this = this;
    return (
      <View style={styles.merchant}>
        <View style={styles.merchantTitle}>
          <View style={styles.merchateTitleLeft}>
            <TouchableHighlight onLongPress={()=> _this._setClipboardContent(merchant.name)} onPress={this.props.onNamePress} underlayColor='#ccc'>
              <View style={{flexDirection: 'row'}}><Text style={[styles.merchantName, {color: '#22a1c4'}]}>{merchant.fake_name}</Text><Text style={styles.merchantName}>{merchant.name}</Text></View>
            </TouchableHighlight>
            <TouchableOpacity onPress={() => Communications.phonecall(merchant.mobile, true)}>
              <Text><Icon name="mobile" size={16}/> {merchant.mobile}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableHighlight onLongPress={()=> _this._setClipboardContent(merchant.address)} onPress={this.props.onAddressPress} underlayColor='#ccc'><View><Text style={{fontSize: 18}}><Icon name={merchant.coordinate ? "map-marker" : "question-circle"} size={16}/> {merchant.address} </Text></View></TouchableHighlight>
      </View>
    )
  };

  async _setClipboardContent(str){
    Clipboard.setString(str);
    Alert.alert('提示','内容已复制到剪贴板');
  };
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 8,
    paddingBottom: 0
  },
  merchant: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    padding:4
  },
  merchantTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 4
  },
  merchateTitleLeft: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  merchantName: {
    fontSize: 20,
    marginRight: 8,
    fontWeight: "bold"
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1b809e'
  },
  listView: {
    paddingTop: 0
  },
  text: {
    color: '#000',
    fontSize: 18,
  },
  notice: {flex: 1, justifyContent: 'center',alignItems: 'center'}
});
