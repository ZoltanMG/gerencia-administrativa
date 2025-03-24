import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: {},
  routerFiles: {}
};

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    loadCategories: (state, action) => {
      const { categories, routerFiles } = action.payload;
      state.categories = categories;
      state.categorrouterFilesies = routerFiles;
    },
    loadContratos: (state, action) => {
      state.categories.contratos.subLevel = action.payload;
    },

  },
});

export const { loadCategories, loadContratos } = configSlice.actions;
export default configSlice.reducer;
