import { Ionicons } from "@expo/vector-icons";
import React, { useRef } from "react";
import {
    Animated,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ViewStyle,
} from "react-native";
import { Colors } from "../constants/Colors";

interface SearchBarProps {
  isTablet: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  isTablet,
  searchQuery,
  setSearchQuery,
}) => {
  const borderAnim = useRef(new Animated.Value(0)).current;

  const handleSearchFocus = () => {
    Animated.timing(borderAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const handleSearchBlur = () => {
    Animated.timing(borderAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  // ✅ Use interpolateColor for colors
  const animatedBorderColor = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.light.border, Colors.light.primaryAccent],
  });

  return (
    <Animated.View
      style={[
        styles.searchContainer,
        { borderColor: animatedBorderColor } as Animated.WithAnimatedObject<ViewStyle>,
      ]}
    >
      <Ionicons
        name="search"
        size={isTablet ? 22 : 18}
        color={Colors.light.secondaryText}
        style={styles.searchIcon}
      />
      <TextInput
        style={styles.searchInput}
        placeholder="Search categories..."
        placeholderTextColor={Colors.light.secondaryText}
        value={searchQuery}
        onChangeText={setSearchQuery}
        onFocus={handleSearchFocus}
        onBlur={handleSearchBlur}
      />
      {searchQuery.length > 0 && (
        <TouchableOpacity
          onPress={() => setSearchQuery("")}
          style={styles.clearSearchButton}
        >
          <Ionicons
            name="close-circle"
            size={isTablet ? 22 : 18}
            color={Colors.light.secondaryText}
          />
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.primaryBackground,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginVertical: 16,
    height: 50,
    borderWidth: 1,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.light.primaryText,
  },
  clearSearchButton: {
    marginLeft: 10,
    padding: 5,
  },
});

export default SearchBar;
