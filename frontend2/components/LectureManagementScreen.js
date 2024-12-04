import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function LectureManagementScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lecture Management</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("AdminScreen")}
      >
        <Text style={styles.buttonText}>Admin Screen</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("StudentScreen")}
      >
        <Text style={styles.buttonText}>User Screen</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
});
