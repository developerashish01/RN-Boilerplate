import React from "react";
import { StyleSheet } from "react-native";

import { Text } from "@atom/Text";
import View from "@atom/View/View";
import { Screen } from "@molecules/Screen";

export const AccountScreen: React.FC = () => {
  return (
    <Screen
      headerProps={{
        title: "Account",
      }}>
      <View style={styles.outerContainer}>
        <Text>Account Screen</Text>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  logo: {
    width: 180,
    height: 100,
    marginTop: 80,
    marginBottom: 50,
  },
});
