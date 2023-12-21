<template>
  <div class="mb-8">
    <div class="p-3 bg-blue-600 text-white mb-6">
      <h3 class="text-2xl uppercase font-semibold text-center">
        {{ category }}
      </h3>
    </div>
    <div v-if="!isLoading">
      <div
        class="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
      >
        <div v-for="product in products" :key="product.id">
          <ProductCard :product="product" />
        </div>
      </div>
      <RouterLink
        v-if="showMoreBtn"
        :to="link"
        class="py-1 px-2 border-blue-600 border rounded mt-8 inline-block uppercase ml-[50%] -translate-x-1/2"
      >
        Show More
      </RouterLink>
    </div>
    <div v-else class="flex justify-center">
      <svg
        class="animate-spin"
        fill="none"
        height="40"
        viewBox="0 0 20 20"
        width="40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 3C6.13401 3 3 6.13401 3 10C3 10.2761 2.77614 10.5 2.5 10.5C2.22386 10.5 2 10.2761 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C9.72386 18 9.5 17.7761 9.5 17.5C9.5 17.2239 9.72386 17 10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3Z"
          fill="#212121"
        />
      </svg>
    </div>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
import ProductCard from "./ProductCard.vue";

export default {
  name: "ProductsCategory",
  props: {
    category: String,
    showMoreBtn: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    ProductCard,
    RouterLink,
  },
  data() {
    this.publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
    return {
      link: "",
      products: [],
      isLoading: false,
    };
  },
  methods: {
  //Task 2: Write the function getProducts() here
  },
  created() {
    this.link = `/category/${this.category}`;
  //Task 2: Write call for function here
  },
};
</script>
