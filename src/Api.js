import { sampleProducts } from './Data';

///
//
// Methods of this class are used to simulate calls to server.
//

class Api {
  getPizzaItem = () => (dispatch) => {
    return new Promise((resolve, reject) => {
      fetch('http://127.0.0.1:4000/product')
        .then((response) => response.json())
        .then((resData) => {
          // STORE VALUE IN REDUCER
          dispatch({
            type: 'GET_PIZZA_ITEM',
            payload: resData,
          });
          resolve();
        })
        .catch((err) => {
          console.log('Error', err);
          dispatch({
            type: 'GET_PIZZA_ITEM',
            payload: [],
          });
          reject({
            data: [],
            errMsg: 'API Error:- get Data From Local',
          });
        });
    });
  };
  getItemUsingID(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let res = sampleProducts.filter((x) => x.id === parseInt(id, 10));
        resolve(res.length === 0 ? null : res[0]);
      }, 500);
    });
  }

  getItems() {
    return new Promise((resolve) => {
      setTimeout(() => {
        let data = sampleProducts;
        let totalLength = data.length;
        resolve({ data, totalLength });
      }, 500);
    });
  }
}

export default new Api();
