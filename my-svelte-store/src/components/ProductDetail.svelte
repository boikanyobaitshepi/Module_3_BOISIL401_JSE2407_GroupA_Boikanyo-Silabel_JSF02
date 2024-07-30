<script>
  import { onMount } from 'svelte';
  import { Link } from "svelte-routing";
  import Loading from './Loading.svelte';
  import { addToCart, toggleWishlist } from '../store';

  /**
   * @typedef {Object} Product
   * @property {number} id - The product ID.
   * @property {string} title - The product title.
   * @property {string} description - The product description.
   * @property {number} price - The product price.
   * @property {string} category - The product category.
   * @property {string} image - The product image URL.
   * @property {Object} rating - The product rating.
   * @property {number} rating.rate - The average rating of the product.
   * @property {number} rating.count - The number of ratings.
   */

  /**
   * @type {number}
   */
  export let id;

  /**
   * @type {Product|null}
   */
  let product = null;

  /**
   * @type {boolean}
   */
  let loading = true;

  /**
   * Fetch product details on component mount.
   */
  onMount(async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      product = await response.json();
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      loading = false;
    }
  });

  /**
   * Add product to cart.
   * @param {Product} product - The product to add to the cart.
   */
  function handleAddToCart(product) {
    addToCart(product);
  }

  /**
   * Toggle product in the wishlist.
   * @param {Product} product - The product to toggle in the wishlist.
   */
  function handleToggleWishlist(product) {
    toggleWishlist(product);
  }
</script>

{#if loading}
  <Loading />
{:else if product}
  <div class="product-detail">
    <Link to="/">Back to Products</Link>
    <h1>{product.title}</h1>
    <img src={product.image} alt={product.title} />
    <p>{product.description}</p>
    <p>Price: ${product.price}</p>
    <p>Category: {product.category}</p>
    <p>Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
    <button on:click={() => handleAddToCart(product)}>Add to Cart</button>
    <button on:click={() => handleToggleWishlist(product)}>Add to Wishlist</button>
  </div>
{:else}
  <div>
    <p>Product not found.</p>
  </div>
{/if}

<style>
  .product-detail {
    max-width: 600px;
    margin: 0 auto;
  }
  .product-detail img {
    max-width: 100%;
    height: 400px;
    object-fit: contain;
  }
  .product-detail button {
    background-color: #008CBA;
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    margin: 5px;
  }
  .product-detail button:hover {
    background-color: #005f75;
  }
</style>
