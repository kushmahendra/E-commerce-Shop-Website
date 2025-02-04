
// import React from 'react'
// import { createSlice } from '@reduxjs/toolkit'

// const initialState = {
//     cartId: null, // Add cartId here
//     cart: {
//         // products: [],
//         items: [],
//         selectedItems: 0,
//         totalPrice: 0,
//         tax: 0,
//         taxRate: 0.05,
//         grandTotal: 0,
//     }
// }

// const cartSlice = createSlice({
//     name: 'cart',
//     initialState,
//     reducers: {
//         // addToCart: (state, action) => {
//         //     console.log('my added product',action.payload)
//         //     const isExist = state.products.find((product) => product._id === action.payload._id);
//         //     console.log('my product',products)

//         //     if (!isExist) {
//         //         state.products.push({...action.payload, quantity: 1 })
//         //         console.log('himanshu',{...action.payload,quantity:1})

//         //     }
//         //     else {
//         //         console.log("Items already added")
//         //     }

//         //     state.selectedItems = state.products.length
//         //     state.totalPrice = state.products.reduce((total, item) => { return Number(total + item.quantity * item.product.price) }, 0)
//         //     state.tax = state.taxRate * state.totalPrice
//         //     state.grandTotal = state.totalPrice + state.tax
//         // },

//         // addToCart: (state, action) => {
//         //     console.log('Adding product:', action.payload);
//         //     console.log('product detail', action.payload.cart.items[0].product);


//         //     // Find if product already exists in cart.items
//         //     const isExist = state.cart.items.find((item) => item.product === action.payload._id);

//         //     if (!isExist) {
//         //         const newItem = {
//         //             product: action.payload._id,
//         //             quantity: 1,
//         //             totalPrice: action.payload.price, // Calculate total price correctly
//         //             _id: action.payload.cartItemId || new Date().toISOString(), // Ensure unique _id
//         //         };

//         //         state.cart.items.push(newItem);
//         //         console.log('New item added:', newItem);
//         //     } else {
//         //         console.log("Item already exists in cart");
//         //     }

//         //     // Update cart summary
//         //     state.cart.selectedItems = state.cart.items.length;
//         //     state.cart.totalCartPrice = state.cart.items.reduce((total, item) => total + item.totalPrice, 0);
//         //     state.cart.tax = state.taxRate * state.cart.totalCartPrice;
//         //     state.cart.grandTotal = state.cart.totalCartPrice + state.cart.tax;
//         // }
//         // ,

//         addToCart: (state, action) => {
//             console.log('Adding product:', action.payload);

//             // Ensure cart exists
//             if (!state.cart.items) {
//                 state.cart.items = [];
//             }


//             // Find if product already exists in cart.items
//             const isExist = state.cart.items.find((item) => item.product === product._id);

//             if (!isExist) {
//                 const newItem = {
//                     product: product._id,
//                     quantity: 1,
//                     totalPrice: product.price, // Use product price
//                     _id: action.payload.cart?.items?.[0]?._id || new Date().toISOString(), // Ensure unique _id
//                 };

//                 state.cart.items.push(newItem);
//                 console.log('New item added:', newItem);
//             } else {
//                 console.log("Item already exists in cart");
//             }

//             // Update cart summary
//             state.cart.selectedItems = state.cart.items.length;
//             state.cart.totalPrice = state.cart.items.reduce((total, item) => total + item.totalPrice, 0);
//             state.cart.tax = state.cart.taxRate * state.cart.totalPrice;
//             state.cart.grandTotal = state.cart.totalPrice + state.cart.tax;
//         },


//         setProducts: (state, action) => {
//             console.log('sfjshfja', action.payload)
//             state.products = action.payload; // This will set the products to the payload from the action
//             state.selectedItems = action.payload.length; // Set selected items count
//             state.totalPrice = action.payload.reduce((sum, item) => { return sum + (item.product.price * item.quantity) }, 0); // Calculate total price
//             state.tax = state.totalPrice * state.taxRate; // Calculate tax based on the total price
//             state.grandTotal = state.totalPrice + state.tax; // Calculate grand total
//         },

//         setCartId(state, action) {
//             state.cartId = action.payload; // Reducer to set cartId
//         },
//         updateQuantity: (state, action) => {
//             console.log('hello world', action.payload)
//             const products = state.products.map((item) => {
//                 if (item.product._id == action.payload.id) {
//                     if (action.payload.type === 'increment') {
//                         item.quantity += 1;
//                     }
//                     else if (action.payload.type === 'decrement') {
//                         if (item.quantity > 1) {
//                             item.quantity -= 1;
//                         }
//                     }
//                 }
//                 return item;
//             });
//             console.log('hellsofasofasofosaf', products)
//             state.products = products;
//             state.selectedItems = products.length
//             state.totalPrice = products.reduce((total, item) => {
//                 return total + (item.quantity * item.product.price); // Make sure to return the accumulated total
//             }, 0);
//             state.tax = state.taxRate * state.totalPrice
//             state.grandTotal = state.totalPrice + state.tax
//         },
//         removeFromCart: (state, action) => {
//             state.products = state.products.filter((item) => item.product._id !== action.payload.id);
//             state.selectedItems = state.products.length
//             state.totalPrice = state.products.reduce((total, item) => {
//                 return total + (item.quantity * item.product.price); // Make sure to return the accumulated total
//             }, 0);
//             state.tax = state.taxRate * state.totalPrice
//             state.grandTotal = state.totalPrice + state.tax
//         },
//         clearCart: (state) => {
//             state.products = [];
//             state.selectedItems = 0;
//             state.totalPrice = 0;
//             state.tax = 0;
//             state.grandTotal = 0;
//         },


//     },
// });
// //Utility Functions
// export const setSelectedItems = (state) => state.products.reduce((total, product) => {
//     return Number(total + product.quantity)
// }, 0)

// export const setTotalPrice = (state) => state.products.reduce((total, product) => {
//     return Number(total + product.quantity * product.price)
// }, 0)

// export const setTax = (state) => setTotalPrice(state) * state.taxRate;

// export const setGrandTotal = (state) => {
//     return setTotalPrice(state) + setTotalPrice(state) * state.taxRate;
// }


// export const { addToCart, setCartId, updateQuantity, cartFetch, removeFromCart, clearCart, setProducts } = cartSlice.actions;
// export default cartSlice.reducer



import { createSlice,current } from '@reduxjs/toolkit';

const initialState = {
    cartId: null, // Cart ID for backend tracking
    cart: {
        items: [],
        selectedItems: 0,
        totalPrice: 0,
        tax: 0,
        taxRate: 0.05,
        grandTotal: 0,
    },
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

        addToCart: (state, action) => {
            const newItem = action.payload;
            console.log('New Item:', newItem);
        
            // Extract necessary properties from newItem
            const {  quantity, totalPrice } = newItem;

            const {product:product} = newItem?.cart?.items.at(-1);
            console.log('himanshu',product)

            const newItemColor = product?.color;
            const newItemSize = product?.sizes;

            console.log('kushi', current(state.cart)); 


        
            // Find existing item in the cart based on product ID, color, and size
            const existingItemIndex = state.cart.items.findIndex(
                (item) =>
                    item.product._id === product._id &&
                    (item.product.color) === newItemColor &&
                    (item.product.sizes[0]) === newItemSize[0]
            );

            console.log('existingItemIndex',existingItemIndex);
            
            if (existingItemIndex >= 0) {
                // Update quantity and total price if the product already exists in the cart
                state.cart.items[existingItemIndex] = {
                    ...state.cart.items[existingItemIndex], // Preserve existing item properties
                    quantity: state.cart.items[existingItemIndex].quantity + 1,
                    totalPrice: (state.cart.items[existingItemIndex].quantity + 1) * product.price,
                };


                    console.log(' my fnal from the existing cart item',current(state.cart.items))
            } else {
                // Add the new product to the cart
                state.cart.items.push({ ...newItem, totalPrice: quantity * product.price });
                console.log(' my fnal from the non existing cart item')

            }
        
            // Update the cart summary
            state.cart.selectedItems = state.cart.items.length;
            state.cart.totalPrice = state.cart.items.reduce((total, item) => total + item.totalPrice, 0);
            state.cart.tax = state.cart.taxRate * state.cart.totalPrice;
            state.cart.grandTotal = state.cart.totalPrice + state.cart.tax;
        },
        

        // addToCart: (state, action) => {
        //     const newItem = action.payload;
        //     console.log('newitem',newItem );
            

        //     // Ensure colors are strings or use a comparable format
        //     const newItemColors = Array.isArray(newItem.colors) ? newItem.colors.join(',') : newItem.colors;

        //     const existingItemIndex = state.cart.items.findIndex(
        //         (item) =>
        //             item.product._id === newItem.product._id &&
        //             item.size === newItem.size &&
        //             (Array.isArray(item.colors) ? item.colors.join(',') : item.colors) === newItemColors
        //     );

        //     if (existingItemIndex >= 0) {
        //         // If the product with the same size and color already exists, increase its quantity
        //         state.cart.items[existingItemIndex].quantity += newItem.quantity;
        //         state.cart.items[existingItemIndex].totalPrice =
        //             state.cart.items[existingItemIndex].quantity *
        //             state.cart.items[existingItemIndex].product.price;
        //     } else {
        //         // If the product does not exist in the cart, add it
        //         state.cart.items.push(newItem);
        //     }

        //     // Update the cart summary
        //     state.cart.selectedItems = state.cart.items.length;
        //     state.cart.totalPrice = state.cart.items.reduce(
        //         (total, item) => total + item.totalPrice,
        //         0
        //     );
        //     state.cart.tax = state.cart.taxRate * state.cart.totalPrice;
        //     state.cart.grandTotal = state.cart.totalPrice + state.cart.tax;
        // },


        setProducts: (state, action) => {
            state.cart.items = action.payload;
            state.cart.selectedItems = action.payload.length;
            state.cart.totalPrice = action.payload.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
            state.cart.tax = state.cart.totalPrice * state.cart.taxRate;
            state.cart.grandTotal = state.cart.totalPrice + state.cart.tax;
        },

        setCartId: (state, action) => {
            state.cartId = action.payload;
        },

        updateQuantity: (state, action) => {
            console.log('Updating quantity:', action.payload);
            state.cart.items = state.cart.items.map((item) => {
                if (item.product._id === action.payload.id) {
                    if (action.payload.type === 'increment') {
                        item.quantity += 1;
                        item.totalPrice = item.quantity * item.product.price;
                    } else if (action.payload.type === 'decrement' && item.quantity > 1) {
                        item.quantity -= 1;
                        item.totalPrice = item.quantity * item.product.price;
                    }
                }
                return item;
            });

            // Update cart totals
            state.cart.selectedItems = state.cart.items.length;
            state.cart.totalPrice = state.cart.items.reduce((total, item) => total + item.totalPrice, 0);
            state.cart.tax = state.cart.taxRate * state.cart.totalPrice;
            state.cart.grandTotal = state.cart.totalPrice + state.cart.tax;
        },

        removeFromCart: (state, action) => {
            state.cart.items = state.cart.items.filter((item) => item.product._id !== action.payload.id);
            state.cart.selectedItems = state.cart.items.length;
            state.cart.totalPrice = state.cart.items.reduce((total, item) => total + item.totalPrice, 0);
            state.cart.tax = state.cart.taxRate * state.cart.totalPrice;
            state.cart.grandTotal = state.cart.totalPrice + state.cart.tax;
        },

        clearCart: (state) => {
            state.cart.items = [];
            state.cart.selectedItems = 0;
            state.cart.totalPrice = 0;
            state.cart.tax = 0;
            state.cart.grandTotal = 0;
        },
    },
});

// Utility functions
export const setSelectedItems = (state) =>
    state.cart.items.reduce((total, product) => total + product.quantity, 0);

export const setTotalPrice = (state) =>
    state.cart.items.reduce((total, product) => total + product.quantity * product.product.price, 0);

export const setTax = (state) => setTotalPrice(state) * state.cart.taxRate;

export const setGrandTotal = (state) => setTotalPrice(state) + setTax(state);

export const { addToCart, setCartId, updateQuantity, removeFromCart, clearCart, setProducts } = cartSlice.actions;
export default cartSlice.reducer;

// addToCart: (state, action) => {
//     console.log('Adding product:', action.payload);

//     // Ensure cart exists
//     if (!state.cart.items) {
//         state.cart.items = [];
//     }

//     // Check if the product already exists in the cart
//     const isExist = state.cart.items.find((item) => item.product._id === action.payload.product._id);

//     if (!isExist) {
//         const newItem = {
//             product: action.payload.product,
//             quantity: 1,
//             totalPrice: action?.payload?.product?.price,
//             _id: action.payload._id || new Date().toISOString(),
//         };

//         state.cart.items.push(newItem);
//         console.log('New item added:', newItem);
//     } else {
//         console.log('Item already exists in cart');
//     }

//     // Update cart summary
//     state.cart.selectedItems = state.cart.items.length;
//     state.cart.totalPrice = state.cart.items.reduce((total, item) => total + item.totalPrice, 0);
//     state.cart.tax = state.cart.taxRate * state.cart.totalPrice;
//     state.cart.grandTotal = state.cart.totalPrice + state.cart.tax;
// },

