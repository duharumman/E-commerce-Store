<template>
  <!--Task 5: add the condition to the following div -->
  <div class="container mx-auto mt-8">
    <h1 class="my-3 text-center text-3xl font-bold">Checkout Cart</h1>
    <div
      class="table-wrp relative block max-h-80 overflow-x-auto sm:rounded-lg"
    >
      <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <thead
          class="sticky top-0 bottom-6 bg-white text-sm text-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="py-3 px-6">Product</th>
            <th scope="col" class="py-3 px-6">Name</th>
            <th scope="col" class="py-3 px-6">Quantity</th>
            <th scope="col" class="py-3 px-6">Price</th>
            <th scope="col" class="py-3 px-6">Remove</th>
          </tr>
        </thead>
        <tbody class="h-80 overflow-y-auto">
          <tr
            v-for="product in cartStore.cart"
            :key="product.id"
            class="border-b border-t bg-white"
          >
            <th
              scope="row"
              class="h-24 w-20 whitespace-nowrap py-4 px-6 font-medium text-gray-900"
            >
              
              <img src="<//Task 5:Image source here>" :alt="product.title" />
            </th>
            <td class="py-4 px-6 font-bold">
            <!--Task 5: product title here -->

            </td>
            <td class="flex-nowrap py-4 px-6 font-bold">
              <!--Task 7: reduceQty function in the click event -->
              <i @click="" class="bi bi-dash-lg mr-3 cursor-pointer"></i>
              <span>{{ product.quantity }}</span>
              <!--Task 7: addQty function in the click event -->
              <i @click="" class="bi bi-plus-lg ml-3 cursor-pointer"></i>
            </td>
            <td class="py-4 px-6 font-bold">
              $
              <!--Task 5: product price here -->
            </td>
            <td class="py-4 px-6">
              <!--Task 6: removeFromCart function in the click event -->
              <i @click="" class="bi bi-x-lg cursor-pointer"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="my-4 text-end text-2xl font-medium">
      Total: $
      <!--Task 7: write the total getter here -->
    </p>
    <div id="card-container" style="width: 50%; margin-left: 50%"></div>
    <button
      class="float-right mb-2 block rounded bg-blue-600 py-1 px-2 uppercase text-white"
      @click="submit"
    >
      Proceed to checkout
    </button>
  </div>
  <!-- Task 5: Add the v-else condition here -->
</template>

<script setup>
import { onMounted } from "vue";
import { createToast } from "mosha-vue-toastify";
import "bootstrap-icons/font/bootstrap-icons.css";
import "mosha-vue-toastify/dist/style.css";
import { useCartStore } from "../stores/cart";

const cartStore = useCartStore();
let card;
const appId = "<Task 8: Add App ID here>";
const locationId = "<Task 8: Add location ID here>";

  //Task 9: write initializeCard() function here 

onMounted(async () => {
  if (cartStore.cart.length) {
    //Task 9: Write the code to initiate transaction here
  }
});

async function tokenize(paymentMethod) {
  //Task 10: update tokenization code here
}

// status is either SUCCESS or FAILURE;
function displayPaymentResults(status) {
  if (status === "SUCCESS") {
    createToast("Transaction Successful", {
      type: "success",
      showIcon: true,
      hideProgressBar: true,
    });
  } else {
    createToast("Transaction Failed", {
      type: "danger",
      showIcon: "true",
      hideProgressBar: "true",
    });
  }
}

const submit = async function (event) {
  event.preventDefault();

  const token = await tokenize(card);

  //Task 10: write API call for the payment here
};
</script>

<style scoped>
.box {
  font-size: 100px;
}
</style>
