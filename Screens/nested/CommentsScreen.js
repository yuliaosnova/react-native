import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import {
  addDoc,
  collection,
  doc,
  increment,
  onSnapshot,
  orderBy,
  updateDoc,
} from "firebase/firestore";

import { db } from "../../firebase/config";
import { getUserLetter } from "../../helpers/getUserLetter";

const CommentsScreen = ({ route }) => {
  const { postId, photo } = route.params;
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const { nickName } = useSelector((state) => state.auth);

  useEffect(() => {
    getAllComments();
  }, []);

  function isCurrentUser(name) {
    if (name === nickName) return true;
    return false;
  }

  const getAllComments = async () => {
    const commentRef = collection(db, "posts", postId, "comments");

    onSnapshot(commentRef, orderBy("date", "desc"), (querySnapshot) => {
      const documents = querySnapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });
      setAllComments(documents);
    });
  };

  const createMessage = async () => {
    const docRef = doc(db, "posts", postId);
    const comRef = collection(docRef, "comments");
    await addDoc(comRef, {
      text: comment,
      nickName,
      date: new Date().toLocaleString(),
    });

    await updateDoc(docRef, {
      commentsCount: increment(1),
    });
    clearComments();
  };

  const clearComments = () => {
    setComment("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <View style={styles.placeholder}>
          <Image
            source={{
              uri: photo,
            }}
            style={styles.image}
          ></Image>
        </View>

        <View style={styles.comentsList}>
          <FlatList
            data={allComments}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.coment,
                  isCurrentUser(item.nickName) && {
                    flexDirection: "row-reverse",
                  },
                ]}
              >
                <View style={styles.avatar}>
                  <Text style={styles.userLetter}>
                    {getUserLetter(item.nickName)}
                  </Text>
                </View>
                <View style={styles.comentBlock}>
                  <Text style={styles.comentText}>{item.text}</Text>
                  <View style={styles.comentDateContainer}>
                    <Text style={styles.comentDate}>{item.date}</Text>
                  </View>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>

      <TextInput
        style={[styles.input]}
        value={comment}
        placeholder="Коментувати..."
        placeholderTextColor="#BDBDBD"
        onChangeText={setComment}
      ></TextInput>
      <TouchableOpacity style={styles.sendBtn} onPress={createMessage}>
        <AntDesign name="arrowup" size={20} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  main: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  placeholder: {
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
    marginTop: 20,
    marginBottom: 30,
  },
  image: {
    width: 343,
    height: 200,
  },
  comentsList: { maxHeight: 240 },
  coment: { flexDirection: "row", gap: 10, marginBottom: 20 },
  comentBlock: {
    width: 299,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    padding: 16,
  },
  comentDate: {
    fontSize: 10,
    color: "rgba(189, 189, 189, 1)",
  },
  comentText: {
    fontSize: 13,
  },
  comentDateContainer: {
    flexDirection: "row",
    marginLeft: "auto",
    marginTop: 8,
    color: "rgba(189, 189, 189, 1)",
  },

  avatar: {
    width: 28,
    height: 28,
    borderRadius: 100,
  },
  userLetter: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 10,
    color: "darkviolet",
    backgroundColor: "#F6F6F6",
    paddingVertical: 6,
    // paddingHorizontal: 18,
    borderRadius: 50,
  },

  input: {
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    fontSize: 16,
    height: 50,
    width: 343,
    color: "#212121",
    paddingLeft: 20,
    marginTop: "auto",
    marginBottom: 10,
    marginLeft: "auto",
    marginRight: "auto",
  },
  sendBtn: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    position: "absolute",
    bottom: 18,
    right: 45,
  },
});

export default CommentsScreen;
