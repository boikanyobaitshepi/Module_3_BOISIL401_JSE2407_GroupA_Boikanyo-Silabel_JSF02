<script>
  import { onMount } from 'svelte';
  import { Link } from "svelte-routing";
  import Loading from './Loading.svelte';
  import { cart, wishlist } from '../store'; 

  /**
   * @typedef {Object} Product
   * @property {number} id - The unique identifier of the product
   * @property {string} title - The title of the product
   * @property {number} price - The price of the product
   * @property {string} category - The category of the product
   * @property {string} image - The URL of the product image
   */

  /** @type {Product[]} */
  let products = [];

  /** @type {string[]} */
  let categories = [];

  /** @type {boolean} */
  let loading = true;

  /** @type {string} */
  let selectedCategory = '';

  /** @type {string} */
  let sortOrder = 'default';

  onMount(async () => {
    await Promise.all([fetchProducts(), fetchCategories()]);
    loading = false;
  });

  /**
   * Fetches products from the API
   * @async
   * @function fetchProducts
   * @returns {Promise<void>}
   */
  async function fetchProducts() {
    const response = await fetch('https://fakestoreapi.com/products');
    products = await response.json();
  }

  /**
   * Fetches categories from the API
   * @async
   * @function fetchCategories
   * @returns {Promise<void>}
   */
  async function fetchCategories() {
    const response = await fetch('https://fakestoreapi.com/products/categories');
    categories = await response.json();
  }

  /**
   * Filters products based on the selected category
   * @type {Product[]}
   */
  $: filteredProducts = selectedCategory 
    ? products.filter(p => p.category === selectedCategory)
    : products;

  /**
   * Sorts the filtered products based on the sort order
   * @type {Product[]}
   */
  $: sortedProducts = sortProducts(filteredProducts, sortOrder);

  /**
   * Sorts an array of products based on the specified order
   * @function sortProducts
   * @param {Product[]} prods - The array of products to sort
   * @param {string} order - The sort order ('lowest', 'highest', or 'default')
   * @returns {Product[]} The sorted array of products
   */
  function sortProducts(prods, order) {
    if (order === 'lowest') return [...prods].sort((a, b) => a.price - b.price);
    if (order === 'highest') return [...prods].sort((a, b) => b.price - a.price);
    return prods;
  }

  /**
   * Resets the category and sort filters to their default values
   * @function resetFilters
   */
  function resetFilters() {
    selectedCategory = '';
    sortOrder = 'default';
  }

  /**
   * Adds a product to the cart or increases its quantity if already present
   * @function addToCart
   * @param {Product} product - The product to add to the cart
   */
  function addToCart(product) {
    cart.update(items => {
      const existingItem = items.find(item => item.id === product.id);
      if (existingItem) {
        return items.map(item => 
          item.id === product.id 
            ? {...item, quantity: item.quantity + 1}
            : item
        );
      }
      return [...items, {...product, quantity: 1}];
    });
  }

  /**
   * Adds a product to the wishlist or removes it if already present
   * @function addToWishlist
   * @param {Product} product - The product to add to or remove from the wishlist
   */
  function addToWishlist(product) {
    wishlist.update(items => {
      const index = items.findIndex(item => item.id === product.id);
      if (index === -1) {
        return [...items, product];
      }
      return items.filter((_, i) => i !== index);
    });
  }
</script>

{#if loading}
  <Loading />
{:else}
  <div class="container">
    <div class="filters">
      <select bind:value={selectedCategory} class="filter-select">
        <option value="">All Categories</option>
        {#each categories as category}
          <option value={category}>{category}</option>
        {/each}
      </select>

      <select bind:value={sortOrder} class="filter-select">
        <option value="default">Default</option>
        <option value="lowest">Lowest Price</option>
        <option value="highest">Highest Price</option>
      </select>

      <button on:click={resetFilters} class="reset-button">Reset Filters</button>
    </div>

    <div class="product-grid">
      {#each sortedProducts as product (product.id)}
        <div class="product-card">
          <Link to={`/product/${product.id}`} class="product-link">
            <img src={product.image} alt={product.title} class="product-image" />
            <h3 class="product-title">{product.title}</h3>
            <p class="product-price">${product.price.toFixed(2)}</p>
            <p class="product-category">{product.category}</p>
          </Link>
          <div class="product-actions">
            <button on:click={() => addToCart(product)} class="action-button">Add to Cart</button>
            <button on:click={() => addToWishlist(product)} class="action-button wishlist">Add to Wishlist</button>
          </div>
        </div>
      {/each}
    </div>
  </div>
{/if}


<style>
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
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  .filters {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .filter-select {
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }

  .reset-button {
    padding: 8px 16px;
    background-color: #f0f0f0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }

  .product-card {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
    transition: box-shadow 0.3s ease;
  }

  .product-card:hover {
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }

  .product-link {
    text-decoration: none;
    color: inherit;
    display: block;
    padding: 15px;
  }

  .product-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 4px;
  }

  .product-title {
    margin: 10px 0;
    font-size: 1.1em;
  }

  .product-price {
    font-weight: bold;
    color: #e53935;
  }

  .product-category {
    color: #757575;
    font-size: 0.9em;
  }

  .product-actions {
    display: flex;
    justify-content: space-between;
    padding: 10px 15px;
  }

  .action-button {
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .action-button.wishlist {
    background-color: #ff9800;
    color: white;
  }

  .action-button:hover {
    opacity: 0.9;
  }
</style>

