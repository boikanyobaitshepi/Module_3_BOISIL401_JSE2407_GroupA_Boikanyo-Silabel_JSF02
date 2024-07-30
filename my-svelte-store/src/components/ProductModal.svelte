<!-- <script>
    import { addToCart, toggleWishlist, wishlist } from '../store';
    export let product;

    $: isInWishlist = $wishlist.some(item => item.id === product.id);
</script>

<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" on:click|self>
    <div class="bg-white p-6 rounded-lg max-w-2xl w-full relative">
        <button on:click class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">&times;</button>
        
        <img src={product.image} alt={product.title} class="w-full h-64 object-contain mb-4">
        <h2 class="text-2xl font-bold mb-2">{product.title}</h2>
        <p class="text-gray-600 mb-2">{product.category}</p>
        <p class="text-xl font-bold text-purple-600 mb-2">${product.price.toFixed(2)}</p>
        
        <div class="flex items-center mb-2">
            <div class="flex items-center">
                <span class="text-yellow-400 mr-1">★</span>
                <span class="font-bold">{product.rating.rate.toFixed(1)}</span>
            </div>
            <span class="mx-2 text-gray-400">|</span>
            <span class="text-gray-600">{product.rating.count} reviews</span>
        </div>
        
        <p class="text-gray-700 mb-4">{product.description}</p>
        
        <div class="flex justify-between">
            <button
                on:click={() => toggleWishlist(product)}
                class="px-4 py-2 rounded border border-purple-600 flex items-center justify-center text-purple-600 hover:bg-purple-600 hover:text-white active:bg-purple-800 transition-colors"
                class:bg-purple-600={isInWishlist}
                class:text-white={isInWishlist}
            >
                {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </button>
            <button 
                on:click={() => addToCart(product)}
                class="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 active:bg-purple-800 transition-colors"
            >
                Add to Cart
            </button>
        </div>
    </div>
</div> -->