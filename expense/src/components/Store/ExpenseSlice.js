import { createSlice } from "@reduxjs/toolkit";

const initialState = {expense: [], totalAmount: 0}

const ExpenseSlice = createSlice({
    name: "expense",
    initialState: initialState,
    reducers: {
        addExpense(state, action) {
            state.expense = [...state.expense , ...action.payload.expense];
            state.totalAmount = Number(state.totalAmount) + Number(action.payload.totalAmount);
        },

        removeExpense(state,action) {
            state.expense = action.payload.expense;
            state.totalAmount = action.payload.totalAmount;
        }
    }
});

export const expenseActions = ExpenseSlice.actions;
export default ExpenseSlice.reducer;