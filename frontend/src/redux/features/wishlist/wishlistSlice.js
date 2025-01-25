import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wishlistItems: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const isExist = state.wishlistItems.find(item => item._id === action.payload._id);
      if (!isExist) {
        state.wishlistItems.push(action.payload);
        console.log('Product added to wishlist:', action.payload);
      } else {
        console.log('Product already in wishlist');
      }
    },
   
    removeFromWishlist: (state, action) => {
      state.wishlistItems = state.wishlistItems.filter(item => item._id !== action.payload._id); // Use _id for consistency
      console.log('Product removed from wishlist:', action.payload._id);  // Update to use _id
    },
    clearWishlist: (state) => {
      state.wishlistItems = [];
      console.log('Wishlist cleared');
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
