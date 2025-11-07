import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

interface CategoryCardProps {
  name: string;
  imageUrl: string;
  onPress: () => void;
}

export default function CategoryCard({ name, imageUrl, onPress }: CategoryCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <Pressable 
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed
      ]}
      onPress={onPress}
    >
      {!imageError ? (
        <Image 
          source={{ uri: imageUrl }}
          style={styles.image}
          onError={() => setImageError(true)}
        />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderText}>🍽️</Text>
        </View>
      )}
      <Text style={styles.name}>{name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  cardPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.97 }],
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 12,
    borderWidth: 3,
    borderColor: '#f5f5f5',
  },
  imagePlaceholder: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 12,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 40,
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
    color: '#333',
  },
});