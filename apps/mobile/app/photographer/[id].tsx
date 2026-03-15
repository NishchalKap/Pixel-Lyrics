import * as LucideIcons from "lucide-react-native";
import React from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Colors } from "../../constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { MOCK_PHOTOGRAPHERS } from "@/data/mockData";

const { width } = Dimensions.get("window");
const GALLERY_COL_1 = (width - 48) * 0.65;
const GALLERY_COL_2 = (width - 48) * 0.35 - 4;
const GALLERY_SMALL = (width - 52) / 3;

export default function PhotographerProfile() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;

  const photographer = MOCK_PHOTOGRAPHERS.find((p) => p.id === id);

  if (!photographer) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.primaryBackground }]}>
        <Text style={{ color: colors.primaryText, textAlign: "center", marginTop: 40 }}>
          Photographer not found
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.primaryBackground }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <LucideIcons.ArrowLeft size={22} color={colors.primaryText} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.primaryText }]}>Profile</Text>
        <TouchableOpacity style={styles.shareBtn}>
          <LucideIcons.Share2 size={20} color={colors.primaryText} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Hero */}
        <View style={styles.heroSection}>
          <Image source={{ uri: photographer.img }} style={styles.avatar} />
          <Text style={[styles.name, { color: colors.primaryText }]}>{photographer.name}</Text>
          {photographer.isVerified && (
            <View style={styles.verifiedRow}>
              <LucideIcons.BadgeCheck size={14} color="#3498db" fill="#3498db" />
              <Text style={styles.verifiedText}>Verified Photographer</Text>
            </View>
          )}
          <Text style={[styles.specialty, { color: colors.secondaryText }]}>{photographer.specialty}</Text>
          {photographer.badge && (
            <View style={styles.profileBadge}>
              <Text style={styles.profileBadgeText}>{photographer.badge}</Text>
            </View>
          )}

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.primaryText }]}>{photographer.rating}</Text>
              <Text style={[styles.statLabel, { color: colors.secondaryText }]}>Rating</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.primaryText }]}>{photographer.reviews}</Text>
              <Text style={[styles.statLabel, { color: colors.secondaryText }]}>Reviews</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.primaryText }]}>₹{photographer.startingPriceINR.toLocaleString('en-IN')}</Text>
              <Text style={[styles.statLabel, { color: colors.secondaryText }]}>Starting</Text>
            </View>
          </View>
        </View>

        {/* Location */}
        <View style={[styles.infoCard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
          <View style={styles.infoRow}>
            <LucideIcons.MapPin size={16} color={colors.secondaryAccent} />
            <Text style={[styles.infoText, { color: colors.secondaryText }]}>{photographer.location}</Text>
          </View>
          <View style={styles.infoRow}>
            <LucideIcons.Navigation size={16} color={colors.secondaryAccent} />
            <Text style={[styles.infoText, { color: colors.secondaryText }]}>{photographer.distance} away</Text>
          </View>
        </View>

        {/* Bio */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.primaryText }]}>About</Text>
          <Text style={[styles.bioText, { color: colors.secondaryText }]}>{photographer.bio}</Text>
        </View>

        {/* Style Tags */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.primaryText }]}>Specialties</Text>
          <View style={styles.tagsRow}>
            {photographer.styleTags.map((tag, i) => (
              <View key={i} style={[styles.tag, { backgroundColor: colors.categoryIconBg }]}>
                <Text style={[styles.tagText, { color: colors.categoryIcon }]}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Gallery */}
        <View style={styles.section}>
          <View style={styles.gallerySectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.primaryText }]}>Portfolio</Text>
            <Text style={[styles.galleryCount, { color: colors.secondaryText }]}>{photographer.gallery.length} photos</Text>
          </View>

          {/* Hero Row: 1 large + 2 stacked */}
          <View style={styles.heroRow}>
            <Image source={{ uri: photographer.gallery[0] }} style={[styles.heroImage, { borderRadius: 12 }]} />
            <View style={styles.heroStack}>
              {photographer.gallery.slice(1, 3).map((url, i) => (
                <Image key={i} source={{ uri: url }} style={[styles.heroStackImage, { borderRadius: 10 }]} />
              ))}
            </View>
          </View>

          {/* Grid for remaining */}
          <View style={styles.galleryGrid}>
            {photographer.gallery.slice(3).map((url, i) => (
              <Image key={i} source={{ uri: url }} style={styles.galleryImage} />
            ))}
          </View>
        </View>

        {/* Spacer for button */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Sticky Book Button */}
      <View style={[styles.bookBar, { backgroundColor: colors.primaryBackground, borderColor: colors.border }]}>
        <View>
          <Text style={[styles.bookBarPrice, { color: colors.primaryText }]}>₹{photographer.startingPriceINR.toLocaleString('en-IN')}</Text>
          <Text style={[styles.bookBarSub, { color: colors.secondaryText }]}>Starting price</Text>
        </View>
        <TouchableOpacity
          style={[styles.bookButton, { backgroundColor: colors.bookNowButton }]}
          onPress={() => router.push(`/booking/${photographer.id}`)}
        >
          <Text style={[styles.bookButtonText, { color: colors.cardBackground }]}>Book Photographer</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: "#F0EBE1", alignItems: "center", justifyContent: "center",
  },
  headerTitle: { fontSize: 18, fontWeight: "700" },
  shareBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: "#F0EBE1", alignItems: "center", justifyContent: "center",
  },
  heroSection: { alignItems: "center", paddingVertical: 20 },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 12, borderWidth: 3, borderColor: "#9b59b6" },
  name: { fontSize: 22, fontWeight: "700", marginBottom: 4 },
  specialty: { fontSize: 14, marginBottom: 8 },
  profileBadge: {
    backgroundColor: "rgba(155,89,182,0.12)", paddingHorizontal: 14, paddingVertical: 5,
    borderRadius: 14, marginBottom: 12,
  },
  profileBadgeText: { fontSize: 12, fontWeight: "700", color: "#9b59b6" },
  verifiedRow: {
    flexDirection: "row", alignItems: "center", gap: 4, marginBottom: 8,
  },
  verifiedText: { fontSize: 13, color: "#3498db", fontWeight: "600" },
  statsRow: {
    flexDirection: "row", alignItems: "center",
    paddingHorizontal: 30, paddingVertical: 16,
  },
  statItem: { flex: 1, alignItems: "center" },
  statValue: { fontSize: 18, fontWeight: "700", marginBottom: 4 },
  statLabel: { fontSize: 12 },
  statDivider: { width: 1, height: 30 },
  infoCard: {
    marginHorizontal: 20, borderRadius: 12, padding: 16,
    borderWidth: 1, marginBottom: 16,
  },
  infoRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 8 },
  infoText: { fontSize: 14 },
  section: { paddingHorizontal: 20, marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
  bioText: { fontSize: 14, lineHeight: 22 },
  tagsRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  tag: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20 },
  tagText: { fontSize: 12, fontWeight: "600" },
  galleryGrid: { flexDirection: "row", flexWrap: "wrap", gap: 4, marginTop: 4 },
  galleryImage: {
    width: GALLERY_SMALL, height: GALLERY_SMALL,
    borderRadius: 8,
  },
  gallerySectionHeader: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12,
  },
  galleryCount: { fontSize: 13 },
  heroRow: { flexDirection: "row", gap: 4, marginBottom: 0 },
  heroImage: { width: GALLERY_COL_1, height: GALLERY_COL_1 * 0.75 },
  heroStack: { flex: 1, gap: 4 },
  heroStackImage: { flex: 1, width: "100%" },
  bookBar: {
    position: "absolute", bottom: 0, left: 0, right: 0,
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    paddingHorizontal: 20, paddingVertical: 16, paddingBottom: 30,
    borderTopWidth: 1,
  },
  bookBarPrice: { fontSize: 18, fontWeight: "700" },
  bookBarSub: { fontSize: 12 },
  bookButton: {
    paddingHorizontal: 28, paddingVertical: 14,
    borderRadius: 25,
  },
  bookButtonText: { fontSize: 16, fontWeight: "600" },
});
