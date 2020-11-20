import * as firebase from 'firebase';


const fireBaseConfig = {
  apiKey: "AIzaSyCW4nG91-2IXUkhdk-qs6oScMqkCek9yPM",
  authDomain: "designcode-41809.firebaseapp.com",
  dataBaseUrl: "https://designcode-41809.firebaseio.com",
  storageBucket: "designcode-41809.appspot.com",
}

firebase.initializeApp(fireBaseConfig);

export default firebase;