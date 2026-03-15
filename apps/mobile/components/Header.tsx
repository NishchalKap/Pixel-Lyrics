import { router } from "expo-router"
import * as LucideIcons from "lucide-react-native"
import React from "react"
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native"

interface HeaderProps {
  title: string
  onBackPress?: () => void
  showBackButton?: boolean
}

const Header: React.FC<HeaderProps> = ({ title, onBackPress, showBackButton = true }) => {
  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress()
    } else {
      router.back()
    }
  }

  return (
    <View style={styles.headerContainer}>
      {showBackButton && (
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <LucideIcons.ArrowLeft size={22} color="#7A5A2B" />
        </TouchableOpacity>
      )}
      <Image
        source={require('../assets/logo/pixel-lyrics-logo.png')}
        style={{ width: 140, height: 40, resizeMode: 'contain' }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#F8F6F2",
    borderBottomWidth: 1,
    borderBottomColor: "#E9DFC8",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F0EBE1",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2C2C2C",
  },
})

export default Header
