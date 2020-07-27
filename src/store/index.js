import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
      products: [
        {
          id: 1,
          name: 'Men\'s Targhee III Waterproof',
          img: '1010138',
          price: 99,
          quantity: 0,
          incart: 0
        },
        {
          id: 2,
          name: 'Men\'s Targhee Vent',
          // img: 'dwf433f45e/product-images/M-TARGHEE-III-SLIP-ON/1022657/1022657',
          img: '1017679',
          price: 149,
          quantity: 0,
          incart: 0
        },
        {
          id: 3,
          name: 'Men\'s Highland',
          img: '1022308',
          price: 129,
          quantity: 0,
          incart: 0
        },
        {
          id: 4,
          name: 'Men\'s venture Waterproof',
          img: '1022332',
          price: 79,
          quantity: 0,
          incart: 0
        },
        {
          id: 5,
          name: 'Men\'s venture Waterproof II',
          img: '1022332',
          price: 89,
          quantity: 0,
          incart: 0
        },
      ],
      Cart: []
  },
  getters: {
    products: state => state.products,
    productsinCart: state => state.Cart
  },

  mutations: {
    itemsinCart(state, productData){
      state.Cart = productData
    },
    addtoCart(state, productData){
      state.Cart.push(productData)
    }
  },
  actions: {
    getItem({commit}){
      const productData = JSON.parse(localStorage.getItem('product'))
      commit('itemsinCart', productData)
    },
    addItem({commit, state}, productData){
      commit('itemsinCart', productData)
    },
  }
});