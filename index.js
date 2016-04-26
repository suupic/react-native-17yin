'use strict';

import React from 'react-native';
var {Text, Component} = React;
import Order from './lib/order/order.android';
import Login from './lib/login/login.android';
import Merchant from './lib/merchant/merchant.android';
import Api from './lib/api/api'

module.exports = {
  Order: Order,
  Login: Login,
  Merchant: Merchant,
  Api: Api
};
