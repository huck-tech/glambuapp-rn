import firebase from 'react-native-firebase';

export const requestNotificationPermission = async () => {
  const enabled = await firebase.messaging().hasPermission();
  console.log('%%%', enabled);
  return new Promise((resolve, reject) => {
    if (enabled) {
      resolve(true);
    } else {
      firebase
        .messaging()
        .requestPermission()
        .then(() => resolve(true))
        .catch(err => reject(err));
    }
  });
};
