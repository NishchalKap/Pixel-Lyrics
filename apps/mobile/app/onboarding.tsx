import React, { useRef, useEffect } from "react";
import {
  Animated,
  Dimensions,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";
import * as LucideIcons from "lucide-react-native";
import { colors, spacing, radius, typography, shadows } from "../theme/theme";

const { width, height } = Dimensions.get("window");
const SCENE_HEIGHT = height;
const SCENE_COUNT = 5;
const isSmallScreen = width < 380;

// ─── Floating Icon ──────────────────────────────────────
const FloatingIcon = ({
  icon: Icon,
  size,
  color,
  x,
  y,
  delay,
}: {
  icon: any;
  size: number;
  color: string;
  x: number;
  y: number;
  delay: number;
}) => {
  const float = useRef(new Animated.Value(0)).current;
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fade, { toValue: 0.6, duration: 800, delay, useNativeDriver: true }).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(float, { toValue: -12, duration: 2200 + delay, useNativeDriver: true }),
        Animated.timing(float, { toValue: 12, duration: 2200 + delay, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={{
        position: "absolute",
        left: x,
        top: y,
        opacity: fade,
        transform: [{ translateY: float }],
      }}
    >
      <View style={styles.floatBubble}>
        <Icon size={size} color={color} />
      </View>
    </Animated.View>
  );
};

// ─── Scene Component ────────────────────────────────────
const Scene = ({
  scrollY,
  index,
  icon: Icon,
  title,
  description,
  bgColor,
}: {
  scrollY: Animated.Value;
  index: number;
  icon: any;
  title: string;
  description: string;
  bgColor: string;
}) => {
  const inputStart = index * SCENE_HEIGHT;
  const inputMid = inputStart + SCENE_HEIGHT * 0.5;
  const inputEnd = inputStart + SCENE_HEIGHT;

  const fadeIn = scrollY.interpolate({
    inputRange: [inputStart - SCENE_HEIGHT * 0.3, inputStart, inputMid],
    outputRange: [0, 1, 1],
    extrapolate: "clamp",
  });

  const slideUp = scrollY.interpolate({
    inputRange: [inputStart - SCENE_HEIGHT * 0.3, inputStart],
    outputRange: [60, 0],
    extrapolate: "clamp",
  });

  const scaleIcon = scrollY.interpolate({
    inputRange: [inputStart - SCENE_HEIGHT * 0.2, inputStart, inputMid],
    outputRange: [0.6, 1, 1.05],
    extrapolate: "clamp",
  });

  const parallaxY = scrollY.interpolate({
    inputRange: [inputStart, inputEnd],
    outputRange: [0, -40],
    extrapolate: "clamp",
  });

  // Mascot animation for Scene 1
  const mascotOpacity =
    index === 0
      ? scrollY.interpolate({
          inputRange: [inputStart - SCENE_HEIGHT * 0.3, inputStart, inputMid],
          outputRange: [0, 1, 1],
          extrapolate: "clamp",
        })
      : undefined;

  const mascotScale =
    index === 0
      ? scrollY.interpolate({
          inputRange: [inputStart, inputMid, inputEnd],
          outputRange: [0.9, 1, 1.05],
          extrapolate: "clamp",
        })
      : undefined;

  const mascotTranslateY =
    index === 0
      ? scrollY.interpolate({
          inputRange: [inputStart, inputMid, inputEnd],
          outputRange: [20, 0, -10],
          extrapolate: "clamp",
        })
      : undefined;

  return (
    <View style={[styles.scene, { backgroundColor: bgColor }]}>
      <Animated.View
        style={[
          styles.sceneContent,
          {
            opacity: fadeIn,
            transform: [{ translateY: Animated.add(slideUp, parallaxY) }],
          },
        ]}
      >
        <Animated.View
          style={[
            styles.sceneIconWrap,
            {
              transform: [{ scale: scaleIcon }],
            },
          ]}
        >
          <Icon size={40} color={colors.primary} />
        </Animated.View>

        {index === 0 && mascotOpacity && mascotScale && mascotTranslateY && (
          <Animated.Image
            source={require("../assets/mascot/photographer.jpg")}
            style={[
              styles.mascotImage,
              {
                opacity: mascotOpacity,
                transform: [{ scale: mascotScale }, { translateY: mascotTranslateY }],
              },
            ]}
          />
        )}

        <Text style={[styles.sceneTitle, isSmallScreen && styles.sceneTitleSmall]}>{title}</Text>
        <Text style={[styles.sceneDesc, isSmallScreen && styles.sceneDescSmall]}>{description}</Text>
      </Animated.View>
    </View>
  );
};

// ─── Main Landing Screen ────────────────────────────────
export default function LandingScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;

  // Dot indicator
  const activeDot = scrollY.interpolate({
    inputRange: Array.from({ length: SCENE_COUNT }, (_, i) => i * SCENE_HEIGHT),
    outputRange: Array.from({ length: SCENE_COUNT }, (_, i) => i),
    extrapolate: "clamp",
  });

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: true }
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* Floating camera icons (persist across scenes) */}
      <FloatingIcon icon={LucideIcons.Camera} size={18} color={colors.accent} x={width * 0.08} y={60} delay={0} />
      <FloatingIcon icon={LucideIcons.Aperture} size={16} color={colors.primary} x={width * 0.82} y={80} delay={400} />
      <FloatingIcon icon={LucideIcons.Focus} size={14} color={colors.accent} x={width * 0.9} y={height * 0.5} delay={800} />
      <FloatingIcon icon={LucideIcons.Image} size={12} color={colors.primary} x={width * 0.04} y={height * 0.6} delay={600} />

      {/* Scroll-driven scenes */}
      <Animated.ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        pagingEnabled
        decelerationRate="fast"
        snapToInterval={SCENE_HEIGHT}
        snapToAlignment="start"
      >
        <Scene
          scrollY={scrollY}
          index={0}
          icon={LucideIcons.Camera}
          title="Capture moments that matter."
          description="Talented photographers capture once-in-a-lifetime stories with their DSLR and lenses."
          bgColor={colors.background}
        />
        <Scene
          scrollY={scrollY}
          index={1}
          icon={LucideIcons.SearchX}
          title="But finding the right photographer is hard."
          description="Endless scrolling, DMs, and no transparent pricing. Finding your photographer shouldn't be this painful."
          bgColor="#FFF5F0"
        />
        <Scene
          scrollY={scrollY}
          index={2}
          icon={LucideIcons.Sparkles}
          title="pixel-lyrics AI matches photographers by style."
          description="Upload a reference photo — our AI analyzes color palette, lighting, and composition to match you with photographers who shoot in that style."
          bgColor="#F5F0FF"
        />
        <Scene
          scrollY={scrollY}
          index={3}
          icon={LucideIcons.CalendarCheck}
          title="Book instantly and stress-free."
          description="See availability, pricing in ₹, and confirm your shoot in a few taps."
          bgColor="#F0FFF5"
        />

        {/* Scene 5 — CTA */}
        <View style={[styles.scene, { backgroundColor: colors.primary }]}>
          <View style={styles.ctaScene}>
            <View style={styles.ctaIconWrap}>
              <LucideIcons.ImageDown size={40} color={colors.white} />
            </View>
            <Text style={styles.ctaTitle}>Receive your edited photos beautifully.</Text>
            <Text style={styles.ctaSub}>
              Professionally colour-graded, digitally delivered to your gallery. That's pixel-lyrics.
            </Text>

            <Animated.View style={{ width: "100%", transform: [{ scale: 1 }] }}>
              <TouchableOpacity
                style={styles.ctaPrimary}
                onPress={() => router.replace("/")}
                activeOpacity={0.9}
              >
                <Text style={styles.ctaPrimaryText}>Enter pixel-lyrics</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </Animated.ScrollView>

      {/* Dot indicator */}
      <View style={styles.dotBar}>
        {Array.from({ length: SCENE_COUNT }).map((_, i) => {
          const dotOpacity = scrollY.interpolate({
            inputRange: [(i - 1) * SCENE_HEIGHT, i * SCENE_HEIGHT, (i + 1) * SCENE_HEIGHT],
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });
          const dotScale = scrollY.interpolate({
            inputRange: [(i - 1) * SCENE_HEIGHT, i * SCENE_HEIGHT, (i + 1) * SCENE_HEIGHT],
            outputRange: [1, 1.4, 1],
            extrapolate: "clamp",
          });
          return (
            <Animated.View
              key={i}
              style={[
                styles.dot,
                {
                  opacity: dotOpacity,
                  transform: [{ scale: dotScale }],
                  backgroundColor: i === 4 ? colors.white : colors.primary,
                },
              ]}
            />
          );
        })}
      </View>

      {/* Skip button */}
      <TouchableOpacity
        style={styles.skipBtn}
        onPress={() => router.replace("/")}
        activeOpacity={0.8}
      >
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  floatBubble: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary10,
    alignItems: "center",
    justifyContent: "center",
  },

  // Scenes
  scene: {
    width,
    height: SCENE_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.xl,
  },
  sceneContent: {
    alignItems: "center",
    maxWidth: 360,
  },
  sceneIconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.xl,
  },
  sceneTitle: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.textPrimary,
    textAlign: "center",
    lineHeight: 40,
    marginBottom: spacing.md,
    letterSpacing: -0.3,
  },
  sceneDesc: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 24,
  },
  sceneTitleSmall: {
    fontSize: 24,
    lineHeight: 32,
  },
  sceneDescSmall: {
    fontSize: 14,
    lineHeight: 20,
  },

  mascotImage: {
    width: 220,
    height: 220,
    resizeMode: "contain",
    marginBottom: spacing.md,
  },

  // CTA Scene
  ctaScene: {
    alignItems: "center",
    maxWidth: 340,
  },
  ctaIconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.xl,
  },
  ctaTitle: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.white,
    textAlign: "center",
    lineHeight: 40,
    marginBottom: spacing.md,
    letterSpacing: -0.3,
  },
  ctaSub: {
    fontSize: 16,
    color: "rgba(255,255,255,0.7)",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: spacing.xl,
  },
  ctaPrimary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    backgroundColor: colors.white,
    paddingVertical: 18,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.large,
    width: "100%",
    marginBottom: 14,
  },
  ctaPrimaryText: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.primary,
  },
  ctaSecondary: {
    paddingVertical: 14,
  },
  ctaSecondaryText: {
    fontSize: 16,
    fontWeight: "600",
    color: "rgba(255,255,255,0.8)",
  },

  // Dots
  dotBar: {
    position: "absolute",
    right: 20,
    top: "50%",
    transform: [{ translateY: -40 }],
    gap: 8,
    alignItems: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  // Skip
  skipBtn: {
    position: "absolute",
    top: 50,
    right: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  skipText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textSecondary,
  },
});
