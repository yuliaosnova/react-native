import { useState } from "react";
import { useNavigation } from '@react-navigation/native';
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
} from "react-native";

import PlusSvg from "../../assets/icons/plus.svg";

export default function RegistrationScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isMailFocused, setIsMailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const ckickHandler = () => {
	console.log(`name: ${name}, mail: ${mail}, password: ${password}`);
 };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        source={require("../../assets/images/bg.jpg")}
        style={styles.image}
      >
        <View style={styles.form}>
          <View style={styles.add}>
            <TouchableOpacity style={styles.addBtn}>
              <PlusSvg />
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>Реєстрація</Text>
          <View>
            <TextInput
              style={[
                styles.input,
                isNameFocused && { borderColor: "#FF6C00" },
              ]}
              placeholder="Логін"
              value={name}
              placeholderTextColor="#BDBDBD"
              onBlur={() => setIsNameFocused(false)}
              onFocus={() => setIsNameFocused(true)}
              onChangeText={setName}
            ></TextInput>
          </View>
          <View>
            <TextInput
              style={[
                styles.input,
                isMailFocused && { borderColor: "#FF6C00" },
              ]}
              placeholder="Адреса електронної пошти"
              value={mail}
              placeholderTextColor="#BDBDBD"
              autoComplete="email"
              onBlur={() => setIsMailFocused(false)}
              onFocus={() => setIsMailFocused(true)}
              onChangeText={setMail}
            ></TextInput>
          </View>
          <View>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <TextInput
                style={[
                  styles.input,
                  isPasswordFocused && { borderColor: "#FF6C00" },
                ]}
                secureTextEntry={showPassword ? false : true}
                placeholder="Пароль"
                value={password}
                placeholderTextColor="#BDBDBD"
                autoComplete="password"
                onBlur={() => setIsPasswordFocused(false)}
                onFocus={() => setIsPasswordFocused(true)}
                onChangeText={setPassword}
              ></TextInput>
            </KeyboardAvoidingView>
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Text style={styles.showPassword}>
                {showPassword ? "Сховати" : "Показати"}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.registerBtn}
            accessibilityLabel="Register button"
				onPress={ckickHandler}
          >
            <Text style={styles.btnText}>Зареєструватися</Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 30,
            }}
          >
            <Text style={styles.link}>Вже є акаунт? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={[styles.link, { textDecorationLine: "underline" }]}>
                Увійти
              </Text>
            </TouchableOpacity>
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
  add: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    position: "absolute",
    top: -60,
    zIndex: 2,
  },
  addBtn: {
    width: 25,
    height: 25,
    borderWidth: 1,
    borderColor: "#FF6C00",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    borderRadius: 100,
    top: 80,
    left: 107,
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
  registerBtn: {
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
