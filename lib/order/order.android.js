'use strict';

import React, {
  StyleSheet,
  Text,
  View,
  ListView,
  Alert,
  Modal,
  TextInput,
  TouchableHighlight
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class Order extends React.Component {
  state = {
    order: this.props.order,
    showTracelogList: false
  };

  renderOrderState () {
    switch (this.state.order.workflow_state) {
      case 'deadline':
        return (
          <Text style={styles.state}><Icon name="tasks" size={16}/> 印刷中</Text>
        )
        break;
      case 'ready_to_ship':
        return (
          <Text style={styles.state}><Icon name="truck" size={16}/> 出库中</Text>
        )
        break;
      case 'delay_to_ship':
        return (
          <Text style={styles.state}><Icon name="tasks" size={16}/> 出库中(延迟)</Text>
        )
        break;
      case 'finished':
        return (
          <Text style={styles.state}><Icon name="check" size={16}/> 已完成</Text>
        )
        break;
      case 'shipping':
        return (
          <Text style={styles.state}><Icon name="rocket" size={16}/> 配送中</Text>
        )
        break;
      default:

    }
  }

  render () {
    var _this = this
    var toggleTracelogList = function () {
      _this.setState({
        showTracelogList: !_this.state.showTracelogList
      })
    };
    var _this = this;
    var desc = this.state.order.description_list;
    var renderTraceLogHeader = function() {
      if (!_this.state.order.trace_logs) {
        return (<View></View>);
      } else {
        return(<View style={styles.logsHeader}><Text onPress={toggleTracelogList}>历史记录</Text></View>);
      }

    };
    var renderTraceLogs = function() {
      if (!_this.state.order.trace_logs) {
        return (<View><Text></Text></View>);
      }
      var dataSource = new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      });
      dataSource = dataSource.cloneWithRows(_this.state.order.trace_logs)
      if (_this.state.showTracelogList) {
        return (
          <View ref="tracelogList">
            <ListView
              style={styles.listView}
              dataSource={dataSource}
              renderRow={function(log) { return (
                <View style={styles.log}><Text style={[styles.fontColorGray]}>{log.created_at.substring(5, log.created_at.length)} {log.operator} {log.content} {log.extra&&log.extra.message}</Text></View>
              )}}
            >
            </ListView>
          </View>
        );
      } else {
        return (<Text></Text>)
      }
    };

    var renderMemo = function() {
      if (_this.state.order.memo) {
        return (
          <View><Text style={{color: '#e35b5a'}}>{_this.state.order.memo}</Text></View>
        )
      }
    };

    let borderStyle = (function(order){
      if (order.workflow_state === 'finished') {
        return styles.orderFinished;
      } else if (order.memo) {
        return styles.orderHilight;
      } else {
        return styles.orderNormal
      }
    })(this.state.order);
    console.log('borderStyle', borderStyle);

    return (
      <View style={[styles.order, borderStyle]}>
        <View style={styles.title}>
          <Text style={[styles.fontSize18, styles.fontWeightBold, styles.fontColorBlue]}>{this.state.order.product_name}</Text>
          <Text style={[styles.fontSize18, styles.fontColorBlue]}>{this.state.order.price}</Text>
        </View>
        <View style={styles.idAndState}>
          <Text style={styles.id}>{this.state.order.id}</Text>
          {this.renderOrderState()}
        </View>
        <View><Text>{this.state.order.user.name}({this.state.order.user.fake_name})</Text></View>
        <View style={styles.content}>
          {Object.keys(desc).map(function(key, i){
            return (
              <Text key={i}>{key}: {desc[key]}</Text>
            )
          })}
        </View>
        {renderMemo()}
        {renderTraceLogHeader()}
        {renderTraceLogs()}
      </View>
    )
  }
};

var styles = StyleSheet.create({
  order: {
    flex: 1,
    borderWidth: 1,
    borderTopWidth: 4,
    borderColor: '#1b809e',
    padding: 8,
    borderRadius: 2,
    marginTop: 10
  },
  orderNormal: {
    borderColor: '#1b809e'
  },
  orderFinished: {
    borderColor: '#ccc'
  },
  orderHilight: {
    borderColor: '#e35b5a'
  },
  text: {
    // flex: 1
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  idAndState: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4
  },
  id: {
    fontSize: 16
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  buttonContainer: {
    marginLeft: 8
  },
  button: {
  },
  state: {
    color: 'green'
  },
  price: {marginTop: 6},
  fontSize18: {fontSize: 18},
  fontColorBlue: {color: '#1b809e'},
  fontWeightBold: {fontWeight: 'bold'},
  fontColorGray: {color: '#ccc'},
  content: {
    marginTop: 6
  },
  modal: {flex: 1},
  innerModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, .7)',
    justifyContent: 'flex-end'
  },
  textInput: {
    height: 40, borderWidth: 1, marginTop:20, marginBottom: 20,
    borderColor: '#ccc',
    borderRadius: 2,
    padding: 4,
    color: '#333'
  },
  formContainer: {
    backgroundColor: 'white',
    padding: 18
  },
  reasonButtons: {
    flexDirection: 'row'
  },
  reasonButton: {
    borderWidth: 1,
    paddingTop: 4,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 4,
    marginRight: 8,
    borderRadius: 2,
    borderColor: '#333'
  },
  formTitle: {
    color: "#42b983",
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom:6
  },
  logsHeader: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    backgroundColor: '#f5f5f5'
  },
  listView: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderTopWidth: 0
  },
  log: {
    borderColor: '#ddd',
    padding: 4,
    borderBottomWidth: 1
  }
});
