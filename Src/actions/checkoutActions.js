import { ADDRESS, ORDER } from '../Constants';
import axios from 'axios';

export const getAddress = (access_token, customerId) => dispatch => {
  axios.get('http://api.pimento.in/api/AddressTemplate/GetAll/'+customerId, {
    headers: {
      "token_type": "access_token",
      "Authorization": "Bearer "+ access_token
    }
  })
  // .then(company => {
  //   console.log(company  );
  // })
  .then(service => dispatch({
      type: ADDRESS,
      payload: service.data
  }));
}

export const getOrders = (access_token, customerId) => dispatch => {
  axios.get('http://api.pimento.in/api/SalesOrder/GetAllByCustomerId/'+customerId, {
    headers: {
      "token_type": "applocation/json",
      "Authorization": "Bearer "+ access_token
    }
  })
  // .then(company => {
  //   console.log(company  );
  // })
  .then(order => dispatch({
      type: ORDER,
      payload: order.data
  }));
}

export const setDeliveryAddress = (address) => dispatch => {
  dispatch({
    type: "DELIVERY_ADDRESS",
    payload: address
  })
}

export const setUser = (data) => dispatch => {
  dispatch({
    type: "SET_USER",
    payload: data
  })
}