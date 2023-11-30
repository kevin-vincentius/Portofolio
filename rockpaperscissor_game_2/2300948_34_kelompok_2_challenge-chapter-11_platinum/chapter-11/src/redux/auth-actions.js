import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { authActions } from "./authSlice";
import { doc, getDoc, setDoc } from "firebase/firestore";
// for resetting score when the user logout
import { resetSessionValues } from './gameSlice'; 


export const logout = () => {
  return async (dispatch) => {
    const auth = getAuth();
    try {
      await signOut(auth);
      dispatch(authActions.logOut());
      dispatch(resetSessionValues());
    } catch (err) {
      console.error(err);
    }
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log("usercredential:", userCredential.user);
      dispatch(authActions.loginPending());
      if (userCredential.user) {
        const userDocRef = doc(db, "Users", userCredential.user.uid);
        const userDocSnapshot = await getDoc(userDocRef);
        const userData = userDocSnapshot.data();

        dispatch(
          authActions.loginSuccess({
            uid: userCredential.user.uid,
            username: userData.username,
          })
        );
      }
    } catch (err) {
      switch (err.code) {
        case "auth/invalid-email":
          dispatch(authActions.loginFailed("Invalid email address."));
          break;
        case "auth/user-disabled":
          dispatch(authActions.loginFailed("User account is disabled."));
          break;
        case "auth/user-not-found":
        case "auth/wrong-password":
          dispatch(authActions.loginFailed("Invalid email or password."));
          break;
        default:
          dispatch(
            authActions.loginFailed("Login failed. Please try again later.")
          );
          break;
      }
    }
  };
};

export const signInWithGoogle = (provider) => {
  return async (dispatch) => {
    const auth = getAuth();

    try {
      const userCredential = await signInWithPopup(auth, provider);
      // console.log("google user: ", userCredential.user);

      if (userCredential.user) {
        const userDocRef = doc(db, "Users", userCredential.user.uid);
        const userDocSnapshot = await getDoc(userDocRef);
        if (!userDocSnapshot.exists()) {
          const userData = {
            username: userCredential.user.displayName,
            email: userCredential.user.email,
            totalWins: 0,
            totalLosses: 0,
          };
          await setDoc(userDocRef, userData);

          dispatch(
            authActions.loginSuccess({
              uid: userCredential.user.uid,
              username: userCredential.user.displayName,
            })
          );
        }
      }
    } catch (err) {
      switch (err.code) {
        case "auth/invalid-email":
          dispatch(authActions.loginFailed("Invalid email address."));
          break;
        case "auth/user-disabled":
          dispatch(authActions.loginFailed("User account is disabled."));
          break;
        case "auth/user-not-found":
        case "auth/wrong-password":
          dispatch(authActions.loginFailed("Invalid email or password."));
          break;
        default:
          dispatch(
            authActions.loginFailed("Login failed. Please try again later.")
          );
          break;
      }
    }
  };
};


export const register = ({ username, email, password }) => {
  return async (dispatch) => {
    try {
      dispatch(authActions.registerPending())

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      const userDocRef = doc(db, "Users", user.uid);
      const userDocSnapshot = await getDoc(userDocRef);

      if (!userDocSnapshot.exists()) {
        const userData = {
          username: username,
          email: email,
          totalWins: 0,
          totalLosses: 0,
        };

        await setDoc(userDocRef, userData);
        dispatch(authActions.registerSuccess())
      }
    } catch (err) {
      // console.log(err)
      // switch (err.code) {
      //   case "auth/email-already-in-use":
      //     dispatch(authActions.registerFailed("Email already in use"));
      //     break;
      //   case "auth/weak-password":
      //     dispatch(authActions.registerFailed("Weak password"));
      //     break;
      //   default:
      //     dispatch(authActions.registerFailed("Registration failed. Please try again"));
      // }
    }
  }
}




