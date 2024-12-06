import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';

type SubjectAttendance = {
    subject: string;
    attendedCount: number;
    missedCount: number;
    isShortAttendance: boolean;
    weeklyAttendanceCount: number; // New property to track weekly attendance per course
};

const TOTAL_LECTURES = 32;
const MAX_ATTENDANCE_MARKS_PER_WEEK = 2;

const initialSubjects: SubjectAttendance[] = [
    { subject: 'Information Security', attendedCount: 0, missedCount: 0, isShortAttendance: false, weeklyAttendanceCount: 0 },
    { subject: 'Math', attendedCount: 0, missedCount: 0, isShortAttendance: false, weeklyAttendanceCount: 0 },
    { subject: 'Software Engineering', attendedCount: 0, missedCount: 0, isShortAttendance: false, weeklyAttendanceCount: 0 },
    { subject: 'NLP', attendedCount: 0, missedCount: 0, isShortAttendance: false, weeklyAttendanceCount: 0 },
    { subject: 'Data Mining', attendedCount: 0, missedCount: 0, isShortAttendance: false, weeklyAttendanceCount: 0 },
    { subject: 'PPIT', attendedCount: 0, missedCount: 0, isShortAttendance: false, weeklyAttendanceCount: 0 },
];

export default function AttendanceValidation() {
    const [subjects, setSubjects] = useState<SubjectAttendance[]>(initialSubjects);

    const calculatePercentage = (attended: number, missed: number) => {
        const total = attended + missed;
        return total === 0 ? 0 : Math.round((attended / total) * 100);
    };

    const handleAttendance = (subjectIndex: number, attended: boolean) => {
        const updatedSubjects = [...subjects];
        const subject = updatedSubjects[subjectIndex];
        const totalCount = subject.attendedCount + subject.missedCount;

        if (subject.weeklyAttendanceCount >= MAX_ATTENDANCE_MARKS_PER_WEEK) {
            Alert.alert(
                'Attendance Limit',
                `You can only mark attendance ${MAX_ATTENDANCE_MARKS_PER_WEEK} times per week for ${subject.subject}.`
            );
            return;
        }

        if (totalCount >= TOTAL_LECTURES) {
            Alert.alert(
                'Attendance Limit Reached',
                `You cannot mark more than ${TOTAL_LECTURES} lectures for ${subject.subject}.`
            );
            return;
        }

        if (attended) {
            subject.attendedCount += 1;
        } else {
            subject.missedCount += 1;

            if (subject.missedCount >= 5 && !subject.isShortAttendance) {
                subject.isShortAttendance = true;
                Alert.alert(
                    'Short Attendance Warning',
                    `Your attendance for ${subject.subject} is below the required threshold. You are debarred.`
                );
            }
        }

        subject.weeklyAttendanceCount += 1; // Increment weekly attendance for this subject
        setSubjects(updatedSubjects);
    };

    const resetWeeklyAttendance = () => {
        const resetSubjects = subjects.map((subject) => ({
            ...subject,
            weeklyAttendanceCount: 0,
        }));
        setSubjects(resetSubjects);
        Alert.alert('Reset Successful', 'Weekly attendance limits have been reset.');
    };

    const renderSubject = ({ item, index }: { item: SubjectAttendance; index: number }) => {
        const attendancePercentage = calculatePercentage(item.attendedCount, item.missedCount);

        return (
            <View style={[styles.subjectContainer, item.isShortAttendance && styles.shortAttendance]}>
                <Text style={styles.subjectText}>{item.subject}</Text>
                <Text style={styles.attendanceText}>Attended: {item.attendedCount}</Text>
                <Text style={styles.attendanceText}>Missed: {item.missedCount}</Text>
                <Text style={styles.attendanceText}>Attendance: {attendancePercentage}%</Text>
                <Text style={styles.attendanceText}>
                    Weekly Marks: {item.weeklyAttendanceCount}/{MAX_ATTENDANCE_MARKS_PER_WEEK}
                </Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.yesButton} onPress={() => handleAttendance(index, true)}>
                        <Text style={styles.buttonText}>Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.noButton} onPress={() => handleAttendance(index, false)}>
                        <Text style={styles.buttonText}>No</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Attendance Portal</Text>
            <Text style={styles.subheading}>Registered Courses</Text>
            <FlatList
                data={subjects}
                renderItem={renderSubject}
                keyExtractor={(item) => item.subject}
                contentContainerStyle={styles.listContent}
            />
            <TouchableOpacity style={styles.resetButton} onPress={resetWeeklyAttendance}>
                <Text style={styles.resetButtonText}>Reset Weekly Attendance</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#ffffff' },
    title: { fontSize: 30, fontWeight: 'bold', color: '#333', textAlign: 'center', marginBottom: 10 },
    subheading: { fontSize: 18, color: '#666', alignSelf: 'flex-start', marginBottom: 20 },
    listContent: { paddingBottom: 20 },
    subjectContainer: { padding: 20, marginVertical: 10, borderRadius: 10, backgroundColor: '#f5f5f5' },
    subjectText: { fontSize: 18, fontWeight: 'bold', color: '#333' },
    attendanceText: { fontSize: 14, color: '#666', marginTop: 5 },
    buttonContainer: { flexDirection: 'row', marginTop: 15, justifyContent: 'space-between' },
    yesButton: { backgroundColor: '#4CAF50', padding: 10, borderRadius: 10, width: '45%', alignItems: 'center' },
    noButton: { backgroundColor: '#FF7E5F', padding: 10, borderRadius: 10, width: '45%', alignItems: 'center' },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    resetButton: { marginTop: 20, alignSelf: 'center', backgroundColor: '#007BFF', padding: 10, borderRadius: 10 },
    resetButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    shortAttendance: { borderColor: '#FF6347', borderWidth: 2, backgroundColor: '#FFE4E1' },
});
