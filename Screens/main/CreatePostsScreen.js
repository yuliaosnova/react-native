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

import {
  SimpleLineIcons,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../../firebase/config";
import { uriToBlob } from "../../helpers/uriToBlob";
import { useSelector } from "react-redux";

export default function CreatePostsScreen() {
  //   const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photo, setPhoto] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);
  const [photoName, setPhotoName] = useState("");
  const [place, setPlace] = useState("");
  const [location, setLocation] = useState("");
  const navigation = useNavigation();
  let cameraRef = useRef();

  const { userId, nickName } = useSelector((state) => state.auth);

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
    await savePhotoToStorage(photo);

    if (!photoURL) return;

    const docRef = await addDoc(collection(db, "posts"), {
      photo: photoURL,
      photoName,
      location: location.coords,
      place,
      userId,
      userName: nickName,
      date: new Date().toLocaleString(),
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
    deletePost();
    navigation.navigate("Home", { screen: "PostsScreen" });
  };

  async function savePhotoToStorage(photo) {
    const { uri } = photo;

    const blob = await uriToBlob(uri);

    const uniquePhotoId = Date.now().toString();

    const imagesRef = ref(storage, `image${uniquePhotoId}`);

    uploadBytes(imagesRef, blob).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async (url) => {
        setPhotoURL(url);
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
                <Ionicons
                  name="md-camera"
                  size={24}
                  color="#BDBDBD"
                  style={{ zindex: 5 }}
                />
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
                  <View style={styles.cameraCircle}>
                    <Ionicons
                      name="md-camera"
                      size={24}
                      color="#BDBDBD"
                      style={{ zindex: 5 }}
                    />
                  </View>
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

            <TextInput
              style={[styles.input, { paddingLeft: 30 }]}
              value={place}
              placeholder="Місцевість..."
              placeholderTextColor="#BDBDBD"
              onChangeText={setPlace}
            ></TextInput>

            <TouchableOpacity
              style={styles.place}
              onPress={() => navigation.navigate("Map")}
            >
              <SimpleLineIcons
                name="location-pin"
                size={20}
                color="gray"
                style={styles.mapPin}
              />
            </TouchableOpacity>
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
            <MaterialCommunityIcons
              name="trash-can-outline"
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  placeholder: {
    width: 343,
    height: 240,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
    marginTop: 30,
    marginLeft: "auto",
    marginRight: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
  cameraCircle: {
    width: 60,
    height: 60,
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginTop: 8,
    marginLeft: 35,
    fontSize: 16,
    color: "#BDBDBD",
    lineHeight: 19,
  },
  textChangePhoto: {
    marginTop: -50,
    marginLeft: 30,
    fontSize: 16,
    color: "#BDBDBD",
    lineHeight: 19,
  },
  description: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    fontSize: 16,
    height: 50,
    width: 343,
    color: "#212121",
    marginTop: 20,
  },
  mapPin: {
    top: -36,
  },
  publishBtn: {
    width: 343,
    height: 51,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 3,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 30,
  },
  btnText: {
    color: "#BDBDBD",
    fontSize: 16,
  },
  publishBtnActive: {
    marginTop: 3,
    width: 343,
    height: 51,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  btnTextActive: {
    color: "#FF6C00",
    fontSize: 16,
  },
  trashBtn: {
    width: 70,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 20,
  },

  camera: { flex: 1 },
  photoView: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
  },

  flipContainer: {
    flex: 0.1,
    alignSelf: "flex-end",
  },

  button: { alignSelf: "center" },
  buttonTransparent: {
    top: -150,
    left: 170,
  },

  takePhotoOut: {
    borderWidth: 2,
    borderColor: "white",
    height: 50,
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },

  takePhotoInner: {
    borderWidth: 2,
    borderColor: "white",
    height: 40,
    width: 40,
    backgroundColor: "white",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
