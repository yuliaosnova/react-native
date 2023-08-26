import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import MessageSvg from "../../assets/icons/message-icon.svg";
import MapPinSvg from "../../assets/icons/map-pin.svg";
import { useNavigation } from "@react-navigation/native";

export default function PostsScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>

      <View style={styles.main}>
        <View style={styles.userBox}>
          <Image
            source={require("../../assets/images/user-photo.jpg")}
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
              source={require("../../assets/images/forest-photo.jpg")}
              style={styles.image}
            ></Image>
            <Text style={styles.photoName}>Ліс</Text>
            <View style={styles.postInfo}>
              <TouchableOpacity onPress={() => navigation.navigate("Comments")}>
                <MessageSvg style={styles.icon} />
              </TouchableOpacity>

              <Text style={styles.messagesQuantity}>0</Text>
              {/* <View style={styles.place}> */}
				  <TouchableOpacity style={styles.place} onPress={() => navigation.navigate("Map")}>
                <MapPinSvg style={styles.icon} />
					 <Text style={styles.region}>
                  Ivano-Frankivs'k Region, Ukraine
                </Text>
					 </TouchableOpacity>
                
              {/* </View> */}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
