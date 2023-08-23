import { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  FlatList,
  Dimensions,
} from "react-native";

import CrossSvg from "../assets/icons/cross-icon.svg";
import LogOutSvg from "../assets/icons/log-out.svg";
import MessageSvg from "../assets/icons/message-icon.svg";
import LikeSvg from "../assets/icons/thumbs-up.svg";
import MapPinSvg from "../assets/icons/map-pin.svg";
import GridSvg from "../assets/icons/grid.svg";
import PlusSvg from "../assets/icons/plus.svg";
import UserSvg from "../assets/icons/user.svg";

const posts = [
  {
    id: 1,
    image: require("../assets/images/forest-photo.jpg"),
    title: "Ліс",
    commentsQuantity: "8",
    likesQuantity: "153",
    place: "Ukraine",
  },
  {
    id: 2,
    image: require("../assets/images/sunset-photo.jpg"),
    title: "Захід на Чорному морі",
    commentsQuantity: "3",
    likesQuantity: "200",
    place: "Ukraine",
  },
  {
    id: 3,
    image: require("../assets/images/house-photo.jpg"),
    title: "Старий будиночок у Венеції",
    commentsQuantity: "50",
    likesQuantity: "200",
    place: "Italy",
  },
];

export default function ProfileScreen() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        source={require("../assets/images/bg.jpg")}
        style={styles.image}
      >
        <View style={styles.form}>
          <View style={styles.add}>
            <Image
              source={require("../assets/images/user-photo.jpg")}
              style={styles.photo}
            ></Image>
            <TouchableOpacity>
              <LogOutSvg style={styles.logout} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.addBtn}>
              <CrossSvg />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>Natali Romanova</Text>

          <View style={styles.postsList}>
            <FlatList
              data={posts}
              renderItem={({ item }) => (
                <View style={styles.post}>
                  <Image source={item.image} style={styles.picture}></Image>
                  <Text style={styles.photoName}>{item.title}</Text>
                  <View style={styles.postInfo}>
                    <MessageSvg style={styles.icon} fill={"#FF6C00"} />
                    <Text style={styles.messagesQuantity}>
                      {item.commentsQuantity}
                    </Text>
                    <LikeSvg style={styles.icon} stroke={"#FF6C00"} />
                    <Text style={styles.likesQuantity}>
                      {item.likesQuantity}
                    </Text>
                    <View style={styles.place}>
                      <MapPinSvg style={styles.icon} />
                      <Text style={styles.region}>{item.place}</Text>
                    </View>
                  </View>
                </View>
              )}
              ItemSeparatorComponent={() => {
                return (
                  <View
                    style={{
                      height: 20,
                    }}
                  />
                );
              }}
              keyExtractor={(item) => item.id}
            />
          </View>

          {/* <View style={styles.footer}>
            <TouchableOpacity>
              <GridSvg />
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerBtn}>
              <UserSvg stroke={"#FFFFFF"} />
            </TouchableOpacity>
            <TouchableOpacity>
              <PlusSvg stroke={"rgba(33, 33, 33, 0.8)"} />
            </TouchableOpacity>
          </View> */}
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    width: "100%",
    minHeight: 600,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    position: "absolute",
    bottom: 0,
    alignItems: "center",
  },
  add: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    position: "absolute",
    top: -60,
    zIndex: 2,
  },
  photo: {
    borderRadius: 16,
  },
  addBtn: {
    width: 25,
    height: 25,
    borderWidth: 1,
    borderColor: "rgba(232, 232, 232, 1)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: 100,
    top: -40,
    left: 107,
  },
  logout: { position: "absolute", top: -40, left: 215 },
  userName: {
    fontSize: 30,
    fontWeight: "500",
    color: "#212121",
    marginTop: 80,
    marginBottom: 18,
  },
  postsList: {
    marginTop: 35,
    height: 500,
  },
  photoName: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 4,
    marginBottom: 6,
  },
  postInfo: {
    flexDirection: "row",
  },
  icon: {
    marginRight: 5,
    width: 24,
    height: 24,
  },
  messagesQuantity: {
    fontSize: 16,
    marginRight: 15,
  },
  place: {
    flexDirection: "row",
    marginLeft: "auto",
  },
  region: {
    fontSize: 16,
    color: "#212121",
    textDecorationLine: "underline",
  },
  footer: {
    width: Dimensions.get("window").width,
    height: 73,
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
    borderTopWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.09)",
    flexDirection: "row",
    marginTop: "auto",
  },
  footerBtn: {
    width: 70,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
});
