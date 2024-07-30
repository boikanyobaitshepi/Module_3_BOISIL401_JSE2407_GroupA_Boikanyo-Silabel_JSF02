<script>
    /**
     * @file Products.svelte
     * @description Displays a grid of product cards with appropriately sized images.
     */
    
    // import { createEventDispatcher } from 'svelte';
    // import { products, addToCart, toggleWishlist, wishlist } from '../store';
    
    // const dispatch = createEventDispatcher();
    
    // function openProductModal(product) {
    //   dispatch('openModal', product);
    // }
    
    // function isInWishlist(product) {
    //   return $wishlist.some(item => item.id === product.id);
    // }
    // </script>
    
    // <h1 class="text-3xl font-bold mb-6">Our Products</h1>
    
    <!-- Grid of product cards -->
    <!-- <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {#each $products as product (product.id)}
        <div class="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-full">
          Product Image -->
          <!-- <div class="h-32 p-2 flex items-center justify-center">
            <img src={product.image} alt={product.title} class="max-h-full max-w-full object-contain" />
          </div> -->
          
          <!-- Product Details -->
          <!-- <div class="p-3 flex-grow">
            <h3 class="text-sm font-semibold mb-1 line-clamp-2">
              <button on:click={() => openProductModal(product)} class="hover:text-purple-600">
                {product.title}
              </button>
            </h3>
            <p class="text-xs text-gray-600 mb-1">{product.category}</p>
            <p class="text-lg font-bold text-purple-600">${product.price.toFixed(2)}</p>
          </div> -->
          
          <!-- Action Buttons -->
          <!-- <div class="p-3 bg-gray-50 flex justify-between items-center">
            <button
              on:click={() => toggleWishlist(product)}
              class="p-1 rounded-full border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition-colors"
              class:bg-purple-600={isInWishlist(product)}
              class:text-white={isInWishlist(product)}
            >
              ♥
            </button>
            <button 
              on:click={() => addToCart(product)}
              class="bg-purple-600 text-white px-2 py-1 rounded text-sm hover:bg-purple-700 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      {/each}
    </div> -->