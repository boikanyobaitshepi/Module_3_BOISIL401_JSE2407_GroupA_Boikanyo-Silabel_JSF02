<script>
    import { cart } from '../stores/cartStore.js';
  
    function removeFromCart(item) {
      cart.removeItem(item.id);
    }
  
    $: total = $cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  </script>
  
  <div class="cart">
    <h2>Cart</h2>
    {#if $cart.length === 0}
      <p>Your cart is empty</p>
    {:else}
      {#each $cart as item}
        <div class="cart-item">
          <span>{item.title} - ${item.price.toFixed(2)} x {item.quantity}</span>
          <button on:click={() => removeFromCart(item)}>Remove</button>
        </div>
      {/each}
      <p>Total: ${total.toFixed(2)}</p>
    {/if}
  </div>
  
  <style>
    .cart {
      width: 35%;
      border: 1px solid #ddd;
      padding: 10px;
    }
    .cart-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
    }
  </style>