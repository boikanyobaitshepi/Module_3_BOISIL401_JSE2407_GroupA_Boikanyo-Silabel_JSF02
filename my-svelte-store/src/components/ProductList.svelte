<script>
    import {onMount} from 'svelte';
    import {cart} from './stores/cartStore.js'

    let products = [];

    onMount(async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    products = await response.json();
  });

</script>