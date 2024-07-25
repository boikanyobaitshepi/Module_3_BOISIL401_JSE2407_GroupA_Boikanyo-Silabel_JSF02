<script>
  import { onMount } from 'svelte';
  import ProductList from './src/components/ProductList.svelte';
  import Cart from './src/components/Cart.svelte';

  let categories = [];
  let selectedCategory = null;

  onMount(async () => {
    const response = await fetch('https://fakestoreapi.com/products/categories');
    categories = await response.json();
  });

  function selectCategory(category) {
    selectedCategory = category;
  }
</script>

<main>
  <h1>My Svelte Store</h1>
  <div class="store-container">
    <div class="categories">
      <h2>Categories</h2>
      <button on:click={() => selectCategory(null)}>All Products</button>
      {#each categories as category}
        <button on:click={() => selectCategory(category)}>{category}</button>
      {/each}
    </div>
    <ProductList {selectedCategory} />
    <Cart />
  </div>
</main>

<style>
  .store-container {
    display: flex;
    justify-content: space-between;
  }
  .categories {
    width: 20%;
  }
</style>