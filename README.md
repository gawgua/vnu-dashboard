# VNU Dashboard

A modern web dashboard for Vietnam National University (VNU) students, built by reverse engineering the OneVNU mobile application API. This project provides a clean, responsive interface for accessing student information, grades, schedules, and academic data.

## 🎓 About

This dashboard was created by reverse engineering the OneVNU mobile app to provide students with a better web-based experience for accessing their academic information. It connects to the official VNU API endpoints to display real-time student data.

## ✨ Features

### 📊 Academic Overview
- **GPA Tracking**: Visual charts showing semester and cumulative GPA trends
- **Grade Distribution**: Subject score breakdown with interactive charts
- **Academic Summary**: Complete academic performance statistics

### 📅 Schedule Management
- **Class Timetable**: Weekly course schedule with time slots and locations
- **Exam Schedule**: Upcoming exams with dates, times, and venues
- **Academic Calendar**: Important dates and semester information

### 🎯 Student Information
- **Personal Profile**: Student details including name, student ID, and program information
- **Class Information**: Current class, major, and academic program details
- **University Logos**: Support for multiple VNU member universities (HUS, UET, UEB, UEd, etc.)

### 🔐 Authentication
- **Secure Login**: Integration with VNU's authentication system
- **Session Management**: Automatic token refresh and remember me functionality
- **Protected Routes**: Secure access to student data

## 🛠 Technology Stack

- **Frontend**: Next.js 15 with React 19
- **Styling**: Tailwind CSS with custom UI components
- **Charts**: Recharts for data visualization
- **Authentication**: JWT-based authentication with refresh tokens
- **HTTP Client**: Axios for API communication
- **TypeScript**: Full type safety throughout the application

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/gawgua/vnu-dashboard.git
   cd vnu-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## 🏫 Supported Universities

The dashboard supports students from various VNU member universities:

- **HUS** - Hanoi University of Science
- **UET** - University of Engineering and Technology
- **UEB** - University of Economics and Business
- **UEd** - University of Education
- **UL** - University of Law
- **ULIS** - University of Languages and International Studies
- **UMP** - University of Medicine and Pharmacy
- **USSH** - University of Social Sciences and Humanities
- **VJU** - Vietnam Japan University
- **HSB** - Hanoi School of Business
- **IS** - International School
- **SIS** - School of Interdisciplinary Studies

## 🔧 Development

### Project Structure

```
vnu-dashboard/
├── app/                    # Next.js app directory
│   ├── components/         # React components
│   ├── exam/              # Exam schedule pages
│   ├── gpa/               # GPA calculator pages
│   ├── login/             # Authentication pages
│   ├── schedule/          # Timetable pages
│   └── page.tsx           # Main dashboard page
├── components/ui/         # Reusable UI components
├── lib/                   # Utility functions and API handlers
├── types/                 # TypeScript type definitions
└── public/               # Static assets
```

### Key Components

- **APIHandler**: Manages all API communications with VNU servers
- **Authentication**: Handles login, logout, and token management
- **Charts**: Interactive data visualizations for GPA and grades
- **Sidebar**: Navigation component with responsive design

## 🔒 API Integration

The application integrates with the official VNU OneVNU mobile API:
- **Base URL**: `https://onevnu-mobile-api.vnu.edu.vn/api`
- **Authentication**: Bearer token-based authentication
- **Endpoints**: Student info, grades, schedules, exam data

## 📱 Responsive Design

The dashboard is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile devices

## 🤝 Contributing

This is a personal project reverse-engineered from the OneVNU mobile app. Contributions are welcome for:
- Bug fixes
- UI/UX improvements
- New features
- Documentation updates

## ⚠️ Disclaimer

This project is an unofficial web interface for VNU's student system. It was created by reverse engineering the OneVNU mobile app for educational and convenience purposes. The official OneVNU mobile app remains the primary supported platform.

## 📄 License

This project is for educational and personal use. Please respect VNU's terms of service and data policies.

---

Built with ❤️ for VNU students
