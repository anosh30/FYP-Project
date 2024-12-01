# ClassMate

ClassMate is a community-driven application designed to enhance the student experience in educational institutions. It provides features like timetable management, lecture notifications, query discussion forums, resource sharing, attendance tracking, flashcards for exam preparation, and an admin portal for managing users and content. This project is built using React Native for mobile and web versions.

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Installation](#installation)
5. [Setup](#setup)
6. [Usage](#usage)
7. [API Documentation](#api-documentation)
8. [Contributing](#contributing)
9. [License](#license)

---

## Overview

ClassMate aims to facilitate student life by providing an easy-to-use platform to manage schedules, share resources, track attendance, and engage in academic discussions. The app integrates notification features to remind students about classes, helps them stay on top of their attendance, and provides a forum for discussions and sharing course-related content.

---

## Features

### 1. **Lecture Management**
   - Upload timetable in Excel format.
   - Notifications about upcoming classes (room and time).
   - Admin can manage timetables and monitor user queries.

### 2. **Query & Discussion Forum**
   - Students can post queries and engage in academic discussions.
   - Posts can be rated by other students.

### 3. **Resource Sharing Repository**
   - Students upload course-related resources for sharing.
   - Admin can monitor resource uploads and remove irrelevant content.

### 4. **Attendance Validation**
   - Tracks missed classes and prompts students to confirm attendance.
   - If a student misses a class five times, a warning alert is triggered.

### 5. **Exam Preparation and Flashcards**
   - Flashcards for exam preparation to help students memorize important concepts.

### 6. **AI Quiz Generation**
   - GPT-powered quiz generation based on the uploaded resources and class content.

### 7. **Admin Portal**
   - Admin can monitor users, manage resources, and generate reports.
   - Admin can add/remove users but cannot chat or manage attendance.

### 8. **Community Chat**
   - Chat feature for students to communicate.

---

## Technologies Used

- **Frontend**: React Native (for mobile)
- **Backend**: Node.js, Express.js
- **Database**: Postgresql
- **AI Integration**: LLM (for quiz generation and exam preparation)
- **Authentication**: JWT-based authentication
- **Other**: Excel file processing for timetable uploads, Notification System

---

## Installation

To set up this project locally, follow the steps below.

### 1. Clone the repository:
```bash
git clone https://github.com/yourusername/ClassMate.git
