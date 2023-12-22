import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cart: [],
  }),
  actions: {
    addToCart(product){
      const cartProduct = this.cart.filter(item=>
        item.id === product.id
      );
      if (cartProduct.length >= 1 ){
        this.addQty(product.id);
      }else{
        this.cart = [{...product, quantity:1 }, ...this.cart];
      }
      
    },
    removeFromCart(productId){
      const product = this.cart.filter(item=> item.id === productId);
      this.cart.pop(product);
    },
    addQty(productId){
      const productIndex = this.cart.findIndex(item => item.id === productId);
      this.cart[productIndex].quantity++;
    },
    reduceQty(productId){
      const productIndex = this.cart.findIndex(item => item.id === productId);
      if (this.cart[productIndex].quantity > 1){
        this.cart[productIndex].quantity--;
      }
    }
    // write emptyCart function here
  },
  getters: {
    total:(state)=>{
      let tot = 0;
      for (const item of state.cart){
        tot += item.price * item.quantity;
      }
      return tot;
    }
  },
});
