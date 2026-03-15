import * as LucideIcons from "lucide-react-native";
import React, { useState, useRef, useEffect } from "react";
import {
  Animated,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";
import { MOCK_PHOTOGRAPHERS, AI_MATCH_SCORES, type Photographer } from "@/data/mockData";
import { colors, spacing, radius, typography, shadows } from "../theme/theme";

const { width } = Dimensions.get("window");

// ─── Pulsing Scan Bar ───────────────────────────────────
const ScanBar = () => {
  const scan = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scan, { toValue: 1, duration: 1800, useNativeDriver: true }),
        Animated.timing(scan, { toValue: 0, duration: 1800, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const translateX = scan.interpolate({
    inputRange: [0, 1],
    outputRange: [-width * 0.6, width * 0.6],
  });

  return (
    <View style={styles.scanBarContainer}>
      <Animated.View style={[styles.scanBarGlow, { transform: [{ translateX }] }]} />
    </View>
  );
};

// ─── Animated Analysis Step ─────────────────────────────
const AnalysisStep = ({
  icon: Icon,
  text,
  delay,
}: {
  icon: any;
  text: string;
  delay: number;
}) => {
  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(20)).current;
  const [done, setDone] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(fade, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.timing(slide, { toValue: 0, duration: 400, useNativeDriver: true }),
      ]).start();
    }, delay);

    const doneTimer = setTimeout(() => setDone(true), delay + 800);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  return (
    <Animated.View style={[styles.analysisRow, { opacity: fade, transform: [{ translateY: slide }] }]}>
      <View style={[styles.analysisIcon, done && { backgroundColor: colors.success + "20" }]}>
        {done ? (
          <LucideIcons.Check size={16} color={colors.success} />
        ) : (
          <Icon size={16} color={colors.primary} />
        )}
      </View>
      <Text style={[styles.analysisText, done && { color: colors.textPrimary }]}>{text}</Text>
      {done && <LucideIcons.CheckCircle size={16} color={colors.success} />}
    </Animated.View>
  );
};

export default function AIMatchScreen() {
  const [stage, setStage] = useState<"upload" | "processing" | "results">("upload");
  const [matchedPhotographers, setMatchedPhotographers] = useState<Photographer[]>([]);

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (stage === "processing") {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.1, duration: 900, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 900, useNativeDriver: true }),
        ])
      ).start();

      setTimeout(() => {
        const sorted = [...MOCK_PHOTOGRAPHERS].sort(
          (a, b) => (AI_MATCH_SCORES[b.id] || 0) - (AI_MATCH_SCORES[a.id] || 0)
        );
        setMatchedPhotographers(sorted.slice(0, 4));
        setStage("results");
        Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
      }, 3500);
    }
  }, [stage]);

  const handleUpload = () => setStage("processing");

  const handleReset = () => {
    setStage("upload");
    fadeAnim.setValue(0);
    pulseAnim.setValue(1);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <LucideIcons.ArrowLeft size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>AI Style Match</Text>
          <Text style={styles.headerSub}>Find your perfect photographer</Text>
        </View>
        <View style={styles.aiBadge}>
          <LucideIcons.Sparkles size={14} color={colors.white} />
          <Text style={styles.aiBadgeText}>AI</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* ─── STEP 1: Upload ─── */}
        {stage === "upload" && (
          <View style={styles.uploadSection}>
            <View style={styles.uploadBox}>
              <View style={styles.uploadIconCircle}>
                <LucideIcons.ImagePlus size={40} color={colors.primary} />
              </View>
              <Text style={styles.uploadTitle}>Upload an Inspiration Photo</Text>
              <Text style={styles.uploadSub}>
                Our AI analyzes colour palette, lighting, and composition to find photographers with a similar aesthetic.
              </Text>
              <TouchableOpacity style={styles.uploadBtn} onPress={handleUpload} activeOpacity={0.9}>
                <LucideIcons.Upload size={18} color={colors.white} />
                <Text style={styles.uploadBtnText}>Upload Photo</Text>
              </TouchableOpacity>

              <View style={styles.orRow}>
                <View style={styles.orLine} />
                <Text style={styles.orText}>or try a sample</Text>
                <View style={styles.orLine} />
              </View>

              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
                {[
                  "https://images.unsplash.com/photo-1519741497674-611481863552?w=200",
                  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200",
                  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200",
                  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200",
                ].map((url, i) => (
                  <TouchableOpacity key={i} onPress={handleUpload} activeOpacity={0.8}>
                    <Image source={{ uri: url }} style={styles.sampleImg} />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* How It Works */}
            <Text style={styles.howTitle}>How AI Matching Works</Text>
            {[
              { icon: LucideIcons.Upload, label: "Upload a reference photo or mood image" },
              { icon: LucideIcons.Palette, label: "AI analyzes colour palette and lighting" },
              { icon: LucideIcons.ScanEye, label: "Detects composition and mood patterns" },
              { icon: LucideIcons.Users, label: "Matches with photographer portfolios" },
            ].map((step, i) => (
              <View key={i} style={styles.howStep}>
                <View style={styles.howStepIcon}>
                  <step.icon size={18} color={colors.primary} />
                </View>
                <Text style={styles.howStepText}>{step.label}</Text>
              </View>
            ))}
          </View>
        )}

        {/* ─── STEP 2: AI Processing ─── */}
        {stage === "processing" && (
          <View style={styles.processingSection}>
            {/* Pulsing scan circle */}
            <Animated.View style={[styles.scanCircle, { transform: [{ scale: pulseAnim }] }]}>
              <LucideIcons.Sparkles size={36} color={colors.primary} />
            </Animated.View>

            <Text style={styles.procTitle}>Analyzing Your Style...</Text>

            {/* Scan bar */}
            <ScanBar />

            {/* Sequential analysis steps */}
            <View style={styles.analysisSteps}>
              <AnalysisStep icon={LucideIcons.Palette} text="Analyzing color palette" delay={400} />
              <AnalysisStep icon={LucideIcons.Sun} text="Detecting lighting style" delay={1000} />
              <AnalysisStep icon={LucideIcons.Frame} text="Evaluating composition" delay={1600} />
              <AnalysisStep icon={LucideIcons.Users} text="Matching photographer portfolios" delay={2200} />
            </View>

            <Text style={styles.procSub}>
              Comparing with 200+ photographer portfolios...
            </Text>
          </View>
        )}

        {/* ─── STEP 3: Results ─── */}
        {stage === "results" && (
          <Animated.View style={[styles.resultsSection, { opacity: fadeAnim }]}>
            <View style={styles.resultsHeader}>
              <View>
                <Text style={styles.resultsTitle}>AI Matched Photographers</Text>
                <Text style={styles.resultsSub}>Based on your reference style</Text>
              </View>
              <TouchableOpacity onPress={handleReset} style={styles.retryBtn}>
                <LucideIcons.RefreshCw size={16} color={colors.textPrimary} />
                <Text style={styles.retryText}>Retry</Text>
              </TouchableOpacity>
            </View>

            {matchedPhotographers.map((photographer, index) => {
              const predefinedScores = [97, 93, 89, 86];
              const matchScore = predefinedScores[index] ?? 86;
              return (
                <View key={photographer.id} style={styles.matchCard}>
                  {/* Match header */}
                  <View style={styles.matchBadge}>
                    <LucideIcons.Sparkles size={14} color={colors.primary} />
                    <Text style={styles.matchBadgeText}>AI Style Match</Text>
                    <View style={styles.matchScorePill}>
                      <Text style={styles.matchScoreText}>{matchScore}%</Text>
                    </View>
                  </View>

                  {/* Match progress bar */}
                  <View style={styles.matchBarBg}>
                    <View style={[styles.matchBarFill, { width: `${matchScore}%` }]} />
                  </View>

                  {/* Photographer info */}
                  <View style={styles.matchInfo}>
                    <Image source={{ uri: photographer.img }} style={styles.matchAvatar} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.matchName}>{photographer.name}</Text>
                      <View style={styles.matchMeta}>
                        <LucideIcons.MapPin size={12} color={colors.textSecondary} />
                        <Text style={styles.matchMetaText}>{photographer.location}</Text>
                      </View>
                      <View style={styles.matchMeta}>
                        <LucideIcons.Star size={12} color={colors.warning} fill={colors.warning} />
                        <Text style={[styles.matchMetaText, { color: colors.textPrimary, fontWeight: "700" }]}>
                          {photographer.rating} ({photographer.reviews})
                        </Text>
                      </View>
                    </View>
                    <View style={{ alignItems: "flex-end" }}>
                      <Text style={styles.matchPrice}>
                        ₹{photographer.startingPriceINR.toLocaleString("en-IN")}
                      </Text>
                      <Text style={styles.matchPriceSub}>starting</Text>
                    </View>
                  </View>

                  {/* Style tags */}
                  <View style={styles.matchTags}>
                    {photographer.styleTags.slice(0, 4).map((tag, i) => (
                      <View key={i} style={styles.matchTag}>
                        <Text style={styles.matchTagText}>{tag}</Text>
                      </View>
                    ))}
                  </View>

                  {/* Portfolio preview */}
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
                    {photographer.gallery.slice(0, 4).map((url, i) => (
                      <Image key={i} source={{ uri: url }} style={styles.galleryImg} />
                    ))}
                  </ScrollView>

                  {/* Book button */}
                  <TouchableOpacity
                    style={styles.bookBtn}
                    onPress={() => router.push(`/booking/${photographer.id}` as any)}
                    activeOpacity={0.9}
                  >
                    <Text style={styles.bookBtnText}>Book Photographer</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </Animated.View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  backBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.card,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.divider,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.textPrimary,
  },
  headerSub: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  aiBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radius.full,
  },
  aiBadgeText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: "700",
  },

  // ── Upload ──
  uploadSection: {
    paddingHorizontal: spacing.lg,
  },
  uploadBox: {
    borderRadius: radius.large,
    padding: spacing.xl,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: colors.divider,
    backgroundColor: colors.card,
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  uploadIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  uploadTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    textAlign: "center",
  },
  uploadSub: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.sm,
  },
  uploadBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: radius.large,
    ...shadows.elevated,
  },
  uploadBtnText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
  },
  orRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginVertical: spacing.lg,
    width: "100%",
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.divider,
  },
  orText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  sampleImg: {
    width: 68,
    height: 68,
    borderRadius: radius.small,
  },

  // How It Works
  howTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  howStep: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: colors.card,
    padding: 14,
    borderRadius: radius.medium,
    marginBottom: spacing.sm,
    ...shadows.card,
  },
  howStepIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.primary10,
    alignItems: "center",
    justifyContent: "center",
  },
  howStepText: {
    flex: 1,
    fontSize: 14,
    color: colors.textPrimary,
  },

  // ── Processing ──
  processingSection: {
    alignItems: "center",
    paddingHorizontal: spacing.xl,
    paddingTop: 60,
  },
  scanCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primary10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.xl,
  },
  procTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  scanBarContainer: {
    width: "80%",
    height: 4,
    backgroundColor: colors.divider,
    borderRadius: 2,
    overflow: "hidden",
    marginBottom: spacing.xl,
  },
  scanBarGlow: {
    width: 60,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
  analysisSteps: {
    width: "100%",
    gap: 12,
    marginBottom: spacing.xl,
  },
  analysisRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: colors.card,
    padding: 14,
    borderRadius: radius.medium,
    ...shadows.card,
  },
  analysisIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary10,
    alignItems: "center",
    justifyContent: "center",
  },
  analysisText: {
    flex: 1,
    fontSize: 14,
    color: colors.textSecondary,
  },
  procSub: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: "center",
  },

  // ── Results ──
  resultsSection: {
    paddingHorizontal: spacing.lg,
  },
  resultsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.textPrimary,
  },
  resultsSub: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  retryBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  retryText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textPrimary,
  },

  // Match card
  matchCard: {
    backgroundColor: colors.card,
    borderRadius: radius.large,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadows.elevated,
  },
  matchBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 12,
  },
  matchBadgeText: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.primary,
  },
  matchScorePill: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: radius.full,
    marginLeft: "auto",
  },
  matchScoreText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: "800",
  },
  matchBarBg: {
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.background,
    marginBottom: 16,
  },
  matchBarFill: {
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
  matchInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 14,
  },
  matchAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  matchName: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 4,
  },
  matchMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 2,
  },
  matchMetaText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  matchPrice: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.textPrimary,
  },
  matchPriceSub: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  matchTags: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 14,
    flexWrap: "wrap",
  },
  matchTag: {
    backgroundColor: colors.background,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: radius.full,
  },
  matchTagText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  galleryImg: {
    width: 90,
    height: 90,
    borderRadius: radius.medium,
  },
  bookBtn: {
    paddingVertical: 16,
    borderRadius: radius.medium,
    backgroundColor: colors.primary,
    alignItems: "center",
    marginTop: 16,
    ...shadows.elevated,
  },
  bookBtnText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.white,
  },
});
