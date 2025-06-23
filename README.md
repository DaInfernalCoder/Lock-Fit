# 🏋️‍♂️ Lock-Fit

> **Gamify your fitness journey with app blocking motivation**

Lock-Fit is a revolutionary fitness app that helps you stay committed to your workout routine by locking your favorite apps until you complete your daily exercise. Transform procrastination into motivation and build lasting healthy habits.

![Lock-Fit Hero](https://img.shields.io/badge/Platform-iOS%20%7C%20Android-blue) ![React Native](https://img.shields.io/badge/React%20Native-0.79.4-61DAFB) ![Expo](https://img.shields.io/badge/Expo-53.0.12-000020) ![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6)

## ✨ Features

### 🔒 **Smart App Blocking**

- Lock distracting apps (Instagram, TikTok, YouTube) until workout completion
- Customizable daily lock start time
- Intelligent unlock conditions based on fitness goals

### 💪 **Interactive Body Tracking**

- 3D body highlighter with muscle group visualization
- Real-time workout session tracking
- Muscle-specific exercise recommendations
- Progress visualization with intensity mapping

### 📊 **Comprehensive Progress Analytics**

- Weekly, monthly, and all-time progress tracking
- Performance metrics and streak monitoring
- Motivational achievements and milestones
- Health app synchronization (Apple Health)

### 🎯 **Personalized Workout Plans**

- AI-powered workout generation based on:
  - Fitness level and experience
  - Available workout time (15-90 minutes)
  - Target goals (strength, weight loss, recovery)
  - Preferred workout location (home/gym)
- Adaptive difficulty progression

### 🔔 **Smart Notifications**

- Workout reminders and streak warnings
- Progress tips and motivation
- Customizable notification preferences

## 📱 Screenshots

| Onboarding     | Body Tracker           | Progress Dashboard | Settings          |
| -------------- | ---------------------- | ------------------ | ----------------- |
| _Welcome flow_ | _Muscle visualization_ | _Analytics view_   | _App preferences_ |

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development) or Android Studio (for Android development)

### Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/DaInfernalCoder/Lock-Fit.git
   cd Lock-Fit
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npx expo start
   ```

4. **Run on your device**
   - Download the Expo Go app on your phone
   - Scan the QR code from the terminal
   - Or press `i` for iOS simulator, `a` for Android emulator

### Environment Setup

Create a `.env` file in the root directory:

```env
# Optional: Add your API keys here when implementing backend services
# FIREBASE_API_KEY=your_firebase_key
# HEALTH_API_KEY=your_health_api_key
```

## 🏗️ Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: Expo Router
- **UI Components**: Custom components with Lucide React Native icons
- **Animations**: React Native Reanimated
- **Body Visualization**: react-native-body-highlighter
- **State Management**: React Hooks (useState, useEffect, custom hooks)
- **Styling**: StyleSheet with custom design system

## 📁 Project Structure

```
lock-fit/
├── app/                    # App screens and navigation
│   ├── (auth)/            # Authentication screens
│   ├── (onboarding)/      # Onboarding flow
│   ├── (tabs)/            # Main app tabs
│   └── _layout.tsx        # Root layout
├── components/            # Reusable UI components
│   ├── workout/           # Workout-specific components
│   └── ui/                # General UI components
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript type definitions
├── assets/                # Images, fonts, and static assets
└── constants/             # App constants and configuration
```

## 🎨 Design System

Lock-Fit features a modern dark theme with:

- **Primary Color**: Blue (#0070FF)
- **Background**: Dark (#121212)
- **Typography**: Inter and Poppins font families
- **Components**: Consistent spacing, rounded corners, and subtle shadows
- **Accessibility**: High contrast ratios and readable font sizes

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build:web` - Build for web
- `npm run lint` - Run ESLint

### Key Features Implementation

#### Body Highlighter

```typescript
// Interactive muscle group visualization
const { activeMuscles, handleMusclePress } = useWorkoutSession();
```

#### Progress Tracking

```typescript
// Comprehensive analytics with time-based filtering
const { progressData, loading } = useProgressData(timePeriod);
```

#### Onboarding Flow

- 9-step personalized setup
- Goal setting and preference collection
- Smooth animations and progress indicators

## 🔐 Security & Privacy

- Secure authentication implementation (planned)
- Local data storage with encryption
- Privacy-first approach to user data
- GDPR compliance considerations
- No sensitive data logging in production

## 🚧 Roadmap

### Phase 1: Core Features ✅

- [x] Onboarding flow
- [x] Body visualization
- [x] Progress tracking
- [x] Settings management

### Phase 2: Authentication & Backend 🔄

- [ ] Firebase authentication
- [ ] User data synchronization
- [ ] Cloud backup and restore

### Phase 3: Advanced Features 📅

- [ ] Social features and challenges
- [ ] AI-powered workout recommendations
- [ ] Wearable device integration
- [ ] Nutrition tracking

### Phase 4: Platform Expansion 🎯

- [ ] Apple Watch companion app
- [ ] Web dashboard
- [ ] Premium subscription features

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Maintain consistent code formatting
- Add proper error handling
- Include unit tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Native Body Highlighter** - For the amazing muscle visualization component
- **Expo Team** - For the excellent development platform
- **Lucide Icons** - For the beautiful icon set
- **Fitness Community** - For inspiration and feedback

## 📞 Support

- 📧 Email: support@lockfit.app
- 🐛 Issues: [GitHub Issues](https://github.com/DaInfernalCoder/Lock-Fit/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/DaInfernalCoder/Lock-Fit/discussions)

## 🌟 Show Your Support

If you like this project, please consider:

- ⭐ Starring the repository
- 🍴 Forking for your own modifications
- 📢 Sharing with friends and fellow developers
- 🐛 Reporting bugs and suggesting features

---

**Built with ❤️ for the fitness community**

_Transform your phone from a distraction into your biggest fitness motivator._
