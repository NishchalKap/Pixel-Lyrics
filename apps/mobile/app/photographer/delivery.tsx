import * as LucideIcons from "lucide-react-native";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import { Colors } from "../../constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { MOCK_DELIVERY_PHOTOS } from "@/data/mockData";

const { width } = Dimensions.get("window");
const GRID_ITEM_SIZE = (width - 52) / 3;

export default function DeliveryUpload() {
  const colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;

  const [photos, setPhotos] = useState<string[]>(MOCK_DELIVERY_PHOTOS);
  const [isUploading, setIsUploading] = useState(false);
  const [isDelivered, setIsDelivered] = useState(false);

  const handleUploadMore = () => {
    setIsUploading(true);
    setTimeout(() => {
      setPhotos((prev) => [
        ...prev,
        "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600",
      ]);
      setIsUploading(false);
    }, 1500);
  };

  const handleMarkComplete = () => {
    Alert.alert(
      "Confirm Delivery",
      "Are you sure you want to mark this delivery as complete? The client will be notified.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm",
          onPress: () => {
            setIsDelivered(true);
            setTimeout(() => {
              Alert.alert("🎉 Delivery Complete!", "The client has been notified and payment will be released from escrow.");
            }, 500);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.primaryBackground }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <LucideIcons.ArrowLeft size={22} color={colors.primaryText} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.primaryText }]}>
          {isDelivered ? "Delivery Sent ✓" : "Upload Preview"}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Booking Context */}
      <View style={[styles.contextCard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
        <View style={styles.contextRow}>
          <LucideIcons.User size={16} color={colors.secondaryAccent} />
          <Text style={[styles.contextText, { color: colors.primaryText }]}>Emma Thompson</Text>
        </View>
        <View style={styles.contextRow}>
          <LucideIcons.Calendar size={16} color={colors.secondaryAccent} />
          <Text style={[styles.contextText, { color: colors.secondaryText }]}>March 25, 2026 • Professional Package</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Upload Area */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.primaryText }]}>
              Preview Photos ({photos.length})
            </Text>
            <TouchableOpacity
              onPress={handleUploadMore}
              style={[styles.addBtn, { backgroundColor: colors.bookNowButton }]}
            >
              {isUploading ? (
                <ActivityIndicator size="small" color={colors.cardBackground} />
              ) : (
                <>
                  <LucideIcons.Plus size={16} color={colors.cardBackground} />
                  <Text style={[styles.addBtnText, { color: colors.cardBackground }]}>Add</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          {/* Gallery Grid */}
          <View style={styles.galleryGrid}>
            {photos.map((url, i) => (
              <View key={i} style={styles.galleryItem}>
                <Image source={{ uri: url }} style={styles.galleryImage} />
                <View style={[styles.watermark]}>
                  <Text style={styles.watermarkText}>PREVIEW</Text>
                </View>
              </View>
            ))}
            {/* Empty upload card */}
            <TouchableOpacity
              style={[styles.uploadPlaceholder, { borderColor: colors.border, backgroundColor: colors.cardBackground }]}
              onPress={handleUploadMore}
            >
              <LucideIcons.ImagePlus size={24} color={colors.secondaryText} />
              <Text style={[styles.uploadPlaceholderText, { color: colors.secondaryText }]}>Upload</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Note */}
        <View style={[styles.noteCard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
          <LucideIcons.Info size={16} color={colors.secondaryAccent} />
          <Text style={[styles.noteText, { color: colors.secondaryText }]}>
            Preview photos are watermarked. Full-resolution files will be delivered after the client accepts and payment is released from escrow.
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Action */}
      <View style={[styles.bottomBar, { backgroundColor: colors.primaryBackground, borderColor: colors.border }]}>
        {isDelivered ? (
          <View style={[styles.deliveredBanner, { backgroundColor: colors.success + "18" }]}>
            <LucideIcons.CheckCircle size={20} color={colors.success} />
            <Text style={[styles.deliveredText, { color: colors.success }]}>
              Delivery Marked Complete
            </Text>
          </View>
        ) : (
          <TouchableOpacity
            style={[styles.completeBtn, { backgroundColor: colors.success }]}
            onPress={handleMarkComplete}
          >
            <LucideIcons.Send size={18} color="#fff" />
            <Text style={styles.completeBtnText}>Mark Delivery Complete</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    paddingHorizontal: 16, paddingVertical: 12,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: "#f0f0f0", alignItems: "center", justifyContent: "center",
  },
  headerTitle: { fontSize: 18, fontWeight: "700" },
  contextCard: {
    marginHorizontal: 20, borderRadius: 12, padding: 14,
    borderWidth: 1, marginBottom: 16, gap: 8,
  },
  contextRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  contextText: { fontSize: 13 },
  section: { paddingHorizontal: 20, marginBottom: 20 },
  sectionHeader: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 14,
  },
  sectionTitle: { fontSize: 17, fontWeight: "700" },
  addBtn: {
    flexDirection: "row", alignItems: "center", gap: 4,
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20,
  },
  addBtnText: { fontSize: 13, fontWeight: "600" },
  galleryGrid: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  galleryItem: { position: "relative" },
  galleryImage: {
    width: GRID_ITEM_SIZE, height: GRID_ITEM_SIZE, borderRadius: 8,
  },
  watermark: {
    position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
    borderRadius: 8, alignItems: "center", justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.15)",
  },
  watermarkText: {
    color: "rgba(255,255,255,0.6)", fontSize: 10, fontWeight: "800",
    letterSpacing: 2,
  },
  uploadPlaceholder: {
    width: GRID_ITEM_SIZE, height: GRID_ITEM_SIZE, borderRadius: 8,
    borderWidth: 2, borderStyle: "dashed", alignItems: "center", justifyContent: "center",
  },
  uploadPlaceholderText: { fontSize: 11, marginTop: 4 },
  noteCard: {
    flexDirection: "row", gap: 10, marginHorizontal: 20,
    borderRadius: 12, padding: 14, borderWidth: 1,
  },
  noteText: { flex: 1, fontSize: 12, lineHeight: 18 },
  bottomBar: {
    position: "absolute", bottom: 0, left: 0, right: 0,
    paddingHorizontal: 20, paddingVertical: 16, paddingBottom: 30, borderTopWidth: 1,
  },
  completeBtn: {
    flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8,
    paddingVertical: 16, borderRadius: 25,
  },
  completeBtnText: { fontSize: 16, fontWeight: "600", color: "#fff" },
  deliveredBanner: {
    flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8,
    paddingVertical: 16, borderRadius: 25,
  },
  deliveredText: { fontSize: 16, fontWeight: "600" },
});
