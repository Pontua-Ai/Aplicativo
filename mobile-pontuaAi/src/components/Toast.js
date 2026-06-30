import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

let showToastFn = null;

export function showToast(message, type = 'success') {
  if (showToastFn) showToastFn(message, type);
}

export function ToastProvider({ children }) {
  const [message, setMessage] = useState('');
  const [type, setType] = useState('success');
  const [visible, setVisible] = useState(false);
  const opacity = useState(new Animated.Value(0))[0];
  const { colors } = useTheme();

  const show = useCallback((msg, t) => {
    setMessage(msg);
    setType(t);
    setVisible(true);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setVisible(false));
    }, 3000);
  }, [opacity]);

  useEffect(() => {
    showToastFn = show;
    return () => { showToastFn = null; };
  }, [show]);

  const bgColor = type === 'error' ? colors.error : type === 'success' ? colors.tertiary : colors.primary;

  return (
    <View style={{ flex: 1 }}>
      {children}
      {visible && (
        <Animated.View style={[styles.container, { opacity, backgroundColor: bgColor }]}>
          <Text style={styles.text}>{message}</Text>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    padding: 16,
    borderRadius: 8,
    maxWidth: 300,
    zIndex: 10000,
    elevation: 10,
  },
  text: {
    color: '#fff',
    fontSize: 14,
  },
});
