import { createSlice } from "@reduxjs/toolkit";

const initialState = {expense: []}

const ExpenseSlice = createSlice({
    name: "expense",
    initialState: initialState,
    reducers: {
        addExpense(state, action) {
            const updatedExpense = [...state.expense , ...action.payload]
            state.expense = updatedExpense
        },

        removeExpense(state,action) {
            state.expense = action.payload
        }
    }
});

export const expenseActions = ExpenseSlice.actions;
export default ExpenseSlice.reducer;