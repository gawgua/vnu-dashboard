# VNU Dashboard

A modern web dashboard for Vietnam National University students, built by reverse engineering the OneVNU mobile application API. This project provides a clean, responsive interface for accessing student information, grades, schedules, and academic data.

## 🎓 About

This project was created by reverse engineering the OneVNU Flutter mobile application to extract its API endpoints and recreate the functionality as a web application. The original mobile app's API was discovered using Blutter, a Flutter reverse engineering tool.

## ✨ Features

### 📊 Academic Overview
- **GPA Tracking**: Visual charts showing semester and cumulative GPA trends
- **Grade Distribution**: Subject score breakdown with interactive charts
- **Academic Summary**: Complete academic performance statistics

### 📅 Schedule Management
- **Class Timetable**: Weekly course schedule with time slots and locations
- **Exportable Timetable**: Export to .ics for Google Calendar, AppleCalender, ...
- **Exam Schedule**: Upcoming exams with dates, times, and venues

### 🎯 Student Information
- **Personal Profile**: Student details including name, student ID, and program information
- **Class Information**: Current class, major, and academic program details

### 🔐 Authentication
- **Secure Login**: Integration with VNU's authentication system
- **Session Management**: Automatic token refresh and remember me functionality
- **Protected Routes**: Secure access to student data

## 🛠 Technology Stack

- **Frontend**: Next.js 15 with React 19
- **Styling**: Tailwind CSS with custom UI components
- **Charts**: Recharts for data visualization
- **HTTP Client**: Axios for API communication
- **TypeScript**: Full type safety throughout the application

## How to build


```bash
npm run build
npm start
```

## 🏫 Supported Universities

If you can login to OneVNU, this should probably work for you too.


## 🔒 API Integration

The application integrates with the official VNU OneVNU mobile API:
- **Base URL**: `https://onevnu-mobile-api.vnu.edu.vn/api`
- **Authentication**: Bearer token-based authentication
  
Documentation can be found at: https://onevnu.apidog.io

## ⚠️ Disclaimer

This project is an unofficial web interface for VNU's student system and is not officially associated with Vietnam National University or the original OneVNU application. It was created for educational purposes and personal use only. 

The official OneVNU mobile app remains the primary supported platform.

---

Built with ❤️ for VNU students