<script>
    import { products, addToCart, toggleWishlist } from '../store';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let selectedCategory = '';
    let sortOrder = '';

    $: filteredAndSortedProducts = $products
        .filter(product => !selectedCategory || product.category === selectedCategory)
        .sort((a, b) => {
            if (sortOrder === 'lowToHigh') return a.price - b.price;
            if (sortOrder === 'highToLow') return b.price - a.price;
            return 0;
        });

    function openProductModal(product) {
        dispatch('openModal', product);
    }
</script>

<h1 class="text-3xl font-bold mb-6">Our Products</h1>

<div class="mb-6 flex flex-wrap items-center gap-4">
    <select bind:value={selectedCategory} class="p-2 border rounded">
        <option value="">All Categories</option>
        {#each [...new Set($products.map(p => p.category))] as category}
            <option value={category}>{category}</option>
        {/each}
    </select>
    <select bind:value={sortOrder} class="p-2 border rounded">
        <option value="">Default Sorting</option>
        <option value="lowToHigh">Price: Low to High</option>
        <option value="highToLow">Price: High to Low</option>
    </select>
</div>

<div class="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {#each filteredAndSortedProducts as product (product.id)}
        <div class="border border-gray-200 rounded-md hover:border-purple-600 transition-colors bg-white shadow-sm">
            <!-- svelte-ignore a11y-invalid-attribute -->
            <a href="#" on:click|preventDefault={() => openProductModal(product)} class="block overflow-hidden">
                <img src={product.image} alt={product.title} class="w-full h-48 object-contain rounded-t-lg hover:scale-105 transition-transform">
            </a>
            <div class="p-4">
                <h3 class="text-lg font-semibold mb-2">
                    <!-- svelte-ignore a11y-invalid-attribute -->
                    <a href="#" on:click|preventDefault={() => openProductModal(product)} class="hover:text-purple-600">{product.title}</a>
                </h3>
                <p class="text-gray-600 mb-2">{product.category}</p>
                <h5 class="text-xl font-bold text-purple-600">${product.price.toFixed(2)}</h5>
            </div>
            <div class="flex justify-between p-4 border-t border-gray-100">
                <button on:click={() => toggleWishlist(product)} class="w-10 h-10 rounded-full border border-purple-600 flex items-center justify-center text-purple-600 hover:bg-purple-600 hover:text-white active:bg-purple-800 transition-colors">
                    ♥
                </button>
                <button on:click={() => addToCart(product)} class="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 active:bg-purple-800 transition-colors">
                    Add to Cart
                </button>
            </div>
        </div>
    {/each}
</div>