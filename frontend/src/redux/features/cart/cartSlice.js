
import React from 'react'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cartId: null, // Add cartId here
    products: [],
    selectedItems: 0,
    totalPrice: 0,
    tax: 0,
    taxRate: 0.05,
    grandTotal: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const isExist = state.products.find((product) => product._id === action.payload.id);
            console.log('payload', action.payload)
            console.log('state data', state.products)
            if (!isExist) {
                state.products.push({ product: action.payload, quantity: 1 })

            }
            else {
                console.log("Items already added")
            }
            state.selectedItems = state.products.length
            state.totalPrice = state.products.reduce((total, item) => { return Number(total + item.quantity * item.product.price) }, 0)
            state.tax = state.taxRate * state.totalPrice
            state.grandTotal = state.totalPrice + state.tax
        },
        setProducts: (state, action) => {
            console.log('sfjshfja', action.payload)
            state.products = action.payload; // This will set the products to the payload from the action
            state.selectedItems = action.payload.length; // Set selected items count
            state.totalPrice = action.payload.reduce((sum, item) => { return sum + (item.product.price * item.quantity) }, 0); // Calculate total price
            state.tax = state.totalPrice * state.taxRate; // Calculate tax based on the total price
            state.grandTotal = state.totalPrice + state.tax; // Calculate grand total
        },
        setCartId(state, action) {
            state.cartId = action.payload; // Reducer to set cartId
        },
        updateQuantity: (state, action) => {
            console.log('hello world', action.payload)
            const products = state.products.map((item) => {
                if (item.product._id == action.payload.id) {
                    if (action.payload.type === 'increment') {
                        item.quantity += 1;
                    }
                    else if (action.payload.type === 'decrement') {
                        if (item.quantity > 1) {
                            item.quantity -= 1;
                        }
                    }
                }
                return item;
            });
            console.log('hellsofasofasofosaf', products)
            state.products = products;
            state.selectedItems = products.length
            state.totalPrice = products.reduce((total, item) => {
                return total + (item.quantity * item.product.price); // Make sure to return the accumulated total
            }, 0);
            state.tax = state.taxRate * state.totalPrice
            state.grandTotal = state.totalPrice + state.tax
        },
        removeFromCart: (state, action) => {
            state.products = state.products.filter((item) => item.product._id !== action.payload.id);
            state.selectedItems = state.products.length
            state.totalPrice = state.products.reduce((total, item) => {
                return total + (item.quantity * item.product.price); // Make sure to return the accumulated total
            }, 0);
            state.tax = state.taxRate * state.totalPrice
            state.grandTotal = state.totalPrice + state.tax
        },
        clearCart: (state) => {
            state.products = [];
            state.selectedItems = 0;
            state.totalPrice = 0;
            state.tax = 0;
            state.grandTotal = 0;
        },

    },
});
//Utility Functions
export const setSelectedItems = (state) => state.products.reduce((total, product) => {
    return Number(total + product.quantity)
}, 0)

export const setTotalPrice = (state) => state.products.reduce((total, product) => {
    return Number(total + product.quantity * product.price)
}, 0)

export const setTax = (state) => setTotalPrice(state) * state.taxRate;

export const setGrandTotal = (state) => {
    return setTotalPrice(state) + setTotalPrice(state) * state.taxRate;
}



export const { addToCart, setCartId, updateQuantity, cartFetch, removeFromCart, clearCart, setProducts } = cartSlice.actions;
export default cartSlice.reducer


