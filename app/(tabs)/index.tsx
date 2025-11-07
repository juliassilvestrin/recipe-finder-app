import CategoryCard from '@/components/CategoryCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function CategoriesScreen() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
      const data = await response.json();
      setCategories(data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryPress = (categoryName: string) => {
    router.push(`/meals/${categoryName}`);
  };

  if (loading) {
    return <LoadingSpinner message="Loading categories..." />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.welcomeText}>Discover Recipes</Text>
        <Text style={styles.subtitleText}>Browse by category</Text>
      </View>
      
      <FlatList
        data={categories}
        keyExtractor={(item) => item.idCategory}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <CategoryCard
            name={item.strCategory}
            imageUrl={item.strCategoryThumb}
            onPress={() => handleCategoryPress(item.strCategory)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerSection: {
    backgroundColor: 'white',
    padding: 20,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitleText: {
    fontSize: 16,
    color: '#666',
  },
  listContent: {
    padding: 15,
    paddingBottom: 30,
  },
});