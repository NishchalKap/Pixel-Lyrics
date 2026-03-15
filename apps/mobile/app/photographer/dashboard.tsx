import * as LucideIcons from "lucide-react-native";
import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { MOCK_BOOKING_REQUESTS, type BookingRequest } from "@/data/mockData";
import { colors, spacing, radius, typography, shadows } from "../../theme/theme";

export default function PhotographerDashboard() {
  const [bookings, setBookings] = useState<BookingRequest[]>(MOCK_BOOKING_REQUESTS);

  const handleAccept = (id: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "accepted" as const } : b))
    );
    Alert.alert("Booking Accepted", "The client has been notified!");
  };

  const handleReject = (id: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "rejected" as const } : b))
    );
  };

  const pendingBookings = bookings.filter((b) => b.status === "pending");
  const activeBookings = bookings.filter((b) => b.status === "accepted");

  return (
    <SafeAreaView style={styles.container}>
      {/* ─── Header ─── */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <LucideIcons.ArrowLeft size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.headerTitle}>Your Studio</Text>
        </View>
        <TouchableOpacity
          style={styles.uploadHeaderBtn}
          onPress={() => router.push("/photographer/delivery")}
        >
          <LucideIcons.Upload size={16} color={colors.white} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

        {/* ─── Stats Cards ─── */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { borderLeftColor: colors.accent }]}>
            <Text style={styles.statNumber}>{pendingBookings.length}</Text>
            <Text style={styles.statLabel}>Pending{"\n"}Bookings</Text>
          </View>
          <View style={[styles.statCard, { borderLeftColor: colors.success }]}>
            <Text style={[styles.statNumber, { color: colors.success }]}>{activeBookings.length}</Text>
            <Text style={styles.statLabel}>Active{"\n"}Jobs</Text>
          </View>
          <View style={[styles.statCard, { borderLeftColor: colors.primary }]}>
            <Text style={styles.statNumber}>₹2.45L</Text>
            <Text style={styles.statLabel}>Total{"\n"}Earnings</Text>
          </View>
        </View>

        {/* ─── Today's Bookings ─── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <LucideIcons.Calendar size={18} color={colors.primary} />
            <Text style={styles.sectionTitle}>Today's Schedule</Text>
          </View>
          {activeBookings.length > 0 ? (
            <View style={styles.todayCard}>
              <Image source={{ uri: activeBookings[0].clientAvatar }} style={styles.todayAvatar} />
              <View style={{ flex: 1 }}>
                <Text style={styles.todayName}>{activeBookings[0].clientName}</Text>
                <Text style={styles.todayMeta}>{activeBookings[0].packageName} Package • {activeBookings[0].date}</Text>
              </View>
              <View style={styles.todayBadge}>
                <Text style={styles.todayBadgeText}>Active</Text>
              </View>
            </View>
          ) : (
            <View style={styles.emptyCard}>
              <LucideIcons.CalendarOff size={24} color={colors.textSecondary} />
              <Text style={styles.emptyText}>No shoots today</Text>
            </View>
          )}
        </View>

        {/* ─── Pending Requests ─── */}
        {pendingBookings.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <LucideIcons.Clock size={18} color={colors.accent} />
              <Text style={styles.sectionTitle}>Pending Requests</Text>
              <View style={styles.countBadge}>
                <Text style={styles.countText}>{pendingBookings.length}</Text>
              </View>
            </View>

            {pendingBookings.map((booking) => (
              <View key={booking.id} style={styles.requestCard}>
                <View style={styles.requestHeader}>
                  <Image source={{ uri: booking.clientAvatar }} style={styles.clientAvatar} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.clientName}>{booking.clientName}</Text>
                    <Text style={styles.bookingDate}>{booking.date}</Text>
                  </View>
                  <Text style={styles.requestPrice}>₹{booking.packagePrice.toLocaleString('en-IN')}</Text>
                </View>

                <View style={styles.packageRow}>
                  <LucideIcons.Package size={14} color={colors.accent} />
                  <Text style={styles.packageLabel}>{booking.packageName} Package</Text>
                </View>

                <Text style={styles.messageText}>{booking.message}</Text>

                <View style={styles.actionRow}>
                  <TouchableOpacity
                    style={styles.rejectBtn}
                    onPress={() => handleReject(booking.id)}
                  >
                    <LucideIcons.X size={16} color={colors.error} />
                    <Text style={[styles.actionText, { color: colors.error }]}>Decline</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.acceptBtn}
                    onPress={() => handleAccept(booking.id)}
                  >
                    <LucideIcons.Check size={16} color={colors.white} />
                    <Text style={[styles.actionText, { color: colors.white }]}>Accept</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* ─── Active Bookings ─── */}
        {activeBookings.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <LucideIcons.CheckCircle size={18} color={colors.success} />
              <Text style={styles.sectionTitle}>Active Bookings</Text>
            </View>

            {activeBookings.map((booking) => (
              <View key={booking.id} style={styles.requestCard}>
                <View style={styles.requestHeader}>
                  <Image source={{ uri: booking.clientAvatar }} style={styles.clientAvatar} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.clientName}>{booking.clientName}</Text>
                    <Text style={styles.bookingDate}>{booking.date} • {booking.packageName}</Text>
                  </View>
                  <View style={styles.activeBadge}>
                    <Text style={styles.activeBadgeText}>Confirmed</Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.uploadBtn}
                  onPress={() => router.push("/photographer/delivery")}
                >
                  <LucideIcons.Upload size={16} color={colors.white} />
                  <Text style={styles.uploadBtnText}>Upload Deliverables</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* ─── Quick Upload ─── */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.uploadCard}
            onPress={() => router.push("/photographer/delivery")}
            activeOpacity={0.9}
          >
            <View style={styles.uploadIconCircle}>
              <LucideIcons.ImagePlus size={24} color={colors.primary} />
            </View>
            <Text style={styles.uploadCardTitle}>Upload Photos</Text>
            <Text style={styles.uploadCardSub}>Add new photos to your portfolio or deliver to clients</Text>
          </TouchableOpacity>
        </View>
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
  greeting: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.textPrimary,
  },
  uploadHeaderBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  // Stats
  statsRow: {
    flexDirection: "row",
    paddingHorizontal: spacing.lg,
    gap: 10,
    marginBottom: spacing.xl,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: radius.medium,
    padding: spacing.md,
    borderLeftWidth: 3,
    ...shadows.card,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.textPrimary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 16,
  },

  // Sections
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.textPrimary,
    flex: 1,
  },
  countBadge: {
    backgroundColor: colors.primary,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  countText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "700",
  },

  // Today
  todayCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: radius.medium,
    ...shadows.card,
  },
  todayAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  todayName: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  todayMeta: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  todayBadge: {
    backgroundColor: colors.success + "20",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  todayBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.success,
  },
  emptyCard: {
    backgroundColor: colors.card,
    padding: spacing.xl,
    borderRadius: radius.medium,
    alignItems: "center",
    gap: 8,
    ...shadows.card,
  },
  emptyText: {
    fontSize: 14,
    color: colors.textSecondary,
  },

  // Request Cards
  requestCard: {
    backgroundColor: colors.card,
    borderRadius: radius.medium,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadows.card,
  },
  requestHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  clientAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  clientName: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  bookingDate: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  requestPrice: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.textPrimary,
  },
  packageRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.background,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radius.small,
    marginBottom: 10,
  },
  packageLabel: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  messageText: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  actionRow: {
    flexDirection: "row",
    gap: 10,
  },
  rejectBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 12,
    borderRadius: radius.medium,
    borderWidth: 1.5,
    borderColor: colors.error,
  },
  acceptBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 12,
    borderRadius: radius.medium,
    backgroundColor: colors.success,
  },
  actionText: {
    fontSize: 14,
    fontWeight: "600",
  },
  activeBadge: {
    backgroundColor: colors.success + "20",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  activeBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.success,
  },
  uploadBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: radius.medium,
    backgroundColor: colors.primary,
    marginTop: 4,
  },
  uploadBtnText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.white,
  },

  // Upload Card
  uploadCard: {
    backgroundColor: colors.card,
    borderRadius: radius.large,
    padding: spacing.xl,
    alignItems: "center",
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: colors.divider,
  },
  uploadIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  uploadCardTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 4,
  },
  uploadCardSub: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: "center",
  },
});
