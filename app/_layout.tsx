import { FavoritesProvider } from '@/components/FavoritesContext';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <FavoritesProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#FF6347',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerBackTitle: 'Back',
        }}
      >
        <Stack.Screen 
          name="(tabs)" 
          options={{ 
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="meals/[category]"
          options={({ route }) => ({
            title: `${route.params?.category || ''} Meals`,
          })}
        />
        <Stack.Screen 
          name="meal/[id]"
          options={{
            title: 'Recipe',
          }}
        />
      </Stack>
    </FavoritesProvider>
  );
}