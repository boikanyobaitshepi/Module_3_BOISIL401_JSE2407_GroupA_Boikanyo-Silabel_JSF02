<script>
// @ts-nocheck



    import { onMount } from 'svelte';
    import { Link } from "svelte-routing";
    import {cart, wishlist} from '../store'
    import Loading from './Loading.svelte';
  
    let products = [];
    let categories = [];
    let loading = true;
    let selectedCategory = '';
    let sortOrder = 'default';
  
    onMount(async () => {
      await Promise.all([fetchProducts(), fetchCategories()]);
      loading = false;
    });
  
    async function fetchProducts() {
      const response = await fetch('https://fakestoreapi.com/products');
      products = await response.json();
    }
  
    async function fetchCategories() {
      const response = await fetch('https://fakestoreapi.com/products/categories');
      categories = await response.json();
    }
  
    $: filteredProducts = selectedCategory 
      ? products.filter(p => p.category === selectedCategory)
      : products;
  
    $: sortedProducts = sortProducts(filteredProducts, sortOrder);
  
    function sortProducts(prods, order) {
      if (order === 'lowest') return [...prods].sort((a, b) => a.price - b.price);
      if (order === 'highest') return [...prods].sort((a, b) => b.price - a.price);
      return prods;
    }
  
    function resetFilters() {
      selectedCategory = '';
      sortOrder = 'default';
    }

     function addToCart(product) {
    cart.addItem(product);
  }

  function addToWishlist(product) {
    wishlist.addItem(product);
  }
  </script>
  
  {#if loading}
    <Loading />
  {:else}
    <div>
      <select bind:value={selectedCategory}>
        <option value="">All Categories</option>
        {#each categories as category}
          <option value={category}>{category}</option>
        {/each}
      </select>
  
      <select bind:value={sortOrder}>
        <option value="default">Default</option>
        <option value="lowest">Lowest Price</option>
        <option value="highest">Highest Price</option>
      </select>
  
      <button on:click={resetFilters}>Reset Filters</button>
  
      <div class="product-grid">
        {#each sortedProducts as product}
          <div class="product-card">
            <Link to={`/product/${product.id}`}>
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p>Price: ${product.price}</p>
              <p>Category: {product.category}</p>
            </Link>
            <button on:click={() => addToCart(product)}>Add to Cart</button>
            <button on:click={() => addToWishlist(product)}>Add to Wishlist</button>
          </div>
        {/each}
      </div>
    </div>
  {/if}
  
  <!-- <style>
    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;
    }
    .product-card {
      border: 1px solid #ddd;
      padding: 1rem;
    }
    .product-card img {
      max-width: 100%;
      height: 200px;
      object-fit: contain;
    }
    .product-card button {
    margin-top: 10px;
    padding: 5px 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
  }
  .product-card button:last-child {
    background-color: #008CBA;
  }
  .product-card a {
    text-decoration: none;
    color: inherit;
  }
  </style> -->
