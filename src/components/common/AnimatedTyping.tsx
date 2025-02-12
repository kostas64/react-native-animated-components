import {Text} from 'react-native';
import {useState, useEffect, useRef} from 'react';

import {AnimatedTypingProps} from './types';

export default function AnimatedTyping(props: AnimatedTypingProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isCursorVisible, setIsCursorVisible] = useState(true);
  const progress = useRef({messageIndex: 0, charIndex: 0});
  const typingTimeout = useRef<number | null>(null);
  const cursorInterval = useRef<number | null>(null);

  const startTyping = () => {
    const {messageIndex, charIndex} = progress.current;

    if (messageIndex < props.text.length) {
      const currentMessage = props.text[messageIndex];

      if (charIndex < currentMessage.length) {
        // Append the next character
        setDisplayedText(prev => prev + currentMessage[charIndex]);
        progress.current.charIndex += 1;

        typingTimeout.current = setTimeout(startTyping, 50);
      } else if (messageIndex + 1 < props.text.length) {
        // Add a newline and move to the next message if there's another message
        progress.current.messageIndex += 1;
        progress.current.charIndex = 0;

        setDisplayedText(prev => prev + '\n');
        typingTimeout.current = setTimeout(startTyping, 500);
      } else {
        // Typing complete
        stopCursorAnimation();
        if (props.onComplete) {
          props.onComplete();
        }
      }
    }
  };

  const stopCursorAnimation = () => {
    !!cursorInterval.current && clearInterval(cursorInterval.current);
    setIsCursorVisible(false);
  };

  useEffect(() => {
    // Start cursor animation
    cursorInterval.current = setInterval(() => {
      setIsCursorVisible(visible => !visible);
    }, 500);

    // Start typing animation
    typingTimeout.current = setTimeout(startTyping, 500);

    return () => {
      !!typingTimeout.current && clearTimeout(typingTimeout.current);
      !!cursorInterval.current && clearInterval(cursorInterval.current);
    };
  }, []);

  return (
    <Text style={props.textStyle}>
      {displayedText}
      {isCursorVisible && <Text style={props.cursorStyle}>|</Text>}
    </Text>
  );
}
