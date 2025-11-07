# Recipe Finder App

A React Native mobile application built with Expo for discovering and saving meal recipes from around the world using TheMealDB API.

## Human Interface Guidelines Implementation

### Typography and Layout Using System Standards

The app follows Apple’s typography guidelines by using the SF Pro system font and clear text hierarchy. Screen titles use 28pt bold text, while subtitles use 16pt regular to show importance. Meal card names use 18pt bold to stay easy to read, and recipe details use 16pt text with comfortable spacing for longer reading. All text follows good contrast rules, using dark grays on white backgrounds to support accessibility.

For layout, the app uses grid-style collections for category images because Apple recommends collections for visual content. Recipe pages use scrolling text since that works better for longer information. Images and elements have enough padding to keep the screen clean and prevent items from looking crowded. The layout stays consistent during use, following Apple’s advice to avoid moving or changing elements while the user is interacting.

## Features

- **Browse Categories** - Explore meals organized by categories (Beef, Chicken, Dessert, Seafood, Pasta, etc.)
- **View Recipes** - Access detailed recipes with ingredients list and step-by-step cooking instructions
- **Save Favorites** - Bookmark favorite recipes with heart button, saved locally using AsyncStorage

## API Used

This app uses [TheMealDB API](https://www.themealdb.com/api.php) to fetch meal data:

- **Categories Endpoint**: `https://www.themealdb.com/api/json/v1/1/categories.php` - Returns all meal categories
- **Filter by Category**: `https://www.themealdb.com/api/json/v1/1/filter.php?c={category}` - Returns meals in a specific category
- **Meal Details**: `https://www.themealdb.com/api/json/v1/1/lookup.php?i={id}` - Returns full recipe details including ingredients and instructions

## Screens

1. **Categories** - Grid view of meal categories with images and names, includes "Discover Recipes" header
2. **Meals List** - Shows all meals within selected category with meal count header
3. **Recipe Details** - Full recipe with large image, category/cuisine tags, ingredients checklist, cooking instructions, and favorite button
4. **Favorites** - Saved recipes displayed in same format as Meals List, or empty state with usage instructions

`
