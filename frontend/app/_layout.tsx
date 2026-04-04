// app/_layout.tsx (الحل النهائي والنهائي)
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { View, Text, ActivityIndicator } from 'react-native';

SplashScreen.preventAutoHideAsync();

// هذا المكون هو "الحارس" الذي يقرر ماذا يعرض بناءً على حالة المصادقة
function AppNavigator() {
  const { user, loading } = useAuth();

  useEffect(() => {
    // ننتظر حتى تنتهي عملية التحقق من التوكن المخزن
    if (!loading) {
      SplashScreen.hideAsync();
    }
  }, [loading]);

  // أثناء التحميل، اعرض شاشة تحميل بسيطة
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ marginTop: 10 }}>جاري التحميل...</Text>
      </View>
    );
  }

  // إذا لم يكن المستخدم مسجلاً للدخول، اعرض شاشات المصادقة فقط
  if (!user) {
    return (
      <Stack>
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        {/* يمكننا حذف شاشة index أو إعادة توجيهها */}
        <Stack.Screen name="index" options={{ href: "/auth/login" }} />
      </Stack>
    );
  }

  // إذا كان المستخدم مسجلاً للدخول، اعرض التطبيق الرئيسي فقط
  return (
    <Stack>
      <Stack.Screen name="(main)" options={{ headerShown: false }} />
      {/* أعد توجيه الصفحة الرئيسية إلى الصفحة الرئيسية داخل التبويبات */}
      <Stack.Screen name="index" options={{ href: "/(main)/(tabs)/" }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AppNavigator />
        <StatusBar style="auto" />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
