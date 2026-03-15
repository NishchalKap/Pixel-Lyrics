import React, { useEffect, useRef } from "react"
import { Animated, Dimensions, StyleSheet, View } from "react-native"

const { width } = Dimensions.get("window")

interface SkeletonCardProps {
  currentColors: any
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({ currentColors }) => {
  const pulseAnim = useRef(new Animated.Value(0.3)).current

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start()
  }, [])

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: currentColors.cardBackground,
          borderColor: currentColors.border,
        },
      ]}
    >
      <Animated.View
        style={[styles.imageSkeleton, { backgroundColor: '#E9DFC8', opacity: pulseAnim }]}
      />
      <View style={styles.content}>
        <Animated.View
          style={[styles.nameSkeleton, { backgroundColor: '#E9DFC8', opacity: pulseAnim }]}
        />
        <Animated.View
          style={[styles.specialtySkeleton, { backgroundColor: '#E9DFC8', opacity: pulseAnim }]}
        />
        <View style={styles.ratingRow}>
          <Animated.View
            style={[styles.ratingSkeleton, { backgroundColor: '#E9DFC8', opacity: pulseAnim }]}
          />
          <Animated.View
            style={[styles.distanceSkeleton, { backgroundColor: '#E9DFC8', opacity: pulseAnim }]}
          />
        </View>
        <Animated.View
          style={[styles.priceSkeleton, { backgroundColor: '#E9DFC8', opacity: pulseAnim }]}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: width * 0.58,
    maxWidth: 230,
    borderRadius: 16,
    marginRight: 14,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    overflow: "hidden",
    borderWidth: 1,
  },
  imageSkeleton: {
    width: "100%",
    height: 150,
  },
  content: {
    padding: 12,
  },
  nameSkeleton: {
    width: "70%",
    height: 18,
    borderRadius: 4,
    marginBottom: 8,
  },
  specialtySkeleton: {
    width: "50%",
    height: 12,
    borderRadius: 4,
    marginBottom: 12,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  ratingSkeleton: {
    width: "30%",
    height: 12,
    borderRadius: 4,
  },
  distanceSkeleton: {
    width: "25%",
    height: 12,
    borderRadius: 4,
  },
  priceSkeleton: {
    width: "100%",
    height: 36,
    borderRadius: 8,
  },
})

export default SkeletonCard
