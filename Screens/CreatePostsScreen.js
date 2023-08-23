import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import ArrLeftSvg from "../assets/icons/arrow-left.svg";
import CameraSvg from "../assets/icons/camera.svg";
import MapPinSvg from "../assets/icons/map-pin.svg";
import TrashSvg from "../assets/icons/trash.svg";

export default function CreatePostsScreen() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.header}>
          <ArrLeftSvg style={styles.arrow} />
          <Text style={styles.title}>Створити публікацію</Text>
        </View>
        <View style={styles.placeholder}>
          <TouchableOpacity style={styles.cameraCircle}>
            <CameraSvg />
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>Завантажте фото</Text>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View style={styles.description}>
            <TextInput
              style={styles.input}
              placeholder="Назва..."
              placeholderTextColor="#BDBDBD"
            ></TextInput>
            <TextInput
              style={[styles.input, { paddingLeft: 30 }]}
              placeholder="Місцевість..."
              placeholderTextColor="#BDBDBD"
            ></TextInput>
            <MapPinSvg style={styles.mapPin} />
          </View>
        </KeyboardAvoidingView>

        <TouchableOpacity
          style={styles.publishBtn}
          accessibilityLabel="Publish button"
          // onPress={ckickHandler}
        >
          <Text style={styles.btnText}>Опублікувати</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.trashBtn}>
          <TrashSvg />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: Dimensions.get("window").width,
    height: 44,
    marginTop: 40,
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.09)",
    flexDirection: "row",
  },
  title: {
    fontSize: 17,
    fontWeight: "500",
    color: "#212121",
    marginLeft: "20%",
  },
  arrow: {
    marginLeft: 15,
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
    backgroundColor: "#FFFFFF",
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
    marginBottom: 50,
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
  },
});
