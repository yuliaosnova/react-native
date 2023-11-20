import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Feather, SimpleLineIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import {
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { FlatList } from "react-native-gesture-handler";

export default function PostsScreen() {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);
  const { nickName, email, userId } = useSelector((state) => state.auth);

  let userNameAvatar;

  if (nickName) {
    userNameAvatar = nickName.trim().slice(0, 1).toUpperCase();
  }

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
      console.log("curent data: ", documents);
      setPosts(documents);
    });
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={styles.userBox}>
          <View style={styles.photo}>
            <Text style={styles.avatar}>{userNameAvatar}</Text>
          </View>
          <View style={styles.userDesc}>
            <Text style={styles.userName}>{nickName}</Text>
            <Text style={styles.userEmail}>{email}</Text>
          </View>
        </View>

        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <View style={styles.posts}>
              <Image
                source={{
                  uri: item.photo,
                }}
                style={styles.image}
              ></Image>
              <Text style={styles.photoName}>{item.photoName}</Text>
              <View style={styles.postInfo}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Comments")}
                >
                  <Feather
                    name="message-circle"
                    size={24}
                    style={styles.iconMessage}
                  />
                </TouchableOpacity>

                <Text style={styles.messagesQuantity}>0</Text>
                <SimpleLineIcons
                  name="location-pin"
                  size={20}
                  color="gray"
                  style={styles.place}
                />
                <Text style={styles.region}>{item.place}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
          style={styles.flatList}
        />
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
  avatar: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
    color: "darkviolet",
    backgroundColor: "#F6F6F6",
    paddingVertical: 7,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  userName: {
    fontSize: 13,
    fontWeight: "500",
  },
  userEmail: {
    fontSize: 11,
  },
  posts: {
    marginBottom: 15,
  },
  flatList: {
    marginTop: 20,
    marginBottom: 50,
  },
  image: {
    width: 360,
    height: 230,
    borderRadius: 10,
  },
  photoName: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 4,
    marginBottom: 4,
    paddingHorizontal: 5,
  },
  postInfo: {
    flexDirection: "row",
    paddingHorizontal: 5,
  },
  icon: {
    marginRight: 5,
    width: 24,
    height: 24,
  },
  iconMessage: {
    marginRight: 5,
    transform: [{ rotate: "-100deg" }],
    color: "#FF6C00",
  },
  messagesQuantity: {
    fontSize: 16,
    color: "#BDBDBD",
  },
  place: {
    flexDirection: "row",
    marginLeft: "auto",
    marginRight: 5,
  },
  region: {
    fontSize: 16,
    color: "#212121",
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
