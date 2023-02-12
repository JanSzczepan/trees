import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
   apiKey: 'AIzaSyDibEFcIfknOQSsqnrAv3dWRDdh0UCporc',
   authDomain: 'trees-63c00.firebaseapp.com',
   projectId: 'trees-63c00',
   storageBucket: 'trees-63c00.appspot.com',
   messagingSenderId: '510082151610',
   appId: '1:510082151610:web:15c3a9cd0e8bc48c4b7e83',
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
