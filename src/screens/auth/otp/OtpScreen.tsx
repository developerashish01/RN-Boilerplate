import React, { useCallback, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";

import { Text } from "@atom/Text";
import View from "@atom/View/View";
import { CloseButton } from "@molecules/CloseButton";
import { CTAButton } from "@molecules/CTAButton";
import { OTPInputView } from "@molecules/OTPInputView";
import { OverlayLoader } from "@molecules/OverlayLoader";
import { Screen } from "@molecules/Screen";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppStackParamList } from "@src/AppNavigator";
import { login } from "@src/util/request/login";

type OTPScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<AppStackParamList, "otp">,
  StackNavigationProp<AppStackParamList>
>;

type OtpScreenProps = {
  navigation: OTPScreenNavigationProp;
  route: RouteProp<AppStackParamList, "otp">;
};

export const OtpScreen: React.FC<OtpScreenProps> = ({
  route: {
    params: { phoneNo },
  },
  navigation,
}) => {
  const [error, setError] = useState("");
  const [disable, setDisable] = useState(true);
  const [loader, setLoader] = useState(false);
  const [otp, setOtp] = useState("");

  const verifyOtp = useCallback(
    async (otpStr: string) => {
      setOtp(otpStr);
      setError("");
      setDisable(false);
      setLoader(true);
      await login({ otp: otpStr, phoneNo: "+91" + phoneNo });
      setLoader(false);
      navigation.replace("main");
    },
    [navigation, phoneNo],
  );

  const closeAction = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const verifyAction = useCallback(() => {
    verifyOtp(otp);
  }, [otp, verifyOtp]);

  return (
    <Screen
      headerProps={{
        title: "Verify phone number",
        rightElement: <CloseButton onPress={closeAction} />,
      }}>
      <OverlayLoader loading={loader} />

      <ScrollView keyboardShouldPersistTaps="always">
        <View style={styles.outerContainer}>
          <View style={styles.container}>
            <Text style={styles.otpBig}>Enter OTP Code</Text>
            <Text style={styles.otpMsg}>Please verify your number with 4 digit OTP code sent to {phoneNo}</Text>
            <OTPInputView
              error={error}
              onOtpSubmitted={(otpStr: string) => {
                verifyOtp(otpStr);
              }}
            />
            <View style={styles.row}>
              <Text style={styles.otpNotReceived}>Didn't receive code? </Text>
              <TouchableOpacity style={styles.touch}>
                <Text style={styles.resend}>Resend</Text>
              </TouchableOpacity>
            </View>
            <CTAButton onPress={verifyAction} disabled={disable}>
              <Text style={styles.verifyTxt}>Verify OTP</Text>
            </CTAButton>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    flexDirection: "column",
  },
  container: {
    padding: 20,
  },
  logo: {
    width: 180,
    height: 100,
    marginTop: 80,
    marginBottom: 50,
  },
  otpMsg: {
    marginTop: 8,
    color: "black",
  },
  otpNotReceived: {
    color: "black",
  },
  resend: {
    fontWeight: "bold",
    color: "#8a7b1d",
  },
  verifyTxt: {
    fontWeight: "bold",
    color: "#fff",
  },
  otpBig: {
    marginTop: 8,
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    marginBottom: 30,
  },
  touch: {
    alignItems: "center",
  },
});
