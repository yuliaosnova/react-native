import { 
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	updateProfile
} from 'firebase/auth';
import { auth } from '../../firebase/config';

export const registerDB = ({name, mail, password}) => async (  
	dispatch,
	getState
) => {
	console.log(name, mail, password)
  try {
    await createUserWithEmailAndPassword(auth, mail, password);
  } catch (error) {
    throw error;
  }
};

// або більш короткий запис цієї функції
// const registerDB = ({ email, password }) => 
// 		createUserWithEmailAndPassword(auth, email, password);

// const authStateChanged = async (onChange = () => {}) => {
// 		onAuthStateChanged((user) => {
// 				onChange(user);
// 		});
// };

export const loginDB = async ({ email, password }) => {
  try {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
		return credentials.user;
  } catch (error) {
    throw error;
  }
};

export const updateUserProfile = async (update) => {

  const user = auth.currentUser;

  // якщо такий користувач знайдений
  if (user) {

  // оновлюємо його профайл
		try {
			await updateProfile(user, update);
		} catch(error) {
			throw error
		}
  }
};