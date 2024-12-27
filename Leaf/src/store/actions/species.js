import axios from 'axios';
const baseURL = `http://10.2.60.87:5000/api/species`;


export const getSpecies = (id, page) => async (dispatch) => {
  try {
    const respone = await api.getSpecies(id, page);
    // console.log(respone);
    if (respone?.error === 0) {
      dispatch({
        type: actionTypes.GET_SPECIES,
        species: respone.respone,
      });
    } else {
      dispatch({
        type: actionTypes.GET_SPECIES,
        msg: respone.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_SPECIES,
      species: null,
    });
  }
};
