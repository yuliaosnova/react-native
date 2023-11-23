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

      // await user.updateProfile({
      //   displayName: name,
      //   email: mail,
      // });

      await updateProfile(auth.currentUser, {
        displayName: name,
        email: mail,
      });

      const { uid, displayName, email } = await auth.currentUser;

      console.log("createUser", uid, displayName, email);

      // const userUpdateProfile = {
      //   nickName: displayName,
      //   userId: uid,
      // };

      dispatch(
        authSlice.actions.updateUserProfile({
          usrId: uid,
          nickName: displayName,
          email: email,
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
    if (user) {
      const userUpdateProfile = {
        nickName: user.displayName,
        userId: user.uid,
        email: user.email,
      };
      dispatch(authSlice.actions.authStateChange({ stateChange: true }));
      dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));
    }
  });
};

export const authSignOutUser = () => async (dispatch) => {
  await signOut(auth);
    dispatch(authSlice.actions.authSignOut());
};
