// app/index.tsx (وضع التشخيص الآمن)
import { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import * as SplashScreen from 'expo-splash-screen';

// لقد أزلنا useRouter وعمليات إعادة التوجيه بالكامل مؤقتاً

export default function DiagnosticScreen() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) {
      return;
    }

    // أخفِ شاشة البداية
    SplashScreen.hideAsync();

    // اطبع معلومات في الطرفية لنرى ما يحدث
    console.log('--- DIAGNOSTIC MODE ---');
    console.log('App started without crashing!');
    console.log('Loading state:', loading);
    console.log('User state:', user ? 'Logged In' : 'Logged Out');
    console.log('-----------------------');
  }, [user, loading]);

  // أثناء التحميل، اعرض مؤشر تحميل
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.text}>جاري التحميل...</Text>
      </View>
    );
  }

  // بعد التحميل، اعرض شاشة ثابتة
  return (
    <View style={styles.container}>
      <Text style={styles.title}>وضع التشخيص</Text>
      <Text style={styles.text}>
        {user ? 'المستخدم مسجل للدخول' : 'المستخدم غير مسجل للدخول'}
      </Text>
      <Text style={styles.text}>إذا رأيت هذه الشاشة، فهذا يعني أن المشكلة ليست في AuthProvider أو في هذا الملف.</Text>
      <Text style={styles.text}>المشكلة على الأرجح في الشاشة التي نحول إليها.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    marginVertical: 5,
  },
});
