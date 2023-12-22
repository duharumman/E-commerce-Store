<template>
  <div class="relative flex h-full flex-col rounded-lg bg-white drop-shadow-lg">
    <img :src="product.image" :alt="product.title" class="mx-auto h-40 pt-2" />
    <p class="description mt-4 mb-1 px-4 text-center">
      {{ product.title }}
    </p>
    <p class="mb-16 text-center text-2xl">${{ product.price }}</p>
    <button
      @click="cartStore.addToCart(product)"
      class="absolute bottom-4 left-1/2 -translate-x-1/2 rounded bg-blue-600 py-1 px-2 uppercase text-white"
    >
      Add to Cart
    </button>
  </div>
</template>

<script setup>
import { useCartStore } from "../stores/cart";

const props = defineProps({
  product: Object,
});

const cartStore = useCartStore();
</script>
