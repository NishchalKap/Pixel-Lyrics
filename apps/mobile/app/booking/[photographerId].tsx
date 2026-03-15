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
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Colors } from "../../constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { MOCK_PHOTOGRAPHERS, MOCK_PACKAGES, type PackageOption } from "@/data/mockData";

const { width } = Dimensions.get("window");

export default function BookingScreen() {
  const { photographerId } = useLocalSearchParams<{ photographerId: string }>();
  const colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;

  const photographer = MOCK_PHOTOGRAPHERS.find((p) => p.id === photographerId);
  const [selectedPackage, setSelectedPackage] = useState<string>("pkg_2");
  const [selectedDate, setSelectedDate] = useState<string>("March 28, 2026");

  // Simple date options for prototype
  const dateOptions = [
    "March 25, 2026",
    "March 28, 2026",
    "April 2, 2026",
    "April 5, 2026",
    "April 10, 2026",
  ];

  if (!photographer) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.primaryBackground }]}>
        <Text style={{ color: colors.primaryText, textAlign: "center", marginTop: 40 }}>
          Photographer not found
        </Text>
      </SafeAreaView>
    );
  }

  const activePackage = MOCK_PACKAGES.find((p) => p.id === selectedPackage)!;

  const handleConfirm = () => {
    router.push({
      pathname: "/booking/confirmation",
      params: {
        photographerName: photographer.name,
        photographerImg: photographer.img,
        packageName: activePackage.name,
        packagePrice: activePackage.price.toString(),
        date: selectedDate,
      },
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.primaryBackground }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <LucideIcons.ArrowLeft size={22} color={colors.primaryText} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.primaryText }]}>Book Session</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Selected Photographer */}
        <View style={[styles.photographerBanner, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
          <Image source={{ uri: photographer.img }} style={styles.photographerImg} />
          <View style={{ flex: 1 }}>
            <Text style={[styles.photographerName, { color: colors.primaryText }]}>{photographer.name}</Text>
            <Text style={[styles.photographerSpec, { color: colors.secondaryText }]}>{photographer.specialty}</Text>
            <View style={styles.ratingRow}>
              <LucideIcons.Star size={14} color={colors.warning} fill={colors.warning} />
              <Text style={[styles.ratingText, { color: colors.primaryText }]}>{photographer.rating}</Text>
              <Text style={[styles.reviewCount, { color: colors.secondaryText }]}>({photographer.reviews})</Text>
            </View>
          </View>
        </View>

        {/* Date Selection */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.primaryText }]}>
            <LucideIcons.Calendar size={18} color={colors.primaryText} /> Select Date
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
            {dateOptions.map((date) => (
              <TouchableOpacity
                key={date}
                onPress={() => setSelectedDate(date)}
                style={[
                  styles.dateChip,
                  {
                    backgroundColor: selectedDate === date ? colors.bookNowButton : colors.cardBackground,
                    borderColor: selectedDate === date ? colors.bookNowButton : colors.border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.dateChipText,
                    { color: selectedDate === date ? colors.cardBackground : colors.primaryText },
                  ]}
                >
                  {date}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Package Selection */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.primaryText }]}>
            <LucideIcons.Package size={18} color={colors.primaryText} /> Choose Package
          </Text>
          {MOCK_PACKAGES.map((pkg) => (
            <TouchableOpacity
              key={pkg.id}
              onPress={() => setSelectedPackage(pkg.id)}
              style={[
                styles.packageCard,
                {
                  backgroundColor: colors.cardBackground,
                  borderColor: selectedPackage === pkg.id ? colors.bookNowButton : colors.border,
                  borderWidth: selectedPackage === pkg.id ? 2 : 1,
                },
              ]}
            >
              <View style={styles.packageHeader}>
                <View>
                  <Text style={[styles.packageName, { color: colors.primaryText }]}>{pkg.name}</Text>
                  <Text style={[styles.packageDesc, { color: colors.secondaryText }]}>{pkg.description}</Text>
                </View>
                <Text style={[styles.packagePrice, { color: colors.primaryText }]}>₹{pkg.price.toLocaleString('en-IN')}</Text>
              </View>
              <View style={styles.featuresContainer}>
                {pkg.features.map((feature, i) => (
                  <View key={i} style={styles.featureRow}>
                    <LucideIcons.Check size={14} color={colors.success} />
                    <Text style={[styles.featureText, { color: colors.secondaryText }]}>{feature}</Text>
                  </View>
                ))}
              </View>
              {selectedPackage === pkg.id && (
                <View style={[styles.selectedBadge, { backgroundColor: colors.bookNowButton }]}>
                  <LucideIcons.Check size={14} color={colors.cardBackground} />
                  <Text style={[styles.selectedBadgeText, { color: colors.cardBackground }]}>Selected</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Sticky Confirm Bar */}
      <View style={[styles.confirmBar, { backgroundColor: colors.primaryBackground, borderColor: colors.border }]}>
        <View>
          <Text style={[styles.totalLabel, { color: colors.secondaryText }]}>Total</Text>
          <Text style={[styles.totalPrice, { color: colors.primaryText }]}>₹{activePackage.price.toLocaleString('en-IN')}</Text>
        </View>
        <TouchableOpacity
          style={[styles.confirmButton, { backgroundColor: colors.bookNowButton }]}
          onPress={handleConfirm}
        >
          <Text style={[styles.confirmButtonText, { color: colors.cardBackground }]}>Confirm Booking</Text>
        </TouchableOpacity>
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
    backgroundColor: "#F0EBE1", alignItems: "center", justifyContent: "center",
  },
  headerTitle: { fontSize: 18, fontWeight: "700" },
  photographerBanner: {
    flexDirection: "row", marginHorizontal: 20, marginVertical: 16,
    padding: 16, borderRadius: 14, borderWidth: 1, gap: 14, alignItems: "center",
  },
  photographerImg: { width: 60, height: 60, borderRadius: 30 },
  photographerName: { fontSize: 16, fontWeight: "700", marginBottom: 2 },
  photographerSpec: { fontSize: 12, marginBottom: 4 },
  ratingRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  ratingText: { fontSize: 13, fontWeight: "600" },
  reviewCount: { fontSize: 12 },
  section: { paddingHorizontal: 20, marginBottom: 24 },
  sectionTitle: { fontSize: 17, fontWeight: "700", marginBottom: 14 },
  dateChip: {
    paddingHorizontal: 18, paddingVertical: 10, borderRadius: 20, borderWidth: 1,
  },
  dateChipText: { fontSize: 13, fontWeight: "600" },
  packageCard: {
    borderRadius: 14, padding: 16, marginBottom: 12, position: "relative",
  },
  packageHeader: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14,
  },
  packageName: { fontSize: 16, fontWeight: "700", marginBottom: 2 },
  packageDesc: { fontSize: 12 },
  packagePrice: { fontSize: 22, fontWeight: "800" },
  featuresContainer: { gap: 6 },
  featureRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  featureText: { fontSize: 13 },
  selectedBadge: {
    position: "absolute", top: 12, right: 12, flexDirection: "row",
    alignItems: "center", gap: 4, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12,
  },
  selectedBadgeText: { fontSize: 11, fontWeight: "600" },
  confirmBar: {
    position: "absolute", bottom: 0, left: 0, right: 0,
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    paddingHorizontal: 20, paddingVertical: 16, paddingBottom: 30, borderTopWidth: 1,
  },
  totalLabel: { fontSize: 12 },
  totalPrice: { fontSize: 22, fontWeight: "800" },
  confirmButton: {
    paddingHorizontal: 28, paddingVertical: 14, borderRadius: 25,
  },
  confirmButtonText: { fontSize: 16, fontWeight: "600" },
});
