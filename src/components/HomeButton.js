import React from 'react';
import {Text, Pressable} from 'react-native';

const HomeButton = ({label, onPress, backgroundColor = 'rgba(0,0,0,0.2)'}) => {
  return (
    <Pressable
      style={{
        padding: 12,
        backgroundColor,
        borderRadius: 8,
      }}
      onPress={onPress}>
      <Text style={{fontSize: 18, color: 'white'}}>{label}</Text>
    </Pressable>
  );
};

export default HomeButton;
