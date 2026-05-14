import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Platform, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

const SUCCESS_MESSAGE = 'Derdiniz başarıyla sikildi!';

export default function App() {
  const [problem, setProblem] = useState('');
  const [successVisible, setSuccessVisible] = useState(false);

  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    if (successVisible) {
      opacity.setValue(0);
      scale.setValue(0.9);
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [opacity, scale, successVisible]);

  const handleSubmit = () => {
    if (!problem.trim()) {
      return;
    }

    setSuccessVisible(true);
    setProblem('');
  };

  const animatedStyles = useMemo(
    () => ({
      opacity,
      transform: [{ scale }],
    }),
    [opacity, scale]
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ExpoStatusBar style="dark" />
      <StatusBar barStyle={Platform.OS === 'ios' ? 'dark-content' : 'default'} />
      <View style={styles.container}>
        <Text style={styles.header}>Sikilmesini istediğiniz derdinizi yazınız</Text>
        <TextInput
          style={styles.input}
          placeholder="Derdinizi yazın..."
          placeholderTextColor="#888"
          value={problem}
          onChangeText={setProblem}
          multiline
        />
        <View style={styles.adBanner}>
          <Text style={styles.adText}>Reklam Alanı</Text>
        </View>
        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Derdini Sikeyim</Text>
        </Pressable>
      </View>
      {successVisible && (
        <Pressable
          style={styles.overlay}
          onPress={() => setSuccessVisible(false)}
          android_ripple={{ color: 'rgba(255, 255, 255, 0.2)' }}
        >
          <Animated.View style={[styles.successContainer, animatedStyles]}>
            <Text style={styles.successText}>{SUCCESS_MESSAGE}</Text>
            <Text style={styles.successHint}>Dokunarak kapatabilirsiniz.</Text>
          </Animated.View>
        </Pressable>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fdf6f9',
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'flex-start',
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    color: '#d63384',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    minHeight: 120,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#f3d0e2',
    backgroundColor: '#fff',
    padding: 16,
    textAlignVertical: 'top',
    fontSize: 16,
    color: '#222',
    shadowColor: '#c2185b',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  adBanner: {
    marginTop: 16,
    marginBottom: 24,
    borderRadius: 12,
    backgroundColor: '#ffe3f1',
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#f7bfdc',
  },
  adText: {
    color: '#b5179e',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.4,
  },
  button: {
    backgroundColor: '#f72585',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: '#b5179e',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  successContainer: {
    backgroundColor: '#fff',
    paddingVertical: 40,
    paddingHorizontal: 28,
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
  successText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#f72585',
    textAlign: 'center',
  },
  successHint: {
    marginTop: 12,
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
  },
});
