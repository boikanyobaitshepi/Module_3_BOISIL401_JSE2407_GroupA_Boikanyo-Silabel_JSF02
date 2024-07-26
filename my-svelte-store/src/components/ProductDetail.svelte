<script>
    import { onMount } from 'svelte';
    import { Link } from "svelte-routing";
    import Loading from './Loading.svelte';
  
    export let id;
    let product = null;
    let loading = true;
  
    onMount(async () => {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      product = await response.json();
      loading = false;
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
  </style>