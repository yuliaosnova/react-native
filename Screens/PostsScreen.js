import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import LogOutSvg from "../assets/icons/log-out.svg";
import GridSvg from "../assets/icons/grid.svg";
import PlusSvg from "../assets/icons/plus.svg";
import UserSvg from "../assets/icons/user.svg";

import MessageSvg from "../assets/icons/message-icon.svg";
import MapPinSvg from "../assets/icons/map-pin.svg";

export default function PostsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Публікації</Text>
        <LogOutSvg style={styles.logout} />
      </View>

      <View style={styles.main}>
        <View style={styles.userBox}>
          <Image
            source={require("../assets/images/user-photo.jpg")}
            style={styles.photo}
          ></Image>
          <View style={styles.userDesc}>
            <Text style={styles.userName}>Natali Romanova</Text>
            <Text style={styles.userEmail}>email@example.com</Text>
          </View>
        </View>

        <View style={styles.postsList}>
          <View style={styles.post}>
            <Image
              source={require("../assets/images/forest-photo.jpg")}
              style={styles.image}
            ></Image>
            <Text style={styles.photoName}>Ліс</Text>
            <View style={styles.postInfo}>
              <MessageSvg style={styles.icon} />
              <Text style={styles.messagesQuantity}>0</Text>
              <View style={styles.place}>
                <MapPinSvg style={styles.icon} />
                <Text style={styles.region}>
                  Ivano-Frankivs'k Region, Ukraine
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity>
          <GridSvg />
        </TouchableOpacity>
        <TouchableOpacity style={styles.addBtn}>
          <PlusSvg stroke={"#FFFFFF"} />
        </TouchableOpacity>
        <TouchableOpacity>
          <UserSvg />
        </TouchableOpacity>
      </View>
    </View>
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
    marginLeft: "40%",
  },
  logout: {
    marginLeft: "30%",
  },
  main: {
    marginTop: 30,
    marginLeft: "auto",
    marginRight: "auto",
  },
  userBox: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  photo: {
    width: 60,
    height: 60,
  },
  userName: {
    fontSize: 13,
    fontWeight: "500",
  },
  userEmail: {
    fontSize: 11,
  },
  postsList: {
    marginTop: 35,
  },
  photoName: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 4,
    marginBottom: 4,
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
    color: "#BDBDBD",
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
    bottom: 0,
    marginTop: "auto",
  },
  addBtn: {
    width: 70,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
});
