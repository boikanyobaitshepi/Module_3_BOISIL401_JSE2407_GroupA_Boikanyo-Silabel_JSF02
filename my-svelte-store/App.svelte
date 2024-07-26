<script>
  import { Router, Link, Route } from "svelte-routing";
  import ProductList from "./ProductList.svelte";
  import ProductDetail from "./ProductDetail.svelte";

  export let url = "";
</script>

<Router {url}>
  <nav>
    <Link to="/">Home</Link>
  </nav>

  <Route path="/" component={ProductList} />
  <Route path="/product/:id" component={ProductDetail} />
</Router>