<script>
// @ts-nocheck

    /**
     * @file Header.svelte
     * @description Header component for the e-commerce store.
     */
    
    import { cart, wishlist } from '../store';
    
    
    /**
     * @typedef {Object} Props
     * @property {string} currentPage - The current active page.
     */
    
    /** @type {Props} */
    export let currentPage;
    
    /**
     * Sets the current page.
     * @param {string} page - The page to set as current.
     */
    function setPage(page) {
        currentPage = page;
    }
    </script>
    
    
<header class="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg">
    <div class="container mx-auto px-4 py-6">
      <div class="flex justify-between items-center">
        <div class="flex items-center space-x-4">
          <img src="/path/to/your/logo.png" alt="Store Logo" class="w-12 h-12 rounded-full shadow-md">
          <h1 class="text-2xl font-bold tracking-wider">Your Store Name</h1>
        </div>
        <nav>
          <ul class="flex space-x-6 items-center">
            <li>
              <button 
                on:click={() => setPage('products')} 
                class="flex items-center hover:text-yellow-300 transition-colors duration-200 {currentPage === 'products' ? 'text-yellow-300' : ''}"
              >
                <svg class="w-6 h-6 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
                Home
              </button>
            </li>
            <li>
              <button 
                on:click={() => setPage('cart')} 
                class="flex items-center hover:text-yellow-300 transition-colors duration-200 {currentPage === 'cart' ? 'text-yellow-300' : ''}"
              >
                <svg class="w-6 h-6 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                Cart ({$cart.length})
              </button>
            </li>
            <li>
              <button 
                class="flex items-center hover:text-yellow-300 transition-colors duration-200"
              >
                <svg class="w-6 h-6 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
                Wishlist ({$wishlist.length})
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>