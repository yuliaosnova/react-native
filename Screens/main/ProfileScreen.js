import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Feather, AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import {
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
} from "firebase/firestore";

import { db } from "../../firebase/config";
import { getUserLetter } from "../../helpers/getUserLetter";
import { authSignOutUser } from "../../redux/auth/authOperations";

export default function ProfileScreen() {
  const [posts, setPosts] = useState([]);
  const { nickName, email, userId } = useSelector((state) => state.auth);
  console.log("NICKNAME: ", nickName);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllPosts();
  }, []);

  const signOut = () => {
    console.log("on logout!");
    dispatch(authSignOutUser());
  };

  const getAllPosts = async () => {
    const postsRef = collection(db, "posts");
    const q = query(postsRef, where("userId", "==", userId));

    onSnapshot(q, orderBy("date", "desc"), (querySnapshot) => {
      const documents = querySnapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });
      // console.log("curent data: ", documents);
      setPosts(documents);
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        source={require("../../assets/images/bg.jpg")}
        style={styles.image}
      >
        <View style={styles.form}>
          <View style={styles.add}>
            {nickName && (
              <Text style={styles.avatar}>{getUserLetter(email)}</Text>
            )}
            <TouchableOpacity onPress={signOut}>
              <Feather
                style={styles.logout}
                name="log-out"
                size={24}
                color="green"
              />
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.addBtn}>
              <AntDesign name="plus" size={18} color="gray" />
            </TouchableOpacity> */}
          </View>
          <Text style={styles.userName}>{nickName}</Text>
          <View style={styles.postsList}>
            <FlatList
              data={posts}
              renderItem={({ item }) => (
                <View style={styles.post}>
                  <Image
                    source={{
                      uri: item.photo,
                    }}
                    style={styles.picture}
                  ></Image>
                  <Text style={styles.photoName}>{item.photoName}</Text>
                  <View style={styles.postInfo}>
                    <Feather
                      name="message-circle"
                      size={24}
                      style={styles.iconMessage}
                    />
                    <Text style={styles.info}>{item.commentsCount}</Text>
                    <AntDesign name="like2" size={24} style={styles.icon} />
                    <Text style={styles.info}>0</Text>
                    <View style={styles.place}>
                      <SimpleLineIcons
                        name="location-pin"
                        size={20}
                        color="gray"
                        marginRight={5}
                      />
                      <Text style={styles.info}>{item.place}</Text>
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
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    flex: 1,
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
    width: 90,
    height: 90,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    position: "absolute",
    top: -40,
    zIndex: 2,
  },
  avatar: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 35,
    marginTop: 18,
    color: "darkviolet",
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
    top: -10,
    left: 75,
  },
  logout: { position: "absolute", top: -10, left: 210 },
  userName: {
    fontSize: 30,
    fontWeight: "500",
    color: "#212121",
    marginTop: 60,
    marginBottom: 30,
  },
  postsList: {
    maxHeight: 400,
  },
  picture: {
    width: 360,
    height: 230,
    borderRadius: 10,
  },
  photoName: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 4,
    marginBottom: 6,
  },
  postInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconMessage: {
    marginRight: 5,
    transform: [{ rotate: "-100deg" }],
    color: "#FF6C00",
  },
  icon: {
    marginRight: 5,
    color: "#FF6C00",
  },
  info: {
    fontSize: 16,
    color: "#BDBDBD",
    marginRight: 10,
  },
  place: {
    flexDirection: "row",
    marginLeft: "auto",
    marginRight: 5,
  },
  //   region: {
  //     fontSize: 16,
  //     color: "#212121",
  //    //  textDecorationLine: "underline",
  //   },
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
