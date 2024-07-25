<script>
    import {onMount} from 'svelte';
    import {cart} from './stores/cartStore.js'

    let products = [];

    onMount(async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    products = await response.json();
  });

  function addToCart(product) {
    cart.addItem(product);
  }
</script>

<div class="product-list">
  <h2>Products</h2>
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