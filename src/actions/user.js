import {
  FETCH_USER,
  PUT_NAME,
  PUT_IMAGE,
  DELETE_IMAGE,
  PUT_OVERVIEW,
  PUT_NUMBER,
  SET_LOADING,
  SET_USER,
  LOGOUT_USER,
  DELETE_USER,
} from '../config/constants';

export const fetchUser = userData => {
  return {
    type: FETCH_USER,
    payload: userData,
  };
};
export const putName = name => ({
  type: PUT_NAME,
  name: name,
});
export const putImageUrl = (index, downloadUrl, imageRef) => ({
  type: PUT_IMAGE,
  index: index,
  url: downloadUrl,
  imageRef: imageRef,
});
export const deleteImage = index => ({
  type: DELETE_IMAGE,
  index: index,
});
export const putOverview = text => ({
  type: PUT_OVERVIEW,
  overview: text,
});
export const putNumber = number => ({
  type: PUT_NUMBER,
  number: number,
});
export const setLoading = flag => ({
  type: SET_LOADING,
  flag: flag,
});
export const setUser = data => ({
  type: SET_USER,
  payload: data,
});
export const logoutUser = () => ({
  type: LOGOUT_USER,
});
export const deleteUser = () => ({
  type: DELETE_USER,
});
