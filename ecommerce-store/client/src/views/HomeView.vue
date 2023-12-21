<script>
import ProductsCategory from "../components/ProductsCategory.vue";

export default {
  name: "HomeView",
  components: {
    ProductsCategory,
  },
  data() {
    return {
      categories: [],
    };
  },
  mounted() {
    //Task 1: Write the call for getCategories here
},
  methods: {
    //Task 1: write getCategories() function here
  },
};
</script>

<template>
  <main>
    <h1 class="my-3 text-center text-3xl font-bold">Shop</h1>
    <!--Task 1: populate the categories using ProductsCategory component -->
  </main>
</template>
