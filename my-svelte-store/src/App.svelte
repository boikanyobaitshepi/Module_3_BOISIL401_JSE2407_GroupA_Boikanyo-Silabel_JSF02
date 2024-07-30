<script>
// @ts-nocheck

  import { Router, Link, Route } from 'svelte-routing';
  import ProductList from './components/ProductList.svelte';
  import ProductDetail from './components/ProductDetail.svelte';
  import Header from './components/Header.svelte';
  
  export let url = '';
</script>

<Header />

<Router {url}>
  <nav>
    <Link to="/">Home</Link>
  </nav>

  <Route path="/" component={ProductList} />
  <Route path="/product/:id" component={ProductDetail} />
</Router>
