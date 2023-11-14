import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: "#fff",
	},
	placeholder: {
	  width: 343,
	  height: 240,
	  backgroundColor: "#F6F6F6",
	  borderWidth: 1,
	  borderRadius: 8,
	  borderColor: "#E8E8E8",
	  marginTop: 30,
	  marginLeft: "auto",
	  marginRight: "auto",
	  alignItems: "center",
	  justifyContent: "center",
	},
	cameraCircle: {
	  width: 60,
	  height: 60,
	  backgroundColor: "rgba(255, 255, 255, 1)",
	  borderRadius: 100,
	  alignItems: "center",
	  justifyContent: "center",
	},
	text: {
	  marginTop: 8,
	  marginLeft: 35,
	  fontSize: 16,
	  color: "#BDBDBD",
	  lineHeight: 19,
	},
	textChangePhoto: {
	  marginTop: -50,
	  marginLeft: 30,
	  fontSize: 16,
	  color: "#BDBDBD",
	  lineHeight: 19,
	},
	description: {
	  marginLeft: "auto",
	  marginRight: "auto",
	},
	input: {
	  borderBottomWidth: 1,
	  borderColor: "#E8E8E8",
	  fontSize: 16,
	  height: 50,
	  width: 343,
	  color: "#212121",
	  marginTop: 20,
	},
	mapPin: {
	  top: -36,
	},
	publishBtn: {
	  width: 343,
	  height: 51,
	  backgroundColor: "#F6F6F6",
	  borderRadius: 100,
	  marginBottom: 16,
	  alignItems: "center",
	  justifyContent: "center",
	  marginTop: 3,
	  marginLeft: "auto",
	  marginRight: "auto",
	  marginBottom: 50,
	},
	btnText: {
	  color: "#BDBDBD",
	  fontSize: 16,
	},
	publishBtnActive: {
	  marginTop: 3,
	  width: 343,
	  height: 51,
	  backgroundColor: "#F6F6F6",
	  borderRadius: 100,
	  marginBottom: 16,
	  alignItems: "center",
	  justifyContent: "center",
	  marginLeft: "auto",
	  marginRight: "auto",
	},
	btnTextActive: {
	  color: "#FF6C00",
	  fontSize: 16,
	},
	trashBtn: {
	  width: 70,
	  height: 40,
	  alignItems: "center",
	  justifyContent: "center",
	  backgroundColor: "#F6F6F6",
	  borderRadius: 100,
	  marginLeft: "auto",
	  marginRight: "auto",
	},
 
	camera: { flex: 1 },
	photoView: {
	  flex: 1,
	  backgroundColor: "transparent",
	  justifyContent: "center",
	},
 
	flipContainer: {
	  flex: 0.1,
	  alignSelf: "flex-end",
	},
 
	button: { alignSelf: "center" },
	buttonTransparent: {
	  top: -150,
	  left: 170,
	},
 
	takePhotoOut: {
	  borderWidth: 2,
	  borderColor: "white",
	  height: 50,
	  width: 50,
	  display: "flex",
	  justifyContent: "center",
	  alignItems: "center",
	  borderRadius: 50,
	},
 
	takePhotoInner: {
	  borderWidth: 2,
	  borderColor: "white",
	  height: 40,
	  width: 40,
	  backgroundColor: "white",
	  borderRadius: 50,
	  alignItems: "center",
	  justifyContent: "center",
	},
 });

 export default styles;
 