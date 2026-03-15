"use client"

import * as LucideIcons from "lucide-react-native";
import BottomTabBar from "@/components/BottomTabBar"
import PhotographerCard from "@/components/PhotographerCard"
import { router } from "expo-router"
import { useEffect, useRef, useState } from "react"
import { Animated, Dimensions, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { MOCK_PHOTOGRAPHERS } from "@/data/mockData"
import SkeletonCard from "@/components/SkeletonCard"
import { colors, spacing, radius, typography, shadows } from "../theme/theme"

const { width } = Dimensions.get("window");

const usePressScale = () => {
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 0.96,
      speed: 20,
      bounciness: 4,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      speed: 20,
      bounciness: 4,
      useNativeDriver: true,
    }).start();
  };

  return {
    scaleStyle: { transform: [{ scale }] },
    onPressIn,
    onPressOut,
  };
};

export default function Index() {
  const [activeTab, setActiveTab] = useState("Home")
  const [favoritePhotographers, setFavoritePhotographers] = useState<string[]>([])
  const photographers = MOCK_PHOTOGRAPHERS;
  const [isLoading, setIsLoading] = useState(true);

  // Animations
  const heroFade = useRef(new Animated.Value(0)).current;
  const heroSlide = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    Animated.parallel([
      Animated.timing(heroFade, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.timing(heroSlide, { toValue: 0, duration: 700, useNativeDriver: true }),
    ]).start();
    return () => clearTimeout(timer);
  }, []);

  const currentColors = {
    primaryBackground: colors.background,
    primaryText: colors.textPrimary,
    secondaryText: colors.textSecondary,
    primaryAccent: colors.primary,
    secondaryAccent: colors.accent,
    cardBackground: colors.card,
    border: colors.divider,
    shadow: 'rgba(122,90,43,0.08)',
    success: colors.success,
    error: colors.error,
    warning: colors.warning,
    categoryIconBg: colors.primary,
    categoryIcon: colors.white,
    filterButton: colors.white,
    bookNowButton: colors.primary,
  };

  const storyPress = usePressScale();
  const heroPress = usePressScale();

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
    if (tabName === "Home") router.replace("/");
    else if (tabName === "Explore") router.replace("/categories");
    else if (tabName === "Book") router.replace("/book");
  };

  const categories = [
    { name: "Wedding", icon: LucideIcons.Heart },
    { name: "Portrait", icon: LucideIcons.User },
    { name: "Fashion", icon: LucideIcons.Shirt },
    { name: "Events", icon: LucideIcons.Calendar },
    { name: "Commercial", icon: LucideIcons.Briefcase },
    { name: "Street", icon: LucideIcons.Camera },
    { name: "Wildlife", icon: LucideIcons.Feather },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

        {/* ─── Compact Header ─── */}
        <View style={styles.header}>
          <Text style={styles.brandTitle}>pixel-lyrics</Text>
          <TouchableOpacity style={styles.profileBtn} onPress={() => router.push("/photographer/dashboard")}>
              <Image
                source={{ uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" }}
                style={styles.profileImg}
              />
          </TouchableOpacity>
        </View>

        {/* ─── AI HERO SECTION (Dominant) ─── */}
        <Animated.View style={[styles.heroContainer, { opacity: heroFade, transform: [{ translateY: heroSlide }] }]}>
          <Animated.View style={[styles.heroCard, heroPress.scaleStyle]}>
            <View style={styles.heroBadge}>
              <LucideIcons.Sparkles size={14} color={colors.white} />
              <Text style={styles.heroBadgeText}>AI-Powered</Text>
            </View>

            <Text style={styles.heroHeadline}>
              Find Photographers{"\n"}That Match Your Style
            </Text>
            <Text style={styles.heroSubtext}>
              Upload a reference photo and our AI finds photographers with similar aesthetics.
            </Text>

            <Animated.View style={[styles.heroCtas, heroPress.scaleStyle]}>
              <TouchableOpacity
                style={styles.primaryStoryBtn}
                onPress={() => router.push("/onboarding")}
                activeOpacity={0.9}
                onPressIn={storyPress.onPressIn}
                onPressOut={storyPress.onPressOut}
              >
                <Text style={styles.primaryStoryText}>See How pixel-lyrics Works</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.heroBtn}
                onPress={() => router.push('/ai-match' as any)}
                activeOpacity={0.9}
                onPressIn={heroPress.onPressIn}
                onPressOut={heroPress.onPressOut}
              >
                <LucideIcons.Upload size={18} color={colors.primary} />
                <Text style={styles.heroBtnText}>Upload Inspiration Photo</Text>
                <LucideIcons.ArrowRight size={16} color={colors.primary} />
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        </Animated.View>

        {/* ─── Search Bar ─── */}
        <View style={styles.searchRow}>
          <View style={styles.searchBar}>
            <LucideIcons.Search size={18} color={colors.textSecondary} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search photographers, styles..."
              placeholderTextColor={colors.textSecondary}
            />
          </View>
          <TouchableOpacity style={styles.filterBtn}>
            <LucideIcons.SlidersHorizontal size={18} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* ─── Category Chips (Horizontal) ─── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipRow}
          style={{ marginBottom: spacing.xl }}
        >
          {categories.map((cat, i) => (
            <TouchableOpacity
              key={i}
              style={styles.chip}
              onPress={() => router.push("/categories")}
              activeOpacity={0.8}
            >
              <cat.icon size={16} color={colors.primary} strokeWidth={2} />
              <Text style={styles.chipText}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ─── Popular Photographers ─── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Photographers</Text>
            <TouchableOpacity onPress={() => router.push("/book" as any)}>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>

          {isLoading ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: spacing.lg }}>
              {[1, 2, 3].map((key) => (
                <SkeletonCard key={key} currentColors={currentColors} />
              ))}
            </ScrollView>
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: spacing.lg }}>
              {photographers.map((photographer) => (
                <PhotographerCard
                  key={photographer.id}
                  imageSource={photographer.img}
                  name={photographer.name}
                  specialty={photographer.specialty}
                  price={`₹${photographer.startingPriceINR.toLocaleString('en-IN')}`}
                  distance={photographer.distance}
                  rating={photographer.rating}
                  numberOfReviews={photographer.reviews}
                  onPress={() => router.push(`/photographer/${photographer.id}`)}
                  currentColors={currentColors}
                  isFavorite={favoritePhotographers.includes(photographer.id)}
                  onToggleFavorite={() => {
                    setFavoritePhotographers((prev) =>
                      prev.includes(photographer.id)
                        ? prev.filter((id) => id !== photographer.id)
                        : [...prev, photographer.id]
                    )
                  }}
                  badge={photographer.badge}
                  isVerified={photographer.isVerified}
                  location={photographer.location}
                  styleTags={photographer.styleTags}
                />
              ))}
            </ScrollView>
          )}
        </View>

        {/* ─── How It Works (Compact) ─── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>How It Works</Text>
          </View>
          <View style={styles.stepsRow}>
            {[
              { icon: LucideIcons.Upload, label: "Upload Photo" },
              { icon: LucideIcons.Sparkles, label: "AI Matches" },
              { icon: LucideIcons.CalendarCheck, label: "Book & Shoot" },
            ].map((step, i) => (
              <View key={i} style={styles.stepItem}>
                <View style={styles.stepCircle}>
                  <step.icon size={20} color={colors.primary} />
                </View>
                <Text style={styles.stepLabel}>{step.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ─── Footer ─── */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2026 pixel-lyrics. All rights reserved.</Text>
        </View>
      </ScrollView>

      <BottomTabBar activeTab={activeTab} onTabPress={handleTabChange} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  brandTitle: {
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: 0.5,
    color: "#1A1A1A",
  },
  profileBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: colors.divider,
  },
  profileImg: {
    width: "100%",
    height: "100%",
  },

  // AI Hero
  heroContainer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  heroCard: {
    backgroundColor: colors.primary,
    borderRadius: radius.large,
    padding: spacing.xl,
    ...shadows.elevated,
  },
  heroBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.full,
    alignSelf: "flex-start",
    marginBottom: spacing.md,
  },
  heroBadgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.white,
  },
  heroHeadline: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.white,
    lineHeight: 36,
    marginBottom: spacing.sm,
  },
  heroSubtext: {
    fontSize: 14,
    color: "rgba(255,255,255,0.75)",
    lineHeight: 22,
    marginBottom: spacing.lg,
  },
  heroCtas: {
    gap: 10,
  },
  primaryStoryBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.6)",
    alignItems: "center",
    marginBottom: 8,
  },
  primaryStoryText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  heroBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: colors.white,
    paddingVertical: 16,
    borderRadius: radius.medium,
  },
  heroBtnText: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.primary,
  },

  // Search
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    gap: 10,
    marginBottom: spacing.md,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: radius.medium,
    paddingHorizontal: 16,
    height: 48,
    gap: 10,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  searchInput: {
    flex: 1,
    ...typography.body,
    color: colors.textPrimary,
  },
  filterBtn: {
    width: 48,
    height: 48,
    borderRadius: radius.medium,
    backgroundColor: colors.card,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.divider,
  },

  // Category Chips
  chipRow: {
    paddingHorizontal: spacing.lg,
    gap: 10,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.card,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  chipText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textPrimary,
  },

  // Sections
  section: {
    marginBottom: spacing.xxl,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.sectionTitle,
  },
  seeAll: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.accent,
  },

  // How It Works
  stepsRow: {
    flexDirection: "row",
    paddingHorizontal: spacing.lg,
    gap: 12,
  },
  stepItem: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: radius.medium,
    padding: spacing.lg,
    alignItems: "center",
    gap: 10,
    ...shadows.card,
  },
  stepCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary10,
    alignItems: "center",
    justifyContent: "center",
  },
  stepLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textPrimary,
    textAlign: "center",
  },

  // Footer
  footer: {
    alignItems: "center",
    paddingVertical: spacing.xxl,
  },
  footerText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});
