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