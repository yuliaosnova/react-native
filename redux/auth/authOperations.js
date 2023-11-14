import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { authSlice } from "./authReducer";
import { useDispatch } from "react-redux";

export const registerDB =
  ({ name, mail, password }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, mail, password);

      const user = await auth.currentUser;

      await user.updateProfile({
        displayName: name,
      });

      await updateProfile(auth.currentUser, {
        displayName: name,
      });

      const { uid, displayName } = await auth.currentUser;

      console.log("createUser", uid, displayName);

      // const userUpdateProfile = {
      //   nickName: displayName,
      //   userId: uid,
      // };

      dispatch(
        authSlice.actions.updateUserProfile({
          usrId: uid,
          nickName: displayName,
        })
      );
    } catch (error) {
		console.log("error.message", error.message);
      throw error;
    }
  };

export const loginDB =
  ({ mail, password }) =>
  async (dispatch, getState) => {
    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        mail,
        password
      );
      // console.log("user", credentials.user.uid);
      return credentials.user;
    } catch (error) {
      throw error;
    }
  };

// export const updateUserProfile = async (update) => {
//   const user = auth.currentUser;
//   // якщо такий користувач знайдений
//   if (user) {
//     // оновлюємо його профайл
//     try {
//       await updateProfile(user, update);
//     } catch (error) {
//       throw error;
//     }
//   }
// };

export const authStateChangeUser = () => async (dispatch, getState) => {
  onAuthStateChanged(auth, (user) => {
    console.log("curentUser", user);
    if (user) {
      dispatch(authSlice.actions.authStateChange({ stateChange: true }));
      dispatch(
        authSlice.actions.updateUserProfile({
          nickName: user.displayName,
          userId: user.uid,
        })
      );
    }
  });
};

export const authSignOutUser = () => async (dispatch) => {
  signOut(auth);
  dispatch(authSlice.actions.authSignOut());
  console.log(" User is sign out");
};
