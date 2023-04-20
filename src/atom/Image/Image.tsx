import React from "react";

import FastImage, { FastImageProps, ResizeMode } from "react-native-fast-image";

export type TextSizeProp = "small" | "normal" | "large";
export type TextAccentProp = "normal" | "hint" | "error";

export type ImageProps = FastImageProps & {
  resizeMode?: ResizeMode;
};

export const Image: React.FC<ImageProps> = ({ resizeMode = "contain", ...rest }) => {
  return <FastImage {...rest} resizeMode={resizeMode} />;
};
