import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Image,
} from "react-native";

import { Camera } from "expo-camera";
import * as Location from "expo-location";

//  import CameraSvg from "../../assets/icons/camera.svg";
//  import MapPinSvg from "../../assets/icons/map-pin.svg";
//  import TrashSvg from "../../assets/icons/trash.svg";
import { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore"; 
// import { decode } from "base-64";
import { db, storage } from "../../../firebase/config";
import { uriToBlob } from "../../../helpers/uriToBlob";

import styles from "./createPostsScreen.style";
import { useSelector } from "react-redux";

// if (typeof atob === "undefined") {
//   window.atob = decode;
// }

export default function CreatePostsScreen() {
//   const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photo, setPhoto] = useState(null);
  const [photoURL, setPhotoURL] = useState("");
  const [photoName, setPhotoName] = useState("");
  const [place, setPlace] = useState("");
  const [location, setLocation] = useState("");
  const navigation = useNavigation();
  let cameraRef = useRef();

  const { userId, nickName } = useSelector((state) => state.auth)
  console.log("USER: ", userId, nickName)

  useEffect(() => {
	(async () => {
	  let { status } = await Location.requestForegroundPermissionsAsync();
	//   if (status !== 'granted') {
	// 	 setErrorMsg('Permission to access location was denied');
	// 	 return;
	//   }

	  let location = await Location.getCurrentPositionAsync({});
	  setLocation(location);
	})();
 }, []);

//   if (hasPermission === null) {
//     return <View />;
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

  const takePhoto = async () => {
    if (photo) {
      setPhoto(null);
    }

    if (cameraRef) {
      let options = {
        quality: 1,
        base64: true,
        exif: false,
      };

      let newPhoto = await cameraRef.current.takePictureAsync(options);
      setPhoto(newPhoto);
    }
  };

  const deletePost = () => {
    setPhoto(null);
    setPhotoName("");
    setPlace("");
  };

  const publish = async () => {
	console.log("PHOTO NAME", photoName)
	console.log("LOCATON", location)
	await savePhotoToStorage(photo);

	const docRef = await addDoc(collection(db, "posts"), {
		photo: photoURL,
		photoName,
		location: location.coords,
		userId,
		userName: nickName
	 });

	 console.log("Document written with ID: ", docRef.id);
   //  let { status } = await Location.requestForegroundPermissionsAsync();
   //  if (status !== "granted") {
   //    console.log("Permission to access location was denied");
   //  }

   //  let location = await Location.getCurrentPositionAsync({});
   //  const coords = {
   //    latitude: location.coords.latitude,
   //    longitude: location.coords.longitude,
   //  };
   //  //  console.log(coords)
   //  setLocation(coords);
    //  console.log(`Назва: ${photoName}, Місцевість: ${place}`);
    navigation.navigate("Home", { screen: "PostsScreen" });

    
  };

  async function savePhotoToStorage(photo) {
    const { uri } = photo;

    const blob = await uriToBlob(uri);

    const uniquePhotoId = Date.now().toString();

    const imagesRef = ref(storage, `image${uniquePhotoId}`);

    uploadBytes(imagesRef, blob).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async (url) => {
        console.log("URL", url);
		  setPhotoURL(url)
      });
    });
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {photo ? (
          <View>
            <Image
              style={styles.placeholder}
              source={{ uri: "data:image/jpg;base64," + photo.base64 }}
            />
            <TouchableOpacity
              style={styles.buttonTransparent}
              onPress={takePhoto}
            >
              <View
                style={[
                  styles.cameraCircle,
                  { backgroundColor: "rgba(255, 255, 255, 0.3)" },
                ]}
              >
                {/* <CameraSvg /> */}
              </View>
            </TouchableOpacity>
            <Text style={styles.textChangePhoto}>Редагувати фото</Text>
          </View>
        ) : (
          <>
            <Camera style={styles.camera} type={type} ref={cameraRef}>
              <View style={styles.photoView}>
                <TouchableOpacity
                  onPress={() => {
                    setType(
                      type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                    );
                  }}
                ></TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={takePhoto}>
                  <View style={styles.cameraCircle}>{/* <CameraSvg /> */}</View>
                </TouchableOpacity>
              </View>
            </Camera>
            <Text style={styles.text}>Завантажте фото</Text>
          </>
        )}

        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View style={styles.description}>
            <TextInput
              style={styles.input}
              value={photoName}
              placeholder="Назва..."
              placeholderTextColor="#BDBDBD"
              onChangeText={setPhotoName}
            ></TextInput>

            {/* <TextInput
              style={[styles.input, { paddingLeft: 30 }]}
              value={place}
              placeholder="Місцевість..."
              placeholderTextColor="#BDBDBD"
              onChangeText={setPlace}
            ></TextInput> */}

            {/* <MapPinSvg style={styles.mapPin} /> */}
          </View>

          <TouchableOpacity
            style={[styles.publishBtn, photo && { backgroundColor: "#FF6C00" }]}
            accessibilityLabel="Publish button"
            onPress={publish}
          >
            <Text style={[styles.btnText, photo && { color: "#FFFFFF" }]}>
              Опублікувати
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.trashBtn} onPress={deletePost}>
            {/* <TrashSvg /> */}
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}
