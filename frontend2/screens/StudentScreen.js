import React, { useState, useEffect } from "react";
import { View, Text, Alert, TouchableOpacity, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import axiosInstance from "../components/axiosSingleton";

export default function StudentScreen() {
  const [courses, setCourses] = useState([]);
  const [timetable, setTimetable] = useState(
    Array.from({ length: 5 }, () => Array(5).fill(""))
  );

  const fetchCourses = async () => {
    try {
      const response = await axiosInstance.get("/api/subjects");
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSave = () => {
    Alert.alert(
      "Timetable Saved",
      "Your timetable has been saved successfully."
    );
    console.log("Finalized Timetable:", timetable);
  };

  const updateTimetable = (dayIndex, slotIndex, value) => {
    const updatedTimetable = [...timetable];
    updatedTimetable[dayIndex][slotIndex] = value;
    setTimetable(updatedTimetable);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Timetable</Text>
      {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, dayIndex) => (
        <View key={day} style={styles.row}>
          <Text style={styles.day}>{day}</Text>
          {timetable[dayIndex].map((slot, slotIndex) => (
            <RNPickerSelect
              key={`${dayIndex}-${slotIndex}`}
              selectedValue={slot}
              style={styles.picker}
              onValueChange={(value) =>
                updateTimetable(dayIndex, slotIndex, value)
              }
              items={courses.map((course) => ({
                label: `${course.subject_name} (${course.course_code})`,
                value: course.course_code,
              }))}
            />
          ))}
        </View>
      ))}
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Timetable</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  day: { width: 50, fontWeight: "bold" },
  picker: { flex: 1, height: 40, marginHorizontal: 4 },
  button: {
    marginTop: 20,
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
