import React, { useCallback, useEffect, useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "@screens/auth/login";
import { OtpScreen } from "@screens/auth/otp";
import MainNavigator from "@screens/main/MainNavigator";
import { SplashScreen } from "@screens/splash";

import { AUTH_KEYS } from "./util/logout";
import { hydrate } from "./util/storage";

export type AppStackParamList = {
  splash: undefined;
  login: undefined;
  otp: { phoneNo: string };
  main: undefined;
};

const Stack = createStackNavigator<AppStackParamList>();

type AppNavigatorProps = {
  initProcessing: boolean;
};

const AppNavigator: React.FC<AppNavigatorProps> = ({ initProcessing }) => {
  const [processing, setProcessing] = useState(initProcessing);
  const [isLoggedIn, setLoggedIn] = useState(false);

  const initialize = useCallback(async () => {
    setTimeout(async () => {
      const loggedIn: boolean = (await hydrate(AUTH_KEYS.IS_LOGGED)) || false;
      setLoggedIn(loggedIn);
      setProcessing(false);
    }, 1000);
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (processing) {
    return <SplashScreen />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: () => null,
          safeAreaInsets: { top: 0, right: 0, bottom: 0, left: 0 },
        }}
        headerMode="none">
        {isLoggedIn ? (
          <>
            <Stack.Screen name="main" component={MainNavigator} />
          </>
        ) : (
          <>
            <Stack.Screen name="login" component={LoginScreen} />
            <Stack.Screen name="otp" component={OtpScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
