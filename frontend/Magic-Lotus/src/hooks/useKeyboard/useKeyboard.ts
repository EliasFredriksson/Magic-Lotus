import { useCallback, useEffect, useState } from "react";

const KEYS = [
  // ALPHABET
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "å",
  "ä",
  "ö",
  // WHITE SPACE KEYS
  "Enter",
  " ", // SPACE BAR
  "Tab",
  // NAVIGATION
  "ArrowDown",
  "ArrowUp",
  "ArrowLeft",
  "ArrowRight",
  "End",
  "Home",
  "PageDown",
  "PageUp",
  // MODIFIERS
  "Alt",
  "AltGraph",
  "CapsLock",
  "Control",
  "Fn",
  "FnLock",
  "NumLock",
  "Shift",
  // EDITING KEYS
  "Backspace",
  "Clear",
  "Delete",
  "Insert",
  "Copy",
  "Cut",
  "Redo",
  "Undo",
  // UI KEYS
  "Escape",
  // FUNCTION KEYS
  "F1",
  "F2",
  "F3",
  "F4",
  "F5",
  "F6",
  "F7",
  "F8",
  "F9",
  "F10",
  "F11",
  "F12",
  // MORE KEYS TO ADD IF NEEDED
] as const;
type Key = typeof KEYS[number];

type Props = {
  targetKeys: Key | Key[];
  onKeyDown?: (key: Key) => void;
  onKeyUp?: (key: Key) => void;
};

const useKeyboard = (props: Props): boolean => {
  // IS TARGET KEY(S) PRESSED OR NOT
  const [keyPressed, setKeyPressed] = useState<boolean>(false);

  // ON KEY DOWN, CHECK FOR TARGET KEY
  const onKeyDown = useCallback(
    ({ key }: KeyboardEvent) => {
      if (Array.isArray(props.targetKeys)) {
        if (props.targetKeys.includes(key as Key)) {
          if (props.onKeyDown) props.onKeyDown(key as Key);
          setKeyPressed(true);
        }
      } else if (key === props.targetKeys) {
        if (props.onKeyDown) props.onKeyDown(key as Key);
        setKeyPressed(true);
      }
    },
    [props.targetKeys, props.onKeyDown]
  );

  // ON KEY UP, CHECK FOR TARGET KEY
  const onKeyUp = useCallback(
    ({ key }: KeyboardEvent) => {
      if (Array.isArray(props.targetKeys)) {
        if (props.targetKeys.includes(key as Key)) {
          if (props.onKeyUp) props.onKeyUp(key as Key);
          setKeyPressed(false);
        }
      } else if (key === props.targetKeys) {
        if (props.onKeyUp) props.onKeyUp(key as Key);
        setKeyPressed(false);
      }
    },
    [props.targetKeys, props.onKeyUp]
  );

  // ADD LISTENERS, UPDATE THEM IF PROP CHANGES
  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [props]);
  return keyPressed;
};

export default useKeyboard;
