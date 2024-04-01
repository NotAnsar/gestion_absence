// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyD11zh-WKJAKCxLR5kfqpiic6sVMgUTqxo',
	authDomain: 'gestion-abscences.firebaseapp.com',
	databaseURL:
		'https://gestion-abscences-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'gestion-abscences',
	storageBucket: 'gestion-abscences.appspot.com',
	messagingSenderId: '826869023895',
	appId: '1:826869023895:web:ad7613fc7e5d55fd3a55d2',
	measurementId: 'G-STJDJ1SF88',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getDatabase(app);

export { app, analytics, db };
