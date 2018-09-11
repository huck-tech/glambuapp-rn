import firebase from 'react-native-firebase';
import geolib from 'geolib';
import * as _ from 'lodash';
import async from 'async';
import { _oppUserImages, _oppUsersRef, _usersRef } from './firebase';
const _offersRef = firebase.firestore().collection('offers');

export function toHexString(byteArray) {
  return Array.from(byteArray, function(byte1) {
    return ('0' + (byte1 & 0xff).toString(16)).slice(-2);
  }).join('');
}

export const getMasonryData = gender => {
  return new Promise((resolve, reject) => {
    let masonryData = [];
    _oppUsersRef(gender)
      .get()
      .then(res => {
        async.each(
          res.docs,
          (doc, done) => {
            const data = _.pick(doc.data(), ['userId', 'name', 'age', 'location']);
            _oppUserImages(data.userId, gender)
              .get()
              .then(images => {
                const uri = images.docs[0].data().url;
                const girl = { uri, data };
                masonryData.push(girl);
                done();
              })
              .catch(err => {
                done(err);
              });
          },
          err => {
            if (err) {
              reject(err);
            } else {
              resolve(masonryData);
            }
          },
        );
      });
  });
};

export const getFriendsData = (userId, gender) => {
  return new Promise((resolve, reject) => {
    async.waterfall(
      [
        completed => {
          _oppUsersRef(gender)
            .doc(userId)
            .get()
            .then(user => {
              const userInfo = _.pick(user.data(), ['age', 'name', 'overview', 'userId', 'number']);
              completed(null, userInfo);
            })
            .catch(err => {
              completed(err);
            });
        },
        (userInfo, completed) => {
          _oppUserImages(userId, gender)
            .get()
            .then(images => {
              let imageUrls = [];
              images.docs.forEach(image => {
                imageUrls.push(image.data().url);
              });
              const friendData = { ...userInfo, imageUrls };
              completed(null, friendData);
            })
            .catch(err => {
              completed(err);
            });
        },
      ],
      (err, friendData) => {
        if (err) {
          reject(err);
        } else {
          resolve(friendData);
        }
      },
    );
  });
};

export const checkingMatchOffer = (offers, userId) => {
  let isFriend = false;
  return new Promise((resolve, reject) => {
    async.each(
      offers,
      (offer, done) => {
        _offersRef
          .doc(offer)
          .get()
          .then(res => {
            if (res.exists && res.data().girlId === userId) {
              isFriend = res.data();
            }
            done();
          })
          .catch(err => {
            done(err);
          });
      },
      err => {
        if (err) {
          reject(err);
        } else {
          resolve(isFriend);
        }
      },
    );
  });
};

export const db_getAllOffers = (userId, gender) => {
  return new Promise((resolve, reject) => {
    let list = [];
    async.waterfall(
      [
        done => {
          _usersRef(gender)
            .doc(userId)
            .get()
            .then(res => {
              if (res.exists) {
                done(null, res.data().offers);
              } else {
                done('USER NOT EXIST');
              }
            });
        },
        (offers, done) => {
          if (offers) {
            async.each(
              offers,
              (offerId, loopDone) => {
                _offersRef
                  .doc(offerId)
                  .get()
                  .then(res => {
                    if (res.exists) {
                      list.push(res.data());
                    }
                    loopDone();
                  });
              },
              err => {
                if (err) {
                  done(err);
                } else {
                  done(null, list);
                }
              },
            );
          } else {
            done(null, null);
          }
        },
      ],
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      },
    );
  });
};

export const getDistance = (currentLot, targetLot) => {
  const meteors = geolib.getDistance(currentLot, targetLot);
  return geolib.convertUnit('km', meteors, 2);
};
