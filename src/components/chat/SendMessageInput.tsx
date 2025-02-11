import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Image, Pressable, StyleSheet, TextInput} from 'react-native';

import {Colors} from '@utils/colors';
import {TSearchMessageInput} from './types';
import {typography} from '@utils/typography';
import {isIOS, MED_FONT_UPSCALE_FACTOR, WIDTH} from '@utils/device';

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
          maxFontSizeMultiplier={MED_FONT_UPSCALE_FACTOR}
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

SendMessageInput.displayName = 'SendMessageInput';

export default SendMessageInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 8,
    borderRadius: 20,
    marginHorizontal: 24,
    backgroundColor: Colors.ANTI_FLASH_WHITE,
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
    color: Colors.BLACK,
  },
  sendContainer: {
    backgroundColor: Colors.BLUE,
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
