/*
import React from 'react';
import { View, Text, FlatList } from 'react-native';

export default function TimetableDisplay({ timetableData }) {
  const renderItem = ({ item }) => (
    <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
      <Text style={{ marginRight: 10 }}>{item.subject}</Text>
      <Text style={{ marginRight: 10 }}>{item.time}</Text>
      <Text>{item.room}</Text>
    </View>
  );

  return (
    <View>
      <FlatList
        data={timetableData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
*/