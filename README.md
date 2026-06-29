# CoinCode

CoinCode is a premium, dark-themed crypto trading companion app built with React Native.

## 🚀 Features Built So Far (Phase 1)

### 1. **Custom UI & Theming**
- **Dark Theme Engine**: Implemented a robust `ThemeProvider` with a cohesive dark palette (`#0AA8C5` Cyan, Dark Greys, and Blacks).
- **Typography System**: Created a centralized `Typography` component.
- **Custom Fonts**: Successfully linked and integrated the complete `Roboto` font family (Regular, Medium, Bold, etc.) across both iOS and Android.

### 2. **Navigation & Animations**
- **React Navigation**: Setup a complete navigation flow separating Public (`LoginScreen`) and Private (`MainTabs`) routes.
- **Custom Bottom Tab Bar**: Built a fully custom, floating bottom tab bar.
- **Smooth Animations**: Integrated `Animated.timing` and interpolation to smoothly animate active tab width (45px to 125px) and background color transitions.
- **Layout Animations**: Added `LayoutAnimation` for smooth screen transitions.

### 3. **Reusable Components**
- **CommonButton**: A highly customizable, pill-shaped button that supports dynamic loading states, automatic shrinking animations (`Animated.createAnimatedComponent`), and custom fonts.
- **CommonInput**: A sleek, dark-themed text input component used for the authentication forms.
- **Screen**: A unified wrapper component that automatically handles Safe Area boundaries and dark backgrounds.

### 4. **Authentication Flow**
- **Login Screen**: A premium UI for user login. Features a dynamic interactive "Login" button that seamlessly shrinks into a loading spinner when pressed.
- **State Management**: Integrated `Zustand` for lightweight, blazing-fast state management (`authStore`).

## 🛠 Tech Stack
- **React Native** (v0.86)
- **React Navigation** (Bottom Tabs & Native Stack)
- **Zustand** (State Management)
- **Lucide React Native** (Icons)

## 🏃‍♂️ How to Run
```bash
# Install dependencies
npm install

# Run on iOS
npm run ios

# Run on Android
npm run android
```

---
*Next Phase: Integrating Real-Time WebSocket data from Binance API for live crypto prices on the Market Screen.*
