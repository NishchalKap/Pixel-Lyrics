import { useRouter } from 'expo-router';
import * as LucideIcons from "lucide-react-native";
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from "../constants/Colors";

interface CategoryCardProps {
  name: string;
  iconName: keyof typeof LucideIcons;
  currentColors: typeof Colors.light & { categoryIconBg: string; categoryIcon: string; };
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, iconName, currentColors }) => {
  const Icon = LucideIcons[iconName] as React.ComponentType<any>;
  const router = useRouter();

  if (!Icon) {
    return null; // Or render a placeholder/error icon
  }

  return (
    <TouchableOpacity style={styles.categoryCard} onPress={() => router.push('/categories')}>
      <View style={[styles.categoryIconBackground, { backgroundColor: currentColors.categoryIconBg }]}>
        <Icon size={30} color={currentColors.categoryIcon} />
      </View>
      <Text style={[styles.categoryName, { color: currentColors.primaryText }]}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryCard: {
    alignItems: 'center',
    marginRight: 0,
    // Removed padding, borderRadius, shadow and elevation to remove the card background
    width: 90, // Fixed width for better layout control
  },
  categoryIconBackground: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 5,
  },
});

export default CategoryCard;
