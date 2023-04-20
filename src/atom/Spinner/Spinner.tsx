import React, { FC } from "react";
import { ActivityIndicator } from "react-native";

export type SpinnerProps = ActivityIndicator & {
  size?: "small" | "large" | number;
  color?: string;
  style?: any;
};
export const Spinner: FC<SpinnerProps> = ({ size, ...props }) => {
  return <ActivityIndicator animating size={size} {...props} />;
};
Spinner.defaultProps = {
  color: "#ff2200",
  size: "small",
};
