import firebase from 'react-native-firebase';
import async from 'async';
export const _usersRef = gender => firebase.firestore().collection(gender);
export const _oppUsersRef = gender => firebase.firestore().collection(gender == 'male' ? 'female' : 'male');
const _offersRef = firebase.firestore().collection('offers');
export const _userImages = (userId, gender) =>
  firebase
    .firestore()
    .collection(gender)
    .doc(userId)
    .collection('profile_images');
export const _oppUserImages = (userId, gender) =>
  firebase
    .firestore()
    .collection(gender == 'male' ? 'female' : 'male')
    .doc(userId)
    .collection('profile_images');

export const db_getUser = (userId, gender) => {
  return new Promise((resolve, reject) => {
    async.waterfall(
      [
        completed => {
          console.log('&&& get user', gender, userId);
          _usersRef(gender)
            .doc(userId)
            .get()
            .then(res => {
              if (res.exists) {
                completed(null, res.data());
              } else {
                completed(null, false);
              }
            })
            .catch(error => {
              completed({ message: error.message });
            });
        },
        (user, completed) => {
          if (user) {
            _userImages(userId, gender)
              .get()
              .then(images => {
                let profileImages = [];
                images.docs.forEach(image => {
                  profileImages.push({
                    imageUrl: image.data().url,
                    imageRef: image.data().ref,
                  });
                });
                const userInfo = { ...user, profileImages };
                completed(null, userInfo);
              })
              .catch(err => completed(err));
          } else {
            completed(null, false);
          }
        },
      ],
      (err, results) => {
        if (err) {
          console.log('^^^^ get', err);
          reject(err);
        } else {
          resolve(results);
        }
      },
    );
  });
};
export const db_setUser = userData => {
  return new Promise((resolve, reject) => {
    _usersRef(userData.gender)
      .doc(userData.userId)
      .set(userData, { merge: true })
      .then(() => {
        resolve(userData);
      })
      .catch(err => {
        reject({ err, message: 'Save User Date Failed' });
      });
  });
};

export const db_setImages = (userId, imageIndex, imageUrl, imageRef, gender) => {
  return new Promise((resolve, reject) => {
    _userImages(userId, gender)
      .doc(imageIndex.toString())
      .set({
        url: imageUrl,
        ref: imageRef,
      })
      .then(() => {
        resolve();
      })
      .catch(err => {
        reject({ err, message: 'Save Images Failed' });
      });
  });
};
export const db_deleteImages = (userId, imageIndex, gender) => {
  return new Promise((resolve, reject) => {
    _userImages(userId, gender)
      .doc(imageIndex.toString())
      .delete()
      .then(() => {
        resolve();
      })
      .catch(err => {
        reject({ err, message: 'Delete Images Failed' });
      });
  });
};

export const db_deleteUser = (userId, gender) => {
  return new Promise((resolve, reject) => {
    async.waterfall(
      [
        completed => {
          _usersRef(gender)
            .doc(userId)
            .collection('profile_images')
            .get()
            .then(querySnapshot => {
              querySnapshot.docs.forEach(doc => doc.ref.delete());
              completed(null);
            })
            .catch(err => {
              completed(err);
            });
        },
        completed => {
          _usersRef(gender)
            .doc(userId)
            .delete()
            .then(() => completed(null))
            .catch(err => completed(err));
        },
      ],
      err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      },
    );
  });
};

export const db_makeOffer = (boyId, boyName, offerData, offerTime, boyImageUrl) => {
  return new Promise((resolve, reject) => {
    async.waterfall(
      [
        done => {
          _offersRef
            .add({
              boyId,
              boyName,
              ...offerData,
              offerTime,
              boyImageUrl,
              status: 'PENDING',
            })
            .then(docRef => {
              done(null, docRef.id);
            })
            .catch(err => done(err));
        },
        (offerId, done) => {
          _usersRef('male')
            .doc(boyId)
            .get()
            .then(res => {
              if (res.exists) {
                let offers = res.data().offers ? res.data().offers : [];
                offers.push(offerId);
                _usersRef('male')
                  .doc(boyId)
                  .set({ offers }, { merge: true })
                  .then(() => {
                    done(null, offerId);
                  });
              } else {
                done('USER NOT EXIST');
              }
            });
        },
        (offerId, done) => {
          _usersRef('female')
            .doc(offerData.girlId)
            .get()
            .then(res => {
              if (res.exists) {
                let offers = res.data().offers ? res.data().offers : [];
                offers.push(offerId);
                _usersRef('female')
                  .doc(offerData.girlId)
                  .set({ offers }, { merge: true })
                  .then(() => {
                    done(null, offerId);
                  });
              } else {
                done('USER NOT EXIST');
              }
            });
        },
      ],
      (err, offerId) => {
        if (err) {
          reject(err);
        } else {
          resolve(offerId);
        }
      },
    );
  });
};
export const db_changeOffer = (offerId, status, reason = null) => {
  console.log(offerId, status, reason);
  return new Promise((resolve, reject) => {
    _offersRef
      .doc(offerId)
      .set({ status, reason }, { merge: true })
      .then(() => resolve(true))
      .catch(err => reject(err));
  });
};
