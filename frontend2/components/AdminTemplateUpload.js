import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const AdminTemplateUpload = () => {
    const handleTemplateUpload = () => {
        console.log('Template upload logic to be implemented.');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Admin Template Upload</Text>
            <Button title="Upload Template" onPress={handleTemplateUpload} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 20, marginBottom: 20 },
});

export default AdminTemplateUpload;
