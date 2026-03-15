import React, { useRef } from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
// import { LinearGradient } from "expo-linear-gradient"; // Removing LinearGradient

interface ButtonProps {
  title?: string;
  onPress: () => void;
  currentColors: {
    primaryBackground: string;
    primaryText: string;
    secondaryText: string;
    primaryAccent: string;
    secondaryAccent: string;
    cardBackground: string;
    border: string;
    shadow: string;
    warning: string;
    categoryIcon: string;
    filterButton: string;
    bookNowButton: string;
  };
}

const Button = ({ title = "Button", onPress, currentColors }: ButtonProps) => {
  const translateY = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.spring(translateY, {
      toValue: 6,
      useNativeDriver: true,
      speed: 20,
      bounciness: 0,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
      speed: 20,
      bounciness: 0,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles(currentColors).outerWrapper,
        { transform: [{ translateY }] },
      ]}
    >
      <Pressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
        {/* Removing LinearGradient and innerHighlight for a minimalistic black and white design */}
        <View style={styles(currentColors).solidButton}>
          <Text style={styles(currentColors).text}>{title}</Text>
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = (currentColors: ButtonProps['currentColors']) => StyleSheet.create({
  outerWrapper: {
    marginTop: 20,
    borderRadius: 25, // Increased for rounder edges
    shadowColor: currentColors.shadow, // Subtle shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 3, // Android shadow
  },
  solidButton: {
    borderRadius: 25, // Increased for rounder edges
    backgroundColor: currentColors.bookNowButton, // Solid black background
    paddingVertical: 16,
    paddingHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1, // Adding a subtle white border
    borderColor: currentColors.border,
  },
  // innerHighlight: { // Removing innerHighlight
  //   position: "absolute",
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   height: "45%",
  //   backgroundColor: "rgba(255,255,255,0.25)",
  //   borderTopLeftRadius: 12,
  //   borderTopRightRadius: 12,
  // },
  text: {
    color: currentColors.cardBackground, // White text
    fontSize: 18,
    fontWeight: "600", // Slightly lighter font weight
    letterSpacing: 0.5,
    // textShadowColor: "rgba(255,255,255,0.3)", // Removing text shadow
    // textShadowOffset: { width: 0, height: 1 },
    // textShadowRadius: 2,
  },
});

export default Button;
