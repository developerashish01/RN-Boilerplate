import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

export const Touch: React.FC<TouchableOpacityProps> = ({ children, ...rest }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} {...rest}>
      {children}
    </TouchableOpacity>
  );
};
