<script>
    import { onMount } from 'svelte';
    import { cart } from '../stores/cartStore.js';
  
    export let selectedCategory = null;
  
    let products = [];
  
    $: fetchProducts(selectedCategory);
  
    async function fetchProducts(category) {
      let url = 'https://fakestoreapi.com/products';
      if (category) {
        url += `/category/${category}`;
      }
      const response = await fetch(url);
      products = await response.json();
    }
  
    function addToCart(product) {
      cart.addItem(product);
    }
  </script>
  
  <div class="product-list">
    <h2>Products {selectedCategory ? `in ${selectedCategory}` : ''}</h2>
    {#each products as product}
      <div class="product">
        <img src={product.image} alt={product.title} />
        <h3>{product.title}</h3>
        <p>${product.price.toFixed(2)}</p>
        <button on:click={() => addToCart(product)}>Add to Cart</button>
      </div>
    {/each}
  </div>
  
  <style>
    .product-list {
      width: 60%;
    }
    .product {
      border: 1px solid #ddd;
      padding: 10px;
      margin-bottom: 10px;
    }
    img {
      max-width: 100px;
      max-height: 100px;
    }
  </style>