import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Image, Pressable, StyleSheet, TextInput} from 'react-native';

import {isIOS, WIDTH} from '@utils/device';
import {TSearchMessageInput} from './types';
import {typography} from '@utils/typography';

const SendMessageInput = React.memo(
  ({input, setInput, inputRef, onPressSend}: TSearchMessageInput) => {
    const insets = useSafeAreaInsets();
    const bottomStyle = insets.bottom > 0 ? insets.bottom - 20 : 16;

    return (
      <Pressable
        style={[styles.inputContainer, {marginBottom: bottomStyle}]}
        onPress={() => inputRef?.current?.focus()}>
        <TextInput
          ref={inputRef}
          multiline
          value={input}
          onChangeText={setInput}
          numberOfLines={2}
          placeholder="Message"
          placeholderTextColor={'#bbbbbb'}
          style={styles.input}
        />
        <Pressable
          style={styles.sendContainer}
          onPress={() => onPressSend(input)}>
          <Image
            tintColor={'white'}
            style={styles.send}
            source={require('@assets/img/send.png')}
          />
        </Pressable>
      </Pressable>
    );
  },
);

export default SendMessageInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 8,
    borderRadius: 20,
    marginHorizontal: 24,
    backgroundColor: '#f3f3f3',
    paddingTop: isIOS ? 8 : 2,
    paddingLeft: isIOS ? 16 : 14,
    height: 66,
  },
  input: {
    textAlignVertical: 'top',
    height: isIOS ? 56 : 74,
    fontSize: 16,
    width: WIDTH - 136,
    fontFamily: typography.semiBold,
    lineHeight: 20,
    color: 'black',
  },
  sendContainer: {
    backgroundColor: '#033de6',
    position: 'absolute',
    padding: 12,
    borderRadius: 30,
    right: 16,
    top: isIOS ? 10 : 11,
  },
  send: {
    left: -2,
    width: 22,
    height: 22,
    transform: [{rotate: '45deg'}],
  },
});
