import { writable } from 'svelte/store';

function createCart() {
  const { subscribe, set, update } = writable([]);

  return {
    subscribe,
    addItem: (item) => update(items => {
      const existingItem = items.find(i => i.id === item.id);
      if (existingItem) {
        return items.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...items, { ...item, quantity: 1 }];
    }),
    removeItem: (id) => update(items => items.filter(i => i.id !== id)),
    clearCart: () => set([])
  };
}

export const cart = createCart();