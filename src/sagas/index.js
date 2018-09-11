import {
  FETCH_USER,
  FETCH_USER_FAILED,
  FETCH_USER_SUCCESS,
  PUT_NAME,
  PUT_NAME_FAILED,
  PUT_NAME_SUCCESS,
  PUT_IMAGE,
  PUT_IMAGE_SUCCESS,
  PUT_IMAGE_FAILED,
  DELETE_IMAGE_SUCCESS,
  DELETE_IMAGE_FAILED,
  DELETE_IMAGE,
  PUT_OVERVIEW,
  PUT_OVERVIEW_SUCCESS,
  PUT_OVERVIEW_FAILED,
  PUT_NUMBER,
  PUT_NUMBER_SUCCESS,
  PUT_NUMBER_FAILED,
  SENT_OFFER,
  SENT_OFFER_SUCCESS,
  SENT_OFFER_FAILED,
  SET_USER_SUCCESS,
  SET_USER_FAILED,
  SET_USER,
  DELETE_USER,
  LOGOUT_USER,
} from '../config/constants';
import moment from 'moment';
import { NavigationActions, StackActions } from 'react-navigation';
import { takeEvery, select, put } from 'redux-saga/effects';
import { db_makeOffer, db_setUser, db_setImages, db_deleteImages, db_deleteUser, db_getUser } from '../utils/firebase';
import { storage_deleteUser, storage_deleteImage } from '../utils/storage';

function* fetchUser(action) {
  try {
    const gender = action.payload.gender || this.props;
    let user = yield db_getUser(action.payload.userId, gender);

    if (!user || !user.completeRegister) {
      user = yield db_setUser(action.payload);
      yield put({
        type: FETCH_USER_SUCCESS,
        payload: { ...user },
      });
    } else {
      yield db_setUser(action.payload);
      yield put({
        type: FETCH_USER_SUCCESS,
        payload: { ...user },
      });
    }
  } catch (e) {
    yield put({ type: FETCH_USER_FAILED, message: e.message });
  }
}
function* putName(action) {
  try {
    const userId = yield select(state => state.user.userId);
    const gender = yield select(state => state.user.gender);
    const user = yield db_setUser({ userId, gender, name: action.name });
    yield put({ type: PUT_NAME_SUCCESS, name: user.name });
    yield put(NavigationActions.navigate({ routeName: 'UploadImages' }));
  } catch (e) {
    yield put({ type: PUT_NAME_FAILED, message: e.message });
  }
}
function* putImageUrl(action) {
  try {
    const userId = yield select(({ user }) => user.userId);
    const gender = yield select(({ user }) => user.gender);
    yield db_setImages(userId, action.index, action.url, action.imageRef, gender);
    yield put({
      type: PUT_IMAGE_SUCCESS,
      imageIndex: action.index,
      imageUrl: action.url,
      imageRef: action.imageRef,
    });
  } catch (e) {
    yield put({ type: PUT_IMAGE_FAILED, message: e.message });
  }
}
function* deleteImage(action) {
  try {
    const image = yield select(({ user }) => user.profileImages[action.index]);
    const userId = yield select(({ user }) => user.userId);
    const gender = yield select(({ user }) => user.gender);
    yield storage_deleteImage(image.imageRef);
    yield db_deleteImages(userId, action.index, gender);
    yield put({ type: DELETE_IMAGE_SUCCESS, imageIndex: action.index });
  } catch (e) {
    yield put({ type: DELETE_IMAGE_FAILED, message: e.message });
  }
}
function* putOverview(action) {
  try {
    const userId = yield select(({ user }) => user.userId);
    const gender = yield select(({ user }) => user.gender);
    yield db_setUser({
      userId,
      gender,
      overview: action.overview,
      completeRegister: gender === 'male',
    });

    yield put({
      type: PUT_OVERVIEW_SUCCESS,
      overview: action.overview,
    });
    yield put(
      NavigationActions.navigate({
        routeName: gender === 'male' ? 'BoyTab' : 'PhoneNumberScreen',
      }),
    );
  } catch (e) {
    yield put({ type: PUT_OVERVIEW_FAILED, message: e.message });
  }
}
function* putNumber(action) {
  try {
    const userId = yield select(({ user }) => user.userId);
    const gender = yield select(({ user }) => user.gender);
    yield db_setUser({
      userId,
      gender,
      number: action.number,
      completeRegister: true,
    });

    yield put({ type: PUT_NUMBER_SUCCESS, number: action.number });
    yield put(
      NavigationActions.navigate({
        routeName: 'GirlTab',
      }),
    );
  } catch (e) {
    yield put({ type: PUT_NUMBER_FAILED, message: e.message });
  }
}
function* setUser(action) {
  try {
    const userId = yield select(({ user }) => user.userId);
    const gender = yield select(({ user }) => user.gender);
    const user = yield db_setUser({ userId, gender, ...action.payload });
    yield put({ type: SET_USER_SUCCESS, payload: user });
    yield put(NavigationActions.back());
  } catch (e) {
    yield put({ type: SET_USER_FAILED, message: e.message });
  }
}
function* sentOffer(action) {
  try {
    const boyId = yield select(({ user }) => user.userId);
    const boyImageUrl = yield select(({ user }) => user.profileImages[0].imageUrl);
    const boyName = yield select(({ user }) => user.name);
    const offerTime = moment().format('YYYY-MM-DD HH:mm');
    const offerId = yield db_makeOffer(boyId, boyName, action.payload, offerTime, boyImageUrl);
    yield put({
      type: SENT_OFFER_SUCCESS,
      payload: {
        ...action.payload,
        offerTime,
        offerId,
        boyImageUrl,
      },
    });
  } catch (e) {
    yield put({ type: SENT_OFFER_FAILED, error: e.message });
  }
}
function* deleteUser() {
  try {
    const profileImages = yield select(({ user }) => user.profileImages);
    const userId = yield select(({ user }) => user.userId);
    const gender = yield select(({ user }) => user.gender);
    yield storage_deleteUser(profileImages);
    yield db_deleteUser(userId, gender);
    yield put({ type: LOGOUT_USER });
    yield put(StackActions.popToTop());
  } catch (e) {
    console.log('-- catch error --', e);
  }
}
const dataSaga = function* dataSaga() {
  yield takeEvery(FETCH_USER, fetchUser);
  yield takeEvery(PUT_NAME, putName);
  yield takeEvery(PUT_IMAGE, putImageUrl);
  yield takeEvery(DELETE_IMAGE, deleteImage);
  yield takeEvery(PUT_OVERVIEW, putOverview);
  yield takeEvery(PUT_NUMBER, putNumber);
  yield takeEvery(SENT_OFFER, sentOffer);
  yield takeEvery(SET_USER, setUser);
  yield takeEvery(DELETE_USER, deleteUser);
};

export default dataSaga;
