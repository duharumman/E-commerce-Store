<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useCartStore } from "./stores/cart";

const cartStore = useCartStore();
</script>

<template>
  <header class="bg-blue-600 p-4">
    <div class="container mx-auto flex justify-between">
      <h1 class="text-2xl text-white">My Store</h1>
      <div class="flex items-center uppercase tracking-widest text-slate-300">
        <RouterLink to="/" class="px-3">Shop</RouterLink>
        <RouterLink to="/cart" class="px-3">
          Cart
          <!-- total products count here  -->
        </RouterLink>
      </div>
    </div>
  </header>

  <RouterView />
</template>
