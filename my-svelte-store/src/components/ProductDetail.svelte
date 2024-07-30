<script>
  import { onMount } from 'svelte';
  import { Link } from "svelte-routing";
  import Loading from './Loading.svelte';
  import { addToCart, toggleWishlist } from '../store';

  export let id;
  let product = null;
  let loading = true;

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
    <button on:click={() => addToCart(product)}>Add to Cart</button>
    <button on:click={() => toggleWishlist(product)}>Add to Wishlist</button>
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
