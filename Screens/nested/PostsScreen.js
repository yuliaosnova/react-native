import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { onSnapshot, collection, orderBy } from "firebase/firestore";
import { FlatList } from "react-native-gesture-handler";
import {
  SimpleLineIcons,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { db } from "../../firebase/config";
import { getUserLetter } from "../../helpers/getUserLetter";

export default function PostsScreen() {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);
  //   const { nickName, email, userId } = useSelector((state) => state.auth);

  useEffect(() => {
    getAllPosts();
  }, []);

  //   if (nickName) {
  //     userNameAvatar = nickName.trim().slice(0, 1).toUpperCase();
  //   }

  const getAllPosts = async () => {
    const postsRef = collection(db, "posts");

    onSnapshot(postsRef, orderBy("date", "desc"), (querySnapshot) => {
      const documents = querySnapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });
      setPosts(documents);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <View style={styles.posts}>
              <View style={styles.userBox}>
                <View style={styles.photo}>
                  <Text style={styles.avatar}>
                    {getUserLetter(item.userName)}
                  </Text>
                </View>
                <View style={styles.userDesc}>
                  <Text style={styles.userName}>{item.userName}</Text>
                  <Text style={styles.userEmail}>{item.userEmail}</Text>
                </View>
              </View>
              <Image
                source={{
                  uri: item.photo,
                }}
                style={styles.image}
              ></Image>
              <Text style={styles.photoName}>{item.photoName}</Text>
              <View style={styles.postInfo}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Comments", {
                      postId: item.id,
                      photo: item.photo,
                    })
                  }
                >
                  <MaterialCommunityIcons
                    name="message"
                    size={24}
                    style={styles.iconMessage}
                  />
                </TouchableOpacity>

                <Text style={styles.info}>{item.commentsCount}</Text>
                <AntDesign name="like2" size={24} style={styles.icon} />
                <Text style={styles.info}>0</Text>
                <TouchableOpacity
                  //   style={styles.place}
                  onPress={() =>
                    navigation.navigate("Map", {
                      location: item.location,
                    })
                  }
                >
                  <SimpleLineIcons
                    name="location-pin"
                    size={20}
                    color="gray"
                    style={styles.place}
                  />
                </TouchableOpacity>

                <Text style={styles.info}>{item.place}</Text>
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
    marginLeft: "auto",
    marginRight: "auto",
  },
  userBox: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginBottom: 15,
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
    alignItems: "center",
    paddingHorizontal: 5,
  },
  icon: {
    marginRight: 5,
    width: 24,
    height: 24,
    color: "#FF6C00",
  },
  iconMessage: {
    marginRight: 5,
    transform: [{ scaleX: -1 }],
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
