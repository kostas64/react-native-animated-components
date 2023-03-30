import React from 'react';
import {Text, Pressable, StyleSheet} from 'react-native';

const HomeButton = ({label, onPress, backgroundColor = 'rgba(0,0,0,0.2)'}) => {
  return (
    <Pressable style={[styles.container, {backgroundColor}]} onPress={onPress}>
      <Text style={styles.buttonLabel}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 8,
  },
  buttonLabel: {
    fontSize: 18,
    color: 'white',
  },
});

export default HomeButton;
