import React from "react";
import { Text as LibText, TextProps as LibTextProps } from "react-native";

export type TextSizeProp = "small" | "normal" | "large";
export type TextAccentProp = "normal" | "hint" | "error";

export type TextProps = LibTextProps & {
  size?: TextSizeProp;
  accent?: TextAccentProp;
};

export const Text: React.FC<TextProps> = ({ style, ...rest }) => {
  return <LibText {...rest} style={[style]} />;
};
