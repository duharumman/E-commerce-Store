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
    this.getCategories();
},
  methods: {
    async getCategories(){
      const response = await fetch(`https://fakestoreapi.com/products/categories`);
      const data = await response.json();
      this.categories =data; 
    }
  },
};
</script>

<template>
  <main>
    <h1 class="my-3 text-center text-3xl font-bold">Shop</h1>
    <div v-for="category in categories" :key="category">
      <ProductsCategory :category="category" show-more-btn />
    </div>
  </main>
</template>
