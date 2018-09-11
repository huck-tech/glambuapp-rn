import * as _ from 'lodash';
import {
  FETCH_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILED,
  PUT_NAME,
  PUT_NAME_SUCCESS,
  PUT_NAME_FAILED,
  PUT_IMAGE,
  PUT_IMAGE_FAILED,
  PUT_IMAGE_SUCCESS,
  DELETE_IMAGE,
  DELETE_IMAGE_SUCCESS,
  DELETE_IMAGE_FAILED,
  PUT_OVERVIEW,
  PUT_OVERVIEW_SUCCESS,
  PUT_OVERVIEW_FAILED,
  PUT_NUMBER,
  PUT_NUMBER_SUCCESS,
  PUT_NUMBER_FAILED,
  SENT_OFFER,
  SENT_OFFER_SUCCESS,
  SENT_OFFER_FAILED,
  SET_LOADING,
  SET_USER,
  SET_USER_SUCCESS,
  SET_USER_FAILED,
  LOGOUT_USER,
  DELETE_USER,
} from '../config/constants';

const initialState = {
  email: '',
  userId: '',
  gender: '',
  name: '',
  overview: '',
  isLoading: false,
  error: '',
  profileImages: [null, null, null, null, null, null],
  offers: [],
  lastOffer: null,
};

export default (state = initialState, action) => {
  const { profileImages, offers } = state;
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        error: '',
      };
    case FETCH_USER_FAILED:
      return {
        ...state,
        error: action.message,
        isLoading: false,
      };
    case PUT_NAME:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case PUT_NAME_SUCCESS:
      return {
        ...state,
        name: action.name,
        error: '',
        isLoading: false,
      };
    case PUT_NAME_FAILED:
      return {
        ...state,
        error: action.message,
        isLoading: false,
      };
    case PUT_IMAGE:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case PUT_IMAGE_SUCCESS:
      profileImages[action.imageIndex] = {
        imageUrl: action.imageUrl,
        imageRef: action.imageRef,
      };
      return {
        ...state,
        profileImages: _.cloneDeep(profileImages),
        isLoading: false,
        error: '',
      };
    case PUT_IMAGE_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.message,
      };
    case DELETE_IMAGE:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case DELETE_IMAGE_SUCCESS:
      profileImages[action.imageIndex] = null;
      return {
        ...state,
        isLoading: false,
        profileImages: _.cloneDeep(profileImages),
        error: '',
      };
    case DELETE_IMAGE_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.message,
      };
    case PUT_OVERVIEW:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case PUT_OVERVIEW_SUCCESS:
      return {
        ...state,
        overview: action.overview,
        isLoading: false,
        error: '',
      };
    case PUT_OVERVIEW_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case PUT_NUMBER:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case PUT_NUMBER_SUCCESS:
      return {
        ...state,
        number: action.number,
        isLoading: false,
        error: '',
      };
    case PUT_NUMBER_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case SENT_OFFER:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case SENT_OFFER_SUCCESS:
      offers.push(action.payload.offerId);
      return {
        ...state,
        isLoading: false,
        lastOffer: action.payload,
        offers: _.cloneDeep(offers),
        error: '',
      };
    case SENT_OFFER_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.flag,
      };
    case SET_USER:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case SET_USER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        error: '',
      };
    case SET_USER_FAILED:
      return {
        ...state,
        isLoading: false,
        error: '',
      };
    case LOGOUT_USER:
      return initialState;
    case DELETE_USER:
      return {
        ...initialState,
        isLoading: true,
      };
    default:
      return state;
  }
};
