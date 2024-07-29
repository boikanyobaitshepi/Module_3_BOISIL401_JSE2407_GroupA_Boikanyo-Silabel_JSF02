<script>
    import { cart, wishlist } from '../stores.js';
    export let currentPage;
</script>

<header class="bg-slate-800 text-white p-4">
    <div class="container mx-auto flex justify-between items-center">
        <div class="w-16 h-16 overflow-hidden rounded-full shadow-lg">
            <img src="path_to_your_logo" alt="Store Logo" class="w-full h-full object-cover">
        </div>
        <nav>
            <ul class="flex space-x-4 items-center">
                <li>
                    <a href="#" on:click|preventDefault={() => currentPage = 'products'} class="hover:text-gray-300">Home</a>
                </li>
                <li>
                    <a href="#" on:click|preventDefault={() => currentPage = 'cart'} class="hover:text-gray-300">
                        Cart ({$cart.length})
                    </a>
                </li>
                <li>
                    <a href="#" class="hover:text-gray-300">Wishlist ({$wishlist.length})</a>
                </li>
            </ul>
        </nav>
    </div>
</header>