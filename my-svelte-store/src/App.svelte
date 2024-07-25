<script>
  import {onMount} from 'svelte';
  import ProductList from './component/ProductList.svelte';
  import Cart from './component/Cart.svelte';

  let categories = [];

  onMount(async() => {
    const response = await fetch('https://fakestoreapi.com/products/categories');
    categories = await response.json();
  });
</script>
<main>
  <h1>Smile Store</h1>
  <div class="store-container">
    <div class="categories">
      <h2>Categories</h2>
      {#each categories as category}
        <button>{category}</button>
      {/each}
    </div>
    <ProductList />
    <Cart />
  </div>
</main>

<style>
  .store-container {
    display: flex;
    flex-direction: space-between;
  }
  .categories {
    width: 20%;
    }
</style>