import * as LucideIcons from "lucide-react-native";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Colors } from "../../constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function BookingConfirmation() {
  const params = useLocalSearchParams<{
    photographerName: string;
    photographerImg: string;
    packageName: string;
    packagePrice: string;
    date: string;
  }>();
  const colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;

  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.primaryBackground }]}>
      <View style={styles.content}>
        {/* Success Checkmark */}
        <Animated.View
          style={[
            styles.checkCircle,
            { backgroundColor: colors.success, transform: [{ scale: scaleAnim }] },
          ]}
        >
          <LucideIcons.Check size={48} color="#fff" strokeWidth={3} />
        </Animated.View>

        <Animated.View style={{ opacity: fadeAnim, alignItems: "center" }}>
          <Text style={[styles.title, { color: colors.primaryText }]}>Booking Confirmed!</Text>
          <Text style={[styles.subtitle, { color: colors.secondaryText }]}>
            Your session has been booked successfully
          </Text>

          {/* Details Card */}
          <View style={[styles.detailsCard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
            <View style={styles.photographerRow}>
              <Image source={{ uri: params.photographerImg }} style={styles.photographerImg} />
              <Text style={[styles.photographerName, { color: colors.primaryText }]}>
                {params.photographerName}
              </Text>
            </View>

            <View style={[styles.divider, { backgroundColor: colors.border }]} />

            <View style={styles.detailRow}>
              <LucideIcons.Calendar size={18} color={colors.secondaryAccent} />
              <Text style={[styles.detailLabel, { color: colors.secondaryText }]}>Date</Text>
              <Text style={[styles.detailValue, { color: colors.primaryText }]}>{params.date}</Text>
            </View>

            <View style={styles.detailRow}>
              <LucideIcons.Package size={18} color={colors.secondaryAccent} />
              <Text style={[styles.detailLabel, { color: colors.secondaryText }]}>Package</Text>
              <Text style={[styles.detailValue, { color: colors.primaryText }]}>{params.packageName}</Text>
            </View>

            <View style={styles.detailRow}>
              <LucideIcons.IndianRupee size={18} color={colors.secondaryAccent} />
              <Text style={[styles.detailLabel, { color: colors.secondaryText }]}>Total</Text>
              <Text style={[styles.detailValue, { color: colors.primaryText }]}>₹{Number(params.packagePrice).toLocaleString('en-IN')}</Text>
            </View>
          </View>

          <Text style={[styles.escrowNote, { color: colors.secondaryText }]}>
            Payment will be held in secure escrow until your session is complete.
          </Text>
        </Animated.View>
      </View>

      {/* Bottom Buttons */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity
          style={[styles.primaryBtn, { backgroundColor: colors.bookNowButton }]}
          onPress={() => router.replace("/")}
        >
          <Text style={[styles.primaryBtnText, { color: colors.cardBackground }]}>Back to Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.secondaryBtn, { borderColor: colors.border }]}
          onPress={() => router.replace("/")}
        >
          <Text style={[styles.secondaryBtnText, { color: colors.primaryText }]}>View My Bookings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 30 },
  checkCircle: {
    width: 90, height: 90, borderRadius: 45,
    alignItems: "center", justifyContent: "center", marginBottom: 24,
  },
  title: { fontSize: 24, fontWeight: "800", marginBottom: 8 },
  subtitle: { fontSize: 14, textAlign: "center", marginBottom: 30 },
  detailsCard: {
    width: "100%", borderRadius: 16, padding: 20, borderWidth: 1,
  },
  photographerRow: {
    flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 16,
  },
  photographerImg: { width: 44, height: 44, borderRadius: 22 },
  photographerName: { fontSize: 16, fontWeight: "700" },
  divider: { height: 1, marginBottom: 16 },
  detailRow: {
    flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 12,
  },
  detailLabel: { flex: 1, fontSize: 13 },
  detailValue: { fontSize: 14, fontWeight: "600" },
  escrowNote: { fontSize: 12, textAlign: "center", marginTop: 20, paddingHorizontal: 10 },
  bottomButtons: {
    paddingHorizontal: 20, paddingBottom: 30, gap: 10,
  },
  primaryBtn: {
    paddingVertical: 16, borderRadius: 25, alignItems: "center",
  },
  primaryBtnText: { fontSize: 16, fontWeight: "600" },
  secondaryBtn: {
    paddingVertical: 16, borderRadius: 25, alignItems: "center", borderWidth: 1,
  },
  secondaryBtnText: { fontSize: 16, fontWeight: "600" },
});
