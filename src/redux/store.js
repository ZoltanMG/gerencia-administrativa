import { configureStore } from "@reduxjs/toolkit";
import configReducer from "./configSlice.js";

export const store = configureStore({
    reducer: {
        config: configReducer,
    },
});
