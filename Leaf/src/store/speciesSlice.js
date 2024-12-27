import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  detailspecies: [],
  properties: [],
  species: [],
};

export const speciesSlice = createSlice({
  name: "species",
  initialState,
  reducers: {
    getPropertySuccess: (state, action) => {
      state.detailspecies = action.payload;
    },
    getIdFilterSuccess: (state, action) => {
      state.properties = action.payload;
    },
    getFilterDataSuccess: (state, action) => {
      state.species = action.payload;
    },
  },
});

export const { getPropertySuccess, getIdFilterSuccess, getFilterDataSuccess } =
  speciesSlice.actions;

export const getProperty = (id) => async (dispatch) => {
  try {
    const response = await axios.get(
      `http://10.2.60.87:5000/api/species/get/${id}`
    );
    dispatch(getPropertySuccess(response.data.respone.rows));
  } catch (error) {
    console.error("Error fetching species:", error);
  }
};

export const getFilterData = (filter) => async (dispatch) => {
  try {
    console.log("data", filter);
    const response = await axios.get(
      `http://10.2.60.87:5000/api/species/filter`,
      { params: { data: filter } }
    );
    console.log(response.data);
    dispatch(getFilterDataSuccess(response.data.respone));
  } catch (error) {
    console.error("Error fetching species:", error);
  }
};

export const getIdFilter = (id) => async (dispatch) => {
  try {
    const response = await axios.get(
      `http://10.2.60.87:5000/api/properties/all/${id}`
    );

    dispatch(getIdFilterSuccess(response.data.respone.rows));
  } catch (error) {
    console.error("Error fetching species:", error);
  }
};

export default speciesSlice.reducer;
