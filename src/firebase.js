import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


    const firebaseConfig = {
        apiKey: "AIzaSyAbnxBjCKpHwMPtoNEME7o4jaNLXNusZVU",
        authDomain: "vokab-e019e.firebaseapp.com",
        projectId: "vokab-e019e",
        storageBucket: "vokab-e019e.appspot.com",
        messagingSenderId: "709884288274",
        appId: "1:709884288274:web:c6a181ca52e4b16864a7cb",
        measurementId: "G-PP8CGXCQ1D"
    }

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
