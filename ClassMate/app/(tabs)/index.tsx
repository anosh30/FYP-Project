import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Alert, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';

type Module = {
  name: string;
  screen: string;
};

export default function Dashboard() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const navigateTo = (screenName: string) => {
    navigation.navigate(screenName);
  };

  const handleProfileAction = (action: string) => {
    setModalVisible(false);
    if (action === 'Logout') {
      Alert.alert('Logout', 'Are you sure you want to log out?', [
        { text: 'Cancel' },
        { text: 'Logout', onPress: () => console.log('Logging out...') }, // Implement actual logout logic here
      ]);
    } else if (action === 'Change Password') {
      // Implement change password logic here
      console.log('Redirecting to change password screen...');
    }
  };

  const modules: Module[] = [
    { name: 'Lecture Management', screen: 'LectureManagementScreen' },
    { name: 'Attendance Validation', screen: 'AttendanceScreen' },
    { name: 'AI Quiz Generation', screen: 'AIQuizGenerationScreen' },
    { name: 'Query & Discussion Forum', screen: 'QueryScreen' },  // Updated screen name
    { name: 'Resource Sharing', screen: 'ResourceSharingScreen' },
    { name: 'Community Chat', screen: 'CommunityChatScreen' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Section at the top right */}
      <View style={styles.profileContainer}>
        <Text style={styles.rollNumber}>Hello, 21F-1234</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          {/* Use the valid image URL */}
          <Image
            source={require('@/assets/images/welcome.jpeg')} // Replace with the actual image URL
            style={styles.profilePic}
          />
        </TouchableOpacity>
      </View>

      {/* Modal for profile options */}
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={() => handleProfileAction('Logout')} style={styles.modalOption}>
              <Text style={styles.modalText}>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleProfileAction('Change Password')} style={styles.modalOption}>
              <Text style={styles.modalText}>Change Password</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalOption}>
              <Text style={styles.modalText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Centered image above the title */}
      <Image
        source={require('@/assets/images/welcome.jpeg')}  // Ensure this path is correct for local images
        style={styles.image}
      />
      <Text style={styles.title}>ClassMate Dashboard</Text>

      {/* Module Cards */}
      {modules.map((module, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          onPress={() => navigateTo(module.screen)}
        >
          <Text style={styles.cardText}>{module.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  image: {
    width: 150, // Adjust the width as needed
    height: 150, // Adjust the height as needed
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  card: {
    width: '100%',
    paddingVertical: 20,
    marginVertical: 10,
    borderRadius: 15,
    backgroundColor: '#ff7e5f',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  profileContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rollNumber: {
    fontSize: 16,
    color: '#333',
    marginRight: 10,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 200,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 5,
  },
  modalOption: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    color: '#333',
  },
});
