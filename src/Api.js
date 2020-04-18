import { sampleProducts } from "./Data";

///
//
// Methods of this class are used to simulate calls to server.
//
class Api {
  getItemUsingID(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let res = sampleProducts.filter(x => x.id === parseInt(id, 10));
        resolve(res.length === 0 ? null : res[0]);
      }, 500);
    });
  }

  getItems() {

    return new Promise((resolve, reject) => {

      setTimeout(() => {

        let data = sampleProducts
        let totalLength = data.length;
        resolve({ data, totalLength });
      }, 500);
    });
  }
}

export default new Api();
