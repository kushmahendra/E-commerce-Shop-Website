import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orders: [],
    selectedOrder: null,
    orderStatus: 'Pending', 
    error: null,
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrders: (state, action) => {
            state.orders = action.payload;
        },
        addOrder: (state, action) => {
            state.orders.push(action.payload);
        },
        updateOrderStatus: (state, action) => {
            const { orderId, status } = action.payload;
            const existingOrder = state.orders.find((order) => order.id === orderId);
            if (existingOrder) {
                existingOrder.status = status;
            }
        },
        removeOrder: (state, action) => {
            state.orders = state.orders.filter((order) => order.id !== action.payload);
        },
        selectOrder: (state, action) => {
            state.selectedOrder = state.orders.find((order) => order.id === action.payload);
        },
        clearSelectedOrder: (state) => {
            state.selectedOrder = null;
        },
    },
    extraReducers: (builder) => {
        // Handle async actions here if needed using builder.addCase
    },
});

export const {
    setOrders,
    addOrder,
    updateOrderStatus,
    removeOrder,
    selectOrder,
    clearSelectedOrder,
} = orderSlice.actions;

export default orderSlice.reducer;