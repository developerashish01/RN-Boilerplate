import React, { FC } from "react";

import { Spinner } from "@atom/Spinner";
import SpinnerOverlay from "react-native-loading-spinner-overlay";

type OverlayLoaderProps = {
  loading?: boolean;
};
export const OverlayLoader: FC<OverlayLoaderProps> = ({ loading }) => {
  if (!loading) {
    return <></>;
  }
  return <SpinnerOverlay visible customIndicator={<Spinner color="white" size={30} />} />;
};
OverlayLoader.defaultProps = {
  loading: true,
};
