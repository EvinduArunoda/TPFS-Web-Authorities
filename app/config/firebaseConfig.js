import firebase from 'firebase';

const fbConfig = {
  apiKey: 'AIzaSyAUJyckRg47f7Qv6K_Ixx-fHpEkVgw_qmQ',
  authDomain: 'e-fining-sep.firebaseapp.com',
  databaseURL: 'https://e-fining-sep.firebaseio.com',
  projectId: 'e-fining-sep',
  storageBucket: 'e-fining-sep.appspot.com',
  messagingSenderId: '511891416337',
  appId: '1:511891416337:web:f6cd672008c7d5a7ca58b0',
  measurementId: 'G-TVH7V1HL9R'
};

firebase.initializeApp(fbConfig);
firebase.analytics();
export const firestore = firebase.firestore();

export default firebase;
