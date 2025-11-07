import LoadingSpinner from '@/components/LoadingSpinner';
import MealCard from '@/components/MealCard';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export default function MealsScreen() {
  const { category } = useLocalSearchParams<{ category: string }>();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchMeals();
  }, [category]);

  const fetchMeals = async () => {
    try {
      setLoading(true);
      setError(false);
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      const data = await response.json();
      setMeals(data.meals || []);
    } catch (err) {
      console.error('Error fetching meals:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleMealPress = (mealId: string) => {
    router.push(`/meal/${mealId}`);
  };

  if (loading) {
    return <LoadingSpinner message={`Loading ${category} meals...`} />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load meals</Text>
        <Text style={styles.errorSubtext}>Please try again later</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {meals.length} {category} {meals.length === 1 ? 'Meal' : 'Meals'}
      </Text>
      <FlatList
        data={meals}
        keyExtractor={(item) => item.idMeal}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <MealCard
            name={item.strMeal}
            imageUrl={item.strMealThumb}
            onPress={() => handleMealPress(item.idMeal)}
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
  header: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  listContent: {
    paddingVertical: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  errorText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6347',
    marginBottom: 10,
  },
  errorSubtext: {
    fontSize: 16,
    color: '#666',
  },
});