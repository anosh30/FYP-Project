import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

export default function AdminScreen({ navigation }) {
  const [templateUploaded, setTemplateUploaded] = useState(false);

  const handleUploadTemplate = () => {
    setTemplateUploaded(true);
    Alert.alert(
      "Template Uploaded",
      "The timetable template has been uploaded successfully."
    );
  };

  const handleSubmitTemplate = () => {
    if (templateUploaded) {
      navigation.navigate("StudentScreen", { templateSubmitted: true });
    } else {
      Alert.alert(
        "Upload Required",
        "Please upload a timetable template first."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <TouchableOpacity style={styles.button} onPress={handleUploadTemplate}>
        <Text style={styles.buttonText}>Upload Timetable Template</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSubmitTemplate}>
        <Text style={styles.buttonText}>Submit Template</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("LectureManagement")}
      >
        <Text style={styles.buttonText}>Lecture Management</Text>
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
