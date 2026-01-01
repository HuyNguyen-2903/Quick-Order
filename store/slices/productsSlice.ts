import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  isPrescription: boolean;
}

interface ProductsState {
  items: Product[];
  searchQuery: string;
  selectedCategory: string;
}

const initialState: ProductsState = {
  items: [],
  searchQuery: '',
  selectedCategory: 'All',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const { setProducts, setSearchQuery, setSelectedCategory } =
  productsSlice.actions;

export const selectFilteredProducts = (state: { products: ProductsState }) => {
  const { items, searchQuery, selectedCategory } = state.products;
  
  let filtered = items;

  if (selectedCategory !== 'All') {
    filtered = filtered.filter((product) => product.category === selectedCategory);
  }

  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter((product) =>
      product.name.toLowerCase().includes(query)
    );
  }

  return filtered;
};

export default productsSlice.reducer;

