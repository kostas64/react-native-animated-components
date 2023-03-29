import React from 'react';
import {Text, Pressable} from 'react-native';

const HomeButton = ({label, onPress}) => {
  return (
    <Pressable
      style={{
        padding: 8,
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: 8,
      }}
      onPress={onPress}>
      <Text style={{fontSize: 18, fontWeight: 500, color: 'white'}}>
        {label}
      </Text>
    </Pressable>
  );
};

export default HomeButton;
