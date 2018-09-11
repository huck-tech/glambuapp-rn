const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.createOffer = functions.firestore.document('offers/{offerId}').onCreate(event => {
  // Get an object representing the document
  const { girlId, amount, boyId, boyImageUrl, letter, offerTime, boyName } = event.data();
  const payload = {
    data: {
      amount,
      boyId,
      boyImageUrl,
      letter,
      boyName,
      offerTime,
    },
    notification: {
      title: `Offer from ${boyName}`,
      body: letter,
    },
  };
  admin
    .firestore()
    .collection('female')
    .doc(girlId)
    .get()
    .then(doc => {
      const pushToken = doc.data().deviceToken;
      console.log('-- girl token --', pushToken);
      return admin.messaging().sendToDevice(pushToken, payload);
    })
    .catch(err => console.log('-- err --', err));
  return null;
});
exports.changeOffer = functions.firestore.document('offers/{offerId}').onUpdate((change, context) => {
  if (!change.before.exists || !change.before.exists) {
    return null;
  }
  if (change.before.data().status !== change.after.data().status) {
    const { boyId, amount, status, letter, girlImageUrl, name, reason } = change.after.data();
    let notifBody;
    if (status === 'ACCEPTED') {
      notifBody = {
        title: `Offer accpeted from ${name}`,
        body: letter,
      };
    }

    if (status === 'REJECTED') {
      notifBody = {
        title: `Offer rejceted from ${name}`,
        body: reason,
      };
    }

    const payload = {
      data: {
        amount,
        boyId,
        girlImageUrl,
        letter,
        name,
      },
      notification: notifBody,
    };
    admin
      .firestore()
      .collection('male')
      .doc(boyId)
      .get()
      .then(doc => {
        const pushToken = doc.data().deviceToken;
        console.log('-- boy token --', pushToken);
        return admin.messaging().sendToDevice(pushToken, payload);
      })
      .catch(err => console.log('-- err --', err));
  }
  return null;
});
