'use strict';
import Base64 from 'base-64';

export default class Api {
  constructor(api_root) {
    this.api_root = api_root ? api_root : 'http://yin17.com/api/v1';
  };

  login(params) {
    let token = Base64.encode(params.mobile + ':' + params.password);
    let authority = {};
    authority[params.authority] = 'true';
    console.log('authority', authority);

    fetch(`${this.api_root}/login`, {
      headers: {
        'Authorization': 'Basic ' + token
      }
    })
    .then((response) => (response.json()))
    .then(responseData => {
      console.log(responseData.data);
      if (typeof(responseData.data) === 'undefined') {
        if (params.onError && typeof(params.onError) === 'function') {
          params.onError(responseData);
        }
      } else if (!authority[responseData.data.state]){
        if (params.onError && typeof(params.onError) === 'function') {
          params.onError({message: '对不起，您暂无访问权限'});
        }
      } else {
        if (params.onSuccess && typeof(params.onSuccess) === 'function') {
          params.onSuccess({...responseData.data, token: token});
        }
      }
    })
    .done();
  };

  searchMerchants (params) {
    fetch(`${this.api_root}/search/users?per=10000&page=1`, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + params.token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
      ,
      body: JSON.stringify({
        q: params.query
      })
    }).then((response) => (response.json()))
    .then((responseData) => {
      if (typeof(responseData.data) === 'undefined') {
        if (params.onError && typeof(params.onError) === 'function') {
          params.onError(responseData);
        }
      } else {
        if (params.onSuccess && typeof(params.onSuccess) === 'function') {
          params.onSuccess(responseData.data);
        }
      }
    }).done()
  };

  loadMerchants (params) {
    fetch(`${this.api_root}/bd/merchants.json?per=20&page=${params.page}`, {
      headers: {
        'Authorization': 'Basic ' + params.token
      }
    }).then((response) => (response.json()))
    .then((responseData) => {
      if (typeof(responseData.data) === 'undefined') {
        if (params.onError && typeof(params.onError) === 'function') {
          params.onError(responseData);
        }
      } else {
        if (params.onSuccess && typeof(params.onSuccess) === 'function') {
          params.onSuccess(responseData.data);
        }
      }
    }).done()
  };

  searchOrder (params) {
    fetch(`${this.api_root}/search/orders?per=10000&page=1`, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + params.token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
      ,
      body: JSON.stringify({
        q: params.query
      })
    }).then((response) => (response.json()))
    .then((responseData) => {

      if (typeof(responseData.data) === 'undefined') {
        if (params.onError && typeof(params.onError) === 'function') {
          params.onError(responseData);
        }
      } else {
        if (params.onSuccess && typeof(params.onSuccess) === 'function') {
          params.onSuccess(responseData.data);
        }
      }
    }).done()
  };

  bdScores (params) {
    fetch(`${this.api_root}/bd/scores.json?date=${params.date}`, {
      headers: {
        'Authorization': 'Basic ' + params.token
      }
    }).then((response) => (response.json()))
    .then((responseData) => {
      if (typeof(responseData.data) === 'undefined') {
        if (params.onError && typeof(params.onError) === 'function') {
          params.onError(responseData);
        }
      } else {
        if (params.onSuccess && typeof(params.onSuccess) === 'function') {
          params.onSuccess(responseData.data);
        }
      }
    }).done()
  };

  loadOrdersByMerchant (params) {
    fetch(`${this.api_root}/bd/merchants/${params.merchant.id}/orders.json?per=20&page=${params.page}`, {
      headers: {
        'Authorization': 'Basic ' + params.token
      }
    }).then((response) => (response.json()))
    .then((responseData) => {
      if (typeof(responseData.data) === 'undefined') {
        if (params.onError && typeof(params.onError) === 'function') {
          params.onError(responseData);
        }
      } else {
        if (params.onSuccess && typeof(params.onSuccess) === 'function') {
          params.onSuccess(responseData.data);
        }
      }
    }).done()
  };

  updateMerchantCooridate (params) {
    let url = `${this.api_root}/users/${params.merchant.id}/coordinate`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + params.token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
      ,
      body: JSON.stringify({
        lng: params.coordinate.lng,
        lat: params.coordinate.lat,
        provider: 'baidu',
        axis: 'bd09ll'
      })
    })
    .then((response) => (response.json()))
    .then(responseData => {
      console.log('updateMerchantCooridate', typeof(responseData.data));
      if (typeof(responseData.data) === 'undefined') {
        if (params.onError && typeof(params.onError) === 'function') {
          params.onError(responseData);
        }
      } else {
        if (params.onSuccess && typeof(params.onSuccess) === 'function') {
          params.onSuccess(responseData.data);
        }
      }

    })
    // .catch((error) => {
    //   if (params.onError && typeof(params.onError) === 'function') {
    //     params.onError();
    //   }
    // })
    .done();
  }

  loadMyOrders (params) {
    fetch(`${this.api_root}/bd/my_orders.json?per=20&page=${params.page}`, {
      headers: {
        'Authorization': 'Basic ' + params.token
      }
    }).then((response) => (response.json()))
    .then((responseData) => {
      if (typeof(responseData.data) === 'undefined') {
        if (params.onError && typeof(params.onError) === 'function') {
          params.onError(responseData);
        }
      } else {
        if (params.onSuccess && typeof(params.onSuccess) === 'function') {
          params.onSuccess(responseData.data);
        }
      }
    }).done()
  };

}
