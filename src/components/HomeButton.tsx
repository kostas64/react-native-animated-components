import {typography} from '@utils/typography';
import React from 'react';
import {Text, Pressable, StyleSheet} from 'react-native';

type THomeButtonProps = {
  label: string;
  onPress: (props: any) => void;
  backgroundColor: string;
};

const HomeButton = ({
  label,
  onPress,
  backgroundColor = 'rgba(0,0,0,0.2)',
}: THomeButtonProps) => {
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
    lineHeight: 24,
    color: 'white',
    fontFamily: typography.regular,
  },
});

export default HomeButton;
