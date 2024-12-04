import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';

export default function Notifications({ timetable }) {
  useEffect(() => {
    // Logic to send notifications (dummy for example)
    timetable.forEach((entry) => {
      console.log(`Notification: ${entry.subject} scheduled for ${entry.day} at ${entry.timeSlot}`);
    });
  }, [timetable]);

  return (
    <View>
      <Text>Notifications will be generated based on your timetable.</Text>
    </View>
  );
}
