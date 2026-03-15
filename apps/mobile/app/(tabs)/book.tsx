"use client"

import { Ionicons } from "@expo/vector-icons"
import { useState } from "react"
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Linking,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"

// Get device dimensions for responsive design
const { width: screenWidth, height: screenHeight } = Dimensions.get("window")

// Types
interface Photographer {
  id: number
  imageSource: string
  name: string
  specialty: string
  price: string
  rating: number
  numberOfReviews: number
  distance: string
  category: string
  availability: string
  portfolio: string[]
  bio: string
  phoneNumber: string
  instagramHandle: string
}

// Mock data
const photographersData: Photographer[] = [
  {
    id: 1,
    imageSource: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    name: "Maria Rodriguez",
    specialty: "Wedding & Landscape",
    price: "₹12,500/session",
    rating: 4.7,
    numberOfReviews: 120,
    distance: "2.5 miles",
    category: "Wedding",
    availability: "Available today",
    portfolio: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=300&h=200&fit=crop",
    ],
    bio: "Passionate wedding photographer with 8+ years of experience capturing love stories.",
    phoneNumber: "+15551234567",
    instagramHandle: "mariarodriguez_photo",
  },
  {
    id: 2,
    imageSource: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    name: "John Doe",
    specialty: "Portrait & Events",
    price: "₹10,000/session",
    rating: 4.9,
    numberOfReviews: 240,
    distance: "5.1 miles",
    category: "Portrait",
    availability: "Available tomorrow",
    portfolio: [
      "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
    ],
    bio: "Professional portrait photographer specializing in corporate and personal branding.",
    phoneNumber: "+15559876543",
    instagramHandle: "johndoe_portraits",
  },
  {
    id: 3,
    imageSource: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    name: "Emily White",
    specialty: "Fashion & Product",
    price: "₹15,000/session",
    rating: 4.5,
    numberOfReviews: 90,
    distance: "1.8 miles",
    category: "Fashion",
    availability: "Available now",
    portfolio: [
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=200&fit=crop",
    ],
    bio: "Fashion and product photographer with a keen eye for detail and modern aesthetics.",
    phoneNumber: "+15552345678",
    instagramHandle: "emilywhite_fashion",
  },
  {
    id: 4,
    imageSource: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    name: "Michael Green",
    specialty: "Wildlife & Nature",
    price: "₹16,500/session",
    rating: 4.8,
    numberOfReviews: 180,
    distance: "7.0 miles",
    category: "Wildlife",
    availability: "Available this week",
    portfolio: [
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
    ],
    bio: "Nature and wildlife photographer capturing the beauty of the natural world.",
    phoneNumber: "+15553456789",
    instagramHandle: "michaelgreen_wildlife",
  },
  {
    id: 5,
    imageSource: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    name: "Sarah Johnson",
    specialty: "Newborn & Family",
    price: "₹10,800/session",
    rating: 4.6,
    numberOfReviews: 95,
    distance: "3.2 miles",
    category: "Family",
    availability: "Available today",
    portfolio: [
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=300&h=200&fit=crop",
    ],
    bio: "Specializing in capturing precious family moments and newborn photography.",
    phoneNumber: "+15554567890",
    instagramHandle: "sarahjohnson_newborn",
  },
  {
    id: 6,
    imageSource: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&h=400&fit=crop&crop=face",
    name: "David Chen",
    specialty: "Architecture & Real Estate",
    price: "₹13,000/session",
    rating: 4.4,
    numberOfReviews: 75,
    distance: "4.7 miles",
    category: "Architecture",
    availability: "Available tomorrow",
    portfolio: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300&h=200&fit=crop",
    ],
    bio: "Architectural photographer with expertise in real estate and commercial properties.",
    phoneNumber: "+15555678901",
    instagramHandle: "davidchen_arch",
  },
]

export default function PhotographerBookingApp() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [filterVisible, setFilterVisible] = useState(false)
  const [selectedPhotographer, setSelectedPhotographer] = useState<Photographer | null>(null)
  const [favorites, setFavorites] = useState<number[]>([])
  const [sortBy, setSortBy] = useState("rating")
  const [priceRange, setPriceRange] = useState([0, 300])
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [bookingDate, setBookingDate] = useState("")
  const [bookingTime, setBookingTime] = useState("")
  const [bookingDuration, setBookingDuration] = useState("2")

  // Extract unique categories
  const categories = ["All", ...new Set(photographersData.map((p) => p.category))]

  // Filter and sort photographers
  const filteredPhotographers = photographersData
    .filter((photographer) => {
      const matchesSearch =
        photographer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photographer.specialty.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "All" || photographer.category === selectedCategory
      const price = Number.parseInt(photographer.price.replace(/\D/g, ""))
      const matchesPrice = price >= priceRange[0] && price <= priceRange[1]
      return matchesSearch && matchesCategory && matchesPrice
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating
        case "price":
          return Number.parseInt(a.price.replace(/\D/g, "")) - Number.parseInt(b.price.replace(/\D/g, ""))
        case "distance":
          return Number.parseFloat(a.distance) - Number.parseFloat(b.distance)
        default:
          return 0
      }
    })

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  const handleBookNow = (photographer: Photographer) => {
    setSelectedPhotographer(photographer)
    setShowBookingModal(true)
    setShowProfileModal(false)
  }

  const handleViewProfile = (photographer: Photographer) => {
    setSelectedPhotographer(photographer)
    setShowProfileModal(true)
  }

  const submitBooking = () => {
    if (!bookingDate || !bookingTime) {
      Alert.alert("Error", "Please select both date and time for your booking.")
      return
    }

    Alert.alert(
      "Booking Confirmed",
      `Your session with ${selectedPhotographer?.name} has been booked for ${bookingDate} at ${bookingTime}.`,
      [
        {
          text: "OK",
          onPress: () => {
            setShowBookingModal(false)
            setSelectedPhotographer(null)
            setBookingDate("")
            setBookingTime("")
            setBookingDuration("2")
          },
        },
      ],
    )
  }

  const getAvailabilityColor = (availability: string) => {
    if (availability.includes("now")) return "#7A5A2B"
    if (availability.includes("today")) return "#C6A66A"
    return "#9CA3AF"
  }

  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Ionicons key={i} name="star" size={14} color="#C6A66A" />)
    }

    if (hasHalfStar) {
      stars.push(<Ionicons key="half" name="star-half" size={14} color="#C6A66A" />)
    }

    const remainingStars = 5 - Math.ceil(rating)
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Ionicons key={`empty-${i}`} name="star-outline" size={14} color="#D1D5DB" />)
    }

    return <View style={styles.starsContainer}>{stars}</View>
  }

  const renderPhotographerCard = ({ item: photographer, index }: { item: Photographer; index: number }) => (
    <View style={[styles.photographerCard, { marginBottom: index === filteredPhotographers.length - 1 ? 100 : 16 }]}>
      <View style={styles.cardContent}>
        <View style={styles.photographerHeader}>
          <View style={styles.photographerImageContainer}>
            <Image source={{ uri: photographer.imageSource }} style={styles.photographerImage} />
            <View
              style={[
                styles.availabilityIndicator,
                { backgroundColor: getAvailabilityColor(photographer.availability) },
              ]}
            />
          </View>

          <View style={styles.photographerInfo}>
            <View style={styles.photographerNameRow}>
              <View style={styles.photographerDetails}>
                <Text style={styles.photographerName} numberOfLines={1}>
                  {photographer.name}
                </Text>
                <Text style={styles.photographerSpecialty} numberOfLines={1}>
                  {photographer.specialty}
                </Text>
                <Text style={styles.photographerMeta}>
                  {photographer.distance} • {photographer.availability}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => toggleFavorite(photographer.id)}
                style={styles.favoriteButton}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons
                  name={favorites.includes(photographer.id) ? "heart" : "heart-outline"}
                  size={20}
                  color={favorites.includes(photographer.id) ? "#C6A66A" : "#9CA3AF"}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.ratingPriceRow}>
              <View style={styles.ratingContainer}>
                {renderStars(photographer.rating)}
                <Text style={styles.ratingText}>{photographer.rating}</Text>
                <Text style={styles.reviewsText}>({photographer.numberOfReviews})</Text>
              </View>
              <Text style={styles.priceText}>{photographer.price}</Text>
            </View>
          </View>
        </View>

        {/* Portfolio Preview */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.portfolioContainer}>
          {photographer.portfolio.map((image, idx) => (
            <Image key={idx} source={{ uri: image }} style={styles.portfolioImage} />
          ))}
        </ScrollView>

        {/* Bio */}
        <Text style={styles.bioText} numberOfLines={2}>
          {photographer.bio}
        </Text>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.viewProfileButton} onPress={() => handleViewProfile(photographer)}>
            <Text style={styles.viewProfileButtonText}>View Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bookNowButton} onPress={() => handleBookNow(photographer)}>
            <Text style={styles.bookNowButtonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )

  const renderCategoryButton = ({ item: category }: { item: string }) => (
    <TouchableOpacity
      key={category}
      onPress={() => setSelectedCategory(category)}
      style={[styles.categoryButton, selectedCategory === category && styles.categoryButtonActive]}
    >
      <Text style={[styles.categoryButtonText, selectedCategory === category && styles.categoryButtonTextActive]}>
        {category}
      </Text>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F6F2" />

      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        {/* Search and Filter Section */}
        <View style={styles.searchSection}>
          <View style={styles.searchRow}>
            <View style={styles.searchInputContainer}>
              <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
              <TextInput
                placeholder="Search photographers..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={styles.searchInput}
                placeholderTextColor="#9CA3AF"
              />
            </View>
            <TouchableOpacity
              onPress={() => setFilterVisible(!filterVisible)}
              style={[styles.filterButton, filterVisible && styles.filterButtonActive]}
            >
              <Ionicons name="options" size={20} color={filterVisible ? "#FFFFFF" : "#374151"} />
            </TouchableOpacity>
          </View>

          {/* Category Filter */}
          <FlatList
            data={categories}
            renderItem={renderCategoryButton}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesContainer}
            contentContainerStyle={styles.categoriesContent}
          />

          {/* Advanced Filters */}
          {filterVisible && (
            <View style={styles.advancedFilters}>
              <View style={styles.filterGroup}>
                <Text style={styles.filterLabel}>Sort by</Text>
                <View style={styles.sortButtons}>
                  {["rating", "price", "distance"].map((option) => (
                    <TouchableOpacity
                      key={option}
                      onPress={() => setSortBy(option)}
                      style={[styles.sortButton, sortBy === option && styles.sortButtonActive]}
                    >
                      <Text style={[styles.sortButtonText, sortBy === option && styles.sortButtonTextActive]}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.filterGroup}>
                <Text style={styles.filterLabel}>
                  Price Range: ₹{priceRange[0] * 83} - ₹{priceRange[1] * 83}
                </Text>
                <View style={styles.priceRangeContainer}>
                  <Text style={styles.priceRangeText}>₹0</Text>
                  <View style={styles.priceRangeSlider}>
                    <Text style={styles.priceRangeInfo}>Drag to adjust price range</Text>
                  </View>
                  <Text style={styles.priceRangeText}>₹25,000</Text>
                </View>
              </View>
            </View>
          )}
        </View>

        {/* Results Count */}
        <View style={styles.resultsSection}>
          <Text style={styles.resultsText}>
            {filteredPhotographers.length} photographer{filteredPhotographers.length !== 1 ? "s" : ""} found
          </Text>
        </View>

        {/* Photographer Cards */}
        {filteredPhotographers.length > 0 ? (
          <FlatList
            data={filteredPhotographers}
            renderItem={renderPhotographerCard}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            style={styles.photographersList}
          />
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="search" size={64} color="#D1D5DB" />
            <Text style={styles.emptyStateTitle}>No photographers found</Text>
            <Text style={styles.emptyStateText}>Try adjusting your search or filters</Text>
          </View>
        )}
      </ScrollView>

      {/* Booking Modal */}
      <Modal
        visible={showBookingModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowBookingModal(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Book Session</Text>
            <TouchableOpacity onPress={() => setShowBookingModal(false)} style={styles.modalCloseButton}>
              <Ionicons name="close" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            {selectedPhotographer && (
              <>
                <View style={styles.selectedPhotographerInfo}>
                  <Image source={{ uri: selectedPhotographer.imageSource }} style={styles.selectedPhotographerImage} />
                  <View style={styles.selectedPhotographerDetails}>
                    <Text style={styles.selectedPhotographerName}>{selectedPhotographer.name}</Text>
                    <Text style={styles.selectedPhotographerSpecialty}>{selectedPhotographer.specialty}</Text>
                    <Text style={styles.selectedPhotographerPrice}>{selectedPhotographer.price}</Text>
                  </View>

                  <View style={styles.contactIcons}>
                    <TouchableOpacity
                      onPress={() => Linking.openURL(`tel:${selectedPhotographer.phoneNumber}`)}
                      style={styles.contactButton}
                    >
                      <Ionicons name="call-outline" size={24} color="#111827" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        Linking.openURL(
                          `https://www.instagram.com/${selectedPhotographer.instagramHandle}`,
                        )
                      }
                      style={styles.contactButton}
                    >
                      <Ionicons name="logo-instagram" size={24} color="#111827" />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.bookingForm}>
                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Date</Text>
                    <TextInput
                      placeholder="YYYY-MM-DD"
                      value={bookingDate}
                      onChangeText={setBookingDate}
                      style={styles.formInput}
                      placeholderTextColor="#9CA3AF"
                    />
                  </View>

                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Time</Text>
                    <TextInput
                      placeholder="HH:MM"
                      value={bookingTime}
                      onChangeText={setBookingTime}
                      style={styles.formInput}
                      placeholderTextColor="#9CA3AF"
                    />
                  </View>

                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Duration (hours)</Text>
                    <View style={styles.durationButtons}>
                      {["1", "2", "3", "4", "6", "8"].map((duration) => (
                        <TouchableOpacity
                          key={duration}
                          onPress={() => setBookingDuration(duration)}
                          style={[styles.durationButton, bookingDuration === duration && styles.durationButtonActive]}
                        >
                          <Text
                            style={[
                              styles.durationButtonText,
                              bookingDuration === duration && styles.durationButtonTextActive,
                            ]}
                          >
                            {duration}h
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>

                  <View style={styles.totalCostContainer}>
                    <Text style={styles.totalCostLabel}>Total Cost:</Text>
                    <Text style={styles.totalCostAmount}>
                      ₹
                      {Number.parseInt(selectedPhotographer.price.replace(/\D/g, "")) *
                        Number.parseInt(bookingDuration)}
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={submitBooking}
                    style={[
                      styles.confirmBookingButton,
                      (!bookingDate || !bookingTime) && styles.confirmBookingButtonDisabled,
                    ]}
                    disabled={!bookingDate || !bookingTime}
                  >
                    <Text style={styles.confirmBookingButtonText}>Confirm Booking</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* Profile Modal */}
      <Modal
        visible={showProfileModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowProfileModal(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Profile</Text>
            <TouchableOpacity onPress={() => setShowProfileModal(false)} style={styles.modalCloseButton}>
              <Ionicons name="close" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            {selectedPhotographer && (
              <>
                <View style={styles.profileHeader}>
                  <Image source={{ uri: selectedPhotographer.imageSource }} style={styles.profileImage} />
                  <Text style={styles.profileName}>{selectedPhotographer.name}</Text>
                  <Text style={styles.profileSpecialty}>{selectedPhotographer.specialty}</Text>
                  <View style={styles.profileRating}>
                    {renderStars(selectedPhotographer.rating)}
                    <Text style={styles.profileRatingText}>
                      {selectedPhotographer.rating} ({selectedPhotographer.numberOfReviews} reviews)
                    </Text>
                  </View>
                </View>

                <View style={styles.profileSection}>
                  <Text style={styles.profileSectionTitle}>About</Text>
                  <Text style={styles.profileBio}>{selectedPhotographer.bio}</Text>
                </View>

                <View style={styles.profileSection}>
                  <Text style={styles.profileSectionTitle}>Portfolio</Text>
                  <View style={styles.portfolioGrid}>
                    {selectedPhotographer.portfolio.map((image, idx) => (
                      <Image key={idx} source={{ uri: image }} style={styles.portfolioGridImage} />
                    ))}
                  </View>
                </View>

                <View style={styles.profileActions}>
                  <TouchableOpacity
                    onPress={() => handleBookNow(selectedPhotographer)}
                    style={styles.profileBookButton}
                  >
                    <Text style={styles.profileBookButtonText}>Book Now</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.profileMessageButton}>
                    <Ionicons name="chatbubble-outline" size={20} color="#6B7280" />
                  </TouchableOpacity>
                </View>
              </>
            )}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F6F2",
  },
  mainContent: {
    flex: 1,
  },
  searchSection: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  searchRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E9DFC8",
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: "#111827",
  },
  filterButton: {
    padding: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E9DFC8",
  },
  filterButtonActive: {
    backgroundColor: "#7A5A2B",
    borderColor: "#7A5A2B",
  },
  categoriesContainer: {
    marginBottom: 16,
  },
  categoriesContent: {
    paddingRight: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E9DFC8",
    marginRight: 8,
  },
  categoryButtonActive: {
    backgroundColor: "#7A5A2B",
    borderColor: "#7A5A2B",
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6B7280",
  },
  categoryButtonTextActive: {
    color: "#FFFFFF",
  },
  advancedFilters: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 16,
  },
  filterGroup: {
    marginBottom: 16,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 8,
  },
  sortButtons: {
    flexDirection: "row",
    gap: 8,
  },
  sortButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  sortButtonActive: {
    backgroundColor: "#7A5A2B",
    borderColor: "#7A5A2B",
  },
  sortButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6B7280",
    textAlign: "center",
  },
  sortButtonTextActive: {
    color: "#FFFFFF",
  },
  priceRangeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  priceRangeText: {
    fontSize: 12,
    color: "#6B7280",
  },
  priceRangeSlider: {
    flex: 1,
    height: 32,
    backgroundColor: "#F3F4F6",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  priceRangeInfo: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  resultsSection: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  resultsText: {
    fontSize: 14,
    color: "#6B7280",
  },
  photographersList: {
    paddingHorizontal: 16,
  },
  photographerCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    overflow: "hidden",
  },
  cardContent: {
    padding: 16,
  },
  photographerHeader: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
  },
  photographerImageContainer: {
    position: "relative",
  },
  photographerImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  availabilityIndicator: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  photographerInfo: {
    flex: 1,
  },
  photographerNameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  photographerDetails: {
    flex: 1,
  },
  photographerName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 2,
  },
  photographerSpecialty: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 4,
  },
  photographerMeta: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  favoriteButton: {
    padding: 4,
  },
  ratingPriceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  starsContainer: {
    flexDirection: "row",
    gap: 1,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111827",
  },
  reviewsText: {
    fontSize: 14,
    color: "#6B7280",
  },
  priceText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  portfolioContainer: {
    marginBottom: 12,
  },
  portfolioImage: {
    width: 80,
    height: 64,
    borderRadius: 8,
    marginRight: 8,
  },
  bioText: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
  },
  viewProfileButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
  },
  viewProfileButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    textAlign: "center",
  },
  bookNowButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#7A5A2B",
    borderRadius: 8,
  },
  bookNowButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#FFFFFF",
    textAlign: "center",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 48,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#111827",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: "#6B7280",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  modalCloseButton: {
    padding: 8,
    borderRadius: 20,
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  selectedPhotographerInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 16,
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    marginBottom: 24,
  },
  selectedPhotographerImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  selectedPhotographerDetails: {
    flex: 1,
  },
  selectedPhotographerName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 2,
  },
  selectedPhotographerSpecialty: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 2,
  },
  selectedPhotographerPrice: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  contactIcons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
    paddingVertical: 12,
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
  },
  contactButton: {
    padding: 12,
  },
  bookingForm: {
    gap: 16,
  },
  formGroup: {
    gap: 8,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
  },
  formInput: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    fontSize: 16,
    color: "#111827",
  },
  durationButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  durationButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  durationButtonActive: {
    backgroundColor: "#000000",
    borderColor: "#000000",
  },
  durationButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6B7280",
  },
  durationButtonTextActive: {
    color: "#FFFFFF",
  },
  totalCostContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
  },
  totalCostLabel: {
    fontSize: 14,
    color: "#6B7280",
  },
  totalCostAmount: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  confirmBookingButton: {
    paddingVertical: 12,
    backgroundColor: "#7A5A2B",
    borderRadius: 8,
  },
  confirmBookingButtonDisabled: {
    backgroundColor: "#D1D5DB",
  },
  confirmBookingButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 24,
  },
  profileImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 16,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  profileSpecialty: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 8,
  },
  profileRating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  profileRatingText: {
    fontSize: 14,
    color: "#6B7280",
  },
  profileSection: {
    marginBottom: 24,
  },
  profileSectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
  },
  profileBio: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },
  portfolioGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  portfolioGridImage: {
    width: (screenWidth - 56) / 2,
    height: 128,
    borderRadius: 8,
  },
  profileActions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
  },
  profileBookButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: "#7A5A2B",
    borderRadius: 8,
  },
  profileBookButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
  },
  profileMessageButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
  },
})
