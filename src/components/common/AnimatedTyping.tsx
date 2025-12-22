import { Text } from "react-native";
import { useState, useEffect, useRef, useCallback } from "react";

import { Timeout } from "src/types/common";
import { AnimatedTypingProps } from "./types";

export default function AnimatedTyping({
  text,
  textStyle,
  cursorStyle,
  onComplete,
}: AnimatedTypingProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isCursorVisible, setIsCursorVisible] = useState(true);
  const progress = useRef({ messageIndex: 0, charIndex: 0 });
  const typingTimeout = useRef<Timeout | null>(null);
  const cursorInterval = useRef<Timeout | null>(null);

  const startTyping = useCallback(() => {
    const { messageIndex, charIndex } = progress.current;

    if (messageIndex < text.length) {
      const currentMessage = text[messageIndex];

      if (charIndex < currentMessage.length) {
        // Append the next character
        setDisplayedText((prev) => prev + currentMessage[charIndex]);
        progress.current.charIndex += 1;

        typingTimeout.current = setTimeout(startTyping, 50);
      } else if (messageIndex + 1 < text.length) {
        // Add a newline and move to the next message if there's another message
        progress.current.messageIndex += 1;
        progress.current.charIndex = 0;

        setDisplayedText((prev) => prev + "\n");
        typingTimeout.current = setTimeout(startTyping, 500);
      } else {
        // Typing complete
        stopCursorAnimation();
        if (onComplete) {
          onComplete();
        }
      }
    }
  }, [text, onComplete]);

  const stopCursorAnimation = () => {
    !!cursorInterval.current && clearInterval(cursorInterval.current);
    setIsCursorVisible(false);
  };

  useEffect(() => {
    // Start cursor animation
    cursorInterval.current = setInterval(() => {
      setIsCursorVisible((visible) => !visible);
    }, 500);

    // Start typing animation
    typingTimeout.current = setTimeout(startTyping, 500);

    return () => {
      !!typingTimeout.current && clearTimeout(typingTimeout.current);
      !!cursorInterval.current && clearInterval(cursorInterval.current);
    };
  }, [typingTimeout, cursorInterval, startTyping]);

  return (
    <Text style={textStyle}>
      {displayedText}
      {isCursorVisible && <Text style={cursorStyle}>|</Text>}
    </Text>
  );
}
