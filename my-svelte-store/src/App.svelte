<script>
// @ts-nocheck

  /**
   * @file App.svelte
   * @description Main application component for the e-commerce store.
   */
  
  import { onMount } from 'svelte';
  import Header from './components/Header.svelte';
  import Products from './components/Products.svelte';
  import Cart from './components/Cart.svelte';
  import ProductModal from './components/ProductModal.svelte';
  import { products } from './store';
  import Loading from './components/Loading.svelte';
  import ProductDetail from './components/ProductDetail.svelte';
  import ProductList from './components/ProductList.svelte';
  
  /** @type {string} */
  let currentPage = 'products';
  
  /** @type {boolean} */
  let showProductModal = false;
  
  /** @type {object|null} */
  let selectedProduct = null;
  
  /** @type {boolean} */
  let loading = true;
  
  /**
   * Fetches products from the API and initializes the store.
   */
  onMount(async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      $products = await response.json();
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      loading = false;
    }
  });
  
  /**
   * Opens the product modal with the selected product.
   * @param {CustomEvent} event - The event containing the selected product.
   */
  function openProductModal(event) {
    selectedProduct = event.detail;
    showProductModal = true;
  }
  
  /**
   * Closes the product modal.
   */
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
  
  <!-- <style global>
    @import 'tailwindcss/base';
    @import 'tailwindcss/components';
    @import 'tailwindcss/utilities';
  </style> -->