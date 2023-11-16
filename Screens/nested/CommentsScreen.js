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

import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";

const comments = [
  {
    id: 1,
    userId: 2,
    userAvatar: require("../../assets/images/avatar-2.png"),
    date: "09 червня, 2020",
    time: "08:40",
    text: "Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!",
  },
  {
    id: 2,
    userId: 1,
    userAvatar: require("../../assets/images/user-photo.jpg"),
    date: "09 червня, 2020",
    time: "09:14",
    text: "A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.",
  },
  {
    id: 3,
    userId: 2,
    userAvatar: require("../../assets/images/avatar-2.png"),
    date: "09 червня, 2020",
    time: "09:20",
    text: "Thank you! That was very helpful!",
  },
];

const CommentsScreen = () => {
  const [comment, setComment] = useState("");

  let currentUserId = 1;
  function isCurrentUser(id) {
    if (id === currentUserId) return true;
    return false;
  }

  const onBtnClick = (message) => {
    console.log(message);
    setComment(message);
  };

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.main}>
        <View style={styles.placeholder}>
          <Image
            source={require("../../assets/images/sunset-photo.jpg")}
            style={styles.image}
          ></Image>
        </View>

        <View style={styles.comentsList}>
          <FlatList
            data={comments}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.coment,
                  isCurrentUser(item.userId) && {
                    flexDirection: "row-reverse",
                  },
                ]}
              >
                <Image source={item.userAvatar} style={styles.avatar}></Image>
                <View style={styles.comentBlock}>
                  <Text style={styles.comentText}>{item.text}</Text>
                  <View style={styles.comentDateContainer}>
                    <Text style={styles.comentDate}>{item.date} | </Text>
                    <Text style={styles.comentDate}>{item.time}</Text>
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
        placeholder="Коментувати..."
        placeholderTextColor="#BDBDBD"
        onChangeText={setComment}
      ></TextInput>
      <TouchableOpacity style={styles.sendBtn} onPress={onBtnClick}>
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
