import { useColorScheme } from '@/hooks/useColorScheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack, router } from 'expo-router';
import 'react-native-reanimated';
import Header from '../components/Header';

// Create a client
const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }} initialRouteName="onboarding">
          <Stack.Screen name="onboarding" options={{
            headerShown: false,
            animation: "fade",
          }} />
          <Stack.Screen name="index" options={{
            headerShown: false,
          }} />
          <Stack.Screen name="categories" options={{
            headerShown: false,
          }} />
          <Stack.Screen name="photographer/[id]" options={{
            headerShown: false,
          }} />
          <Stack.Screen name="booking/[photographerId]" options={{
            headerShown: false,
          }} />
          <Stack.Screen name="booking/confirmation" options={{
            headerShown: false,
          }} />
          <Stack.Screen name="photographer/dashboard" options={{
            headerShown: false,
          }} />
          <Stack.Screen name="photographer/delivery" options={{
            headerShown: false,
          }} />
          <Stack.Screen name="ai-match" options={{
            headerShown: false,
          }} />
          <Stack.Screen name="(tabs)/book" options={{
            headerShown: true,
            header: () => <Header title="Book a Photographer" onBackPress={() => router.replace('/')} />,
          }} />
          <Stack.Screen name="+not-found" options={{
            headerShown: true,
            header: ({ navigation }) => <Header title="Not Found" />,
          }} />
        </Stack>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
