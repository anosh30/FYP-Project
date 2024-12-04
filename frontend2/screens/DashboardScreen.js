import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

export default function DashboardScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/icon.png")} style={styles.logo} />
      <Text style={styles.title}>ClassMate Dashboard</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("AdminScreen")}
      >
        <Text style={styles.buttonText}>Admin</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("StudentScreen")}
      >
        <Text style={styles.buttonText}>Student</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  button: {
    backgroundColor: "#FF6B6B",
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    width: "80%",
  },
  buttonText: { color: "#fff", fontSize: 18, textAlign: "center" },
  logo: { width: 100, height: 100, marginBottom: 20 },
});
