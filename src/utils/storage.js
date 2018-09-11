import firebase from 'react-native-firebase';
import async from 'async';

export const storage_putImage = (userId, fileName, filePath) => {
  const _ImageRef = firebase.storage().ref(`${userId}/${fileName}`);
  return new Promise((resolve, reject) => {
    _ImageRef
      .putFile(`${filePath}`)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const storage_deleteImage = imageRef => {
  const _ImageRef = firebase.storage().ref(imageRef);
  return new Promise((resolve, reject) => {
    _ImageRef
      .delete()
      .then(() => {
        resolve();
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const storage_deleteUser = profileImages => {
  return new Promise((resolve, reject) => {
    async.each(
      profileImages,
      (image, completed) => {
        if (image) {
          const _ImageRef = firebase.storage().ref(image.imageRef);
          _ImageRef
            .delete()
            .then(() => {
              console.log('-- storage delete user success --');
              completed();
            })
            .catch(error => {
              console.log('-- storage delete user failed --', error);
              completed(error);
            });
        } else {
          completed();
        }
      },
      err => {
        if (err) {
          reject('Delete user error');
        } else {
          resolve('success');
        }
      },
    );
  });
};
