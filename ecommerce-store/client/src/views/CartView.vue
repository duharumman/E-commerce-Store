<template>
  <div class="container mx-auto mt-8">
    <h1 class="my-3 text-center text-3xl font-bold">Checkout Cart</h1>
    <div v-if="cartStore.cart.length <= 0" class="mx-auto my-10 w-2/5 rounded-md pb-2 pt-2 shadow-lg">
      <img class="m-auto" src="/images/Empty-Cart.svg" alt="emptyCart" />
      <h2 class="text-center text-2xl text-gray-500">Cart is empty</h2>

      <RouterLink to="/" class="px-3">
      <button
        class="m-auto mb-2 block rounded bg-blue-600 py-1 px-2 uppercase text-white"
      >
        Continue shopping
      </button>
      </RouterLink>
    </div>
    <div v-else
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
              
              <img :src="product.image" :alt="product.title" />
            </th>
            <td class="py-4 px-6 font-bold">
              {{ product.title }}
            </td>
            <td class="flex-nowrap py-4 px-6 font-bold">
              <i @click="cartStore.reduceQty(product.id)" class="bi bi-dash-lg mr-3 cursor-pointer"></i>
              <span>{{ product.quantity }}</span>
              <i @click="cartStore.addQty(product.id)" class="bi bi-plus-lg ml-3 cursor-pointer"></i>
            </td>
            <td class="py-4 px-6 font-bold">
              $ {{ product.price }}
            </td>
            <td class="py-4 px-6">
              <i @click="cartStore.removeFromCart(product.id)" class="bi bi-x-lg cursor-pointer"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="my-4 text-end text-2xl font-medium">
      Total: $ {{ cartStore.total }}
    </p>
    <div id="card-container" style="width: 50%; margin-left: 50%"></div>
    <button
      class="float-right mb-2 block rounded bg-blue-600 py-1 px-2 uppercase text-white"
      @click="submit"
    >
      Proceed to checkout
    </button>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { createToast } from "mosha-vue-toastify";
import "bootstrap-icons/font/bootstrap-icons.css";
import "mosha-vue-toastify/dist/style.css";
import { useCartStore } from "../stores/cart";

const cartStore = useCartStore();
let card;
const appId = "sandbox-sq0idb-srJA3RQ7XD-kFCHPrmU6iQ";
const locationId = "LKDD74X9PKHMS";

  async function initializeCard(payments){
    // https://developer.squareup.com/reference/sdks/web/payments/objects/Card
    const card = await payments.card();
    await card.attach("#card-container");
    return card;
  }

onMounted(async () => {
  if (cartStore.cart.length) {
    if(!Square){
      throw new Error("Failed to load properly"); 
    }
    const payments = Square.payments(appId, locationId);

    try{
      card = await initializeCard(payments);
    }catch (e) {
      console.error("Initializing Card failed", e);
    return;
    }
  }
});

async function tokenize(paymentMethod) {
  //Task 10: update tokenization code here
  // https://developer.squareup.com/reference/sdks/web/payments/objects/TokenDetails
  const tokenResult = await paymentMethod.tokenize();
  if (tokenResult === "Ok"){
    return tokenResult;
  }else{
    let errorMessage = `Tokenization failed with status: ${tokenResult.status}`;
  }
  
  if (tokenResult.errors) {
    errorMessage += `and errors: ${JSON.stringify(tokenResult.errors)}`;
  }

  throw new Error(errorMessage);
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

  fetch("http://0.0.0.0:3000/payment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      locationId,
      sourceId: token,
      total: cartStore.total,
    }),
    })
    .then((res) => res.json())
    .then((paymentResults) => {
      console.debug("Payment Success", 
    paymentResults);
      cartStore.emptyCart();
      displayPaymentResults("SUCCESS");
    })
    .catch(async (e) => {
      console.error(e.message);
      displayPaymentResults("FAILURE");
    });
};
</script>
<!-- <script type="text/javascript" src="https://sandbox.web.squarecdn.com/v1/square.js"></script> -->

<style scoped>
.box {
  font-size: 100px;
}
</style>
