import { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function LoginScreen({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isMailFocused, setIsMailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  return (
    <ImageBackground
      source={require("../assets/images/bg.jpg")}
      style={styles.image}
    >
      <View style={styles.form}>
        <Text style={styles.title}>Увійти</Text>
        <View>
          <TextInput
            style={[styles.input, isMailFocused && { borderColor: "#FF6C00" }]}
            placeholder="Адреса електронної пошти"
            placeholderTextColor="#BDBDBD"
            onBlur={() => setIsMailFocused(false)}
            onFocus={() => setIsMailFocused(true)}
          ></TextInput>
        </View>
        <View>
          <TextInput
            style={[
              styles.input,
              isPasswordFocused && { borderColor: "#FF6C00" },
            ]}
            secureTextEntry={showPassword ? false : true}
            placeholder="Пароль"
            placeholderTextColor="#BDBDBD"
            onBlur={() => setIsPasswordFocused(false)}
            onFocus={() => setIsPasswordFocused(true)}
          ></TextInput>
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.showPassword}>
              {showPassword ? "Сховати" : "Показати"}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.loginBtn}
          accessibilityLabel="Login button"
        >
          <Text style={styles.btnText}>Увійти</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <Text style={styles.link}>Немає акаунту? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={[styles.link, { textDecorationLine: "underline" }]}>
              Зареєструватися
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
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
    height: "67%",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    position: "absolute",
    bottom: 0,
    alignItems: "center",
  },
  title: {
    fontFamily: "Roboto",
    fontSize: 30,
    fontWeight: "500",
    color: "#212121",
    marginTop: 80,
    marginBottom: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    fontSize: 16,
    height: 50,
    width: 343,
    paddingLeft: 16,
    borderRadius: 6,
    color: "#212121",
    backgroundColor: "#F6F6F6",
    marginBottom: 16,
  },
  loginBtn: {
    marginTop: 3,
    width: 343,
    height: 51,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  link: {
    color: "#1B4371",
  },
  showPassword: {
    color: "#1B4371",
    fontSize: 16,
    top: -52,
    left: 260,
  },
});
