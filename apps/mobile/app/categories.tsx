"use client"

import { router } from "expo-router"
import * as LucideIcons from "lucide-react-native"
import React, { useRef, useEffect, useMemo, useState } from "react"
import {
  Animated,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native"
import Header from "../components/Header"
import { colors, spacing, radius, typography, shadows } from "../theme/theme"

interface Category {
  id: string
  name: string
  iconName: keyof typeof LucideIcons
}

const categories: Category[] = [
  { id: "1", name: "Wedding", iconName: "Heart" },
  { id: "2", name: "Portrait", iconName: "User" },
  { id: "3", name: "Fashion", iconName: "Shirt" },
  { id: "4", name: "Events", iconName: "Calendar" },
  { id: "5", name: "Commercial", iconName: "Briefcase" },
  { id: "6", name: "Street", iconName: "Camera" },
  { id: "7", name: "Food", iconName: "Coffee" },
  { id: "8", name: "Architecture", iconName: "Building" },
  { id: "9", name: "Wildlife", iconName: "Feather" },
]

const CategoryCard = ({
  name,
  iconName,
  onPress,
  cardWidth,
}: {
  name: string
  iconName: keyof typeof LucideIcons
  onPress: () => void
  cardWidth: number
}) => {
  const IconComponent = LucideIcons[iconName] as React.ComponentType<any>
  const scaleAnim = useRef(new Animated.Value(1)).current

  const handlePressIn = () => {
    Animated.spring(scaleAnim, { toValue: 0.95, useNativeDriver: true }).start()
  }
  const handlePressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start()
  }

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        style={[styles.card, { width: cardWidth }]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.85}
      >
        <View style={styles.iconCircle}>
          <IconComponent size={26} color={colors.primary} strokeWidth={1.8} />
        </View>
        <Text style={styles.cardTitle}>{name}</Text>
      </TouchableOpacity>
    </Animated.View>
  )
}

export default function CategoriesScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const { width } = useWindowDimensions()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const numColumns = 2
  const cardPadding = spacing.lg
  const cardGap = spacing.md
  const cardWidth = (width - cardPadding * 2 - cardGap) / numColumns

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }, [])

  return (
    <View style={styles.container}>
      <Header title="Explore Categories" onBackPress={() => router.replace("/")} />

      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        {/* Chip filters at top */}
        <View style={styles.chipSection}>
          <Text style={styles.chipLabel}>Quick filter</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ gap: 8, paddingHorizontal: spacing.lg }}
            renderItem={({ item }) => {
              const isSelected = selectedCategory === item.id
              return (
                <TouchableOpacity
                  style={[styles.chip, isSelected && styles.chipActive]}
                  onPress={() => setSelectedCategory(isSelected ? null : item.id)}
                >
                  <Text style={[styles.chipText, isSelected && styles.chipTextActive]}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )
            }}
          />
        </View>

        {/* Category Grid */}
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}
          columnWrapperStyle={styles.gridRow}
          contentContainerStyle={{ padding: cardPadding, paddingTop: spacing.md }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <CategoryCard
              name={item.name}
              iconName={item.iconName}
              onPress={() => console.log(`[Category]: ${item.name}`)}
              cardWidth={cardWidth}
            />
          )}
        />
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // Chips
  chipSection: {
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  chipLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: radius.full,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  chipTextActive: {
    color: colors.white,
  },

  // Grid
  gridRow: {
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.large,
    paddingVertical: spacing.xl,
    alignItems: "center",
    justifyContent: "center",
    ...shadows.card,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.sm,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.textPrimary,
    textAlign: "center",
  },
})
