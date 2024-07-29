<script>
  import { onMount } from 'svelte';
  // @ts-ignore
  import Header from './components/Header.svelte';
  // @ts-ignore
  import Products from './components/Products.svelte';
  // @ts-ignore
  import Cart from './components/Cart.svelte';
  // @ts-ignore
  import ProductModal from './components/ProductModal.svelte';
  // @ts-ignore
  import { products } from './stores.js';

  let currentPage = 'products';
  let showProductModal = false;
  let selectedProduct = null;
  let loading = true;

  onMount(async () => {
      const response = await fetch('https://fakestoreapi.com/products');
      $products = await response.json();
      loading = false;
  });

  function openProductModal(event) {
      selectedProduct = event.detail;
      showProductModal = true;
  }

  function closeProductModal() {
      showProductModal = false;
  }
</script>

<Header bind:currentPage />

<main class="container mx-auto p-4">
  {#if currentPage === 'products'}
      <Products on:openModal={openProductModal} />
  {:else if currentPage === 'cart'}
      <Cart />
  {/if}
</main>

{#if showProductModal}
  <ProductModal product={selectedProduct} on:click={closeProductModal} />
{/if}

{#if loading}
  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-xl">
          <h2 class="text-2xl font-bold mb-4">Loading Products</h2>
          <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto"></div>
      </div>
  </div>
{/if}

<style global>
  @import 'tailwindcss/base';
  @import 'tailwindcss/components';
  @import 'tailwindcss/utilities';
</style>