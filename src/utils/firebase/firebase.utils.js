import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ecommerce-c2f65.firebaseapp.com",
  projectId: "ecommerce-c2f65",
  storageBucket: "ecommerce-c2f65.firebasestorage.app",
  messagingSenderId: "610402192524",
  appId: "1:610402192524:web:81378e9426e5a23224bfa9",
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signinWithGooglePopUp = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const addCollectionadnDocument = async (collectionkey, objetsToAdd) => {
  const collectionref = collection(db, collectionkey);
  const batch = writeBatch(db);

  objetsToAdd.forEach((object) => {
    const docRef = doc(collectionref, object.title.toLowerCase());
    batch.set(docRef, object);
  });
  await batch.commit();
  console.log("done");
};

export const getCategoriesAndDocuments = async () => {
  const collectionref = collection(db, "categories");
  const q = query(collectionref);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());

  // return categoryMap;
};

export const createUserDocumentFromAuth = async (userauth, additionalinfo) => {
  if (!userauth) return;
  const userdocref = doc(db, "users", userauth.uid);

  const usersnapshot = await getDoc(userdocref);

  if (!usersnapshot.exists()) {
    const { displayName, email } = userauth;
    const createdAt = new Date();

    try {
      await setDoc(userdocref, {
        displayName,
        email,
        createdAt,
        ...additionalinfo,
      });
    } catch (error) {
      console.log(error, "Error created user");
    }
  }
  return userdocref;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const SignOutUser = async () => signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
