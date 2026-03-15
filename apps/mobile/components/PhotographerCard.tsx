import * as LucideIcons from "lucide-react-native";
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get("window");

interface PhotographerCardProps {
  imageSource: string;
  name: string;
  specialty: string;
  price: string;
  rating: number;
  numberOfReviews: number;
  distance: string;
  onPress: () => void;
  currentColors: any;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  badge?: string;
  isVerified?: boolean;
  location?: string;
  styleTags?: string[];
}

const PhotographerCard: React.FC<PhotographerCardProps> = ({
  imageSource,
  name,
  specialty,
  price,
  rating,
  numberOfReviews,
  distance,
  onPress,
  currentColors,
  isFavorite,
  onToggleFavorite,
  badge,
  isVerified,
  location,
  styleTags,
}) => {
  return (
    <TouchableOpacity
      style={[styles.card, {
        backgroundColor: currentColors.cardBackground,
        shadowColor: "#000",
        borderColor: currentColors.border,
      }]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      {/* Large Image */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageSource }} style={styles.image} />

        {/* Badge */}
        {badge && (
          <View style={styles.badgeWrap}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        )}

        {/* Favorite */}
        <TouchableOpacity style={styles.favBtn} onPress={onToggleFavorite}>
          <LucideIcons.Heart
            size={18}
            color={isFavorite ? "#E74C3C" : "rgba(255,255,255,0.9)"}
            fill={isFavorite ? "#E74C3C" : "none"}
          />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Name + Verified */}
        <View style={styles.nameRow}>
          <Text style={[styles.name, { color: currentColors.primaryText }]} numberOfLines={1}>
            {name}
          </Text>
          {isVerified && (
            <LucideIcons.BadgeCheck size={16} color="#3498db" fill="#3498db" style={{ marginLeft: 4 }} />
          )}
        </View>

        {/* Location */}
        {location && (
          <View style={styles.locationRow}>
            <LucideIcons.MapPin size={12} color={currentColors.secondaryText} />
            <Text style={[styles.locationText, { color: currentColors.secondaryText }]}>{location}</Text>
          </View>
        )}

        {/* Style Tags */}
        {styleTags && styleTags.length > 0 && (
          <View style={styles.tagsRow}>
            {styleTags.slice(0, 3).map((tag, i) => (
              <View key={i} style={[styles.tag, { backgroundColor: currentColors.primaryBackground }]}>
                <Text style={[styles.tagText, { color: currentColors.primaryText }]}>{tag}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Rating + Price */}
        <View style={styles.bottomRow}>
          <View style={styles.ratingGroup}>
            <LucideIcons.Star size={13} color={currentColors.warning} fill={currentColors.warning} />
            <Text style={[styles.ratingText, { color: currentColors.primaryText }]}>
              {rating.toFixed(1)}
            </Text>
            <Text style={[styles.reviewCount, { color: currentColors.secondaryText }]}>
              ({numberOfReviews})
            </Text>
          </View>
          <Text style={[styles.priceText, { color: currentColors.primaryText }]}>{price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width * 0.7,
    maxWidth: 280,
    borderRadius: 20,
    marginRight: 16,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 6,
    overflow: "hidden",
    borderWidth: 1,
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 200,
  },
  badgeWrap: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  badgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  favBtn: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: 16,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  name: {
    fontSize: 17,
    fontWeight: "700",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 10,
  },
  locationText: {
    fontSize: 13,
  },
  tagsRow: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 12,
    flexWrap: "wrap",
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 11,
    fontWeight: "600",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ratingGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "700",
  },
  reviewCount: {
    fontSize: 12,
  },
  priceText: {
    fontSize: 16,
    fontWeight: "800",
  },
});

export default PhotographerCard;
