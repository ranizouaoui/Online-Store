import { createStore } from 'vuex'
let cart = localStorage.getItem('cart');
let count = localStorage.getItem('count');
export default createStore({
  state() {
    return {
      count: count ? parseInt(count) : 0,
      cart: cart ? JSON.parse(cart) : [],
    }
  },
  getters: {
  },
  mutations: {

    addToCart(state, item) {
      let found = state.cart.find(product => product.key == item.key);

      if (found) {
        found.quantity++;
        found.totalPrice = found.quantity * found.price;
      } else {

        state.cart.push(item);

        state.count++;


      }
      this.commit('saveCart');
    },
    removeFromCart(state, item) {
      let index = state.cart.indexOf(item);

      if (index > -1) {

        state.count--;

        state.cart.splice(index, 1);
        state.cart.splice()
      }
      this.commit('saveCart');
    },
    decrementQuentity(state, item) {

      let found = state.cart.find(product => product.key == item.key);

      if (found && found.quantity > 1) {
        found.quantity--;
        found.totalPrice = found.quantity * found.price;
      }
      this.commit('saveCart');
    },
    saveCart(state) {
      localStorage.setItem('cart', JSON.stringify(state.cart));
      localStorage.setItem('count', state.count);
    },
    resetCart(state) {
      state.cart = [],
        state.count = 0,
        localStorage.setItem('cart', JSON.stringify(state.cart));
      localStorage.setItem('count', state.count);
    }
  }
  ,
  actions: {
  },
  modules: {
  }
})
