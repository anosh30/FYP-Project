import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";
const StudentTimetableForm = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState({});

  // Fetch subjects from backend
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/subjects");
        console.log("Fetched subjects:", response.data);
        setSubjects(response.data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };
    fetchSubjects();
  }, []);

  const handleSubjectChange = (slot, subject) => {
    setSelectedSubjects((prev) => ({ ...prev, [slot]: subject }));
  };

  const saveTimetable = () => {
    console.log("Saved Timetable:", selectedSubjects);
    alert("Timetable saved successfully!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Student Timetable</Text>
      {["Slot 1", "Slot 2", "Slot 3", "Slot 4", "Slot 5"].map((slot) => (
        <View key={slot} style={styles.slotContainer}>
          <Text>{slot}</Text>
          <RNPickerSelect
            onValueChange={(itemValue) => handleSubjectChange(slot, itemValue)}
            items={subjects.map((subject) => ({
              label: `${subject.subjectName} (${subject.courseCode})`,
              value: subject.subjectName,
            }))}
            placeholder={{ label: "Select a subject", value: "" }}
            style={{
              inputIOS: styles.picker,
              inputAndroid: styles.picker,
            }}
          />
        </View>
      ))}
      <Button title="Save Timetable" onPress={saveTimetable} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  slotContainer: {
    marginBottom: 20,
  },
  picker: {
    height: 50,
    backgroundColor: "#e8e8e8",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

export default StudentTimetableForm;
